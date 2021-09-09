---
layout:     post
title:      "【d2l】 Learning Rate Scheduling"
subtitle:   ""
date:       2021-09-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---

到目前为止，我们主要关注的是如何更新权重向量的优化算法，而不是它们更新的速度。尽管如此，调整学习速率通常和实际算法一样重要。有很多方面需要考虑：

- 最明显的是，学习速率的大小很重要。如果它太大，优化就会发散，如果它太小，训练就需要太长时间，或者我们最终会得到次优结果。我们在前面看到，问题的条件数很重要。直观地说，它是最不敏感方向与最敏感方向的变化量之比。
- 其次，衰减的速度也同样重要。如果学习速率仍然很大，我们可能会在最小值附近跳跃，从而无法达到最优值。简而言之， 我们想让学习率衰减， 可能会比 $O(t^{-\frac{1}{2}})$ 更慢， 但是对于凸问题将会是一个很好的选择。
- 另一个同样重要的方面是初始化。这与最初如何设置参数有关以及它们最初是如何发展的。这被称为 warmup， 比如我们刚开始想解移动的速度有多快。一开始就采取大的步长可能没有好处，特别是因为初始参数是随机的。最初的更新方向可能也很没有意义。
- 最后，还有一些优化变量执行周期性学习率调整。

考虑到管理学习速率需要很多细节，大多数深度学习框架都有自动处理这一问题的工具。



# Toy Problem

为此，我们选择了一个稍微现代化的LeNet版本(激活选择relu而不是sigmoid，池化选择MaxPooling而不是AveragePooling)。此外，为了提高性能，我们混合了网络。由于大多数代码都是标准的，所以我们只介绍基本的内容，而不作进一步的详细讨论。


```python
%matplotlib inline
import math
import torch
from torch import nn
from torch.optim import lr_scheduler
from d2l import torch as d2l


def net_fn():
    model = nn.Sequential(
        nn.Conv2d(1, 6, kernel_size=5, padding=2), nn.ReLU(),
        nn.MaxPool2d(kernel_size=2, stride=2),
        nn.Conv2d(6, 16, kernel_size=5), nn.ReLU(),
        nn.MaxPool2d(kernel_size=2, stride=2),
        nn.Flatten(),
        nn.Linear(16 * 5 * 5, 120), nn.ReLU(),
        nn.Linear(120, 84), nn.ReLU(),
        nn.Linear(84, 10))

    return model

loss = nn.CrossEntropyLoss()
device = d2l.try_gpu()

batch_size = 256
train_iter, test_iter = d2l.load_data_fashion_mnist(batch_size=batch_size)

# The code is almost identical to `d2l.train_ch6` defined in the
# lenet section of chapter convolutional neural networks
def train(net, train_iter, test_iter, num_epochs, loss, trainer, device,
          scheduler=None):
    net.to(device)
    animator = d2l.Animator(xlabel='epoch', xlim=[0, num_epochs],
                            legend=['train loss', 'train acc', 'test acc'])

    for epoch in range(num_epochs):
        metric = d2l.Accumulator(3)  # train_loss, train_acc, num_examples
        for i, (X, y) in enumerate(train_iter):
            net.train()
            trainer.zero_grad()
            X, y = X.to(device), y.to(device)
            y_hat = net(X)
            l = loss(y_hat, y)
            l.backward()
            trainer.step()
            with torch.no_grad():
                metric.add(l * X.shape[0], d2l.accuracy(y_hat, y), X.shape[0])
            train_loss = metric[0] / metric[2]
            train_acc = metric[1] / metric[2]
            if (i + 1) % 50 == 0:
                animator.add(epoch + i / len(train_iter),
                             (train_loss, train_acc, None))

        test_acc = d2l.evaluate_accuracy_gpu(net, test_iter)
        animator.add(epoch+1, (None, None, test_acc))

        if scheduler:
            if scheduler.__module__ == lr_scheduler.__name__:
                # Using PyTorch In-Built scheduler
                scheduler.step()
            else:
                # Using custom defined scheduler
                for param_group in trainer.param_groups:
                    param_group['lr'] = scheduler(epoch)

    print(f'train loss {train_loss:.3f}, train acc {train_acc:.3f}, '
          f'test acc {test_acc:.3f}')
```

让我们看一下如果我们使用默认配置的算法将会发生什么，比如学习率 0.3, 训练30 epochs。注意训练的准确性是如何持续增加的，而测试的准确率在超过一个点后停滞不前。两条曲线的差距表明过拟合了。

```python
lr, num_epochs = 0.3, 30
net = net_fn()
trainer = torch.optim.SGD(net.parameters(), lr=lr)
train(net, train_iter, test_iter, num_epochs, loss, trainer, device)
```

```
train loss 0.143, train acc 0.944, test acc 0.898
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631152773531.png)

#  Schedulers

调整学习速率的一种方法是在每一步都明确设置它。这可以通过 set_learning_rate 方法方便地实现。我们可以在每个epoch之后(甚至在每个minibatch之后)向下调整它，例如，以动态方式响应优化的进展。

```python
lr = 0.1
trainer.param_groups[0]["lr"] = lr
print(f'learning rate is now {trainer.param_groups[0]["lr"]:.2f}')
```

```
learning rate is now 0.10
```

更一般地，我们想定义一个调度程序。当输入更新次数时， 它返回适当的学习率值。 让我们定义一个简单的公式来设置学习速率 $\eta = \eta_0 (t + 1)^{-\frac{1}{2}}$。


```python
class SquareRootScheduler:
    def __init__(self, lr=0.1):
        self.lr = lr

    def __call__(self, num_update):
        return self.lr * pow(num_update + 1.0, -0.5)
```

让我们绘制它在一系列值上的行为。

```python
scheduler = SquareRootScheduler(lr=0.1)
d2l.plot(torch.arange(num_epochs), [scheduler(t) for t in range(num_epochs)])
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631153021632.png)


现在我们来看看这对训练 Fashion-MNIST 有什么影响。我们只是将调度程序作为训练算法的附加参数提供。

```python
net = net_fn()
trainer = torch.optim.SGD(net.parameters(), lr)
train(net, train_iter, test_iter, num_epochs, loss, trainer, device,
      scheduler)
```

```
train loss 0.271, train acc 0.900, test acc 0.877
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631153108176.png)

这比之前好多了。有两件事很突出:曲线比以前更加平滑。其次， 有更少的过拟合。不幸的是，为什么特定策略不会导致过拟合，这个问题并没有在理论上得到很好的解决。有人认为，步长越小，参数越接近于零，因此越简单。然而，这并不能完全解释这种现象，因为我们并不是真的早早地停止学习，而是只是轻轻地降低学习速度。

# Policies

虽然我们不可能涵盖学习速率调度器的全部种类，但我们试图在下面给出一个流行策略的简要概述。常见的选择是polynomial decay和piecewise constant schedules。除此之外，余弦学习速率调度已经被发现在一些问题上很好地工作。最后，在一些问题上，在使用大的学习速率之前预热优化器是有益的。

## Factor Scheduler

polynomial decay的一种替代方法是乘法衰减， 也就是 $\eta_{t+1} \leftarrow \eta_t · \alpha \text{ for } \alpha \in (0, 1)$。为了防止学习率下降到超出合理范围， 更新公式通常被修改为 $\eta_{t+1} \leftarrow \max (\eta_{min}, \eta_t · \alpha)$。

```python
class FactorScheduler:
    def __init__(self, factor=1, stop_factor_lr=1e-7, base_lr=0.1):
        self.factor = factor
        self.stop_factor_lr = stop_factor_lr
        self.base_lr = base_lr

    def __call__(self, num_update):
        self.base_lr = max(self.stop_factor_lr, self.base_lr * self.factor)
        return self.base_lr

scheduler = FactorScheduler(factor=0.9, stop_factor_lr=1e-2, base_lr=2.0)
d2l.plot(torch.arange(50), [scheduler(t) for t in range(50)])
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631153636026.png)

这个也被 MXNet 通过 `lr_scheduler` 内置调度器实现了。它还需要一些参数，如warmup period、warmup mode (linear or constant)、所需更新的最大数量等。接下来，我们将适当地使用内置调度器，只在这里解释它们的功能。如上图所示，如果需要，构建您自己的调度程序是相当简单的。

## Multi Factor Scheduler

训练深度网络的一种常见策略是保持学习率分段不变，在指定时间降低给定的学习率。也就是说，给定一组时间来降低速率，例如 $s = \{5, 10, 20\}$ 减少 $\eta_{t+1} \leftarrow \eta_t · \alpha$ 当 $t \in s$。 假设值在每一步都减半，我们可以如下实现。


```python
net = net_fn()
trainer = torch.optim.SGD(net.parameters(), lr=0.5)
scheduler = lr_scheduler.MultiStepLR(trainer, milestones=[15, 30], gamma=0.5)

def get_lr(trainer, scheduler):
    lr = scheduler.get_last_lr()[0]
    trainer.step()
    scheduler.step()
    return lr

d2l.plot(torch.arange(num_epochs),
         [get_lr(trainer, scheduler) for t in range(num_epochs)])
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631153948837.png)

这种分段常数学习率计划背后的直觉是，在权重向量的分布达到一个平稳点之前，让优化持续进行。然后(也只有在那时)我们才能降低学习率，例如获得更高质量的学习率到一个良好的局部最小值。下面的示例展示了如何使用这种方法产生更好的解。


```python
train(net, train_iter, test_iter, num_epochs, loss, trainer, device,
      scheduler)
```

```
train loss 0.203, train acc 0.923, test acc 0.864
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631154141740.png)


## Cosine Scheduler

我们可能不想在一开始就大幅降低学习速率，我们可能想在最后用一个非常小的学习率来完善解， 这依赖于我们的观察。这将产生一个类似余弦的调度，其学习速率的函数形式如下所示：

$$
\eta_t = \eta_T + \frac{\eta_0 - \eta_T}{2}(1 + \cos(\pi t /T))
$$

这里 $\eta_0$ 是初始学习率， $\eta_T$ 是在 T 时刻的目标学习率。此外， 对于 $t > T$， 我们将它的值固定为 $\eta_T$ 而不再减少它。 在下面的例子中， 我们设置最大的更新步为 $T=20$。

```python
class CosineScheduler:
    def __init__(self, max_update, base_lr=0.01, final_lr=0, warmup_steps=0,
                 warmup_begin_lr=0):
        self.base_lr_orig = base_lr
        self.max_update = max_update
        self.final_lr = final_lr
        self.warmup_steps = warmup_steps
        self.warmup_begin_lr = warmup_begin_lr
        self.max_steps = self.max_update - self.warmup_steps

    def get_warmup_lr(self, epoch):
        increase = (self.base_lr_orig - self.warmup_begin_lr) \
                       * float(epoch) / float(self.warmup_steps)
        return self.warmup_begin_lr + increase

    def __call__(self, epoch):
        if epoch < self.warmup_steps:
            return self.get_warmup_lr(epoch)
        if epoch <= self.max_update:
            self.base_lr = self.final_lr + (
                self.base_lr_orig - self.final_lr) * (1 + math.cos(
                    math.pi *
                    (epoch - self.warmup_steps) / self.max_steps)) / 2
        return self.base_lr

scheduler = CosineScheduler(max_update=20, base_lr=0.3, final_lr=0.01)
d2l.plot(torch.arange(num_epochs), [scheduler(t) for t in range(num_epochs)])
```


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631155256482.png)

在计算机视觉的背景下，这个调度可以导致改进的结果。但是请注意，不能保证这样的改进(如下所示)。

```python
net = net_fn()
trainer = torch.optim.SGD(net.parameters(), lr=0.3)
train(net, train_iter, test_iter, num_epochs, loss, trainer, device,
      scheduler)
```

```
train loss 0.190, train acc 0.929, test acc 0.899
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1631155615863.png)

## Warmup

在某些情况下，初始化参数不足以保证得到一个好的解决方案。这对于一些高级网络设计来说尤其是个问题，可能会导致不稳定的优化问题。我们可以通过选择一个足够小的学习速率来解决这个问题，以防止一开始就出现发散。
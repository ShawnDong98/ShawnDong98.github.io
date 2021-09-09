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
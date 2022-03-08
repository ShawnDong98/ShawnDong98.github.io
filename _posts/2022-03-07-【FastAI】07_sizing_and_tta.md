---
layout:     post
title:      "【FastAI】07_sizing_and_tta"
subtitle:   ""
date:       2022-03-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - FastAI
---

# Training a State-of-the-Art Model

本章介绍了训练图像分类模型和获得最新结果的更高级技术。如果您想了解更多关于深度学习的其他应用，并稍后再讨论，您可以跳过它——稍后的章节不会假设对这种材料有了解。

我们将研究什么是规范化，一种称为 mixup 的强大数据增强技术，progressive resizing 方法和测试时间增强。为了展示所有这些，我们将使用ImageNet中名为Imagenette的子集从头开始训练模型（不使用迁移学习）。它包含一个来自原始ImageNet数据集10个不同的类别组成的子集，以便在我们想实验时更快地进行训练。

这比我们之前的数据集要难得多，因为我们使用的是全尺寸、全彩色图像，这些图像是不同大小、不同方向、不同光线等物体的照片。因此，在本章中，我们将介绍一些充分利用数据集的重要技术，特别是当您从头开始训练时，或使用迁移学习在与使用的预训练模型非常不同的数据集上训练模型时。


# Imagenette

fast.ai首次启动时，人们使用三个主要数据集来构建和测试计算机视觉模型：

- ImageNet: 130万张不同尺寸的图像，直径约为500像素，分为1000个类别，其需要几天时间训练
- MNIST: 50,000 个 28×28 手写数字灰度图像
- CIFAR10: 10个类别的60,000张32×32像素彩色图像

问题是，较小的数据集实际上没有有效地推广到大型ImageNet数据集。在ImageNet上行之有效的方法通常必须在ImageNet上开发和训练。这导致许多人认为，只有能够访问巨大计算资源的研究人员才能有效地为开发图像分类算法做出贡献。

我们认为这似乎不太可能是真的。我们从未真正看到过一项研究表明ImageNet恰好正好适合大小，并且无法开发其他数据集来提供有用的见解。因此，我们尝试创建一个新的数据集，研究人员可以快速、廉价地测试他们的算法，这也可能适用于整个ImageNet数据集。

大约三个小时后，我们创建了Imagenette。我们从完整的ImageNet中选择了10个看起来非常不同的类。正如我们所希望的那样，我们能够快速、廉价地创建一个能够识别这些类的分类器。然后，我们尝试了一些算法调整，看看它们如何影响Imagenette。我们发现了一些效果很好的方法，并在ImageNet上进行了测试——我们很高兴发现我们的调整在ImageNet上也运行良好！

这里有一个重要信息：您获得的数据集不一定是您想要的数据集。它特别不可能成为您想要进行开发和原型设计的数据集，这一点尤其不可能。您的目标应该是迭代速度不超过几分钟——也就是说，当您想出一个想尝试的新想法时，您应该能够训练模型，并在几分钟内看到它进展如何。如果做实验需要更长的时间，请考虑如何减少数据集或简化模型，以提高实验速度。你能做的实验越多越好！

```python
from fastai.vision.all import *
path = untar_data(URLs.IMAGENETTE)
```

首先，我们将使用  presizing 技巧将数据集放入DataLoaders对象：

```python
dblock = DataBlock(blocks=(ImageBlock(), CategoryBlock()),
                   get_items=get_image_files,
                   get_y=parent_label,
                   item_tfms=Resize(460),
                   batch_tfms=aug_transforms(size=224, min_scale=0.75))
dls = dblock.dataloaders(path, bs=64)
```

然后进行一次训练作为 baseline

```python
model = xresnet50(n_out=dls.c)
learn = Learner(dls, model, loss_func=CrossEntropyLossFlat(), metrics=accuracy)
learn.fit_one_cycle(5, 3e-3)
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1646663213980.png)

这是一个很好的基线，因为我们没有使用预训练模型，但我们可以做得更好。当处理从头开始训练或微调到与预训练中使用的非常不同的数据集的模型时，有一些其他技术真的很重要。在本章的其余部分，我们将考虑您希望熟悉的一些关键方法。第一个是规范化您的数据。

# Normalization

在训练模型时，如果您的输入数据标准化，即平均值为0，标准差为1，这会有所帮助。但大多数图像和计算机视觉库对像素使用0到255之间的值，或0到1之间的值；无论哪种情况，您的数据都不会平均值为0，标准差为1。

让我们抓住一批数据并查看这些值，方法是取除通道轴（轴1）以外的所有轴上的平均值：

```python
x, y = dls.one_batch()
x.mean(dim=[0, 2, 3]), x.std(dim=[0, 2, 3])

(TensorImage([0.4842, 0.4711, 0.4511], device='cuda:5'),
 TensorImage([0.2873, 0.2893, 0.3110], device='cuda:5'))
```

正如我们所期望的，平均值和标准差不是很接近期望值。幸运的是，通过添加 `Normalize` 变换，在fastai中可以轻松实现数据规范化。这同时作用于整个 mini-batch，因此您可以将其添加到数据块的 `batch_tfms` 部分。您需要将您想要使用的平均值和标准差传递给此变换；fastai附带已定义的标准 ImageNet 平均值和标准差。（如果您没有将任何统计数据传递给 `Normalize` 变换，fastai将自动从您的一批数据中计算它们。）

让我们添加此变换（使用 `imagenet_stats` ， 因为 Imagenette 是 ImageNet 的子集），现在查看一批数据：

```python
def get_dls(bs, size):
    dblock = DataBlock(blocks=(ImageBlock, CategoryBlock),
                   get_items=get_image_files,
                   get_y=parent_label,
                   item_tfms=Resize(460),
                   batch_tfms=[*aug_transforms(size=size, min_scale=0.75),
                               Normalize.from_stats(*imagenet_stats)])
    return dblock.dataloaders(path, bs=bs)
```

```python
dls = get_dls(64, 224)
```

```python
x,y = dls.one_batch()
x.mean(dim=[0,2,3]),x.std(dim=[0,2,3])

(TensorImage([-0.0787,  0.0525,  0.2136], device='cuda:5'),
 TensorImage([1.2330, 1.2112, 1.3031], device='cuda:5'))
```

让我们看看这对训练我们的模型有什么影响：

```python
model = xresnet50(n_out=dls.c)
learn = Learner(dls, model, loss_func=CrossEntropyLossFlat(), metrics=accuracy)
learn.fit_one_cycle(5, 3e-3)
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1646669587227.png)

虽然它在这方面只有一点帮助，但在使用预训练模型时，规范化变得尤为重要。预训练模型只知道如何处理它以前见过的类型的数据。如果训练数据中的平均像素值为0，但您的数据以0为像素的最小可能值，那么模型将看到与预期截然不同的东西！

这意味着，当您分发模型时，您还需要分发用于规范化的统计数据，因为任何使用它进行推理或迁移学习的人都需要使用相同的统计数据。同样，如果您使用的是其他人训练过的模型，请确保您了解他们使用的规范化统计信息，并匹配它们。

在前几章中，我们不必处理规范化，因为当通过 `cnn_learner` 使用预训练模型时，fastai库会自动添加适当的规范化变换；模型使用特定数据 `Normalize`  进行了预训练（通常来自ImageNet数据集），因此库可以为您填写这些统计信息。请注意，这仅适用于预训练模型，这就是为什么我们需要在从头开始训练时在这里手动添加此信息。

到目前为止，我们的所有训练都以224大小完成。在开始之前，我们可以开始更小的训练。这被称为 progressive resizing。

# Progressive Resizing

当fast.ai及其学生团队在2018年赢得DAWNBench比赛时，最重要的创新之一是非常简单的事情：开始使用小图像训练，结束使用大图像的训练。用小图像花大部分时间进行训练，有助于更快地完成训练。使用大图像完成训练可以提高最终的准确性。我们称这种方法为 `progressive resizing`。

正如我们所看到的，卷积神经网络学到的特征类型与图像的大小没有任何特定——早期层可以找到边缘和梯度等东西，后层可能会找到鼻子和日落等东西。因此，当我们在训练过程中更改图像大小时，并不意味着我们必须为模型找到完全不同的参数。

但很明显，小图像和大图像之间存在一些差异，因此我们不应该期望我们的模型继续完全正常工作，没有任何变化。这让你想起了什么吗？当我们发展这个想法时，它提醒我们迁移学习！我们正在试图让我们的模型学会做一些与之前学到的事情略有不同的事情。因此，在调整图像大小后，我们应该使用 `fine_tune` 方法。

逐步调整大小还有一个好处：这是另一种形式的数据增强。因此，您应该希望看到经过渐进调整大小训练的模型得到更好的泛化。

要实现渐进调整大小，最方便的是，您首先创建一个 `get_dls` 函数，该函数像我们之前在部分中所做的那样采用图像大小和批处理大小，并返回您的 `DataLoaders`：

现在，您可以创建小型 `DataLoaders`，并以通常的方式使用 `fit_one_cycle`，训练时间比平时少几个 epoch：

```python
dls = get_dls(128, 128)
learn = Learner(dls, xresnet50(n_out=dls.c), loss_func=CrossEntropyLossFlat(), 
                metrics=accuracy)
learn.fit_one_cycle(4, 3e-3)
```
![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1646670528058.png)


然后，您可以替换 `Learner` 内部的 `DataLoaders`，并进行微调：

```python
learn.dls = get_dls(64, 224)
learn.fine_tune(5, 1e-3)
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1646670733881.png)

如您所见，我们的性能要好得多，每个 epoch 对小图像的初始训练都要快得多。

您可以随心所欲地重复增加大小和训练更多 epoch 的过程，以获得您想要的图像大小——但当然，使用大于原始图像大小的图像不会有任何好处。

请注意，对于迁移学习，渐进式调整大小实际上可能会损害性能。如果您的预训练模型与迁移学习任务和数据集非常相似，并且是在类似大小的图像上训练的，权重不需要太大变化，则最有可能发生这种情况。在这种情况下，对较小图像的训练可能会损坏预训练的权重。

另一方面，如果迁移学习任务将使用与训练前任务中使用的不同大小、形状或样式的图像，则渐进调整大小可能会有所帮助。和往常一样，“有帮助吗？” 的答案是 “试试看！”

我们可以尝试的另一件事是将数据增强应用于验证集。到目前为止，我们只将其应用于训练集；验证集总是获得相同的图像。但也许我们可以尝试对验证集的几个增强版本进行预测并对其进行平均。我们接下来会考虑这种方法。


# Test Time Augmentation

我们一直在使用随机裁剪来获得一些有用的数据增强，这导致了更好的泛化能力，并导致对更少的训练数据的需求。当我们使用随机裁剪时，fastai将自动为验证集使用中心裁剪——也就是说，它将在图像中心选择最大的正方形区域，而不会越过图像的边缘。

这经常会有问题。例如，在多标签数据集中，有时有面向图像边缘的小目标；这些小目标可以通过中心裁剪完全被裁掉。即使对于我们的 pet breed 分类问题，也可能裁剪出识别正确品种所需的关键特征，如鼻子颜色。

解决这个问题的一个方法是避免完全随机裁剪。相反，我们可以简单地挤压或拉伸矩形图像，以适应正方形空间。但是我们错过了一个非常有用的数据增强，我们也使模型的图像识别更加困难，因为它必须学习如何识别挤压和挤压的图像，而不仅仅是正确比例的图像。

另一个解决方案是不要以中心裁剪进行验证，而是从原始矩形图像中选择多个区域进行裁剪，将每个区域传递给我们的模型，并获取预测的最大值或平均值。事实上，我们不仅可以针对不同的裁剪这样做，还可以针对我们所有测试时增强参数的不同值。这被称为测试时增强(TTA)。

根据数据集，测试时增强可以显著提高准确性。它根本不改变训练所需的时间，但会根据请求的测试时间增强图像的数量增加验证或推理所需的时间。默认情况下，fastai将使用未增强的中心裁剪图像加上四个随机增强的图像。

您可以将任何 `DataLoader` 传递给 `fastai` 的 `tta` 方法；默认情况下，它将使用您的验证集：

```python
preds,targs = learn.tta()
accuracy(preds, targs).item()

0.8737863898277283
```

正如我们所看到的，使用 TTA 可以很好地提高我们的性能，不需要额外的训练。然而，这确实会使推理速度变慢——如果您平均为TTA提供五张图像，推理速度会慢五倍。

我们看到了一些数据增强如何帮助训练更好的模型的例子。现在让我们专注于一种名为Mixup的新数据增强技术。


# Mixup

张鸿毅等人在2017年的论文《mixup: Beyond Empirical Risk Minimization》中介绍的 mixup 是一种强大的数据增强技术，可以提供显著更高的准确性，特别是当您没有太多数据，也没有在类似于数据集的数据上训练的预训练模型时。文章解释说：“虽然数据增强会改进泛化，但该方法依赖于数据集，因此需要使用专家知识。”
例如，作为数据增强的一部分，翻转图像是常见的，但您应该只水平翻转还是垂直翻转？答案是，这取决于您的数据集。此外，如果翻转不能为您提供足够的数据增强，则无法“flip more”。
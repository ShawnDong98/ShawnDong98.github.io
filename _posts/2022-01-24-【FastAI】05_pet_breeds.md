---
layout:     post
title:      "【FastAI】05_pet_breeds"
subtitle:   ""
date:       2022-01-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - FastAI
---

# Image Classification

既然您已经了解了什么是深度学习，它是为了什么，以及如何创建和部署模型，那么我们是时候深入研究了！在一个理想的世界里，深度学习的实践者不必知道引擎下事物如何运作的每个细节......但到目前为止，我们还没有生活在一个理想的世界里。事实是，为了让您的模型真正有效，并可靠地工作，您必须正确处理许多细节，以及许多细节，您必须检查。这个过程需要能够在神经网络训练时查看神经网络内部，并在预测时发现可能的问题，并知道如何解决这些问题。

因此，从现在开始，我们将深入研究深度学习的机制。计算机视觉模型、NLP模型、表格模型等的架构是什么？如何创建符合特定域需求的结构？您如何从训练过程中获得最佳结果？你如何让训练变快？随着数据集的变化，您必须更改什么？

我们将首先重复我们在第一章中看到的相同的基本应用程序，但我们将做两件事：

- 使它们更好
- 在更广泛的数据集上应用它们

为了完成这两件事，我们必须学习深度学习谜题的所有部分。这包括不同类型的图、正则化方法、优化器、如何将图组合到结构中、标签技术等。不过，我们不仅会把所有这些东西都教给你；我们会根据需要逐步介绍它们，以解决与我们正在进行的项目相关的实际问题。


# From Dogs and Cats to Pet Breeds

在我们的第一个模型中，我们学会了如何对狗和猫进行分类。就在几年前，这被认为是一项非常具有挑战性的任务——但今天，这太容易了！我们将无法向您展示带有这个问题的训练模型的细微差别，因为我们在不担心任何细节的情况下获得了几乎完美的结果。但事实证明，相同的数据集也允许我们解决一个更具挑战性的问题：找出每张图像中显示的宠物品种。

在现实生活中，我们从一些我们一无所知的数据集开始。然后，我们必须弄清楚它是如何组合在一起的，如何从中提取我们需要的数据，以及这些数据是什么样子的。在这本书的其余部分，我们将向您展示如何在实践中解决这些问题，包括理解您正在处理的数据和边走边测试建模所需的所有中间步骤。


我们已经下载了宠物数据集，我们可以使用如下代码获取此数据集的路径：

```python
from fastai.vision.all import *
path = untar_data(URLs.PETS)
```

现在，如果我们要了解如何从每张图像中提取每只宠物的品种，我们需要了解这些数据是如何布局的。这些数据布局的细节是深度学习谜题的重要组成部分。数据通常以以下两种方···式之一提供：

- 代表数据项的单个文件，如文本文档或图像，可能被组织成文件夹或带有代表这些项目信息的文件名
- 数据表，例如CSV格式的数据表，其中每行都是一个项目，其中可能包含文件名，该文件名在表中的数据和其他格式的数据（如文本文档和图像）之间提供连接

这些规则也有例外——特别是在基因组学等领域，那里可以有二进制数据库格式甚至网络流——但总的来说，您将使用的绝大多数数据集将使用这两种格式的某种组合。

要查看我们数据集中的内容，我们可以使用 `ls` 方法：

```python
#hide
Path.BASE_PATH = path
```

```python
path.ls()

> (#3) [Path('annotations'),Path('images'),Path('models')]
```

我们可以看到，此数据集为我们提供了图像和标注目录。数据集的网站告诉我们，标注目录包含关于宠物在哪里而不是它们是什么的信息。在这一章中，我们将进行分类，而不是定位，也就是说，我们关心的是宠物是什么，而不是它们在哪里。因此，我们现在将忽略标注目录。因此，让我们看看图像目录：

```python
(path/"images").ls()

> (#7394) [Path('images/great_pyrenees_173.jpg'),Path('images/wheaten_terrier_46.jpg'),Path('images/Ragdoll_262.jpg'),Path('images/german_shorthaired_3.jpg'),Path('images/american_bulldog_196.jpg'),Path('images/boxer_188.jpg'),Path('images/staffordshire_bull_terrier_173.jpg'),Path('images/basset_hound_71.jpg'),Path('images/staffordshire_bull_terrier_37.jpg'),Path('images/yorkshire_terrier_18.jpg')...]
```
Fastai中返回集合的大多数函数和方法都使用名为 `L` 的类。`L` 可以被视为普通 Python  `list` 类的增强版本，并为常见操作增加了便利。例如，当我们在笔记本中显示此类对象时，它会以其中显示的格式显示。显示的第一件事是集合中的项目数量，前缀为#。您还将在前面的输出中看到列表后缀为省略号。这意味着只显示前几个项目——这是件好事，因为我们不希望屏幕上超过7000个文件名！

通过检查这些文件名，我们可以看到它们的结构如何。每个文件名都包含宠物品种，然后是下划线（\_）、数字，最后是文件扩展名。我们需要创建一个代码，从单个路径中提取品种。Jupyter Notebook 使这变得简单，因为我们可以逐步构建一些有效的东西，然后将其用于整个数据集。在这一点上，我们确实必须小心，不要做出太多假设。例如，如果您仔细查看，您可能会注意到一些宠物品种包含多个单词，因此我们不能简单地在找到的第一个_字符处断开。为了测试代码，让我们从这些文件名中挑选一个：

```python
fname = (path/"images").ls()[0]
```

从此类字符串中提取信息的最强大和灵活的方法是使用 `regular expression`，也称为 `regex`。

在这种例子中，我们需要一个正则表达式，从文件名中提取宠物品种。

当您编写正则表达式时，最好的开始方式是首先根据一个示例进行尝试。让我们使用 `finall` 方法对 `fname` 对象的文件名尝试正则表达式：

```python
re.findall(r'(.+)_\d+.jpg$', fname.name)

> ['great_pyrenees']
```

这个正则表达式会找出 最后一个下划线字符，子序列字符是数字，最后是JPEG文件扩展名的所有字符。

现在我们确认正则表达式适用于示例，让我们用它来标记整个数据集。fastai附带许多类来帮助标记。对于用正则表达式进行标记，我们可以使用 `RegexLabeller` 类。在本例中，我们使用 `datablock` API（事实上，我们几乎总是使用 `datablock` API——它比简单工厂方法灵活得多）：

```python
pets = DataBlock(blocks = (ImageBlock, CategoryBlock),
                 get_items=get_image_files, 
                 splitter=RandomSplitter(seed=42),
                 get_y=using_attr(RegexLabeller(r'(.+)_\d+.jpg$'), 'name'),
                 item_tfms=Resize(460),
                 batch_tfms=aug_transforms(size=224, min_scale=0.75))
dls = pets.dataloaders(path/"images")
```

我们以前从未见过的 `DataBlock` 调用的一个重要部分是以下两行：

```python
item_tfms=Resize(460),
batch_tfms=aug_transforms(size=224, min_scale=0.75)
```

这些代码实现了 fastai 数据增强策略，我们称之为 `presizing`。`presizing` 是进行图像增强的一种特殊方式，旨在最大限度地减少数据破坏，同时保持良好的性能。

# Presizing

我们需要我们的图像具有相同的尺寸，以便它们可以整理成张量并传递给GPU。我们还希望最大限度地减少我们执行的不同增强计算的数量。性能要求表明，在可能的情况下，我们应该将增强转换合成为更少的转换（以减少计算次数和有损操作的数量），并将图像转换为统一大小（以便在GPU上更有效地处理）。

挑战在于，如果在调整大小调整到增强大小后执行，各种常见的数据增强转换可能会引入 spurious empty zones、degrade data或两者兼而有之。例如，将图像旋转45度会使新边界的角区域充满空，这不会教会模型任何东西。许多旋转和缩放操作需要插值才能创建像素。这些插值像素来自原始图像数据，但质量仍然较低。

为了应对这些挑战，`presizing` 采用了如下所示的两种策略：

- 将图像大小调整为相对“大”的维度——即显著大于目标训练维度的维度。
- 将所有常见的增强操作（包括调整大小为最终目标大小）组合成一个，并在处理结束时只在GPU上执行一次组合操作，而不是单独执行和多次插值操作。

第一步，调整大小，创建足够大的图像，使其具有备用余地，允许在不创建空区域的情况下进一步增强其内部区域的转换。这种转换通过使用大 crop size 调整到正方形来发挥作用。在训练集中，随机选择 crop 面积，并选择 crop 大小可以覆盖图像的整个宽度或高度，以较小者为准。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1643030902373.png)

这张图片显示了两个步骤：

- 裁剪全宽度或高度：这是在 `item_tfms` 中，因此在复制到GPU之前，它会应用于每个单独的图像。它用于确保所有图像大小相同。在训练集中，随机选择 crop 面积。在验证集上，总是选择图像的中心。
- 随机裁剪和增强：这是在 `batch_tfms` 中，因此它在 GPU 上一次性应用于批处理，这意味着它速度很快。在验证集上，此处仅将大小调整为模型所需的最终大小。在训练集中，首先进行随机 crop 和任何所有增强。

要在 fastai 中实现此过程，请使用大尺寸 `Resize` 作为的 item transform，并使用 `RandomResizeCrop` 作为较小尺寸的批处理转换。如果您在 `aug_transforms` 函数中包含 `min_scale` 参数，将为您添加 `RandomResizeCrop` ，就像上一节中的 `DataBlock` 调用所做的那样。或者，对于初始 `Resize`，您可以使用 `pad` 或 `squish` 代替 `crop`（默认）。

下图显示右侧显示的缩放、插值、旋转然后再次插值的图像（这是所有其他深度学习库使用的方法）与左侧显示的缩放和旋转然后仅插值一次的图像（fastai方法）之间的区别。

```python
#hide_input
#id interpolations
#caption A comparison of fastai's data augmentation strategy (left) and the traditional approach (right).
dblock1 = DataBlock(blocks=(ImageBlock(), CategoryBlock()),
                   get_y=parent_label,
                   item_tfms=Resize(460))
# Place an image in the 'images/grizzly.jpg' subfolder where this notebook is located before running this
dls1 = dblock1.dataloaders([(Path.cwd()/'images'/'grizzly.jpg')]*100, bs=8)
dls1.train.get_idxs = lambda: Inf.ones
x,y = dls1.valid.one_batch()
_,axs = subplots(1, 2)

x1 = TensorImage(x.clone())
x1 = x1.affine_coord(sz=224)
x1 = x1.rotate(draw=30, p=1.)
x1 = x1.zoom(draw=1.2, p=1.)
x1 = x1.warp(draw_x=-0.2, draw_y=0.2, p=1.)

tfms = setup_aug_tfms([Rotate(draw=30, p=1, size=224), Zoom(draw=1.2, p=1., size=224),
                       Warp(draw_x=-0.2, draw_y=0.2, p=1., size=224)])
x = Pipeline(tfms)(x)
#x.affine_coord(coord_tfm=coord_tfm, sz=size, mode=mode, pad_mode=pad_mode)
TensorImage(x[0]).show(ctx=axs[0])
TensorImage(x1[0]).show(ctx=axs[1]);
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1643031593989.png)

你可以看到右边的图像不清晰，左下角有reflection padding artifacts；此外，左上角的草已经完全消失了。我们发现，在实践中，使用 `presizing` 可以显著提高模型的准确性，而且速度更快。

Fastai库还提供了在训练模型之前检查数据看起来怎么样的简单方法，这是一个极其重要的步骤。我们接下来再看看它们。

# Checking and Debugging a DataBlock

我们永远不能只是假设我们的代码运行良好。写 `DataBlock` 就像写蓝图一样。如果您在代码的某个地方出现语法错误，您将收到错误消息，但您无法保证您的模板将按您的意愿在您的数据源上工作。因此，在训练模型之前，您应该始终检查您的数据。您可以使用 `show_batch` 方法进行此操作：

```python
dls.show_batch(nrows=1, ncols=3)
```
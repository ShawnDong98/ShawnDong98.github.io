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

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1643031911343.png)

看看每张图片，看看每张图片是否都有该品种宠物的正确标签。通常，数据科学家处理他们可能不像领域专家那么熟悉的数据：例如，我实际上不知道这些宠物品种中有很多是什么。由于我不是宠物品种的专家，我现在会使用谷歌图像来搜索其中一些品种，并确保图像看起来与我在这个输出中看到的相似。

如果您在构建 `DataBlock` 时出错，您很可能在此步骤之前看不到它。要调试此内容，我们鼓励您使用 `summary` 方法。它将尝试从您给出的源头创建一个批处理，其中包含许多详细信息。此外，如果它失败了，您将确切地看到错误发生的时间，库将尝试为您提供一些帮助。例如，一个常见的错误是忘记使用 `Resize` 转换，因此您最终会看到不同大小的图片，并且无法批量处理它们。在这种情况下，`summary` 会是什么样子（请注意，确切的文本可能自编写本文以来发生了变化，但它会给你一个想法）：

```python
#hide_output
pets1 = DataBlock(blocks = (ImageBlock, CategoryBlock),
                 get_items=get_image_files, 
                 splitter=RandomSplitter(seed=42),
                 get_y=using_attr(RegexLabeller(r'(.+)_\d+.jpg$'), 'name'))
pets1.summary(path/"images")

> Setting-up type transforms pipelines
Collecting items from /home/jhoward/.fastai/data/oxford-iiit-pet/images
Found 7390 items
2 datasets of sizes 5912,1478
Setting up Pipeline: PILBase.create
Setting up Pipeline: partial -> Categorize

Building one sample
  Pipeline: PILBase.create
    starting from
      /home/jhoward/.fastai/data/oxford-iiit-pet/images/american_pit_bull_terrier_31.jpg
    applying PILBase.create gives
      PILImage mode=RGB size=500x414
  Pipeline: partial -> Categorize
    starting from
      /home/jhoward/.fastai/data/oxford-iiit-pet/images/american_pit_bull_terrier_31.jpg
    applying partial gives
      american_pit_bull_terrier
    applying Categorize gives
      TensorCategory(13)

Final sample: (PILImage mode=RGB size=500x414, TensorCategory(13))


Setting up after_item: Pipeline: ToTensor
Setting up before_batch: Pipeline: 
Setting up after_batch: Pipeline: IntToFloatTensor

Building one batch
Applying item_tfms to the first sample:
  Pipeline: ToTensor
    starting from
      (PILImage mode=RGB size=500x414, TensorCategory(13))
    applying ToTensor gives
      (TensorImage of size 3x414x500, TensorCategory(13))

Adding the next 3 samples

No before_batch transform to apply

Collating items in a batch
Error! It's not possible to collate your items in a batch
Could not collate the 0-th members of your tuples because got the following shapes
torch.Size([3, 414, 500]),torch.Size([3, 375, 500]),torch.Size([3, 500, 281]),torch.Size([3, 203, 300])
---------------------------------------------------------------------------
RuntimeError                              Traceback (most recent call last)
<ipython-input-11-8c0a3d421ca2> in <module>
      4                  splitter=RandomSplitter(seed=42),
      5                  get_y=using_attr(RegexLabeller(r'(.+)_\d+.jpg$'), 'name'))
----> 6 pets1.summary(path/"images")

~/git/fastai/fastai/data/block.py in summary(self, source, bs, show_batch, **kwargs)
    182         why = _find_fail_collate(s)
    183         print("Make sure all parts of your samples are tensors of the same size" if why is None else why)
--> 184         raise e
    185 
    186     if len([f for f in dls.train.after_batch.fs if f.name != 'noop'])!=0:

~/git/fastai/fastai/data/block.py in summary(self, source, bs, show_batch, **kwargs)
    176     print("\nCollating items in a batch")
    177     try:
--> 178         b = dls.train.create_batch(s)
    179         b = retain_types(b, s[0] if is_listy(s) else s)
    180     except Exception as e:

~/git/fastai/fastai/data/load.py in create_batch(self, b)
    125     def retain(self, res, b):  return retain_types(res, b[0] if is_listy(b) else b)
    126     def create_item(self, s):  return next(self.it) if s is None else self.dataset[s]
--> 127     def create_batch(self, b): return (fa_collate,fa_convert)[self.prebatched](b)
    128     def do_batch(self, b): return self.retain(self.create_batch(self.before_batch(b)), b)
    129     def to(self, device): self.device = device

~/git/fastai/fastai/data/load.py in fa_collate(t)
     44     b = t[0]
     45     return (default_collate(t) if isinstance(b, _collate_types)
---> 46             else type(t[0])([fa_collate(s) for s in zip(*t)]) if isinstance(b, Sequence)
     47             else default_collate(t))
     48 

~/git/fastai/fastai/data/load.py in <listcomp>(.0)
     44     b = t[0]
     45     return (default_collate(t) if isinstance(b, _collate_types)
---> 46             else type(t[0])([fa_collate(s) for s in zip(*t)]) if isinstance(b, Sequence)
     47             else default_collate(t))
     48 

~/git/fastai/fastai/data/load.py in fa_collate(t)
     43 def fa_collate(t):
     44     b = t[0]
---> 45     return (default_collate(t) if isinstance(b, _collate_types)
     46             else type(t[0])([fa_collate(s) for s in zip(*t)]) if isinstance(b, Sequence)
     47             else default_collate(t))

~/anaconda3/lib/python3.7/site-packages/torch/utils/data/_utils/collate.py in default_collate(batch)
     53             storage = elem.storage()._new_shared(numel)
     54             out = elem.new(storage)
---> 55         return torch.stack(batch, 0, out=out)
     56     elif elem_type.__module__ == 'numpy' and elem_type.__name__ != 'str_' \
     57             and elem_type.__name__ != 'string_':

RuntimeError: invalid argument 0: Sizes of tensors must match except in dimension 0. Got 414 and 375 in dimension 2 at /opt/conda/conda-bld/pytorch_1579022060824/work/aten/src/TH/generic/THTensor.cpp:612
Setting-up type transforms pipelines
Collecting items from /home/sgugger/.fastai/data/oxford-iiit-pet/images
Found 7390 items
2 datasets of sizes 5912,1478
Setting up Pipeline: PILBase.create
Setting up Pipeline: partial -> Categorize

Building one sample
  Pipeline: PILBase.create
    starting from
      /home/sgugger/.fastai/data/oxford-iiit-pet/images/american_bulldog_83.jpg
    applying PILBase.create gives
      PILImage mode=RGB size=375x500
  Pipeline: partial -> Categorize
    starting from
      /home/sgugger/.fastai/data/oxford-iiit-pet/images/american_bulldog_83.jpg
    applying partial gives
      american_bulldog
    applying Categorize gives
      TensorCategory(12)

Final sample: (PILImage mode=RGB size=375x500, TensorCategory(12))

Setting up after_item: Pipeline: ToTensor
Setting up before_batch: Pipeline: 
Setting up after_batch: Pipeline: IntToFloatTensor

Building one batch
Applying item_tfms to the first sample:
  Pipeline: ToTensor
    starting from
      (PILImage mode=RGB size=375x500, TensorCategory(12))
    applying ToTensor gives
      (TensorImage of size 3x500x375, TensorCategory(12))

Adding the next 3 samples

No before_batch transform to apply

Collating items in a batch
Error! It's not possible to collate your items in a batch
Could not collate the 0-th members of your tuples because got the following 
shapes:
torch.Size([3, 500, 375]),torch.Size([3, 375, 500]),torch.Size([3, 333, 500]),
torch.Size([3, 375, 500])
```

您可以确切地看到我们如何收集和拆分数据，我们如何从文件名到样本（元组（图像、类别）），然后应用了哪些 item transform，以及它如何未能将这些样本分批处理（因为形状不同）。

一旦您认为您的数据看起来是对的，我们通常建议下一步应该使用它来训练一个简单的模型。我们经常看到人们推迟了对实际模型的训练太长时间。因此，他们实际上没有发现他们的基线结果是什么样子的。也许你的问题不需要很多花哨的特定领域工程。或者也许数据似乎根本无法训练模型。这些是你想知道的尽快知道的事情。对于此初始测试，我们将使用简单模型：

```python
learn = cnn_learner(dls, resnet34, metrics=error_rate)
learn.fine_tune(2)
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1643032485126.png)

正如我们之前简要讨论的那样，当我们安装模型时显示的表格向我们展示了每个训练 epoch 后的结果。请记住，一个 epoch 是完全通过数据中的所有图像。显示的列是训练集样本的平均损失、验证集的损失以及我们要求的所有指标——在这种例子下是错误率。

请记住，损失是我们决定使用来优化模型的参数的函数。但我们实际上还没有告诉fastai我们要使用什么损失函数。那么它在做什么？Fastai通常会尝试根据您正在使用的数据类型和模型选择适当的损失函数。在这种例子下，我们有图像数据和类别结果，因此fastai将默认使用 `cross-entropy` 损失。

# Cross-Entropy Loss

交叉熵损失是一种类似于我们在上一章中使用的损失函数，但（正如我们将看到的）有两个好处：

- 即使我们的依赖变量有两个以上的类别，它也可以工作。
- 它导致更快、更可靠的训练。

为了了解 `cross-entropy` 如何适用于两个以上类别的依赖变量，我们首先必须了解损失函数看到的实际数据和激活是什么样子的。


# Viewing Activations and Labels

让我们看看我们模型的激活。要从我们的 `DataLoaders` 实际获取一批真实数据，我们可以使用 `one_batch` 方法：

```python
x,y = dls.one_batch()
```

如您所见，这将以小批量的形式返回依赖变量和独立变量。让我们看看我们依赖变量中实际包含的内容：

```python
y

> TensorCategory([ 0,  5, 23, 36,  5, 20, 29, 34, 33, 32, 31, 24, 12, 36,  8, 26, 30,  2, 12, 17,  7, 23, 12, 29, 21,  4, 35, 33,  0, 20, 26, 30,  3,  6, 36,  2, 17, 32, 11,  6,  3, 30,  5, 26, 26, 29,  7, 36,
        31, 26, 26,  8, 13, 30, 11, 12, 36, 31, 34, 20, 15,  8,  8, 23], device='cuda:5')
```

我们的批处理大小是64，所以我们在这个张量中有64行。每行都是0到36之间的单个整数，代表我们37个可能的宠物品种。我们可以使用 `Learner.get_preds` 查看预测（即神经网络最后一层的激活）。此函数要么接受数据集索引（train 为0，valid 为1），要么接受批处理迭代器。因此，我们可以用我们的批次传递一个简单的列表来获取我们的预测。默认情况下，它返回预测和目标，但由于我们已经拥有目标，我们可以通过分配给特殊变量 `_` 来忽略它们：

```python
preds,_ = learn.get_preds(dl=[(x,y)])
preds[0]

> tensor([9.9911e-01, 5.0433e-05, 3.7515e-07, 8.8590e-07, 8.1794e-05, 1.8991e-05, 9.9280e-06, 5.4656e-07, 6.7920e-06, 2.3486e-04, 3.7872e-04, 2.0796e-05, 4.0443e-07, 1.6933e-07, 2.0502e-07, 3.1354e-08,
        9.4115e-08, 2.9782e-06, 2.0243e-07, 8.5262e-08, 1.0900e-07, 1.0175e-07, 4.4780e-09, 1.4285e-07, 1.0718e-07, 8.1411e-07, 3.6618e-07, 4.0950e-07, 3.8525e-08, 2.3660e-07, 5.3747e-08, 2.5448e-07,
        6.5860e-08, 8.0937e-05, 2.7464e-07, 5.6760e-07, 1.5462e-08])
```

实际预测是0到1之间的37个概率，总和为1个：

```python
len(preds[0]),preds[0].sum()

> (37, tensor(1.0000))
```

为了将模型的激活转换为这样的预测，我们使用了所谓的 `softmax` 激活函数。


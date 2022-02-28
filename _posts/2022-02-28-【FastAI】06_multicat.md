---
layout:     post
title:      "【FastAI】06_multicat"
subtitle:   ""
date:       2022-02-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - FastAI 
    - 深度学习
---

# Other Computer Vision Problems

在前一章中，您学习了一些在实践中训练模型的重要实用技术。选择学习速率和学习时间等因素对于取得好成绩非常重要。

在本章中，我们将看看另外两种类型的计算机视觉问题:多标签分类和回归。第一个是当您希望预测每个图像有多个标签时(或者有时根本没有)，第二个是当您的标签是一个或几个数字，而不是一个类别时。

在此过程中，将更深入地研究深度学习模型中的输出激活、目标和损失函数。

# Multi-Label Classification

多标签分类是指在图像中识别可能不包含一种类型的对象的类别的问题。可能有不止一种类型的对象，或者在您正在寻找的类中可能根本没有对象。

例如，对于我们的熊分类器来说，这将是一个很好的方法。我们之前的章节中提出的熊分类器的一个问题是，如果用户上传了一些不是熊的种类的东西，模型仍然会说它是灰熊、黑色或泰迪熊，它没有能力预测“根本不是熊”。在我们完成本章之后，回到图像分类器应用，尝试使用多标签技术重新训练它，然后通过传入一个不是您所识别的任何类的图像来测试它。

# The Data

例如，我们将使用PASCAL数据集，每张图像可以有多种分类对象。

我们首先像往常一样下载和提取数据集：

```python
from fastai.vision.all import *
path = untar_data(URLs.PASCAL_2007)from fastai.vision.all import *
path = untar_data(URLs.PASCAL_2007)
```

这个数据集与我们之前看到的数据集不同，因为它不是按文件名或文件夹构建的，而是附带一个CSV（逗号分隔的值）文件，告诉我们每个图像应该使用什么标签。我们可以通过将CSV文件读取到 Pandas DataFrame 中来检查它：

```python
df = pd.read_csv(path/'train.csv')
df.head()
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1646035782180.png)

如您所见，每张图像中的类别列表显示为空格分隔的字符串。

## Sidebar: Pandas and DataFrames

Pandas是一个Python库，用于操作和分析表格和时间序列数据。主类是DataFrame，它表示行和列表。您可以从CSV文件、数据库表、Python字典和许多其他来源获取DataFrame。在Jupyter中，DataFrame以格式化表的形式输出，如图所示。

您可以使用 `iloc` 属性访问DataFrame的行和列，就像它是一个矩阵一样：

```python
df.iloc[:,0]

0       000005.jpg
1       000007.jpg
2       000009.jpg
3       000012.jpg
4       000016.jpg
           ...    
5006    009954.jpg
5007    009955.jpg
5008    009958.jpg
5009    009959.jpg
5010    009961.jpg
Name: fname, Length: 5011, dtype: object
```

```python
df.iloc[0,:]
# Trailing :s are always optional (in numpy, pytorch, pandas, etc.),
#   so this is equivalent:
df.iloc[0]

fname       000005.jpg
labels           chair
is_valid          True
Name: 0, dtype: object
```

您还可以按名称通过直接索引到 DataFrame 中抓取列：

```python
df['fname']

0       000005.jpg
1       000007.jpg
2       000009.jpg
3       000012.jpg
4       000016.jpg
           ...    
5006    009954.jpg
5007    009955.jpg
5008    009958.jpg
5009    009959.jpg
5010    009961.jpg
Name: fname, Length: 5011, dtype: object
```

您可以创建新列并使用列进行计算：

```python
tmp_df = pd.DataFrame({'a':[1,2], 'b':[3,4]})
tmp_df
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1646036048652.png)

```python
tmp_df['c'] = tmp_df['a']+tmp_df['b']
tmp_df
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1646036071482.png)

pandas 是一个快速灵活的库，是每个数据科学家Python工具箱的重要组成部分。不幸的是，它的API可能相当混乱和令人惊讶，所以需要一段时间才能熟悉它。如果您以前从未使用过熊猫，我们建议您学习教程；我们特别喜欢 Pandas 的创作者Wes McKinney的《Python for Data Analysis》(O'Reilly)一书。它还涵盖了其他重要的库，如matplotlib和numpy。我们将尝试简要描述我们在遇到 pandas 时使用的功能，但不会深入到 McKinney 书中的详细程度。

## End sidebar

## Constructing a DataBlock

我们如何从 `DataFrame` 对象转换为 `DataLoaders` 对象？我们通常建议尽可能使用数据块API创建 `DataLoaders` 对象，因为它提供了灵活性和简单性的良好组合。在这里，我们将向您展示我们在此数据集为例，在实践中使用数据块API构建 `DataLoaders` 对象的步骤。

正如我们所看到的，PyTorch和fastai有两个主要类来表示和访问训练集或验证集：

- `Dataset`:  返回单个项目的独立变量和依赖变量元组的集合
- `DataLoader`： 一个提供 mini-batches 的迭代器， 每个 mini-batch 是一组独立变量或者相关变量的元组
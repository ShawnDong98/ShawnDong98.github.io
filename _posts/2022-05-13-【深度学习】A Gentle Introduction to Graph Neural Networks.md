---
layout:     post
title:      "【深度学习】A Gentle Introduction to Graph Neural Networks"
subtitle:   ""
date:       2022-05-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GNN & GCN
---
神经网络已被用于利用图的结构和性质。我们探索了构建图神经网络所需的组件，并 motivate 了它们背后的设计选择。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652404436505.png)

本文是两篇关于图神经网络的 Distill 出版物之一。请参 [https://distill.pub/2021/understanding-gnns/](https://distill.pub/2021/understanding-gnns/) ，以理解图像上的卷积如何自然地归纳为图上的卷积。

图无处不在; 现实世界中的对象通常是根据它们与其他事物的 connections 来定义的。一组对象以及它们之间的 connections 自然地表示为图。十多年来，研究人员已经开发出了操作图数据的神经网络(称为图神经网络，或GNNs)。最近的发展提高了他们的能力和表达能力。我们开始看到 antibacterial discovery、physics simulations 、fake news detection、traffic prediction 和 recommendation systems 等领域的实际应用。

本文探索和解释现代图神经网络。我们把这项工作分成四部分。首先，我们看看什么样的数据最自然地表达为图，以及一些常见的例子。其次，我们探讨了图与其他类型数据的不同之处，以及在使用图时我们必须做出的一些特殊选择。第三，我们构建一个现代GNN，通过模型的每个部分，从该领域的 historic 建模创新开始。我们逐渐从一个基本的实现过渡到最先进的GNN模型。第四，也是最后，我们提供了一个GNN PlayGround，您可以在其中使用真实的任务和数据集，以建立一个更强的直觉，了解 GNN 模型的每个组件如何对其做出的预测作出贡献。

首先，让我们确定什么是图。图表示实体集合(节点)之间的关系(边)。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652404864431.png)
为了进一步描述每个节点、边或整个图，我们可以在图的每个部分中存储信息。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652404924398.png)
我们还可以通过将方向性与边(有向的、无向的)联系起来来 specialize 图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652404964562.png)
图是非常灵活的数据结构，如果现在看起来很抽象，我们将在下一节通过示例使其具体化。


# Graphs and where to find them
您可能已经熟悉了某些类型的图数据，例如社交网络。然而，图是数据的一种非常强大和通用的表示，我们将展示两种您可能认为不能被建模为图的数据: 图像和文本。尽管有违直觉，但我们可以通过将图像和文本视为图来了解它们的对称性和结构，并建立一种直觉，这将有助于理解其他不太像网格的图数据，我们将在后面讨论。


## Images as graphs

我们通常认为 图像 是带有通道的矩形网格，将它们表示为数组(例如 244x244x3 浮点数)。另一种理解图像的方法是将 图像 看作具有规则结构的图形，其中每个像素代表一个节点，并通过 边 与 相邻像素 连接。每个非边界像素正好有 8 个邻居，存储在每个节点上的信息是一个表示像素的 RGB 值的三维向量。

将图的连通性可视化的一种方法是通过它的邻接矩阵。我们对节点进行排序，在本例中，每个 smiley face 的 5x5 图像中 25 个像素， 用 $n_{nodes} \times n_{nodes}$ 的矩阵填充， 如果两个节点之间共享一条边。 请注意，下面的三种表示形式都是同一数据块的不同视图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652405442690.png)

## Text as graphs

我们可以将文本数字化，方法是将索引与每个字符、单词或标记联系起来，并将文本表示为这些索引的序列。这创建了一个简单的有向图，其中每个字符或索引都是一个节点，并通过边连接到它后面的节点。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652405845729.png)

当然，在实践中，这通常不是文本和图像的编码方式:这些 图表示 是冗余的，因为所有的图像和文本都有非常规则的结构。例如，图像在其邻接矩阵中有一个 banded 结构，因为所有节点(像素)都连接在一个网格中。文本的邻接矩阵只是一条对角线，因为每个单词只与前一个单词和下一个单词连接。

## Graph-valued data in the wild

图 是描述您可能已经熟悉的数据的有用工具。让我们转向结构更加异构的数据。在这些示例中，每个节点的邻居数量是可变的(与图像和文本的固定邻居大小相反)。除了图之外，这些数据很难用其他方式表达。

**Molecules as graphs**： 分子是物质的基本组成部分，由三维空间中的原子和电子构成。所有粒子都相互作用， 但是当一对原子彼此保持稳定的距离时，我们就说它们有共价键。不同的原子对和键有不同的距离(如单键、双键)。将3D对象描述为 图 是一种非常方便和常见的抽象，其中节点是原子，边是共价键。这是两个常见的分子，以及它们的相关图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406246345.png)
![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406269582.png)



**社交网络作为图**。社交网络是研究人们、机构和组织的集体行为模式的工具。我们可以通过将个体建模为节点，将他们的关系建模为边，来构建一个代表一组人的图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406335270.png)

与图像和文本数据不同，社交网络没有相同的邻接矩阵。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406370379.png)

**Citation networks as graphs.**  科学家在发表论文时经常引用其他科学家的研究成果。我们可以将这些引文网络可视化为一个图，其中每篇论文是一个节点，每个有向边是一篇论文与另一篇论文之间的引文。此外，我们还可以在每个节点中添加关于每篇论文的信息，比如在摘要的词嵌入。

**Other examples.** 在计算机视觉中，我们有时想在视觉场景中标记对象。然后，我们可以通过将这些对象视为节点，将它们的关系视为边来构建图。机器学习模型、编程代码和数学方程也可以用图来表达，其中变量是节点，边是将这些变量作为输入和输出的操作。您可能会在这些上下文中看到 “dataflow graph” 项。

现实世界的图的结构可能在不同类型的数据之间有很大的差异，有些图有很多节点，但它们之间的连接很少，反之亦然。在节点、边的数量和节点的连通性方面，图数据集可以有很大的差异(在给定数据集内和数据集之间)。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652406540027.png)

# What types of problems have graph structured data?

我们已经描述了一些实际的图例子，但是我们想对这些数据执行什么任务呢?图上有三种一般类型的预测任务: 图级、节点级和边级。

在图级任务中，我们预测整个图的单个属性。对于节点级任务，我们预测图中每个节点的某些属性。对于边级任务，我们想要预测图中边的属性或存在。

对于上面描述的三个级别的预测问题(图级、节点级和边级)，我们将展示以下所有问题都可以用一个 GNN 解决。但首先，让我们更详细地浏览一下这三类图预测问题，并提供每个问题的具体例子。

## Graph-level task

在图级任务中，我们的目标是预测整个图的属性。例如，对于一个用图表示的分子，我们可能想要预测这个分子闻起来像什么，或者它是否会与与疾病有关的受体结合。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652408208762.png)

这类似于 MNIST 和 CIFAR 的图像分类问题，我们希望将一个标签与整个图像相关联。对于文本，一个类似的问题是情感分析，我们想要立即识别整个句子的情绪或情感。

## Node-level task

节点级任务与预测图中每个节点的身份或角色有关。

节点级预测问题的典型例子是 Zach’s karate club 。这个数据集是一个单一的社交网络图，由两支空手道俱乐部中的一支在政治分歧后宣誓效忠的个人组成。随着故事的发展，Mr. Hi (Instructor) 和 John H(Administrator)之间的不和造成了空手道俱乐部的分裂。节点代表每个空手道练习者，边代表空手道之外的这些成员之间的互动。预测问题是区分一个给定的成员在不和之后是忠于 Hi 先生还是忠于John H先生。在本例中，节点到 Instructor 或 Administrator 的距离与这个标签高度相关。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652408403039.png)

在图像类比之后，节点级预测问题类似于图像分割，我们试图标记图像中每个像素的角色。对于文本，类似的任务是预测句子中每个单词的词性(如名词、动词、副词等)。

## Edge-level task

边级推理的一个例子是图像场景理解。除了识别图像中的物体，深度学习模型还可以用来预测它们之间的关系。我们可以将其描述为边级分类: 给定代表图像中物体的节点，我们希望预测这些节点中哪些共享一条边，或者这条边的值是多少。如果我们希望发现实体之间的连接，我们可以考虑图是全连接的，并根据它们的预测值修剪边，得到一个稀疏图。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652408490940.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652408528257.png)

# The challenges of using graphs in machine learning

那么，我们如何用神经网络来解决这些不同的图任务呢?第一步是考虑我们将如何表示与神经网络兼容的图。

机器学习模型通常以矩形或网格状阵列作为输入。因此，如何以一种与深度学习兼容的格式表示它们并不是一种直观的方法。图有多达四种类型的信息，我们可能会使用它们来进行预测:节点、边、全局上下文和连接性。前三个相对比较直观： 例如， 节点可以形成节点特征矩阵 $N$， 通过在 N 中分配每条边一个索引 $i$ 并 存储 $node_i$的特征。虽然这些矩阵的样本数量可变，但它们可以在不使用任何特殊技术的情况下进行处理。

然而，表示图的连通性要复杂得多。也许最明显的选择是使用邻接矩阵，因为它很容易 tensorisable。然而，这种表示方式有一些缺点。从示例数据集表中，我们可以看到一个图中的节点数可以达到数百万，每个节点的边数可以有很大的变化。通常，这会导致非常稀疏的邻接矩阵，这是空间低效的。

另一个问题是，有许多邻接矩阵可以编码相同的连通性，并不能保证这些不同的矩阵在深度神经网络中会产生相同的结果(也就是说，它们不是 permutation invariant 的)。


例如，前面的  Othello graph 可以用这两个邻接矩阵等价地描述。它也可以用节点的其他可能排列来描述。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652409164381.png)

下面的例子显示了每个邻接矩阵，可以描述这个4个节点的小图。这已经是大量的邻接矩阵了对于更大的例子比如 Othello，这个数字是 untenable 的。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652409273075.png)
表示稀疏矩阵的一种优雅且节省内存的方法是用邻接表。在第 k 个邻接表的 entry 中 将 在节点 $n_i$ 和 $n_j$ 之间的边 $e_k$ 的连通性表示为 tuple(i, j)。因为我们期望边的数量远小于邻接矩阵($n^2_{nodes}$) entries 的数量， 我们避免在图不连通的部分的计算和存储。

为了使这个概念具体化，我们可以看看在这个规范下如何表示不同图中的信息：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652409755427.png)

图中每个 node/edge/global 使用标量值， 但是实际中它们大都是向量或张量。相比于将节点张量的大小为 $n_{nodes}$， 我们将把节点张量的大小表示为 $(n_{nodes}, node_{dim})$。 对其他图属性一样如此。


# Graph Neural Networks

既然图的描述是 permutation invariant 的矩阵形式，我们将使用图神经网络(GNN)来描述图的预测任务。GNN是对保持图对称性(permutation invariances)的图的所有属性(节点、边、全局上下文)的 optimizable transformation。我们将使用 Gilmer 等人提出的 “message passing neural network” 来构建 GNN，使用Battaglia 等人引入的 Graph Nets architecture schematics。GNNs 采用“graph-in, graph-out”的架构，这意味着这些模型类型接受一个图作为输入，将信息加载到其节点、边和全局上下文中，并逐步转换这些嵌入，而不改变输入图的连通性。


## The simplest GNN

有了上面所构造的图的数值表示(使用向量而不是标量)，我们现在准备构建一个GNN。我们将从最简单的GNN架构开始，在这个架构中，我们学习所有图属性(节点、边、全局)的新嵌入，但我们还没有使用图的连通性。

这个 GNN 在图的每个组件上使用单独的多层感知器(MLP)(或您喜欢的可微模型); 我们称之为GNN层。对于每个节点向量，我们应用 MLP 并得到一个学习到的节点向量。我们对每条边都这样做，学习每条边的嵌入，对全局上下文向量也这样做，学习整个图的单个嵌入。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652410653048.png)

与神经网络模块或层一样，我们可以将这些GNN层堆叠在一起。

由于GNN不更新输入图的连通性，因此我们可以用与输入图相同的邻接表和相同数量的特征向量来描述GNN的输出图。但是，输出图已经更新了嵌入，因为GNN已经更新了每个节点、边和全局上下文表示。


## GNN Predictions by Pooling Information

我们已经构建了一个简单的GNN，但是如何在上面描述的任何任务中进行预测呢？

我们将考虑二分类的情况，但这个框架可以很容易地扩展到多类或回归的情况。如果任务是对节点进行二分类预测，并且图中已经包含了节点信息，那么这种方法对于每个节点嵌入很简单，应用一个线性分类器。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652411077394.png)

然而，事情并不总是那么简单。例如，图中的信息可能存储在边中，但节点中没有信息，但仍然需要对节点进行预测。我们需要一种方法从边收集信息，并将其传递给节点进行预测。我们可以通过 `pooling` 来实现。分两步 Pooling proceeds:

- 对于要 pooled 的每个项，收集它们的每个嵌入项并将它们连接到一个矩阵中。
- 然后，通常通过求和操作对收集到的嵌入进行 aggregated。

我们使用符号 $\rho$ 表示 pooling 操作，将从边收集信息到节点表示为 $\rho_{E_n \rightarrow V_n}$。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652419415417.png)

因此，如果我们只有边级的特征，并试图预测二分类节点信息，我们可以使用 pooling 将信息 route (或pass) 到它需要去的地方。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652419492761.png)

如果我们只有节点级的特征，并试图预测二分类的边级信息。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652419538464.png)

如果我们只有节点级别的特性，并且需要预测二分类的全局属性，那么我们需要收集所有可用的节点信息并将它们聚合在一起。这类似于 CNN 的全局平均池层。对于边也可以这样做。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652419811981.png)
在我们的例子中， 分类模型 $c$ 可以被任意可微的模型替换， 或者使用泛化的线性模型实现 multi-class 分类。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1652420078795.png)

现在我们已经演示了我们可以构建一个简单的 GNN 模型，并通过在图的不同部分之间 routing 信息来进行二分类预测。这种 pooling 技术将用作构建更复杂的GNN模型的构建块。如果我们有新的图属性，我们只需定义如何将信息从一个属性传递到另一个属性。

请注意，在这个最简单的GNN公式中，我们根本没有在GNN层中使用图的连通性。每个节点、每条边以及全局上下文都是独立处理的。我们只在共享信息进行预测时使用连接性。


## Passing messages between parts of the graph

我们可以通过在 GNN 层中使用 pooling 来进行更复杂的预测，以便使我们所学的嵌入能够感知图的连通性。我们可以使用消息传递来实现这一点，在消息传递中，相邻节点或边交换信息并影响彼此更新的嵌入。

消息传递分为三个步骤：

- 图中的每个节点,收集所有相邻节点嵌入(或消息)， 其实上述中的 $g$ 函数
- 通过聚合函数(如sum)聚合所有消息。
- 所有 pooled 的消息都通过一个更新函数传递，通常是一个学习过的神经网络。

正如 pooling 可以应用于节点或边一样，消息传递也可以发生在节点或边之间。

这些步骤是利用图的连接性的关键。我们将在GNN层中构建更复杂的消息传递变体，这些变体将产生更具 expressiveness 和 power 的GNN模型。

![](https://markdown.xiaoshujiang.com/img/spinner.gif "[[[1652420405118]]]" )
# Reference

1. [A Gentle Introduction to Graph Neural Networks](https://distill.pub/2021/gnn-intro/)
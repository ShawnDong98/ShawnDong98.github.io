---
layout:     post
title:      "【深度学习】Semantic Image Manipulation Using Scene Graphs"
subtitle:   ""
date:       2021-03-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616422704721.png)

Figure 1： 语义图像控制。 给定图像，我们可以预测语义场景图。用户通过对节点和边进行更改来与图形交互。然后，我们生成一个源图像的修改版本，它考虑了修改后的图中的星型图。


# Abstract

图像处理可以被认为是图像生成的特殊情况，其中要生成的图像是对现有图像的修改。在大多数情况下，图像生成和处理都是对原始像素进行操作的任务。但是，学习图像和目标表示的巨大进步 打开了 诸如 text-to-image 或者 layout-to-image 等任务的道路， 这些任务是主要由语义驱动的 。在我们的工作中，我们解决了来自场景图的图像处理的新问题，在该问题中，用户可以仅通过更改图像生成的场景图的节点或边缘来编辑图像。我们的目标是在给定的场景图中对图像信息进行编码，然后从中生成新的场景图， 例如替换物体，甚至更改物体之间的关系，同时保持原始图像的语义和风格。我们引入了一个空间语义图网络，该网络不需要直接监督场景图变化或图像编辑。这使得从现有的现实世界数据集中训练系统成为可能，而无需额外的标注工作。
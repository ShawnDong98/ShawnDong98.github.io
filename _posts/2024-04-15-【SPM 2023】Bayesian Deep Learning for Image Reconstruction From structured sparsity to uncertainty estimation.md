---
layout:     post
title:      "【SPM 2023】Bayesian Deep Learning for Image Reconstruction From structured sparsity to uncertainty estimation"
subtitle:   ""
date:      2024-04-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - SPM 2023
    - 
---

在基于模型的计算成像的常见做法将物理学成像模型、噪声特性和图像先验融入统一的贝叶斯框架中。深度学习的快速进展激发了一代新的数据驱动型计算成像系统，性能甚至超过了其基于模型的对应物。然而，基于学习的计算成像算法的设计常常缺乏透明度，使得完整优化整个成像系统变得困难。在本教程中，我们回顾了结合了基于模型和基于学习方法优势的深度学习的最新进展。通过将迭代优化展开成深度神经网络实现，我们可以为一首老民谣演奏出新的快节奏。对估计相关的不确定性进行明确估计，使我们能够构建一类新的不确定性驱动损失（UDL）函数用于深度展开网络。以超分辨率和深度成像为例，我们展示了深度神经网络与不确定性建模相结合导致所谓的“贝叶斯深度学习”（BDL）。在BDL框架下，我们实现了一种基于原则的方法，用于基于深度学习的图像重建的模型和不确定性估计。

# Introduction


计算成像中的一个关键技术是图像重建，它涉及从低质量观测中重建高质量图像。过去十年里，图像重建的快速进展已经从基于模型的方法[7]，[8]发展到基于学习的方法[6]，[27]。在基于模型的图像重建中，稀疏编码已经从早期的局部稀疏模型（例如，基于小波的）发展到结构化稀疏模型（例如，块匹配和3D滤波算法以及低秩[5]）。在基于学习的图像重建中，我们见证了基于深度卷积神经网络（DCNN）的图像去噪[28]；非局部循环网络[16]；以及最近用于即插即用图像重建的深度去噪先验[6]，[27]的影响。尽管它们具有出色的性能，但学习型方法的可解释性通常不及基于模型的方法透明。与模型与数据之间的潜在不匹配类似，基于CNN的图像重建的泛化性质仍然不太清楚。



本文的动机主要是双重的。一方面，与其通过数学构建正则化函数，不如发展数据驱动的替代模型，将包含在物理驱动模型中的领域特定知识纳入其中[1]。基于模型的深度学习架构，包括深度展开网络（DUNs）[9]和即插即用图像重建[27]，已经在各种逆问题中取得成功应用，从医学成像[11]，[21]到图像重建[6]，[27]。几种著名的凸优化算法，如迭代软阈值算法（ISTA）和交替方向乘子方法（ADMM），已经被展开成相应的神经网络实现，并具有改进的可解释性，即ISTA-net [26]和ADMM-net [22]。

另一方面，近年来，不确定性建模开始引起深度学习社区的关注[12]，如图1所示。在基于模型和基于学习的图像重建的两种范式中，不确定性通常源于训练数据不足（例如，由于成本限制）或测试数据中的异常样本（例如，由于噪声污染）。贝叶斯统计已经发展成为一个强大的框架，以原则性的方式解决与不确定性相关的问题。在贝叶斯建模中，在图像重建中需要考虑两种类型的不确定性：aleatoric 不确定性，捕捉到观察中固有的噪声；和 epistemic 不确定性，考虑到模型的不确定性，无论是通过数学构建还是由数据驱动[12]。后者在理论上至少可以通过足够的数据来解释清楚。然而，在实际情况下，有多少数据足够仍然不清楚；此外，对于回归问题类别，例如盲图像重建，由于缺乏关于未知图像或实际世界退化过程的先验信息，我们必须处理由此引起的不确定性。



首次，BDL提供了一个原则性框架，用于：1）利用丰富的正则化图像重建文献，通过深度展开构建具有更好解释性的深度网络；2）通过考虑不确定性来提高基于CNN的图像重建的性能。本教程带来的新见解总结如下：

- 我们进行了对现有的DUNs系统性的审查，以建立基于模型和基于学习的计算成像之间的桥梁。DUN为将各种稀疏模型转化为深度神经网络实现提供了统一的框架。
- 我们提出了一个新的深度不确定性感知学习（DUAL）框架，用于图像重建，能够进行不确定性建模。特别是，我们展示了如何通过不确定性建模来设计图像重建中的新型UDL函数。
- 通过将DUN与DUAL结合起来，我们提倡一种新颖的方法，通过对网络参数进行端到端的优化，开发透明的基于学习的图像重建解决方案。这种免调节属性在各种实际计算成像应用中进行任务特定的优化非常有用。

# Past: From structured sparsity to DUNs

从2000年到现在，我们可以将计算成像技术的历史发展划分为两个阶段：基于稀疏性的（2000年至2016年）和深度学习的（2012年至今）。在本节中，我们首先回顾了关于贝叶斯稀疏编码的现有工作及其在图像重建中 的应用。然后，我们讨论了一些关于基于深度学习的计算成像的最近工作。

## Model-based image reconstruction via sparse coding

我们从贝叶斯稀疏编码的公式开始。然后，我们将考虑与均值和方差相关的不确定性，分别导致 nonlocal centralized 和 simultaneous 稀疏编码的扩展。稀疏编码的核心是分解一个信号 $x \in R^n$ (n 是一个 image patch 的大小) 为基向量的线性组合 $D \alpha$, 其中 $D \in R^{n \times K}, n \leq K$ 是字典。系数 $\alpha \in R^K$ 满足一些稀疏约束， 例如， 由于 $l_0$ 优化由于其非凸性质难以计算，我们可以考虑 $l_1$ 作为替代品：

$$
\alpha = \arg \min_\alpha \|x - D \alpha \|_2^2 + \lambda \| \alpha \|_1
$$


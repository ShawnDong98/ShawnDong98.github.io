---
layout:     post
title:      "【深度学习】Super-Convergence： Very Fast Training of Neural Networks Using Large Learning Rates"
subtitle:   ""
date:       2021-11-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

这篇文章描述了一种叫做  “super-convergence” 的现象， 神经网络可以比标准的训练方法快一个数量级。super-convergence 的存在与理解深层网络为什么能很好地泛化有关。super-convergence 的关键在于有一个 learning rate cycle 以及 一个大的最大学习率。 super-convergence 训练的一个主要见解是大的学习率能够正则化训练， 因此需要减少其他形式的正则化以保持最佳正则化的平衡。我们还得到了简化的Hessian Free的优化方法，以估计最佳学习速率。 此外，，当标记的训练数据数量有限时，super-convergence 相对于标准训练提供了更大的性能提升。


# Super-convergence

这篇工作中， 使用 cyclical learning rates(CLR) 和  learning rate range test(LR range test)。 要使用CLR，需要指定最小和最大学习速率以及步长。之前的方法使用线性改变学习率 以及 离散跳跃改变学习率 的方式。 CLR的思想背后是结合了 curriculum learning 和  simulated annealing， 它们在深度学习中有很长的历史。 

LR range test  可以用来决定  super-convergence 在网络结构中是否可行。在  LR range test  中， 训练从零开始或者从非常小的学习率开始， 缓慢线性增加。这提供了关于在一定的学习速率范围内如何训练网络的信息。 图2a 展示了 LR range test 中的典型曲线， 其中测试准确率有一个明显的尖峰。 当从小的学习率开始时， 网络开始收敛， 学习率增大时， 它最终变得过大导致训练/测试准确率下降。在这个峰值处的学习速率是CLR使用时最大的学习速率边界。最小的学习率可以通过将最大学习率除以以3和4为系数来选择。

# Conclusion

我们为一个之前未知的现象提出了 empirical evidence， 称之为 super-convergence。 在 super-convergence 中， 与使用分段常数训练机制相比， 网络的学习速度更快， 迭代次数更少，最终测试精度更高。 特别地，当可用的有标签训练数据变得更加有限时， super-convergence 的收益更大。此外，本文描述了一种简化的Hessian-free优化方法，用来估计学习速率。我们证明了 super-convergence 在各种数据集和网络结构中是有效的，只要通过减少其他形式的正则化来平衡大学习速率的正则化效应。

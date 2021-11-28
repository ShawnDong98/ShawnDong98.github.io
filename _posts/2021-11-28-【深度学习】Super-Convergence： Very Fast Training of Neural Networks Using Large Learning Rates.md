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


# Conclusion

我们为一个之前未知的现象提出了 empirical evidence， 称之为 super-convergence。 

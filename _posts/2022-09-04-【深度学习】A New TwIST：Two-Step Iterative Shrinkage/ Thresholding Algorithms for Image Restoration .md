---
layout:     post
title:      "【深度学习】A New TwIST: Two-Step Iterative Shrinkage/ Thresholding Algorithms for Image Restoration "
subtitle:   ""
date:       2022-09-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - TIP 2007
---


# Abstract
在图像复原和其他线性逆问题中，Iterative shrinkage/thresholding(IST) 算法被提出用于处理一类无约束凸优化问题。

这类问题是将 linear observation 模型与 nonquadratic regularizer(如 total variation 或 wavelet-base 的正则化)相结合的结果。

这些IST算法的收敛速度很大程度上依赖于 linear observation operator，当该 operator 是 ill-conditioned 或 ill-posed，收敛速度会变得非常慢。

这篇文章引入了 two-step IST (TwIST)算法，对于 ill-conditioned 问题，其收敛速度比IST快得多。

对于一大类 nonquadratic convex regularizers( $\ell^p$ 范数，一些Besov范数，和 total variation)，作者表明TwIST收敛到目标函数的最小化，对于给定的参数值范围。

对于 noninvertible 的 observation operator，作者引入了monotontic 版本的 TwIST (MTwIST);虽然收敛证明不适用于这种情况，但给出的实验证据表明，MTwIST表现出与IST相似的速度增益。

实验验证了新方法在图像 deconvolution 和缺失样本恢复问题上的有效性。


# Conclusion

这篇文章引入了一类新的迭代方法，称为TwIST， 其有 two-step iterative shrinkage/thresholding(TwIST) 算法的形式。更新方程依赖于之前的两个估计(因此是 two-step)，而不是仅仅依赖于前一个。该方法包含并拓展了最近引入的 iterative shrinkage/thresholding(IST) 方法。

作者证明了TwIST收敛到目标函数的最小值(在一定的算法参数范围内)，并导出了收敛因子作为定义算法参数的函数的边界。实验结果(wavelet-based 和 TV-based 的 deconvolution)表明，TwIST实际上可以调整到比原始IST更快的收敛速度，特别是在严重的病态问题中，在典型的去模糊问题中，速度可以达到两个数量级。作者还引入了MTwIST, TwIST的monotonic变体，用于 noninvertible 的 observation operators; 利用该方法对缺失样本的图像恢复问题进行了研究。
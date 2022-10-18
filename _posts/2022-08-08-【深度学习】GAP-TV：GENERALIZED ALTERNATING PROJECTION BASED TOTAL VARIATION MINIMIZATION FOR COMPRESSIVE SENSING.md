---
layout:     post
title:      "【深度学习】GAP-TV：GENERALIZED ALTERNATING PROJECTION BASED TOTAL VARIATION MINIMIZATION FOR COMPRESSIVE SENSING"
subtitle:   ""
date:       2022-08-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ICIP 2016
---

# Abstract

这篇文章考虑压缩感知的 total variation(TV)最小化问题，并采用 generalized alternating projection(GAP)算法进行求解。

大量的结果表明，提出的算法在压缩感知方面的高性能，包括二维图像、高光谱图像和视频。

在CACTI和CASSI框架下，作者进一步推导了基于TV最小化的Alternating Direction Method of Multipliers(ADMM)框架，用于视频和高光谱图像压缩感知。

提供了 GAP 和 ADMM 之间的联系。


# Introduction

最初在[1]中提出的 generalized alternating projection(GAP)算法，在二维(2D)图像[1 5]、高光谱图像[6,7]、视频[8 15]、深度图像[16 18]和偏振图像[19]等多种压缩感知(CS)问题上表现出了出色的性能。

然而，以上所有的论证，包括实际的系统应用，都利用GAP来解决变换域的压缩感知问题, 即小波或DCT(离散余弦变换)域。

GAP 被用来解决以下问题：

$$
\min_w \|w\|_{l_{2, 1}^{\mathcal{G} \beta}} \quad \text{subject to} \quad \Phi x = y \quad (\text{with } x = Tw) \tag{1}
$$

其中 $T$ 是变换矩阵， 如果变换对每个维度执行， 那么其是不同 base 的 Kronecker product。 

$y$ 是 measurement， $\Phi$ 是 sensing matrix, $x$ 是想要的信号， $w$ 是变换域中对应的系数。

$|·|_{l_{2, 1}^{\mathcal{G}, \beta}}$ 表示加权组 $l_{2, 1}$  范数， 定义为：

$$
\|w\|_{l_{2, 1}^{\mathcal{G, \beta}}} = \sum_{k=1}^K \beta_k \|w_{\mathcal{G}_k}\|_2
$$

$\|·\|_2$ 表示 $l_2$ 范数。$w_{\mathcal{G}_k}$ 是 $w$  包含的一个子向量， 其由 $\mathcal{G}_k$ 索引， $\beta_k$ 表示该组的权重。

尽管已经取得了巨大的成功，但要找到一个好的变换 T 来施加在数据上并不总是那么容易。此外，这种转换需要一些计算时间，组和权值的选择对结果有显著影响


另一方面，基于 total variation (TV)的算法在各种CS问题上表现出了良好的性能。 其求解以下问题：

$$
\min_x \| TV(x) \| \quad \text{subject to} \quad \Phi x = y \tag{2}
$$

其中 $\| TV(x) \|$ 表示 TV 范数。问题是能否使用 GAP 解决 TV 最小化问题？这篇文章提出一种新的使用 GAP 求解 (2) 的算法。

# Conclusion

这篇文章提出了基于 generalized alternating projection 的压缩感知 total variation 最小化算法。


在图像、视频和高光谱图像的压缩感知方面取得了良好的结果。
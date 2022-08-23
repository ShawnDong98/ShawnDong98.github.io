---
layout:     post
title:      "【机器学习】Convexity I: Sets and Functions"
subtitle:   ""
date:       2022-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 凸优化
---

凸优化问题是以下形式：

$$
\min_{x \in D} f(x) \quad \text{subject to} \quad g_i(x) \leq 0, i = 1, ..., m \quad h_j(x) = 0, j=1, ..., r
$$

其中 $f$ 和 $g_i, i =1, ..., m$ 都是凸的， $h_j, j=1, ..., r$ 是 affine。 

特殊的性质： 任意局部最小值都是全局最小值。
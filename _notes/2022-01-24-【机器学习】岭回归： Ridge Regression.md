---
layout:     post
title:      "【机器学习】岭回归： Ridge Regression"
subtitle:   ""
date:       2022-01-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 
    - 
---

# What is Ridge Regression?

Ridge regression 是一种使用分析遭受 multicollinearity 的数据的模型调整方法。 该方法使用 L2 正则化。 当 multicollinearity 的问题发生时， 最小二乘是无偏的， 方差很大， 导致预测值与实际值相差很远。

rige regression 的 cost function 为：

$$
\min (\|Y - X(\theta) \|^2 + \lambda \| \theta \|^2)
$$
$\lambda$ 是惩罚项。 在 ridge function 中 $\lambda$ 表示为一个 alpha 参数。 因此， 我们可以通过改变 alpha 的值 来控制惩罚项。 alpha值越高，惩罚越大，因此权重的规模就会减少。
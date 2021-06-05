---
layout:     post
title:      "【d2l】Linear Regression"
subtitle:   ""
date:       2021-06-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


# Linear Regression

## Basic Elements of Linear Regression


#### Linear Model

线性假设只是说目标(价格)可以表示为特征(面积和年龄)的加权和

$$
\text{price} = w_{area} · area + w_{age} · age + b \tag{3.1.1}
$$

在(3.1.1)中， $w_{area}$ 和 $w_{age}$被叫做weight， $b$ 被叫做 bias（也被叫做 offset 或者 intercept）。 weight 决定了每个特征对我们的预测的影响，而 bias 只是说，当所有特征取值为0时，预测价格应该取什么值。即使我们永远不会看到任何零面积的房子，或者恰好是零年代的房子，我们仍然需要 bias ，否则我们将限制我们的模型的表达能力。严格地说，(3.1.1)是输入特征的仿射变换，其特征是通过加权和对特征进行线性变换，再结合通过附加偏差进行平移。


给定一个数据集，我们的目标是选择权重 $w$ 和偏差 $b$，以便平均而言，根据我们的模型做出的预测最适合数据中观察到的真实价格。



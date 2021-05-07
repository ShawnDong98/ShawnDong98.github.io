---
layout:     post
title:      "【深度学习】Attention总结"
subtitle:   ""
date:       2021-05-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - NLP
---




# 无参注意力

n_train = 50
n_test = 50

x_train, _ = torch.sort(torch.rand(n_train) * 5)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1620363453991.png)


x_test = torch.arange(0, 5, 0.1)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1620363492506.png)


y_train = f(x_train) + torch.normal(0.0, 0.5, (n_train,))

y_truth = f(x_test)

x_repeat = x_test.repeat_interleave(n_train).reshape((-1, n_train))

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1620363514569.png)

每一个test样本按行广播为train的形状，作为query。

Q：x_repeat: (n_test, n_train)

K：x_train: (n_train)

V： y_train: (n_train)

Attention Weight: (n_train, n_train)


# 有参注意力

## Nadaraya-Watson Kernel Regression


## Additive Attention


## Scaled Dot-Product Attention


## Self-Attention(Bahdanau Attention)

## Multi-Head Attention
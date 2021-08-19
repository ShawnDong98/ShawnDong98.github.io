---
layout:     post
title:      "【d2l】Optimization and Deep Learning"
subtitle:   ""
date:       2021-08-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
---


在本节中，我们将讨论优化和深度学习之间的关系，以及在深度学习中优化的挑战。对于深度学习问题，我们通常会先定义一个 **损失函数**。一旦我们有了损失函数，我们就可以使用优化算法来尝试最小化损失。在优化中，损失函数常被称为优化问题的目标函数。根据传统和惯例，大多数优化算法都是关于 **最小化** 的。如果我们需要最大化一个目标，有一个简单的解决方案: 翻转目标函数的符号。
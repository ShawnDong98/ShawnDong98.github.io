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

这篇文章描述了一种叫做  “super-convergence” 的现象， 神经网络可以比标准的训练方法快一个数量级。super-convergence 的存在与理解深层网络为什么能很好地泛化有关。super-convergence 的关键在于有一个 learning rate cycle 以及 一个大的最大学习率。 
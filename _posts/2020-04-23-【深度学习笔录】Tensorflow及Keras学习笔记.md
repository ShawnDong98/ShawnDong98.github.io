---
layout:     post
title:      "【深度学习笔录】Tensorflow及Keras学习笔记"
subtitle:   ""
date:       2020-04-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Tensorflow
    - Keras
---


# Keras

## K.function

> keras.backend.function(inputs, outputs, updates=None)

实例化 Keras 函数。

**参数**

- inputs: 占位符张量列表。
- outputs: 输出张量列表。
- updates: 更新操作列表。
- \*\*kwargs: 需要传递给 tf.Session.run 的参数。


**返回**

输出值为 Numpy 数组。

**异常**

- ValueError: 如果无效的 kwargs 被传入。

# Tensorflow


# Reference
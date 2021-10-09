---
layout:     post
title:      "【Geek之路】Python数据可视化"
subtitle:   ""
date:       2021-10-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - Python
---

# 使用函数绘制 matplotlib 的图表组成元素

## 绘制 matplotlib 图表组成元素的主要函数


在一个图形输出窗口中， 底层是一个 `Figure` 实例， 我们通常称之为画布， 包含一些可见和不可见的元素。

在画布上的图形就是 `Axes` 实例， `Axes` 实例几乎包含了我们要介绍的 matplotlib 的所有组成元素， 例如坐标轴、刻度、标签、线和标记等。 `Axes` 实例有 x 轴和 y轴属性， 可以用 `Axes.xaxis` 和 `Axes.yaxis` 来控制 x 轴 和 y 轴的相关组成元素， 例如刻度线、刻度标签、刻度线定位器和刻度标签格式器。


通过调用 `matploblib.pyplot` 模块的API中的函数， 我们可以快速绘制这些组成元素， 例如 `matplotlib.pyplot.xlim()` 和 `matplotlib.pyplot.ylim()` 控制 x 轴和 y 轴的数值显示范围。 
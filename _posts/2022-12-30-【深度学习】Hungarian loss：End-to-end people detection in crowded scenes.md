---
layout:     post
title:      "【深度学习】Hungarian loss：End-to-end people detection in crowded scenes"
subtitle:   ""
date:       2022-12-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Detection
    - CVPR 2015
---

# Abstract

当前的人类检测器要么以滑动窗口方式扫描图像，要么对一组离散的提议进行分类。

作者提出了一个基于将图像解码为一组人检测的模型。

该系统以图像为输入，并直接输出一组不同的检测假设。

由于一起生成预测，因此不需要常见的后处理步骤，如非极大值抑制。

作者使用循环LSTM层进行序列生成，并使用新的损失函数端到端训练模型，该函数对一组检测进行操作。

作者展示了在人群场景中检测人这一具有挑战性任务中方法的有效性。


# Model

## Overview

深卷积架构，如[11，17]构建对各种任务有效的图像表征。这些架构被用于检测，尽管主要是通过将它们调整为分类或回归框架。


# Conclusion


---
layout:     post
title:      "【深度学习】Unbiased Scene Graph Generation from Biased Training"
subtitle:   ""
date:       2022-02-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Abstract

今天的场景图生成(SGG)任务离实际应用仍然有很远的距离， 主要是由于严重的训练偏差， 比如将多样性的 human walk on/sit on / lay on beach 变为 human on beach。

在这样的场景图生成(SGG)中， 如VQA这样的下游任务除了能预测出一堆目标外， 很难推理出更好的场景结构。

然而， 去除 SGG 中的偏差并不容易， 因为传统的去除偏差的方法并不能分辨好的偏差和坏的偏差， 比如好的上下文先验(person read book 而不是 eat)。
# Conclusion


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

然而， 去除 SGG 中的偏差并不容易， 因为传统的去除偏差的方法并不能分辨好的偏差和坏的偏差， 比如好的上下文先验(person read book 而不是 eat)。 此外还存在不好的长尾分布偏差， 比如 near 远比 behind/in front of 显著。

这篇文章提出一种基于因果推理而不是传统似然的 SGG 框架。首先为SGG创建一个因果图， 然后对图执行传统的有偏差的训练。然后从训练后的图中提取反事实的因果关系，从坏的偏差中推断出应该被删除影响。

特别地， 将 Total Direct Effect 作为所提出无偏 SGG的最终预测分数。

所提出的框架与任何SGG模型无关， 因此其可以被广泛应用于无偏预测中。
# Conclusion
这篇文章提出一种用于无偏SGG的通用框架, 这是第一个解决SGG中严重的偏差问题的工作。

利用反事实因果关系的力量，我们可以从良好的上下文偏差中去除有害的偏差，这是传统的去偏差方法如数据增强和无偏学习难以识别的。

在因果图的帮助下，我们通过计算Total Direct Effect(TDE)来实现无偏性，因果图是训练所有SGG模型的路线图。

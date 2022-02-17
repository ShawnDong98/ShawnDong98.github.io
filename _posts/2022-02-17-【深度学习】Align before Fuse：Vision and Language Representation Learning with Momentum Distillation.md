---
layout:     post
title:      "【深度学习】Align before Fuse: Vision and Language Representation Learning with Momentum Distillation"
subtitle:   ""
date:       2022-02-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
大规模视觉语言表征学习基于 Transformer 模型取得了极大进展。但是由于 visual token 和 word token 没有对齐， 多模态编码器学习图像-文本交互仍然具有挑战性。

这篇文章引入一种对比损失在融合之前通过跨模态注意力对齐图像和文本表征。

为了从网络上的噪声数据中学习， 这篇文章提出动量蒸馏的自训练方法， 其可以学习一个动量模型产生的伪标签。

这篇文章从互信息最大角度提供了 ALBEF 的理论分析， 表明不同的训练任务可以解释为生成图像-文本对视图的不同方式。
# Conclusion

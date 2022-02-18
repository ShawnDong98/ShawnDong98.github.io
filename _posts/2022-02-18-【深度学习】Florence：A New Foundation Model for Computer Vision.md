---
layout:     post
title:      "【深度学习】Florence: A New Foundation Model for Computer Vision"
subtitle:   ""
date:       2022-02-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

CLIP, ALIGN, 和 Wu Dao 主要将图像和文本表征映射到跨模态表征空间， 这篇文章引入一个新的计算机视觉基础模型 Florence， 将表征拓展到由粗到细(Scene -> Object)， 从静态到多模态 (images -> videos)， 从 RGB  到 多种模态 (caption, depth)。

通过整合来自互联网规模图像文本数据的视觉-语言表征， Florence 模型能够用于各种计算机视觉任务上。

Florence 在多种迁移学习任务上有出色的表现： 全采样微调， linear probing, few-shot transfer 和 ，zero-shot transfer。
# Conclusion

这篇文章开发了一种计算机视觉基础模型的新范式Florence。

此次尝试是迈向建立 XYZ-code 的一步， XYZ-code 是集成AI系统，迈向 human-like AI。

模型大小比现有的其他模型规模小， 其仍成功拓展到不同的任务中并且取得了新的 SOTA.
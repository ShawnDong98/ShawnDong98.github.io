---
layout:     post
title:      "【深度学习】Consistency Models"
subtitle:   ""
date:       2023-06-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
---

# Abstract

扩散模型在图像、音频和视频生成方面取得了重大突破，但它们依赖于迭代生成过程导致采样速度缓慢并限制其实时应用的潜力。

为了克服这一局限性，我们提出了一致性模型，这是一个新的生成模型家族，可以在没有对抗性训练的情况下实现高样本质量。

它们通过设计支持快速一步生成，同时仍然允许几步采样来权衡计算和样本质量。

他们还支持零样本编辑，如图像绘制、着色和超分辨率，而无需对这些任务进行明确训练。
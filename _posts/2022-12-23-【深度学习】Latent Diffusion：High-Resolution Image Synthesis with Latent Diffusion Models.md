---
layout:     post
title:      "【深度学习】Stable Diffusion：High-Resolution Image Synthesis with Latent Diffusion Models"
subtitle:   ""
date:       2022-12-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Diffusion
    - CVPR 2023
---

# Abstract

通过将图像形成过程分解为去噪自编码器的顺序应用，扩散模型（DM）在图像数据和其他方面实现了最先进的合成结果。

此外，它们的公式允许用于无需再训练即可控制图像生成过程的引导机制。

然而，由于这些模型通常直接在像素空间中运行，因此强大的DM的优化通常会消耗数百个GPU天，并且由于顺序评估，推理成本很高。

为了在有限的计算资源上进行DM训练，同时保持其质量和灵活性，我们将它们应用于强大的预训练自编码器的隐空间。


# Methods

# Conclusion
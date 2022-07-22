---
layout:     post
title:      "【深度学习】Focal Frequency Loss for Image Reconstruction and Synthesis "
subtitle:   ""
date:       2022-07-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - ICCV 2021
---

# Abstract

由于生成模型的发展，图像重建和合成取得了显著的进展。

然而，真实图像和生成的图像之间仍然存在差距，尤其是在频域。

这项研究表明，在频域缩小差距可以改善图像重建和合成质量进一步。

这篇文章提出了一种新的 focal frequency loss，它允许模型通过降低容易合成的频率分量来自适应聚焦于难以合成的频率分量。

该目标函数是现有空间损失的补充，提供了很大的 impedance，以防止重要的频率信息的损失，由于神经网络的固有偏置。

作者展示了 focal frequency loss 的通用性和有效性，以在感知质量和量化性能方面改进流行的模型，如VAE, pix2pix和SPADE。

作者在StyleGAN2上进一步展示了它的潜力。

# Conclusion

这篇文章提出的 focal frequency loss 直接优化了频域图像重建和生成方法。

该损失自适应地将模型集中在难以处理的频率分量上，以改善质量。

这种损失与不同类别、网络结构和任务的不同基线的现有空间损失是互补的，优于相关方法。

作者进一步展示了 focal frequency loss 改善 StyleGAN2 生成结果的潜力。

探索其他应用和设计更好的频域优化策略可能是未来有趣的工作。
---
layout:     post
title:      "【深度学习】SRDiff: Single Image Super-Resolution with Diffusion Probabilistic Models"
subtitle:   ""
date:       2022-06-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
单图像超分辨率(SISR)是将给定的低分辨率(LR)图像重建为高分辨率(HR)图像，这是一个病态问题，因为一个LR图像对应多个HR图像。

近年来，基于学习的SISR方法的性能大大超过了传统的方法，但面向PSNR的方法、GAN驱动的方法和基于Flow的方法分别存在过平滑、模式崩溃或模型占用过大的问题。

为了解决这些问题，这篇文章提出了一种新的单图像超分辨扩散概率模型(SRDiff)，这是第一个基于扩散模型的单图像超分辨模型。

SRDiff 通过数据似然的变分边界的变化进行优化，通过马尔可夫链将高斯噪声逐渐转化为以LR输入为条件的超分辨率(SR)图像，从而提供多样化和真实的SR预测。

此外，在整个框架中引入残差预测，以加快收敛速度。

在面部和通用基准测试(CelebA和DIV2K数据集)上的广泛实验表明:

1)SRDiff可以在只提供一个LR输入的情况下，生成具有丰富细节和最先进性能的多样化SR结果 

2) SRDiff易于训练

3） SRDiff可以进行灵活的图像处理，包括潜在空间插值和内容融合。
# Conclusion

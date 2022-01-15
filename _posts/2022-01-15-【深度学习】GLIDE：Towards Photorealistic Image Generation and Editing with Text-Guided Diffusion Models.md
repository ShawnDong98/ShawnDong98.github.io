---
layout:     post
title:      "【深度学习】GLIDE: Towards Photorealistic Image Generation and Editing with Text-Guided Diffusion Models"
subtitle:   ""
date:      2022-01-15 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

扩散模型最近被证明可以生成高质量的合成图像，特别是当与一种指导技术相结合时，可以平衡多样性和保真度。

探索了CLIP引导和无分类器引导的两种基于文本条件的图像合成。

我们发现，后者更受人类评估者的青睐，因为它既具有真实感，又具有描述相似度，而且常常产生逼真的样本。

使用无分类器引导的具有35亿参数的以文本为条件的扩散模型 比 需要CLIP重排序的DALL-E 更受人们喜爱。

我们发现模型支持微调， 可以用于 image inpainting， 赋能强大的文本驱动的图像编辑。


# Safety Considerations 

我们的模型有能力产生假的但是看起来很真实的图像，并允许不熟练的用户快速地对现有的图像进行令人信服的编辑。因此，在没有保护措施的情况下发布我们的模型将大大降低制造假信息或 Deepfake 的门槛。

# Limitations 

虽然我们的模型通常可以以复杂的方式组合完全不同的概念，但有时它无法捕获描述非常不寻常的对象或场景的某些提示。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1642230806838.png)

我们的未优化模型在单个A100 GPU上采样一个图像需要15秒。这比相关GAN方法的采样要慢得多，后者在单个前向通道中生成图像，因此更适合用于实时应用。
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


# 
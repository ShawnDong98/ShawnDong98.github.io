---
layout:     post
title:      "【深度学习 In-Domain GAN Inversion for Real Image Editing "
for Real Image Editing】"
subtitle:   ""
date:     2021-03-20  
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---


# Abstract

最近的工作表明，在训练合成图像时，生成对抗网络（GAN）的潜在空间中会出现各种语义。但是，很难将这些学习到的语义用于真实图像编辑。一个常见的做法是将真实图像送到训练好的GAN生成器将其转换回隐编码。但是， 现有的反演方法通常专注与像素值重建， 没能将反演编码放在原始隐空间的语义域中。 结果， 重构的图像不能通过改变反演编码很好地支持语义编辑。为了解决这个问题，我们提出了一种域内GAN反演方法，该方法不仅可以重建输入图像，还可以确保反演的编码在语义上对编辑有意义。 我们首先学习一种新的 domain-guided 编码器，将给定图像投影到GAN的本地隐空间中。然后， 我们提出 domain-regularized 优化 通过将编码器作为正则化器来微调编码器产生的编码 并 更好地恢复目标图像。 

# Motivation


# Net Structure

# Performance


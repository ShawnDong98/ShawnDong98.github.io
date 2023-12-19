---
layout:     post
title:      "【CVPR 2023】All are Worth Words: A ViT Backbone for Diffusion Models"
subtitle:   ""
date:      2023-12-19 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPR 2023
    - 深度学习
---

# Abstract

Vision transformer （ViT）在各种视觉任务中显示出了潜力，而基于卷积神经网络（CNN）的U-Net在扩散模型中仍然占据主导地位。

我们设计了一种简单且通用的基于ViT的架构（命名为U-ViT）用于扩散模型的图像生成。

U-ViT的特点是将所有输入，包括时间、条件和噪声图像块，都视为 token，并在浅层和深层之间使用长跳跃连接。

我们在无条件和类条件图像生成以及文本到图像生成任务中评估了U-ViT，其中U-ViT在性能上与同等规模的基于CNN的U-Net相当，如果不是更优。

特别是，搭载U-ViT的隐扩散模型在ImageNet 256×256的类条件图像生成上取得了创纪录的FID得分2.29，在MS-COCO的文本到图像生成上得分为5.48，这些成绩在不访问大型外部数据集进行生成模型训练的方法中是最高的。

我们的结果表明，对于基于扩散的图像建模，长跳跃连接至关重要，而CNN基础的U-Net中的下采样和上采样操作并不总是必要的。我们相信，U-ViT可以为未来关于扩散模型中骨干网络的研究提供洞见，并有助于在大规模跨模态数据集上进行生成建模。


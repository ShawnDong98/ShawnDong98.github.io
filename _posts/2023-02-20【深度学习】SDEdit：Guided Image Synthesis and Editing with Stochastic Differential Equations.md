---
layout:     post
title:      "【深度学习】SDEdit：Guided Image Synthesis and Editing with Stochastic Differential Equations"
subtitle:   ""
date:       2023-02-20
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion 
    -  ICLR 2022
---

# Abstract

引导式图像合成使日常用户能够以最小的努力创建和编辑逼真的照片图像。

关键的挑战是平衡对用户输入（例如手绘彩色笔画）的忠实性和合成图像的真实性。

现有的基于GAN的方法试图使用条件GAN或GAN反转来实现这种平衡，这些反转具有挑战性，通常需要额外的训练数据或单个应用的损失函数。

为了解决这些问题，我们引入了一种新的图像合成和编辑方法，随机微分编辑（SDEdit），基于扩散模型生成先验，该方法通过随机微分方程（SDE）迭代去噪来合成逼真图像。

给定以 操作RGB像素的形式 带有用户指南的输入图像，SDEdit 首先为输入添加噪声，然后通过 SDE 对生成的图像进行去噪，然后再提高其真实性。

SDEdit不需要特定任务的训练或反转，自然可以在保真度和忠实度之间实现平衡。

根据一项人类感知研究，在多项任务（包括基于笔画的图像合成和编辑以及图像合成）上，SDEdit在保真度方面比最先进的GAN方法优于98.09%，总体满意度得分为91.72%。


# Guided Image Synthesis and Editing with SDEdit 
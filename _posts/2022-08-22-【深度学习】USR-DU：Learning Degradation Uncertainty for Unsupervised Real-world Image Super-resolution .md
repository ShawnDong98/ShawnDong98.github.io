---
layout:     post
title:      "【深度学习】USR-DU：Learning Degradation Uncertainty for Unsupervised Real-world Image Super-resolution "
subtitle:   ""
date:       2022-08-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - IJCAI 2022
---

# Abstract

获取成对的高分辨率(HR)图像获取退化图像往往具有挑战性，阻碍了图像超分辨率在实际应用中的发展。

通过生成逼真的低分辨率(LR)图像，使其退化程度与现实场景类似，可以构建模拟的成对LR- HR数据进行监督训练。

然而，现有的研究大多忽略了生成的真实LR图像的退化不确定性，因为给定一张HR图像只生成一张LR图像。

为了解决这一弱点，作者提出学习生成的LR图像的退化不确定性，并从学习到的LR图像(均值)和退化不确定性(方差)中采样多个LR图像，并构建 LR-HR 对来训练超分辨率(SR)网络。

具体来说，不确定性可以通过最小化所提出的基于Kullback-Leibler (KL)散度的损失来学习。

此外，特征域的不确定性被利用为一种新的感知损失;并提出利用梯度信息计算SR阶段的对抗损失，以获得稳定的训练性能和较好的视觉质量。

在现实世界流行的数据集上的实验结果表明，所提出的方法比其他无监督方法性能更好。
# Conclusion


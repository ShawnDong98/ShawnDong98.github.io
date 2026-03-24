---
layout:     post
title:      "【深度学习】ArcFace: Additive Angular Margin Loss for Deep Face Recognition"
subtitle:   ""
date:       2022-03-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract
使用深度卷积神经网络(DCNNs)进行大规模人脸识别的特征学习的主要挑战之一是设计适当的损失函数来增强识别能力。

center loss 在欧几里德空间中体现了深层特征与其相应的类中心之间的距离，以实现类内的紧凑性。

SphereFace 假设最后一个全连接层的线性变换矩阵可以用来作为一个角度空间的类中心表征， 并且惩罚深度特征和他们对应权重的角度。

最近，一个流行的研究方向是将 margin 纳入已经确立的损失函数中，以最大限度地提高人脸类别的可分性。

这篇文章提出一种 Additive Angular Margin Loss(ArcFace) 来得到人脸识别的高判别特征。

由于可以在超平面上提取对应的几何距离， 因此 ArcFace 具有清晰的几何解释。

ArcFace始终优于最先进的技术，并且可以轻松地实现，而计算开销可以忽略不计。
# Conclusion
这篇文章提出了一种 Additive Angular Margin 损失函数， 有效地增强通过DCNN学习用于人脸识别能力的特征嵌入。

大量的综合性实验表明该方法为 SOTA.

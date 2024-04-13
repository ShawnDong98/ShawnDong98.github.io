---
layout:     post
title:      "【TIP 2024】DGSAN：Hyperspectral Compressive Snapshot Reconstruction via Coupled Low-Rank Subspace Representation and Self-Supervised Deep Network"
subtitle:   ""
date:      2024-04-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TIP 2024
    - 
---

# Abstract

编码孔径快照光谱成像（CASSI）是捕获三维高光谱图像（HSI）的重要技术，涉及从其对应的编码二维测量中重建三维HSI的逆问题。

现有的基于模型和基于学习的方法要么无法探索不同 HSI 的隐含特征，要么需要大量配对数据进行训练，导致重建精度低或泛化性能差以及可解释性不足。

为了弥补这些不足，本文提出了一种新的HSI重建方法，通过模型驱动的低秩子空间表示的公式，利用HSI本身的全局光谱相关性，并通过数据驱动的自监督深度学习方案学习深度先验。

具体来说，我们首先开发了一个模型驱动的低秩子空间表示，将HSI分解为正交基和空间表示系数的乘积，然后提出了一个数据驱动的深度引导空间注意力网络（称为DGSAN），通过学习深度系数先验（DCP）自适应地重建HSI的隐含空间特征，并最终通过自监督训练的方式将这些隐含先验嵌入到迭代优化框架中，而无需任何训练数据。

因此，所提出的方法将提高重建精度、泛化能力和可解释性。在几个数据集和成像系统上进行了大量实验证实了我们方法的优越性。





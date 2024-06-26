---
layout:     post
title:      "【TGRS 2023】Learning Degradation-Aware Deep Prior for Hyperspectral Image Reconstruction"
subtitle:   ""
date:      2024-04-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - TGRS 2023
    - 
---

# Abstract

从二维快照测量中重建三维高光谱图像（HSI）是光谱快照压缩成像（SCI）中的关键任务。

传统的基于模型的 HSI 重建方法依赖于手工制定的先验知识。

最近，深度展开网络（DUNs）使用卷积神经网络（CNNs）学习先验知识，并取得了令人满意的结果。

大多数 DUNs 假设 SCI 的退化是已知的。然而，由于真实成像过程中存在相位畸变和失真问题，理想和实际的退化模式之间存在一定差距，这可能会阻碍准确的 HSI 重建。

在本研究中，我们提出了一种退化感知深度先验学习网络（D$^2$PL-Net），它试图在 HSI 重建过程中自适应地学习实际的退化矩阵，从而弥合理想和实际退化之间的差距。

具体而言，我们首先提出了一个联合变分压缩重建模型，可以明确地解决潜在 HSI 和未知的退化。

通过将解展开为深度网络，构建了 D$^2$PL-Net，主要由两部分组成，即退化矩阵学习（DML）机制和每个阶段的退化引导光谱-空间变换器（DSST）。

前者学习近似真实的退化；后者代表了潜在 HSI 的深度先验，它可以在学习到的退化的指导下利用 HSI 的光谱和空间上的长程依赖性，然后重建 HSI。

为了确保 D$^2$PL-Net 的有效训练，我们提出了一个联合损失函数，约束了 HSI 重建误差、退化保真度和退化一致性。

在模拟和真实数据集上的实验表明，所提出的方法与最先进的方法相比具有竞争力。

# Abstract

尽管现有的 DUNs 表现令人鼓舞，但在 HSI 重建方面仍面临挑战。

一方面，HSI 重建取决于对退化的准确估计，而不准确的退化会妨碍 HSI 重建的改善。然而，在此之前，对于退化的估计并未得到彻底的研究。大多数 DUNs 简单地将退化视为一个理想的、预先已知的参数，即 SCI 中的一个二值矩阵。事实上，在真实的成像过程中存在相位畸变和失真，这些无法反映在理想的二值退化矩阵中。实际和理想的退化之间存在一定差距。我们需要自适应地学习退化，以避免不愉快的误差。

另一方面，高效的 HSI 重建仍然是一个待解决的问题。学习空间-光谱相关性对于重建 HSI 至关重要。HSI 在空间和光谱领域都具有长程依赖性，应该充分利用这些特性来进行 HSI 重建。此外，HSI 重建与 SCI 中的退化密切相关，应该利用这种关系来指导 HSI 重建。


为解决这些问题，我们提出了一种退化感知深度先验学习网络（D$^2$PL-Net），以共同学习退化并重建 HSI。具体而言，我们提出并解决了一个联合变分压缩重建模型。通过将解展开为一个深度网络，构建了 D$^2$PL-Net，每个阶段由两部分组成，即退化矩阵学习（DML）机制和退化引导的光谱-空间 Transformer（DSST）。DML 学习实际的退化，以弥合理想和实际退化之间的差距。DSST 利用学到的退化重建 HSI。它在退化引导学习（DL）的指导下捕捉 HSI 的光谱和空间长程依赖性，进一步提高了重建图像的质量。此外，我们提出了一个联合损失函数来约束 HSI 重建误差、退化保真度和退化一致性，以确保有效训练 D2PL-Net。

1）为了弥合 SCI 系统中真实和理想退化之间的差距，我们提出了在联合变分压缩重建模型中学习退化和深度先验以进行 HSI 重建。通过优化这个模型，可以明确地求解退化和潜在 HSI。D$^2$PL-Net 是通过将解展开为网络构建的，网络可以推断出退化和潜在 HSI。

2）我们还提出了 DSST 来学习 HSI 重建的深度先验。在 DSST 中，受退化模式的指导，学习了空间和光谱自注意力。与现有的 Transformer 相比，DL 可以指导捕捉 HSI 中的长程依赖性，这将有利于 HSI 重建，因为它更加强调了编码孔径的“黑”像素。

3）为了确保 D$^2$PL-Net 的有效训练，我们提出了一个由多个损失组成的联合损失函数，用于衡量 HSI 重建误差、退化保真度和退化一致性。这些损失使得能够有效学习退化并重建 HSI，实验证明了这一点。


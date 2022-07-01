---
layout:     post
title:      "【深度学习】Recurrent Neural Networks for Snapshot Compressive Imaging "
subtitle:   ""
date:       2022-07-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - TPAMI 2022
---

# Abstract
传统的高速光谱成像系统造价昂贵，通常需要消耗大量内存和带宽来保存和传输高维数据。

相比之下，快照压缩成像(SCI)，多个连续帧被不同的 mask 编码，然后汇总为一个单一的 measurement，使用二维相机捕获三维场景,  是一个很有前途的想法。

这篇文章考虑了 SCI 中的重构问题，从压缩 measurement 中恢复一系列场景。

具体地说， measurement 和 调制 mask 被送入所提出的网络， 加上双向循环神经网络和对抗训练来重构想要的帧。

BIRNAT利用带有残差块和自注意力的深度卷积神经网络重建第一帧，在此基础上利用双向循环神经网络依次重建随后的帧。

此外，针对彩色视频的联合重建和去马赛克马赛克，构建了一个扩展的 BIRNAT-color 算法。

从三个 SCI 摄像机的视频和光谱、仿真和真实数据的大量结果表明，BIRNAT具有优越的性能。

# Conclusion


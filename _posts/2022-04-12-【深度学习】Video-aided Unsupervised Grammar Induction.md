---
layout:     post
title:      "【深度学习】Video-aided Unsupervised Grammar Induction"
subtitle:   ""
date:       2022-04-12
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract 
我们研究了视频辅助语法归纳，它从无标记文本和相应的视频中学习一个contituency parser。

现有的多模态语法-语法归纳方法主要集中在从文本-图像对中学习语法，结果表明静态图像中的信息在语法归纳中是有用的。

然而，视频提供了更丰富的信息，不仅包括静态对象，还包括动作和状态变化，这对诱导动词短语很有用。这篇文章从视频中探索丰富的特征(如动作、对象、场景、音频、人脸、OCR和语音)，以最近的复合PCFG模型(Kim et al.， 2019)为基准。

进一步提出了一个多模态复合PCFG模型(MMC-PCFG)来有效地聚合这些来自不同模态的丰富特征。

MMC-PCFG经过端到端训练，在三个基准测试(即DiDeMo、YouCook2和MSRVTT)上优于每个单模态和先前的SOTA，证实了利用视频信息进行无监督语法归纳的有效性。
# Conclusion
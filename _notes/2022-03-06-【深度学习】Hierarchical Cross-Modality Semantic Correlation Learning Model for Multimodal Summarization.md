---
layout:     post
title:      "【深度学习】Hierarchical Cross-Modality Semantic Correlation Learning Model for Multimodal Summarization"
subtitle:   ""
date:       2022-03-06
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

带有多模态输出的多模态摘要(MSMO) 生成一个同时有文本和视觉内容的摘要。

多模态新闻报道包含多种内容， 这使得 MSMO 有意义。

此外， 新闻报道中不同形式的数据在层次上相互关联。

传统的MSMO方法通过学习整个数据的表示来处理不同形式的数据，不能直接适应异质内容和层次相关性。

这篇文章提出了一种层次化跨模态语义关联学习模型(hierarchical cross-modality semantic correlation learning model, HCSCL)来学习多模态数据中存在的模态内和模态间关联。

HCSCL采用图网络对模态内相关进行编码。然后，提出了一种层次融合框架来学习文本和图像之间的层次相关性。

此外，还构建了一个包含相关图像标注和图像对象标签信息的新数据集，为学习过程提供监督信息。


# Conclusion
这篇文章提出了一种用于多模态摘要的层次化跨模态语义相关学习模型，该模型利用多模态数据的模态内相关和跨模态相关来互补地学习两种模态的摘要信息。

在设计良好的数据集上的实验结果表明，模型可以生成最多样化和最相关的文本摘要和最相关的图像。

本研究的新颖之处在于通过提出一种多模态模型来研究不同模态的异质结构以及它们之间的相关性，从而解决多模态摘要问题。
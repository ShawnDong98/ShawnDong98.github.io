---
layout:     post
title:      "【深度学习】VSE++: Improving Visual-Semantic Embeddings with Hard Negatives"
subtitle:   ""
date:      2022-03-22 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
这篇文章提出了一种新的学习视觉语义嵌入的跨模态检索技术。

受到 hard negative mining 的启发， 在结构化预测中使用 hard negatives 和 ranking 损失函数， 这篇文章为用于多模态嵌入的损失函数引入一种简单的改变。

加上微调和数据增强， 在检索性能上有显著的提高。

使用该方法在 MS-COCO 和 Flickr 30k 数据集上进行了消融试验。

MS-COCO 上 caption retrieval 上提升 8.8% ， 在image retrieval 上提升 11.3%。
# Conclusion

这篇文章主要研究面向跨模态、图像标题检索的视觉语义嵌入方法。

受结构化预测的启发，与目前使用期望误差的方法相比，提出了一种新的损失函数，该方法基于relatively hard negatives 引起的 vialations。

在MS-COCO和Flickr30K数据集上进行了实验，结果表明，其提出的损失可以显著提高这些数据集上的性能。

改进的损失可以更好地引导功能更强大的图像编码器ResNet152，在微调图像编码器时也可以更好地引导。
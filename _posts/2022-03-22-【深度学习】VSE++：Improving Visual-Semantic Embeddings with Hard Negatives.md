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


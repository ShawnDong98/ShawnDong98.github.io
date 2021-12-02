---
layout:     post
title:      "【深度学习】Oscar：Object-Semantics Aligned Pre-training for Vision-Language Tasks"
subtitle:   ""
date:       2021-11-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Abstract

基于图像-文本对的跨模态表示学习的大规模预训练方法在视觉语言任务中越来越流行。现有的方法只是简单地将图像区域特征和文本特征作为输入到待训练模型中，利用自注意的方法以蛮力方式学习图像-文本语义对齐，本文提出了一种新的学习方法Oscar, 它使用在图像中检测到的目标标记作为 anchor points，显著简化对齐的学习。我们的方法的动机是观察图像中的显著对象可以被准确地检测到，并且经常在成对的文本中提到。


# Introduction

现在的方法是将图像区域特征和文本特征拼接起来， 以一种暴力方式通过自注意力机制学习图像区域和文本的对齐。

通过引入检测到的图像标签最为 anchor points 使得对齐图像和文本， 可以显著提高跨模态表征的学习。

OSCAR的训练样本是一个三元组， 包含一个词序列， 一组目标标签， 和一组图像区域特征。




# Conclusion

在本文中，我们提出了一种新的预训练方法Oscar，它使用目标标记作为 anchor points 来在共享语义空间中对齐图像和语言形式。我们通过在一个包含650万文本-图像对的公共语料库上预训练Oscar模型来验证该方法。预训练的模型在 6  V+L 理解和生成任务上取得了 SOTA。
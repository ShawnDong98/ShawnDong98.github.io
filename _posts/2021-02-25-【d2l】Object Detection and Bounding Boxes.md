---
layout:     post
title:      "【d2l】Object Detection and Bounding Boxes"
subtitle:   ""
date:       2021-02-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
    - d2l
---


在上一节中，我们介绍了许多用于图像分类的模型。 在图像分类任务中，我们假设图像中只有一个主要目标，并且我们仅关注于如何识别目标类别。但是，在许多情况下，我们感兴趣的是图像中的多个目标。我们不仅要对它们进行分类，而且还要获得它们在图像中的特定位置。在计算机视觉中，我们将这些任务称为物体检测（或物体识别）。

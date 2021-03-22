---
layout:     post
title:      "【深度学习】SketchyCOCO: Image Generation from Freehand Scene Sketches"
subtitle:   ""
date:       2021-03-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---


# Abstract

我们介绍了第一种从场景级手绘草图中自动生成图像的方法。我们的模型允许通过写意草图指定合成目标来生成可控的图像。关键贡献是在EdgeGAN上桥接了一个属性向量， 该网络支持高视觉质量的对象级图像内容生成，而无需使用草图作为训练数据。我们构建了一个名为SketchyCOCO的大规模复合数据集来支持和评估解决方案。在SketchyCOCO上，我们对目标级和场景级的图像生成任务进行了验证。通过定量，定性的结果，人类评估和消融研究，我们证明了该方法具有从各种徒手素描中生成逼真的复杂场景级图像的能力。
---
layout:     post
title:      "【深度学习】Faster R-CNN论文阅读"
subtitle:   ""
date:       2021-02-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CV
---

# Abstrac

最新的物体检测网络依靠区域提议算法（ region proposal algorithms）来假设物体的位置。SPPnet \[1\]和Fast R-CNN \[2\]之类的进步减少了这些检测网络的运行时间，提出了区域提议的计算是瓶颈。在这项工作中，我们引入了一个区域提议网络（RPN），该网络与检测网络共享整幅图像的卷积特征，从而实现了几乎免费的区域提议。RPN是一个全卷积的网络，可以同时预测每个位置的物体边界和物体得分。对RPN进行了端到端的训练，以生成高质量的区域提议，Fast R-CNN使用这些提议进行检测。通过共享RPN和Fast R-CNN的卷积特征，我们将RPN和Fast R-CNN进一步合并为一个网络——使用“注意力”机制， RPN组件告诉整个网络向哪看。

---
layout:     post
title:      "【深度学习】Image Generation from Scene Graphs"
subtitle:   ""
date:       2022-03-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
---

# Absract
为了真正理解视觉世界，我们的模型不仅应该能够识别图像，还应该能够生成图像。

最近从自然语言描述生成图像方面取得了令人兴奋的进展。

这些方法在有限的领域(如对鸟或花的描述)能给出令人惊叹的结果，但要忠实地再现包含许多物体和关系的复杂句子却很困难。

为了克服这一限制，这篇文章提出了一种从场景图生成图像的方法，实现了对对象及其关系的显式推理。

模型使用图卷积来处理输入 graph，通过预测对象的边界框和分割 mask 来计算场景布局，并通过级联网络将布局转换为图像。

该网络是对抗网络 与判别器对抗训练，以确保真实的输出。

# Conclusion

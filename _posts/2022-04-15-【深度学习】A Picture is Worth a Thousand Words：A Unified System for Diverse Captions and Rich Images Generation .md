---
layout:     post
title:      "【深度学习】A Picture is Worth a Thousand Words: A Unified System for Diverse Captions and Rich Images Generation "
subtitle:   ""
date:       2022-04-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
一个创造性的图像和文本生成人工智能系统，模仿人类的非凡能力，为用户提供多样化和全面的 caption 建议，以及丰富的图像创作。

在这项工作中，我们展示了这样一个人工智能创造系统，以产生不同的 caption 和丰富的图像。

当用户想象一个图像并将其与多个标题相关联时，我们的系统会绘制一个丰富的图像来反映所有的标题。

同样，当用户上传图片时，系统会用多种不同的标题来描述它。

这篇文章提出一个统一的多模态框架来实现这一目标。

具体来说，该框架使用Transformer网络联合建模图像和文本表示，该网络通过接受多个标题作为输入来支持丰富的图像生成。

我们考虑输入字幕之间的关系，以鼓励训练的多样性，并采用非自回归解码策略，以实现实时推理。

基于此，该系统支持多种字幕和丰富的图像生成。


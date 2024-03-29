---
layout:     post
title:      "【深度学习】KAIST：High-quality hyperspectral reconstruction using a spectral prior"
subtitle:   ""
date:       2022-07-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - ACM TOG 2017
---

# Abstract
这篇文章提出了一种新的高光谱图像重建算法，它克服了现有压缩成像方法中长期存在的光谱精度和空间分辨率之间的折衷。

该方法包括两个步骤:首先，从真实的高光谱数据集学习非线性光谱表示; 为此构建了一个卷积自编码器，它允许通过其编码器和解码器网络重构自己的输入。

其次，引入了一种新的优化方法，该方法利用新的保真先验，将学习到的 nonlinear spectral representation 的保真度和梯度在空间域的稀疏性共同正则化。

该技术可以应用于任何现有的压缩成像架构，并已通过模拟和构建原型高光谱成像系统进行了彻底的测试。

它在光谱精度和空间分辨率方面都优于来自每种架构的最先进的方法，同时其计算复杂度相对于稀疏编码技术降低了两个数量级。

此外，这篇文章提出该方法的两个额外的应用: hyperspectral interpolation 和 demosaicing。

最后创建了一个新的高分辨率高光谱数据集，其中包含比现有数据更清晰、光谱种类更多的图像。

# Results

## A New Hyperspectral Image Dataset

在实验中，作者发现 Columbia 数据集提供了具有广泛光谱信息的图像，但空间分辨率低且略微失焦。同样，Harvard 数据集提供高空间分辨率，但光谱范围有限。为了提升这一点，作者捕获了一个新的高分辨率数据集，包括30张覆盖广泛光谱范围的高光谱图像。该系统的详细描述在补充材料中。图11和图12显示了一些示例；完整的数据集可以从项目网站下载。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669705043190.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669705068849.png)


# Conclusion

这篇文章提出了一种新的高光谱图像重建方法，该方法在空间分辨率和光谱精度方面都优于目前最先进的方法。

该方法的两个主要步骤是 ：

1）使用卷积自编码器训练一个 natral spectrum prior 作为非线性表示。

2) 制定了一个新的非线性优化使用自编码器表示作为光谱先验。

与基于稀疏编码的最佳编码方法相比，计算复杂度降低了2个数量级。

这篇文章还建立了一个原型相机，并展示了该方法如何优于其他最先进的重建方法与真实输入。最后， 这篇文章提出两个新的、高准确率的光谱插值应用， 其受益于很多基于 bandpass-filter 多光谱成像系统。进一步开发这些插值方案的可能性仍然是未来工作的一个有趣方向。自动调整 total variation prior 更好地重建精细细节也是一个有吸引力的问题。为了促进压缩成像的进一步研究，将训练好的模型、源代码和新的高光谱图像数据集通过项目网站提供。
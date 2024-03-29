---
layout:     post
title:      "【深度学习】Hyplex：Real-time Hyperspectral Imaging in Hardware via Trained Metasurface Encoders "
subtitle:   ""
date:       2022-08-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - HSI
    - CVPR 2022
---

# Abstract

高光谱成像在图像分类和计算机视觉自动模式识别中的光谱特征识别方面受到了广泛关注。

最先进的快照高光谱成像实现依赖于笨重的、非集成的和昂贵的光学元件，包括透镜、光谱仪和滤光片。

这些宏观组件不允许对数据进行快速处理，例如实时和高分辨率视频。

这项工作引入了Hyplex，一个新的集成架构，解决了上面讨论的限制。

Hyplex是一款cmos兼容的快速高光谱相机，它用人工智能反设计的纳米级超表面取代了bulk optics。

Hyplex不需要光谱仪，而是使用传统的单色相机，这为实时和高分辨率的高光谱成像提供了可能，而且成本低廉。

Hyplex利用模型驱动的优化，将物理 metasurface 层与基于端到端训练的现代视觉计算方法连接起来。

作者设计并实现了Hyplex的原型版本，并将其性能与最先进的典型成像任务(如光谱重建和语义分割)进行了比较。

在所有基准测试中，Hyplex报告的重构误差最小。

此外， 作者还提供了最大的公开可用的标记高光谱数据集，用于语义分割。

# Methodology

## Learnable backbone via differentiable physical model

在这种方法中， 作者将解码操作 $\mathcal{D}$ 表示为一组层次化非线性操作 $\mathcal{F}$， 其将输入张量 $\hat S$ 投影为输出观测张量 $\hat y$。这个过程通过监督学习迭代训练， 将 $\hat y$ 与真实张量 $\tilde y$ 比较。这种端到端训练找到最优特征空间 $\hat S$ 和相关的线性映射 $\Lambda$。 为了用反向传播在这个框架里训练 Hyplex, 编码器 $\varepsilon$ 需要可微。

# Datasets

为了训练和验证 Hyplex 系统，作者使用三个公开的数据集：CAVE数据集，由32张涵盖 400nm 至 700 nm的室内图像组成，以及 Harvard 和 KAUST 数据集，其中包含室内和室外场景，规格为75张和409张图像，光谱带分别覆盖420 nm 至 720nm 和 400 nm 至 700 nm。作者创建一个额外的透明数据集FVgNET。FVgNET由317个场景组成，展示了天然和手工水果和蔬菜，在受控照明条件下在室内拍摄，覆盖 400nm 至 1000 nm 的范围。我们使用由排列成无穷大曲线的白皮纸组成的设置来获得图像，这种配置在摄影中用于将物体与背景隔离开来。作者通过头顶上的白色LED室内照明、配备玻璃扩散器的150 W卤素灯（来自Thorlabs的OSL2）和安装在漫反射器中的100瓦钨灯泡来照亮物体，从而实现良好的光谱覆盖，同时最大限度地减少最终图像中的阴影的存在。

图5a-b显示了数据集中目标类的分布。对于每类目标（例如苹果、橙子、胡椒），作者生成了大约相同数量的场景，显示：仅限自然目标和人工目标。数据集由12个类别组成，在图像中按其色度变化成比例表示。此外，作者用附加分割 mask 注释了80%的图像。作者通过处理从204个光谱通道生成的RGB图像，将语义分割 mask 集成到数据集中。然后，作者对每个标记对象进行标注，识别每个目标类，以及它们是天然的还是人工的。图5c显示了数据集图像上语义分割 mask 的实现。有关 FVgNET 数据集的更多详细信息，请参阅补充材料第3节。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669717920436.png)

# Conclusion and Limitations

在这项工作中，作者设计和实现了hyplex，一个实时和高分辨率高光谱成像的新硬件系统。对当前的 SOTA 方法验证了 Hyplex， 并证明它超越所有的 benchmarks。此外，作者通过设计一个基于光谱信息的语义分割模型，并将其性能与RGB模型进行比较，证明了高光谱特征和可训练编码器的优越性。

目前Hyplex实现的限制之一是物理编码器的线性结构。非线性编码器[3]的研究可以实现更复杂的特征嵌入。这一主题可能会激发未来的研究，将Hyplex框架推广到包括非线性超表面，这是元光学领域的一个重要研究领域[30,35]。改进的第二个领域是谱稀疏性假设，其核心思想是高效降维。虽然这一假设在大多数计算机视觉问题中得到了实际验证[43,61]，但它可能不适用于特殊任务。工艺误差也是一个重要的方面，如果没有充分考虑，可能会限制性能。这项工作中，作者通过调整软件编码器来减小这种影响。未来的工作可以研究反设计中的鲁棒控制技术，这是一个新的有前景的研究领域[31,37]。


如果增加公共可用的高光谱数据集，在不同波长和不同设置(如医疗)中获得更多的场景，也可以获得更好的结果。该研究可以推广Hyplex的研究结果，为个性化医疗和精准医疗提供高影响的系统。Hyplex可以在该领域提供颠覆性的技术，利用其巨大的容量快速处理高分辨率高光谱图像，速度可与当前的RGB相机相媲美。


# Supplementary Material

## Dataset details

在主要数据集中，作者提供了真实和人造水果的高光谱图像。杂项类对应于没有天然对应物的水果和蔬菜。大约40%的场景由位于相机焦平面上的一排物体组成。剩余的场景显示了两排物体，焦平面位于两者之间。作者在整个数据集中保持白色参考面板的位置大致恒定，以便于规范化。高光谱图像的空间分辨率为512×512像素和204个光谱带。作者还为具有相同空间分辨率的每个场景提供通过相机镜头看到的RGB图像。为了验证框架的泛化能力，作者用20张额外的野外图像增强了数据集（示例见图3）。这些图像的重建误差为2.54±2.72，该值与用于训练编码器的KAUST数据集获得的结果一致。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669719091370.png)
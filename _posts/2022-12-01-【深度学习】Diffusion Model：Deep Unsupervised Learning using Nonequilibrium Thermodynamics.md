---
layout:     post
title:      "【深度学习】Diffusion Model：Deep Unsupervised Learning using Nonequilibrium Thermodynamics"
subtitle:   ""
date:       2022-12-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Diffusion
    - ICML 2015
---

# Abstract

机器学习的一个核心问题涉及使用高度灵活的概率分布对复杂的数据集进行建模，其中学习、采样、推理和评估在分析或计算上仍然可以处理。

在这里，作者开发了一种同时实现灵活性和可操作性的方法。

受非平衡统计物理学的启发，本质思想是通过迭代正向扩散过程系统地缓慢地破坏数据分布中的结构。

然后，作者学习了一个反向扩散过程，该过程恢复了数据中的结构，产生了一个高度灵活和易于处理的数据生成模型。

这种方法能够快速学习、采样和评估具有数千层或时间步骤的深度生成模型中的概率，并在学习好的模型下计算条件概率和后验概率。


# Algorithm

作者的目标是定义一个正向（或推理）扩散过程，将任何复杂的数据分布转换为简单、可操作的分布，然后学习这个扩散过程的有限时间步的逆过程，该扩散过程定义了生成模型分布（见图1）。作者首先描述了正向推理扩散过程。然后，作者展示了如何训练反向生成扩散过程并用于评估概率。作者还推导了反向过程的熵界限，并展示了如何将学习分布乘以任何第二个分布(在 inpainting 或去噪图像时计算后验会做的那样)。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669894877593.png)
## Forward Trajectory

首先标记数据分布 $q(x^{(0)})$。 数据分布逐渐转换为一个表现良好的分布 $\pi(y)$，通过对重复应用马尔科夫扩散核 $T_\pi(y \mid y'; \beta)$ ， 其中 $\beta$ 是扩散率。

$$
\pi(y) = \int dy' T_\pi(y \mid y'; \beta) \pi(y') \tag{1}
$$

$$
q(x^{(t)} \mid x^{(t-1)}) = T_\pi(x^{(t)} \mid x^{(t-1)}; \beta_t) \tag{2}
$$
前向过程从开始的数据分布执行 $T$ 步扩散， 有：

$$
q(x^{(0, ..., T)}) = q(x^{(0)}) \prod_{t=1}^T q(x^{(t)} \mid x^{(t-1)}) \tag{3}
$$

对于下面展示的实验， $q(x^{(t)} \mid x^{(t-1)})$ 对应于高斯扩散到具有单位协方差的高斯分布，或二项式扩散到独立的二项分布。表1 给出了高斯分布和二项式分布的扩散核。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669896456293.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669896497110.png)

## Reverse Trajectory

生成分布将被训练来描述相反的过程

$$
p(x^{(T)}) = \pi(x^{(T)}) \tag{4}
$$
$$
p(x^{(0 ... T)}) = p(x^{(T)}) \prod_{t=1}^T p(x^{(t-1)} \mid x^{(t)}) \tag{5}
$$

对于高斯扩散和二项式扩散，对于连续扩散(限制小步长$\beta$)，扩散过程的逆过程具有与正向过程相同的函数形式。

## Model Probability

## Training

### Setting The Diffusion Rate $\beta_t$

## Multiplying Distributions, and Computing Posteriors

### Modified Marginal Distributions

### Modified Diffusion Steps

### Applying $r(x^{(t)})$


### Choosing $r(x^{(t)})$

## Entropy of Reverse Process


# Conclusion

作者引入了一种建模概率分布的新算法，可以对概率进行精确采样和评估，并证明其在各种玩具和真实数据集上的有效性，包括具有挑战性的自然图像数据集。

对于这些测试中的每一项，都使用了类似的基本算法，表明该方法可以准确地建模各种分布。

大多数现有的密度估计技术必须牺牲建模能力，以保持可驾驭性和效率，采样或评估通常非常昂贵。

算法的核心包括估计马尔可夫扩散链的反向传播，该链将数据映射到噪声分布；随着步数的增加，每个扩散步骤的反分布变得简单易行。

该算法可以学习拟合任何数据分布，但仍然可以进行训练、精确地从采样和评估，并且可以直接操作条件分布和后验分布。
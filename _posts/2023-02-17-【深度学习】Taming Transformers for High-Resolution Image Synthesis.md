---
layout:     post
title:      "【深度学习】Taming Transformers for High-Resolution Image Synthesis"
subtitle:   ""
date:       2023-02-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - CVPR 2021
---

# Abstract

Transformer 旨在学习顺序数据上的远程依赖，其在各种任务上显示最先进的结果。

与CNN不同，它们不包含优先考虑本地交互的归纳偏置。

这使得它们具有表现力，但在高分辨率图像等长序列中计算复杂度过高。

我们展示了如何将CNN的归纳偏置的有效性与 Transformer 的表达性相结合，使他们能够建模并合成高分辨率图像。

我们展示了如何（i）使用CNN学习上下文丰富的图像成分词汇，进而（ii）使用 Transformer 在高分辨率图像中有效地建模其构图。

我们的方法很容易应用于条件合成任务，其中非空间信息（如对象类）和空间信息（如分割）都可以控制生成的图像。

特别是，我们提出了用 Transformer 进行语义引导合成百万像素图像的 SOTA 结果，并在 class-conditional ImageNet 上获得了自回归模型的最新技术。

# Approach

我们的目标是利用 Transformer 模型的学习能力，并将其引入高达百万像素范围的高分辨率图像合成。之前将 Transformer 应用于图像生成的工作为 $64 \times 64$ 像素的图像展示了有希望的结果，但由于计算成本以序列长度的二次方增加，不能简单地扩展到更高的分辨率。高分辨率图像合成需要一个了解图像全局构成的模型，使其能够生成本地真实和全局一致性的模式。因此，我们不是用像素表示图像，而是将其表示为 codebook 中感知丰富的图像成分的组合。通过学习有效的编码，如第 3.1 节所述, 我们可以显著减少构图的 description length，这使我们能够有效地用 Sec3.2 中描述的 Transformer 架构建模它们在图像中的全局相互关系。这种方法如图2所述，能够在无条件和条件设置下生成逼真的和一致的高分辨率图像。

## Learning an Effective Codebook of Image Constituents for Use in Transformers

要利用高表达 Transformer 架构进行图像合成，我们需要以序列的形式表达图像的组成。相比于建立在单个像素上， 使用一个学习到表征的离散码表来表达图像， 任意图像 $x \in R^{H \times W \times 3}$ 可以被表示为 $z_q \in R^{h \times w \times n_z}$ 的集合。为了有效地学习这种离散的空间码表，我们建议直接采用CNN的归纳偏置，并采用神经离散表示学习的想法。首先，我们学习了一个由编码器 $E$ 和解码器 $G$ 组成的卷积模型，他们学会了用学习的离散码表 $Z = {z_k}_{k=1}^K \in R^{n_z}$ 复制发送的图像。更具体来说， 我们通过 $\hat x = G(z_q)$ 估计一个图像 $x$。 我们使用 $\hat z = E(x) \in R^{h \times w \times n_z}$ 得到 $z_q$ ， 接下来按元素量化 $q(·)$ 每个空间编码  $\hat z_{ij} \in R^{n_z}$， 从码表中查询距离最近的 $z_k$。

$$
z_q = q(\hat z) := (\arg \min_{z_k \in Z}\|\hat z_{ij} - z_k\|) \in R^{h \times w \times n_z} \tag{2}
$$


重构的 $\hat x \approx x$ 通过下式得到：

$$
\hat x = G(z_q) = G(q(E(x))) \tag{3}
$$

Eq. (3) 中的不可微量化操作是通过 straight-through gradient estimator 实现的， 只需将梯度从解码器复制到编码器， 因此，模型和码表可以通过损失函数进行端到端训练。


$$
L_{VQ}(E, G, Z) = \| x - \hat x\|^2 + \|sg[E(x)] - z_q \|_2^2 + \|sg[z_q] - E(x) \|_2^2 \tag{4}
$$


$L_{rec} = \| x - \hat x \|^2$ 是重构损失， $sg[·]$ 表示 stop-gradient 操作， $\|sg[z_q] - E(x)\|_2^2$ 是所谓的 "commitment loss"。 

**Learning a Perceptually Rich Codebook** 使用 Transformer 将图像表示为潜在图像组成的分布，需要我们突破压缩的限制，并学习丰富的码表。为此，我们提出了VQ-GAN，这是原始VQVAE的变体，并使用判别器和感知损失来以更高的压缩率保持良好的感知质量。请注意，这与之前在  shallow quantization 模型之上应用基于像素和基于 Transformer 的自回归模型的工作形成鲜明对比。更具体地说，我们将 $L_{rec}$ 使用的 $L_2$ 损失替换为感知损失，并引入了基于 patch 的判别器 D 的对抗性训练支持，该判别器旨在区分真实图像和重建的图像：

$$
L_{GAN}(\{E, G, Z\}, D) = [\log D(x) + \log (1 - D(\hat x))] \tag{5}
$$

完整地目标如下：

$$
L = \arg \min_{E, G, Z} \max_D E_{x \thicksim p(x)}[L_{VQ}(E, G, Z) + \lambda L_{GAN}(\{E, G, Z\}, D)] \tag{6}
$$

自适应权重 $\lambda$ 根据下式计算：

$$
\lambda = \frac{\nabla_{G_L}[L_{rec}]}{\nabla_{G_L}[L_{GAN}] + \delta} \tag{7}
$$

其中 $L_{rec}$ 是感知重建损失， $\nabla_{G_L}[·]$ 表示输入的梯度。为了聚合上下文， 我们在最低分辨率应用单个注意力层。这种训练程序大大减少了展开隐编码时的序列长度，从而可以应用强大的 Transformer 模型。

## Learning the Composition of Images with Transformers

**Latent Transformers** 有了 $E$ 和 $G$ 可用， 我们现在根据图像的编码中码表索引来表示图像。更具体来说， 图像 $x$ 量化的编码由 $z_q = q(E(x)) \in R^{h \times w \times n_z}$ 给定， 并且等价于一组来自码表的索引序列 $s \in {0, ..., \mid Z \mid - 1}^{h \times w}$ ， 其可以通过索引替换码表 $Z$ 中的编码得到：

$$
s_{ij} = k \text{ such that } (z_q)_{ij} = z_k \tag{8}
$$

通过序列 $s$ 的索引映射回对应码表的位置， 可以得到准备恢复的 $z_q = (z_{s_{ij}})$， 并且解码回图像 $\hat x = G(z_q)$。  
---
layout:     post
title:      "【深度学习笔录】FaceShifter论文阅读及其实现"
subtitle:   ""
date:       2020-02-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - FaceShifter
    - 深度学习
---

# 论文部分

![Fig 1](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1581933179973.png)

## Abstract

在这项工作中，我们提出了一种创新的两阶段的框架，叫做FaceShifter， 用于高保真和遮挡感知面部交换。 不像现有的面部交换作品当合成交换人脸时，仅仅利用了有限的目标图片的信息， 我们的框架， 在它的第一阶段，以高保真度生成要交换的人脸，通过彻底地和自适应地发掘和融合目标特征。我们提出了一种新的特征编码器， 用于提取多级目标面部特征, 并设计了一种新的Adaptive Attentional Denormalization (AAD)层生成器，自适应地集成人脸特征和属性。为了解决面部遮挡这一挑战， 我们增加了一个第二阶段—— 一个新的Heuristic Error Acknowledging Refinement Network (HEAR-Net)。它以一种自我监督的方式修复异常区域进行训练，不需要任何人工标注。对wild faces的数据集的大量实验表明， 与其他最先进的方法进行比较，换脸的结果不仅在感知上更有吸引力，而且更好地保留了特征。

## Introduction

面部交换用源图像中的人的特征去替换目标图像中的人， 在保留特征的前提下，比如头部姿势、面部表情、灯光、背景等。面部交换在视觉和图形社区吸引了大量的兴趣， 因为它在电影设计、电脑游戏、个人隐私保护方面的潜力。

最主要的困难是在面部交换过程中，怎样提取和自适应地再结合两张图片的属性和特征。 早期的交换仅仅是面部区域的像素交换。 因此，它们对姿势和视角的变化十分敏感。 基于3D的作品使用一种3D模型来处理姿势和视角不同的问题。然而，3D面部重构的准确性和健壮性也不尽人意。最近， 基于GAN的作品展现出令人印象深刻的结果。 但是，对于合成逼真的和高保真度的结果仍然是一个挑战。

在这个作品中，我们专注于提升面部交换的保真度。为了使结果在感知上更具有吸引力， 不仅共享目标面部的表情和姿势对于合成交换的面部是很重要的，而且无缝地融入目标图像也是很重要的：换脸后的渲染应与目标场景的光照(如方向、强度、颜色)一致，换脸后的像素分辨率也应与目标图像分辨率一致。这些都不是简单的阿尔法或泊松融合能很好地处理的。进而，在合成交换的面部期间，我们需要一个彻底的、自适应的目标图像特征的融合，以便这些来自目标图像的特征(诸如场景灯光和目标分辨率)，能够帮助面部交换更加逼真。

然而，以前的人脸交换方法要么忽略了这个集成的需求，要么缺乏以一种彻底和自适应的方式执行它的能力。具体来说，之前的很多方法都是利用目标图像的姿态和表情指导来合成交换后的人脸，然后利用目标人脸的掩模将人脸融合到目标图像中。 这个过程很容易产生人工痕迹， 因为： 1）除了动作和表情， 在合成交换的面部的时候，它利用了很少的关于目标图像的知识，它几乎利用不到目标图像的光照和分辨率等特征。2）这样的混合方式会丢弃源面部位于目标面部遮罩之外的所有外围区域。因此这些方式不能源图像特征的面部形状。 如图2所示，我们展现了一些失败的例子。 

![Fig 2](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1581933303292.png)

为了取得高保真度的面部交换结果， 在我们框架的第一阶段， 我们设计了一个基于GAN的网络， 叫做 Adaptive Embedding Integration Network(AEI-Net)， 为了彻底地和自适应地完成目标特征的融合。我们给网络结构做了两个提升： 1）我们提出了一种新型的多级的特征编码器， 用于提取不同空间分辨率的目标特征， 而不是像RSGAN或者IPGAN那样将它压缩为一个单向量。 2）提出了一种具有精心设计的Adaptive Attentional Denormalization (AAD)层的新型生成器，它能自适应地学习在何处集成attribute或identity embeddings 。这样的自适应合成带来可观的提升，相比于RSGAN、FSGAN和IPGAN使用的单向量合成方法。 有了这两大提升， 我们提出的AEI-Net能够解决光照与脸型不一致的问题，如图2所示。

此外，解决面部遮挡是面部交换的一个常见的挑战。不像Nirkin等人训练的面部分割网络来获取面部遮挡的mask， 我们的方式能够在没有人工标注数据的情况下，以一种自监督学习的方式修复面部异常区域。我们观察发现把相同的面部图像同时送入一个训练好的AEI-Net时， 重构后的图像在多个区域偏离输入， 这些偏离强烈地暗示了面部遮挡的位置。因此， 我们提出了一种新的Heuristic Error Acknowledging Refinement Network (HEAR-Net) 在重构误差的指导下来更好地改善结果。该方法更加通用，因此可以识别更多的异常类型，如眼镜、阴影和反射效应以及其他不常见的遮挡。

我们提出的两阶段面部交换框架，FaceShifter， 与主体无关。一旦训练完成，该模型就可以应用于任何新的人脸对，而不需要像DeepFakes和Korshunova等人那样， 对特定的人进行特定的训练。实验结果表明，与其他先进的方法相比，我们的方法获得的结果更真实、更可靠。

## Related Works 

人脸交换在视觉和图形学的研究中有很长的一段历史。 早期的努力仅仅是相似姿势的面部进行交换。这些改善方式被近年来的算法粗略地分为了两种策略：基于3D的方式和基于GAN的方式。

**基于3D的方式**

Blanz等人考虑不同姿态的两张脸之间的3D变换，但需要用户交互，不处理表情。Thies等人使用3DMM从RGB-D图像中捕捉头部动作，将静态面部转变为可控制的头像。在Face2Face中， 它被拓展为RGB。Olszewski等人的动态推断三维面部纹理，以改善控制质量。Kim等人使用3DMM分别对不同的视频进行建模，使人像可控，而Nagano等人只需要一张图像就可以在重构人像。最近，Thies等人的[37]采用了神经纹理，可以更好地分离人脸重构中的几何关系。然而，当应用于面部交换时，这些方法很难利用目标属性，如遮挡、光照或照片样式。为了保留目标面部遮挡，Nirkin等人收集数据，以一种监督的方式训练一个遮挡感知的人脸分割网络，这有助于预测一个可见的目标人脸的mask，用于人脸交换中的混合。而我们的方法是在没有任何手动标注的情况下，以自监督的方式找到遮挡。

**基于GAN的方式**


在基于GAN的面部交换方式中， Korshunova等人的面部交换类似于风格转换。它分别为不同的面部建立不同的模型，比如尼古拉斯•凯奇(Nicolas Cage)的CageNet，泰勒•斯威夫特(Taylor Swift)的SwiftNet。最近流行的DeepFakes是另一个subject-aware人脸交换的例子:对于每个新的输入，一个新的模型必须在两个视频序列上进行训练，一个用于源，一个用于目标。

这个限制已经被subject-agnostic的脸部交换研究解决了:RSGAN[28]学会分别提取面向量化的脸部和头发区域的embeddings，并重新组合它们来合成交换的脸部。FSNet将源图像的人脸区域表示为一个向量，该向量与非人脸目标图像结合生成交换的人脸。IPGAN将面部的身份和属性分解为向量。通过从源身份和目标图像直接引入监督，IPGAN更好地身份保留进行人脸交换。然而，由于压缩表征而引起的信息损失，以及缺乏更多自适应的融合信息， 这三种方法都不能生成高质量的人脸图像。最近，FSGAN还同时进行了面部重现和换脸。虽然FSGAN利用一个occlusion-aware的人脸识别网络来保存目标的遮挡，但它很难保留目标的属性，如光照或图像分辨率，它也不能保存源身份的脸型。

## Methods

我们的方法需要两个输入的图像，源图像$X_s$来提供身份， 以及目标图像$X_t$提供特征， 比如姿势、表情、场景灯光和背景。 交换的面部图像由一个叫FaceShifter的两阶段的框架生成。在第一阶段，我们使用一个 Adaptive Embedding Integration Network (AEI-Net)来生成一个高保真度的面部交换结果$\hat Y_{s, t}$， 基于融合信息。在第二阶段， 我们使用Heuristic Error Acknowledging Network (HEAR-Net)来解决面部遮挡以及限定结果， 最终的生成结果表示为$Y_{s, t}$

###  Adaptive Embedding Integration Network

在第一阶段，我们的目标是生成一个高保真度的面部图像$\hat Y_{s, t}$, 它应该保存源图像$X_s$的身份以及目标图像$X_t$的特征(比如姿势、表情、灯光、背景等)。为了达到这个目标， 我们的方式由三个部分组成：i）身份编码器 $Z_{id}(X_s)$， 它提取源图像$X_s$的身份； ii）多层属性编码器$Z_{att}(X_t)$， 它用来提取目标图像$X_t$的特征； iii）Adaptive Attentional Denormalization (AAD)生成器， 它生成要交换的面部图像。 整个网络的架构如图3所示。 

![Fig 3](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582012640794.png)

**Identity Encoder**

我们使用一个预先训练的最先进的人脸识别模型[13]作为身份编码器。将身identity embeddings $Z_{id}(X_s)$定义为在全连接层前生成的最后的特征向量。我们认为，通过对大量的二维人脸数据进行训练，这种人脸识别模型可以比基于3d的三维模型(如3DMM)提供更有代表性的identity embeddings。

**Multi-level Attributes Encoder**

面部特征，比如姿势、表情、灯光和背景，比身份需要更多的空间信息。为了保存这样的细节， 我们提出将embeddings的属性表示为多级特征映射，而不是与以前的方法一样，将其压缩为单个向量。特别地， 我们将目标图像$X_t$送入一个类似于U-Net结构的网络。然后我们将特征embeddings定义为U-Net解码器生成的特征映射。更正式地，我们定义：

$$z_{att}(X_t) = \{z_{att}^1 (X_t),z_{att}^2 (X_t), ...,z_{att}^n (X_t),  \} \tag{1}$$

其中$z_{att}^k(X_t)$代表U-Net解码器第k层的特征映射， n是特征层数。

我们的特征嵌入网络不需要任何特征标注， 它通过自监督训练的方式提取特征： 我们需要生成的要交换的人脸$\hat Y_{x_t}$， 以及目标图像$X_t$有相同的特征嵌入。损失函数将在等式7被引入。在实验部分，我们也会研究什么样的特征嵌入被学习到了。

**Adaptive Attentional Denormalization Generator**

我们然后合成了这两个嵌入$z_{id}(X_s)$和$z_{att}(X_t)$以生成要交换的人脸$\hat Y_{s, t}$。 之前方式仅仅是通过特征拼接的方式来融合它们。这将会导致相对模糊的结果。进而，我们提出了一种新的Adaptive Attentional Denormalization(AAD) 层以一种自适应的方式完成这项任务。受到SPADE和AdaIN机制的启发， 我们提出的AAD层在多特征级别进行特征融合时利用了去正则化。

如图3(c)所示，在第k层级别的特征，让$h_{in}^k$表示送入AAD层的激活映射， 它应该是一个尺寸为$C^k \times H^k \times W^k$的3D的tensor， 其中$C_k$是通道的数量，并且$H^k \times W^k$是空间的维度。在融合之前，我们对$H_{in}^k$进行instance normalization:

$$\bar h^k = \frac{h_{in}^k - \mu^k}{\sigma^k} \tag{2}$$

这里$\mu^k \in R^{C^k}$和$\sigma^k \in R^{C^k}$是$h_{in}^{k}$通道级别激活之后的均值和标准差。 然后， 我们利用$\bar h_{in}^k$设计了三个并行的分支：1）特征融合， 2）身份融合，  3）自适应注意力mask。

对于特征嵌入的融合， 让$z_{att}^k$代表这个特征级别的特征融合， 它应该是一个尺寸为$C_{att}^k \times H^k \times W^k$的3D的tensor。  为了将$z_{att}^k$整合到激活中，我们根据特征嵌入对归一化的$\bar h^k$进行去正规化，从而计算出特征激活$A^k$, 公式为：

$$A^k = \gamma_{att}^{k} \otimes \bar h^k + \beta_{att}^k \tag{3}$$

其中$\gamma_{att}^k$和$\beta_{att}^k$是从$z_{att}^k$卷积得到的两个微调参数。 它们与$h^k$有相同大小的tensor尺寸。将计算出的$\gamma_{att}^k$和$\beta_{att}^k$按元素顺序相乘和相加。

对于身份嵌入融合，让$z_{id}^k$表示身份嵌入， 它应该是一个尺寸大小为$C_{id}$的一维向量。我们也以一种相似的方式计算身份激活$I^k$融合$z_{id}^k$进正在融合的特征。它的公式为：

$$I^k = \gamma_{id}^k \otimes \bar h^k + \beta_{id}^k \tag{4}$$

其中$\gamma_{id}^k \in R^{C^k}$和$\beta_{id}^k \in R^{C^k}$是经过全连接层的$z_{id}$生成的另两个微调参数。

AAD层的一个关键的设计是自适应地调整身份嵌入和特征嵌入的有效区域， 以便它们能参与脸不同部分的合成。比如， 身份嵌入应该更多地专注于面部有辨识度的部分， 例如眼睛、嘴巴、面部轮廓等。因此，我们采用了一种注意力机制进AAD层。 特别地， 我们使用$\bar h^k$通过卷积和sigmoid激活操作生成了一个注意力mask$M^k$。$M^k$的值在0到1之间。

最后， AAD层的输出$h_{out}^k$可由mask $M^k$作为权重， $A^k$和$I^k$两个激活以元素对应的方式结合得到， 如图3(c)所示。 它的公式如下：

$$h_{out}^k = (1 - M^k) \otimes A^k + M^k \otimes I^k \tag{5}$$


AAD-Generator 由多个AAD层组成。 如图3(a)所示， 在从源图像$X_s$提取了身份嵌入$z_{id}$， 以及从目标图像$X_t$提取特征嵌入$z_{att}$后， 我们级联AAD残差块(AAD ResBlks)来生成要交换的人脸$\hat Y_{s, t}$， AAD ResBlks的结构如图3(b)所示。对于AAD ResBlks的第k层特征， 它首先上采样并激活来自上一层的输入， 然后用$z_{id}$和$z_{att}^k$融合这个输入。 最后的输出图像$\hat Y_{s, t}$由最后的激活卷积得到。

**Training Losses**

对AEI-Net，我们利用对抗训练。 让$L_adv$表示使$\hat Y_{s, t}$真实的对抗loss。 它是一个对多层降采样输出图像的多级判决器。 此外， 一个identity preservation loss用于保留源图像的身份。它的公式如下：

$$L_{id} = 1 - cos(z_{id}(\hat Y_{s, t}, z_{id}(X_s))) \tag{6}$$

其中$cos(.,.)$表示两个向量的余弦相似度。 我们也定义attributes preservation loss为$X_t$和$\hat Y_{s, t}$多级特征嵌入的L2距离。它的公式如下：

$$L_{att} = \frac{1}{2} \| z_{att}^k(\hat Y_{s, t}) - z_{att}^k(X_t) \|_2^2 \tag{7}$$

当源图像和目标图像是相同的训练样本时， 我们定义一个重构误差为目标图像$X_t$和$\hat Y_{s, t}$之间像素级别的L2距离。

$$
L_{rec} = \
\begin{cases}
\frac{1}{2}\| \hat Y_{s, t} - X_t\|_2^2	, & \text{if $X_t = X_s$} \\
0, & \text{otherwise}
\end{cases}
\tag{8}
$$

AEI-Net最终用一个带权重以下loss之和来训练：

$$L_{AEI-Net} = L_{adv} + \lambda_{att}L_{att} + \lambda_{id}L_{id} + \lambda_{rec}L_{rec} \tag{9}$$

其中 $\lambda_{att} = \lambda_{rec} = 10, \lambda_{id} = 5$, 可训练的AEI_Net模块包括多级特征编码器和AAD-Generator。

### Heuristic Error Acknowledging Refinement Network

![Fig 4](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582100585512.png)

尽管在第一阶段由AEI-Net生成的换脸的结果$\hat Y_{s, t}$能够很好地保留目标特征比如姿势、表情和背景灯光， 它常常很难保留出现在目标面部$X_t$的遮挡。之前的方式用一个额外的面部分割网络解决面部遮挡的问题。它在带有面部遮挡标注的数据集上进行训练， 这需要大量的人工标注。此外， 这样的一个监督方式可能很难识别没有见过的遮挡类型。 

我们提出了一个heuristic method来解决面部遮挡的问题。 如图4(a)所示， 当目标面部被遮挡， 一些遮挡在被换的脸上会消失， 比如刘海覆盖了脸部或者冠冕上的链子。同时，我们观察到如果我们将相同的图片同时作为源图像和目标图像送进训练好的AEI-Net， 这些遮挡也会在重构的图片上消失。 因此，重构图像和输入之间的误差可以被用来定位面部遮挡。我们把它叫做输入图像的heuristic error， 因为它启发式地按时哪里会出现标注。

受到以上观察的启发， 我们充分利用并提出了一种新的HEAR-Net来改善面部图片。 我们首先得到了目标图像的heuristic error如下：

$$\Delta Y_t = X_t - AEI\_Net(X_t, X_t) \tag{10}$$

然后我们将heuristic error $\Delta Y_t$和第一阶段的结果$\hat Y_{s, t}$送入一个U-Net结构， 得到改善后的图像$Y_{s, t}$:

$$Y_{s, t} = HEAR\_Net(\hat Y_{s, t}, \Delta Y_t) \tag{11}$$

HEAR-Net的结构如图4(b)所示。

我们训练HEAR-Net以一种完全自监督的方式， 不需要使用任何人工的标注。 给定任意的目标面部图像$X_t$, 有或者没有遮挡区域， 我们利用以下损失来训练HEAR-Net. 首先是一个identity preservation loss来保存源图像的身份。 与第一阶段相似， 公式如下：

$$L'_{id} = 1 - cos(z_{id}(Y_{s, t}, z_{id}(X_s))) \tag{12}$$

change loss $L'_{chg}$保证第一阶段的结果和第二阶段结果的一致性。

$$L'_{chg} = \vert \hat Y_{s, t} - Y_{s, t} \vert \tag{13}$$

当源图像和目标图像相同时， 重构误差$L'_{rec}$限制第二阶段能够重构输入：

$$
L'_{rec} = 
\begin{cases}
\frac{1}{2} \|\hat Y_{s, t} - X_t \|_2^2 & \text{if $X_t = X_s$} \\
0 & \text{otherwise}
\end{cases}
\tag{14}
$$

因为面部遮挡的数量在大多数的人脸数据集里是非常有限的， 我们提出用数据增强来合成遮挡。遮挡从大量的数据集中随机的采样， 包括EgoHands、GTEA Hand2K 和ShapeNet。 它们被混合进经过随机旋转、放缩和颜色匹配后的现存人脸图片。注意在训练期间，我们不使用任何遮挡mask用于监督， 即便是这些合成的遮挡。

最后， HEAR-Net用上述loss之和来训练：

$$L_{HEAR-Net} = L'_{rec} + L'_{id} + L'_{chg} \tag{15}$$

## Experiments

**执行细节:** 对于每张人脸图片， 我们首先使用[Joint cascade face detection and alignment](http://soc.fudan.edu.cn/vip/attachments/download/3890/Joint_Cascade_Face_Detection.pdf)通过5个关键点对齐和裁剪人脸， 裁剪的尺寸是$256 \times 256$覆盖整张脸， 同时包含背景区域。 在AEI-Net中的特征嵌入的数量设置为$n=8$(等式1)。在HEAR-Net中降采样/升采样数量设置为5。关于网络结构和培训策略的更多细节，请参考补充资料。

AEI-Net的训练使用了CelebA-HQ， FFHQ和VGGFace。 然而，在这些数据集中，HEAR-Net使用部分具有Top-10%的heuristic errors的人脸进行训练， 以及额外的合成的遮掩进行过数据增强的数据集。遮掩图像从EgoHands、GTEA Hand2K和ShapeNet中随机采样。


### Comparison with Previous Methods

![Fig 5](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582123058172.png)

![Fig 6](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582123090198.png)

**定性比较：** 如图5，我们将我们的方式与FaceSwap， Nirkin等人，DeepFakes， 和IPGAN在FaceForensic++测试图像进行了比较。与最新的作品FSGAN的比较如图5所示。 我们可以看到， 因为FaceSwap， Nirkin等人，DeepFakes， 和FSGAN都使用了首先合成人脸区域， 然后将它混合进目标人脸， 预料之中， 它们都有混合的不连续性的问题。所有由这些方式生成的人脸与它们的目标人脸共享相同的轮廓， 忽视源人脸的形状（图5行1-4， 图6行1-2）.此外，它们也不能很好的尊重目标图片的关键信息， 如灯光（图5行3， 图6行3-5），图片的分辨率（图5行2和4）。IPGAN在所有的样本中都有减小分辨率的问题， 由于它的单层特征表征。IPGAN不能很好地保留目标人脸的表情，比如说闭着的眼睛（图5行2）。

我们的方式很好地解决这些问题。 我们取得了更好的保真度通过保留源人脸的形状（而不是目标人脸）， 并且很尊重目标图片的灯光和分辨率（而不是源图片）。 我们的方式也有超过FSGAN处理遮挡的能力。

**定量比较：** 实验构建在FaceForensic++数据集上。 对于FaceSwap和DeepFakes， 测试集由一万张人脸图片组成， 每种方式通过从每个视频片段中采样十帧。 对于IPGAN， Nirkin等， 和我们的方式， 使用与其他方法相同的源和目标图像对生成一万张人脸图像。然后我们分别对三个指标进行定量比较： ID retrieval, pose error和expression error。


![Table 1](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582124702916.png)

我们使用一个不同的人脸识别模型提取身份向量， 并且采用了余弦相似度来测量身份的差异。对于每个来自测试集的要换的人脸， 我们在所有的FaceForensics++源视频帧寻找最接近的人脸，并且检查它是否属于正确的源视频。 这样检索的平均准确率叫做ID retrieval， 如表1， 用于测量身份信息保留能力。 该方法取得了较高的ID retrieval score ，且检索范围较大。

我们使用一个姿势评估器来评估头部姿势和一个3D人脸模型来检索表情向量。 我们用要交换人脸和目标人脸的姿势和表情向量的L2距离作为姿势和表情误差， 如表1。我们的方式在保留表情信息方面具有优势相比于其他方式在保存姿势信息方面。我们没有像[Fsgan: Subject
agnostic face swapping and reenactment.](http://openaccess.thecvf.com/content_ICCV_2019/papers/Nirkin_FSGAN_Subject_Agnostic_Face_Swapping_and_Reenactment_ICCV_2019_paper.pdf)一样使用人脸特征点， 因为人脸特征点包含身份信息，这会导致要交换人脸和目标人脸之间不一致。

**人类评估：** 有三个用户进行研究来评估所提出的模型的性能。我们让用户来选择：i）与源人脸具有相似度最高的身份信息； ii）与目标图片共享相似度最高的头部姿势， 面部表情和场景灯光； iii）最真实的图片。 在每个研究单元， 两个真实的人脸图片， 源图片和目标图片， 和四个打乱的由FaceSwap， Nirkin等， DeepFakes和我们的方式生成的交换的人脸结果。 我们要求用户选择一张与我们的表述最匹配的人脸。

对于每个用户， 在没有复制的情况下随机地从1000张FaceForensic++测试集中随机抽样20对人脸。 最后， 我们从100个人类评估者收集了答案。在每个研究中每种方式选择的平均比例如表2所示。这表明我们的模型大比例地超过了其他三种方式。

![Table 2](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582203556051.png)


### Analysis of the Framework

![Fig 7](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582202254184.png)


![Fig 8](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582202271005.png)

![Fig 9](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582202297033.png)

**自适应嵌入融合：** 为了确定使用注意力mask进行自适应融合的必要性， 我们使用了两个baseline模型和AEI-Net进行比较：i）Add：在AAD层中采用了元素级别的加操作，而不是使用等式5中的mask $M^k$。模型的输出激活$h_{out}^k$直接用$h_{out}^k = A^k + I^k$来计算； ii）Cat：不使用mask $M^k$的情况下进行元素级别的拼接。输出激活变成$h_{out}^k = Concat[A^k, I^k]$。 两个baseline模型的结果，以及AEI-Net的比较结果如图7。没有一个soft mask 来自适应地融合embeddings, baseline模型生成的人脸相对比较模糊并且包含很多鬼影。

如图8所示， 我们也可视化了AAD层不同级的masks $M^k$, 这些地方有更亮的像素意味着在等式5中identity embeddings有一个更高的权重。这表明identity embeddings在低层中起更大的作用。它的有效的区域在中层变得更加稀疏， 在这些层它仅仅激活一些与人脸身份强烈相关的关键区域， 比如眼睛，嘴巴和面部轮廓的位置。

**多级特征：** 为了验证提取多级特征是否是必要的， 我们用另一个叫做Compressed的baseline模型进行比较， 它与AEI-Net共享相同的网络结构， 但仅仅利用了前三层的embeddings $z_{att}^k, k=1, 2, 3$。它的最后的embeddings $z_{att}^3$被送入所有更高层的AAD融合层。 它的比较结果如图7所示。 与IPGAN相似， 它的结果有像模糊这样的人工痕迹的问题， 因为大量目标图片的特征信息丢失了。

为了理解什么被编码进了attribute embeddings， 我们将来自各个层的embeddings $z_{att}^k$(上采样到$256 \times 256$， 然后向量化)拼接成了一个统一的特征表征。我们使用PCA降维将向量的维度降到512。 然后，我们使用这些向量的最近的L-2距离，从训练集中执行查询人脸的测试。如图9所示的三个结果验证了我们的意图， 即这些attribute embeddings 很好地反映了面部特征， 比如头部姿势， 头发颜色， 表情，甚至脸上墨镜的存在。 因此它也解释了为什么我们的AEI-Net有时能保留目标人脸的墨镜之类的遮挡，即便是没有第二阶段（图10(8)）。

![Fig 10](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582204721883.png)

**第二阶段之改良：** 第一阶段的结果$\hat Y_{s, t}$和第二阶段的结果$Y_{s, t}$的多个样本如图10所示。 这表明AEI-Net能够生成高保真度的人脸交换结果， 但是有时它的输出$\hat Y_{s, t}$不能保留目标的遮挡。 幸运的是， 在第二阶段的HEAR-Net能够修复它们。

HEAR-Net能够解决各种情况的遮挡问题， 比如奖牌(1)， 手(2)， 头发(3)， 脸上的油彩(4)， 面具(5)，半透明的物体(6)， 眼睛(7)，头巾(8)和浮动文本(9) 。 此外，它也能校正$\hat Y_{s, t}$偶尔出现的色彩偏移。 更重要的是， 当目标人脸有很大的姿势的时候(6)， HEAR-Net能够帮助修复人脸的形状。

###  More Results on Wild Faces

最后，我们通过测试互联网上下载的人脸图片来展示FaceShifter的强大能力。 如图11所示， 我们的方式能够解决各种情况下的人脸图像， 包括大的姿势， 不正常的灯光和非常有挑战性类型的遮挡。

![Fig 11](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582205550592.png)

## Conclusions

在这篇文章中，我们为高保真度并且有遮挡的人脸交换提出了一个全新叫做FaceShifter的框架。 第一阶段的AEI-Net自适应地融合身份和特征以生成高保真度的结果。 第二阶段的HEAR-Net修复异常区域以一种自监督学习的方式， 不需要任何人工标注。 我们提出的框架在不经过特殊训练的情况下， 给定任意的一对人脸，在生成逼真的人脸图片时有惊人的表现。 拓展的实验表明我们提出的框架显著的超出了其他先前的换脸方式。

# 实现部分


# Reference

1. [Li L, Bao J, Yang H, et al. FaceShifter: Towards High Fidelity And Occlusion Aware Face Swapping[J]. arXiv preprint arXiv:1912.13457, 2019.](https://arxiv.org/pdf/1912.13457.pdf)

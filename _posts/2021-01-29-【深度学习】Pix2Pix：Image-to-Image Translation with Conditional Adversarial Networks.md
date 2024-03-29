---
layout:     post
title:      "【深度学习】Pix2Pix：Image-to-Image Translation with Conditional Adversarial Networks"
subtitle:   ""
date:       2021-01-29
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---

![Figure 1: 图像处理，图形和视觉方面的许多问题涉及将输入图像转换成相应的输出图像。这些问题通常被认为是指定应用的算法， 即设定总是相同： 将像素映射到像素。条件对抗网络是一种通用解决方案，似乎可以很好地解决这些问题。这里我们展示几种方法的结果。在每种情况下，我们都使用相同的体系结构和目标，并且仅对不同的数据进行训练。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611913340432.png)

# Abstract

我们研究了条件对抗网络 作为图像到图像翻译问题的通用解决方案。这些网络不仅学习从输入图像到输出图像的映射，而且学习损失函数来训练该映射。这使得可以将相同的通用方法应用于传统上需要非常不同的损失函数的问题。我们证明了这种方法可以有效地从标签图合成照片，从边缘图重建对象以及为图像着色等任务。事实上，自从与本文相关的pix2pix软件发布以来，大量的互联网用户（其中许多是艺术家）已经发布了他们对我们系统的实验，从而进一步证明了其广泛的适用性和易于使用性，而且无需进行参数调整。 作为一个社区，我们不再手动设计我们的映射函数，这项工作表明我们无需手工设计我们的损失函数就可以取得合理的结果。

# Introduction

图像处理，计算机图形学和计算机视觉中的许多问题都可被视为将输入图像“转换”为相应的输出图像。正如可以用英语或法语表达概念一样，可以将场景渲染为RGB图像，渐变场，边缘图，语义标签图等。与自动语言翻译类似，我们将自动图像到图像翻译定义为在给定足够的训练数据的情况下将场景的一种可能表示转换为另一种场景的任务（参见图1）。传统上，这些任务中的每一项都是由单独的专用机器（例如\[16、25、20、9、11、53、33、39、18、58、62\]）处理的， 设定始终相同：根据像素预测像素。本文的目的是为所有这些问题开发一个通用框架。

社区已经朝这个方向迈出了重要的一步，卷积神经网络（CNN）成为了各种图像预测问题背后的常见主力。CNN学会最小化损失函数–衡量结果质量的目标–尽管学习过程是自动的，但在设计有效损失时仍然需要大量人工。换句话说，我们仍然必须告诉CNN我们希望将什么最小化。但是，就像迈达斯国王一样，我们必须小心自己想要的东西！如果我们采取一种幼稚的方法，并要求CNN最小化预测像素和真实像素之间的欧几里得距离，它将倾向于产生模糊的结果\[43，62\]。这是因为通过对所有可能的输出求平均来最小化欧几里得距离，这会导致模糊。提出迫使CNN做我们真正想要的事情的损失函数（例如，输出清晰逼真的图像）是一个开放性的问题，通常需要专家知识。

如果我们可以只指定一个高层目标，例如“使输出与现实没有区别”，然后自动学习适合实现该目标的损失函数，那将是非常可取的。幸运的是，这正是最近提出的生成对抗网络（GAN）所做的事情\[24、13、44、52、63\]。GAN学会了一种损失，试图对输出图像是真实的还是伪造的进行分类，同时训练生成模型以最大程度地减少这种损失。模糊图像不会被容忍因为看起来是假的。由于GAN会学习适应数据的损失，因此可以将它们应用于传统上需要非常不同种类的损失函数的大量任务。

在本文中，我们探讨了条件设置下的GAN。就像GANs学习数据的生成模型一样，条件GANs（cGANs）也学习条件生成模型\[24\]。这使cGAN适用于图像到图像的翻译任务，在此我们以输入图像为条件并生成相应的输出图像。

在过去的两年中，人们对GAN进行了深入的研究，而我们在本文中探讨的许多技术都是先前提出的。但是，早期的论文集中在特定的应用上，并且尚不清楚图像条件GAN作为图像到图像翻译的通用解决方案如何有效。我们的主要贡献是证明在各种问题上，条件GAN都能产生合理的结果。我们的第二个贡献是提出一个足以取得良好结果的简单框架，并分析几种重要架构选择的影响。代码位于[https://github.com/phillipi/pix2pix](https://github.com/phillipi/pix2pix.)。

# Related work

**图像模型的结构化损失** 图像到图像的翻译问题通常被表示为按像素分类或回归（例如\[39、58、28、35、62\]）。从每个输出像素在条件上都被认为独立于给定输入图像的所有其他像素来看，这些公式将输出空间视为“非结构化”。相反，有条件的GAN会学习结构性损失。结构性损失不利于输出的联合配置。大量文献已经考虑了这种损失，其方法包括条件随机字段\[10\]，SSIM度量\[56\]，特征匹配\[15\]，非参数损失\[37\]，卷积伪先验\[57\]， 基于匹配协方差统计数据的损失\[30\]。条件GAN的不同之处在于可以学习损失，并且从理论上讲可以惩罚输出和目标之间不同的任何可能结构。

**条件 GANs** 我们不是第一是应用条件GANs的。先前和并行的工作已经将GAN置于离散标签\[41、23、13\]，文本\[46\]以及图像上。图像条件模型已解决了从常规映射\[55\]进行图像预测，未来帧预测\[40\]，产品照片生成\[59\]和稀疏注释\[31，48\]生成图像的问题（参见\[47\]自回归 解决相同的问题）。其他几篇论文也使用GAN进行图像到图像的映射，但是仅依靠其他条件（例如L2回归）来无条件地应用GAN，以将输出强制为输入条件。这些论文在图像修复\[43\]，未来状态预测\[64\]，由用户约束的图像控制\[65\]，风格迁移\[38\]和超分辨率\[36\]等方面取得了令人印象深刻的结果。每种方法都是针对特定应用量身定制的。我们的框架的不同之处在于，没有什么是特定于应用的。这使我们的设置比大多数其他设置简单得多。

我们的方法在生成器和判决器的几种体系结构选择上也不同于先前的工作。与过去的工作不同，对于我们的生成器，我们使用基于“ U-Net”的体系结构\[50\]，对于我们的判别器，我们使用卷积的“ PatchGAN”分类器，该分类器仅在图像小片范围内惩罚结构。先前在\[38\]中提出了类似的PatchGAN架构来捕获本地风格统计信息。在这里，我们证明了这种方法对更广泛的问题有效，并且我们研究了更改小片大小的影响。

# Method

GAN是生成模型，可学习从随机噪声矢量 $z$ 到输出图像 $y$ 的映射, $G: z \rightarrow y$ \[24\]。相比之下，条件GAN会从观察到的图像 $x$ 和随机噪声矢量 $z$ 学习到 $y$ 的映射，$G: \{x, z\} \rightarrow y$。经过对抗训练的判别器D训练生成器G产生无法与“真实”图像区分开的输出，训练判别器D 以在检测生成器的“伪造图像”时表现得尽可能好。此训练过程如图2所示。

![Figure 2: 训练条件GAN以绘制边缘→照片。判别器D学习在伪造图像（由生成器合成）和真实\{edge，phot\}元组之间进行分类。生成器G学习欺骗判别器。与无条件GAN不同，生成器和判别器器都看得到输入的边缘映射。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611920875778.png)


## Objective

条件GAN的目标可以表示为：

$$L_{cGAN}(G, D) = E_{x, y}[log D(x, y)] + E_{x, z}[log (1 - D(x, G(x, z)))] \tag{1}$$

其中$G$想要最小化最小化这个目标， 而D想要最大化这个目标， 比如 $G^* = \arg \min_G \max_D L_{cGAN}(G, D)$。

为了测试条件化判别器的重要性，我们还比较了判别器不观察到 $x$ 的无条件变量：

$$L_{GAN}(G, D) = E_y[log D(y)] + E_{x, z}[log (1 - D(G(x, z)))] \tag{2}$$

先前的方法已经发现，将GAN目标与更传统的损失（例如L2距离）混合在一起是有益的\[43\]。判别器器的工作保持不变，但生成器的任务不仅是欺骗判别器，而且还要使它接近L2意义上的真实输出。我们还探索了这个选项，使用L1距离而不是L2，因为L1鼓励减少模糊：

$$L_{L1}(G) = E_{x, y, z}[\| y - G(x, z)\|_1] \tag{3}$$

我们最后的目标是：

$$G^* = \arg \min_G \max_D L_{cGAN}(G, D) + \lambda L_{L1}(G) \tag{4}$$

没有z，网络仍然可以学习从x到y的映射，但是会产生确定性的输出，因此无法匹配除delta函数以外的任何分布。过去的条件GAN都已经意识到这一点，并提供了除了 $x$ 之外的高斯噪声 $z$ 作为生成器的输入（例如\[55\]）。在最初的实验中，我们没有发现这种策略有效–生成器只是学会了忽略噪声–这与Mathieu等人的观点一致\[40\]。取而代之的是，对于最终模型，我们仅以dropout的形式提供噪声，并在训练和测试时将其应用于生成器的多个层。尽管有噪声，但我们在网络输出中仅观察到较小的随机性。设计产生高随机输出的条件GAN，从而捕获它们建模的条件分布的全部熵，是当前工作遗留的一个重要问题。

## Network architectures

我们根据\[44\]中的内容修改了生成器和判别器架构。生成器和判别器都使用 convolution-BatchNorm-ReLu \[29\]形式的模块。在线补充材料中提供了该体系结构的详细信息，下面讨论了一些关键功能。

### Generator with skips

图像到图像转换问题的定义特征是它们将高分辨率输入网格映射到高分辨率输出网格。另外，对于我们考虑的问题，他的输入和输出的表面外观不同，但是两者都是相同基础结构的渲染。因此，输入中的结构与输出中的结构大致对齐。 我们围绕这些考虑因素设计生成器架构。

针对该领域中的问题的许多先前解决方案\[43、55、30、64、59\]已经使用了编码器-解码器网络\[26\]。在这样的网络中，输入将通过一系列逐渐递减采样的层，直到成为瓶颈层为止，在这一点上，过程将被逆转。这样的网络要求所有信息流穿过所有层，包括瓶颈。对于许多图像翻译问题，在输入和输出之间共享大量的低层信息，因此希望将这些信息直接穿梭在网络上。例如，在图像着色的情况下，输入和输出共享突出边缘的位置。

为了给生成器一种避免此类信息瓶颈的方法，我们添加了跳过连接，以遵循“ U-Net”的一般形状\[50\]。 具体来说， 我们在层 $i$ 和 $n - i$ 层增加跳跃连接， 其中 $n$ 为总层数。每个跳跃连接拼接层 $i$ 和 层 $n - i$ 的所有通道。

### Markovian discriminator (PatchGAN)

众所周知，L2损失和L1（见图4）在图像生成问题上会产生模糊的结果\[34\]。尽管这些损失不能促进高频，但在许多情况下，它们仍然可以准确地捕获低频。对于这种情况下的问题，我们不需要全新的框架即可在低频下增强正确性。L1已经可以了。

![Figure 4: 不同的损失导致不同的结果质量。 每列显示在不同损失下训练的结果。请参阅https://phillipi.github.io/pix2pix/ 了解更多示例。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611925154226.png)

这促使将GAN判别器限制为仅对高频结构建模，这取决于L1项来强制实现低频正确性（公式4）。为了对高频进行建模，仅将注意力集中在局部图像小片中就可以了。因此，我们设计了一个判别器架构（我们称之为PatchGAN），该架构只会对小片规模施加惩罚。该鉴别器尝试对图像中的每个 $N×N$ 色块是真实的还是假的进行分类。我们对该图像进行卷积运算，对所有响应求平均以提供D的最终输出。

在第4.4节中，我们证明 $N$ 可以比图像的整个尺寸小得多，并且仍然可以产生高质量的结果。这是有利的，因为较小的PatchGAN具有较少的参数，运行速度更快，并可应用于任意大的图像。这样的判别器有效地将图像建模为马尔可夫随机场，假设相隔大于小片直径的像素之间具有独立性。这种联系先前在\[38\]中进行过探讨，也是纹理\[17，21\]和风格\[16，25，22，37\]模型中的常见假设。因此，我们的PatchGAN可以作为纹理/样式损失的一种形式来理解。


### Optimization and inference

为了优化我们的网络，我们遵循\[24\]中的标准方法：在D的一个梯度下降步骤与G的一个步骤之间交替。 像原始GAN论文建议的那样， 我们训练 $G$ 不是通过最小化 $log (1 - D(x, G(x, z)))$， 而是最大化 $log D(x, G(x, z))$。 此外，我们在优化D的同时将目标除以2，这减慢了D相对于G的学习速度。我们使用minibatch SGD 和 Adam 优化器， 学习率0.0002, 动量参数$\beta_1 = 0.5, \beta_2 = 0.999$。

在推论时，我们以与训练阶段完全相同的方式运行生成器网络。这与通常的协议不同，在于我们在测试时应用dropout，并且我们使用测试批次的统计数据而不是训练批次的汇总统计数据来应用批次归一化\[29\]。当批次大小设置为1时，这种用于批次标准化的方法被称为“实例标准化”，并且已被证明对图像生成任务有效\[54\]。在我们的实验中，我们根据实验使用1到10之间的批量大小。

# Experiments

为了探索条件GAN的一般性，我们在各种任务和数据集上测试了该方法，包括图形任务（例如照片生成）和视觉任务（例如语义分割）:

- Semantic labels↔photo, trained on the Cityscapes dataset \[12\].
- Architectural labels→photo, trained on CMP Facades\[45\].
- Map↔aerial photo, trained on data scraped from Google Maps.
- BW→color photos, trained on \[51\].
- Edges→photo, trained on data from \[65\] and \[60\]; binary edges generated using the HED edge detector \[58\] plus postprocessing.
- Sketch→photo: tests edges→photo models on humandrawn sketches from \[19\].
- Day→night, trained on \[33\].
- Thermal→color photos, trained on data from \[27\].
- Photo with missing pixels→inpainted photo, trained on Paris StreetView from \[14\].

在线补充材料中提供了有关这些数据集的每个训练的详细信息。在所有情况下，输入和输出都是1-3通道图像。定性结果如图8、9、11、10、13、14、15、16、17、18、19、20所示。图21中突出显示了几种失败情况。可在 [https://phillipi.github.io/pix2pix/](https://phillipi.github.io/pix2pix/) 获得更全面的结果。

**数据需求和速度** 我们注意到，即使在小型数据集上，也常常可以获得不错的结果。我们的facade训练集仅包含400张图像（请参见图14中的结果），而白天到晚上的训练集仅包含91个独特的网络摄像头（请参见图15中的结果）。在这种大小的数据集上，训练可以非常快：例如，图14所示的结果在单个Pascal Titan X GPU上花费了不到两个小时的训练。在测试时，所有模型都可以在此GPU上在一秒钟内很好地运行。

## Evaluation metrics

评估合成图像的质量是一个开放且困难的问题\[52\]。传统指标（例如，每像素均方误差）无法评估结果的联合统计信息，因此无法衡量结构化损失旨在捕获的结构。

为了更全面地评估结果的视觉质量，我们采用了两种策略。首先，我们在Amazon Mechanical Turk（AMT）上进行了“真实与虚假”感知研究。对于诸如着色和照片生成之类的图形问题，对于人类观察者而言，合理性通常是最终目标。因此，我们使用这种方法测试映射生成，航空照片生成和图像着色。

其次，我们测量合成的城市景观是否足够现实，以至于现成的识别系统可以识别其中的物体。此度量类似于\[52\]中的“初始得分”，\[55\]中的对象检测评估以及\[62\]和\[42\]中的“语义可解释性”度量。

**AMT perceptual studies** 对于我们的AMT实验，我们遵循\[62\]的协议：向Turkers进行了一系列试验，将“真实”图像与我们算法生成的“假”图像进行对比。 在每次实验中，每张图像出现1秒钟，之后图像消失，并且给了Turkers无限制的时间来回答哪个是假的。每次练习的前10张图像都是练习，Turkers得到了反馈。没有对主要实验的40个试验提供反馈。每个会话一次只能测试一种算法，并且不允许Turkers完成一个以上的会话。约有50位Turker评估了每种算法。与\[62\]不同，我们没有包括警戒性试验。对于我们的着色实验，真实和伪造的图像是从相同的灰度输入生成的。对于映射 $\leftrightarrow$ 航空照片，不是从相同的输入生成真实的图像和虚假的图像，从而使任务更加困难并避免了落地级别的结果。对于映射 $\leftrightarrow$ 航空照片，我们对256×256分辨率的图像进行了训练，但是利用了全卷积平移（如上所述）对512×512的图像进行了测试，然后对其进行下采样并以256×256的分辨率呈现给Turkers。对于着色，我们对256×256分辨率的图像进行了训练和测试，并以相同的分辨率将结果提交给Turkers。


**“FCN-score”** 虽然已知对生成模型的定量评估具有挑战性，但最近的工作\[52、55、62、42\]尝试使用预训练的语义分类器将生成的刺激的可辨别性作为伪度量进行测量。直觉是，如果生成的图像是真实的，则在真实图像上训练的分类器也将能够正确地对合成图像进行分类。为此，我们采用流行的FCN-8s \[39\]架构进行语义分割，并将其训练在城市景观数据集上。然后，我们根据分类准确度对合成照片的标签进行评分，以对这些照片进行合成。


##  Analysis of the objective function

等式4 中哪些目标函数是重要的？我们进行了消融研究，以隔离L1项，GAN项的影响，并使用以输入为条件的判别器（cGAN，等式1）与使用无条件判别器（GAN，等式2）进行比较。

图4显示了这些变化对两个标签→照片问题的定性影响。仅L1会导致推理能力强但模糊的结果。单独使用cGAN（在等式4中设置λ= 0）可获得更清晰的结果，但在某些应用中会引入视觉伪像。将两个项加在一起（λ= 100）可减少这些伪像。我们使用城市景观标签→照片任务（表1）上的FCN分数对这些观测值进行量化：基于GAN的目标获得更高的分数，表明合成的图像包含更多可识别的结构。我们还测试了从判别器（标记为GAN）去除条件的效果。在这种情况下，损失不会惩罚输入和输出之间的不匹配； 它只关心输出看起来逼真。此变体导致性能不佳； 检查结果表明，不管输入照片如何，生成器都会崩溃以产生几乎完全相同的输出。显然，在这种情况下，损失衡量输入和输出之间的匹配质量非常重要，实际上cGAN的性能要比GAN好得多。但是请注意，添加L1项还鼓励输出尊重输入，因为L1损失会惩罚正确匹配输入的真实输出与可能不会匹配的合成输出之间的距离。相应地，L1 + GAN在创建尊重输入标签图的逼真的渲染时也很有效。组合所有项L1 + cGAN的效果相似。

![Table 1: 在Cityscapes标签↔照片上评估的不同损失的FCN分数。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611996527087.png)



**Colorfulness** 条件GAN的惊人效果是，它们会产生清晰的图像，甚至在输入标签图中不存在空间结构时也会使空间结构产生幻觉。可能会想到，cGAN对频谱维度的“锐化”具有类似的作用-即使图像更彩色。就像L1在不确定要精确定位边缘的位置时会激励模糊一样，在不确定像素应采用几种可能的颜色值中的哪一个时，也会激励平均的浅灰色。特别是，L1将通过选择条件概率密度函数的中位数而不是可能的颜色来最小化。另一方面，对抗性损失原则上可以意识到灰色输出是不现实的，并鼓励匹配真实的颜色分布\[24\]。在图7中，我们调查了我们的cGAN是否确实在Cityscapes数据集上实现了这种效果。这些图显示了Lab颜色空间中输出颜色值的边际分布。真实分布以虚线显示。显然，L1导致比实际情况更窄的分布，从而证实了L1鼓励使用平均的浅灰色的假设。另一方面，使用cGAN可使输出分布更接近基本情况。

## Analysis of the generator architecture

U-Net体系结构允许低级信息在网络上实现捷径方式。这会带来更好的结果吗？图5和表2比较了城市景观生成时U-Net与编码器/解码器的比较。只需通过切断U-Net中的跳跃连接即可创建编码器/解码器。在我们的实验中，编解码器无法学习生成逼真的图像。U-Net的优势似乎并不是特定于条件GAN的：当L-损失训练了U-Net和编码器/解码器时，U-Net再次获得了优异的结果。

![Figure 5: 将跳跃连接添加到编码器/解码器以创建“ U-Net”可以得到更高质量的结果。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611983300259.png)

![Table 2: 在Cityscapes标签↔照片上评估的不同生成器架构（和目标）的FCN分数。（U-net（L1-cGAN）分数与其他表格中报告的分数不同，因为该实验的批次大小为10，其他表格为1，并且每次训练之间随机变化。）](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611996584900.png)

## From PixelGANs to PatchGANs to ImageGANs

我们测试了从1×1“ PixelGAN”到完整的286×286“ ImageGAN”各种判别器感受野的小片大小N的效果。图6显示了该分析的定性结果，表3使用FCN评分量化了影响。请注意，本文的其他地方，除非特别说明， 所有的实验使用 $70 \times 70$地PatchGANs， 并且在这部分所有实验使用 L1 + cGAN 损失。

PixelGAN在空间锐度上没有任何影响但是增加了结果的色彩（量化如图7）。 例如， 当训练使用L1损失的时候， 图6中的公交车被画成灰色， 但是当使用PixelGAN损失的时候， 它变成红色。色彩直方图匹配在图像处理中是一个常见的问题， PixelGAN可能是一个有前途的轻量级解决方案。

![Figure 6：小片大小变化。 对于不同的损失函数，输出的不确定性会以不同的方式体现出来。 在L1下，不确定的区域变得模糊和不饱和。 1x1 PixelGAN鼓励更大的颜色多样性，但对空间统计没有影响。16x16 PatchGAN可以产生局部清晰的结果，但也会导致超出其可观察范围的平铺伪像。70×70 PatchGAN会在空间和光谱（色彩）维度上强制输出即使是不正确的也要清晰的输出。完整的286×286 ImageGAN产生的结果在视觉上与70×70 PatchGAN相似，但根据我们的FCN评分标准（表3），其质量略低。请参阅 https://phillipi.github.io/pix2pix/ 了解更多示例。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611995823905.png)

![Figure 7: cGAN的颜色分布匹配属性，在Cityscapes上进行了测试。 （参见GAN原始论文的图1 [24]）。请注意，直方图相交分数受高概率区域中的差异支配，在图中是不可察觉的，图中显示了对数概率，因此强调了低概率区域中的差异。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611996150219.png)


![Table 3: 判别器的不同感受野大小的FCN得分，在Cityscapes标签→照片上评估。请注意，输入图像的大小为256×256像素，较大的感受野用零填充。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611996843910.png)

使用16×16的PatchGAN足以提升清晰的输出，并获得良好的FCN分数，但同时也会导致平铺伪像。70×70 PatchGAN减轻了这些瑕疵，并获得了更好的分数。超出此比例后，缩放到完整的286×286 ImageGAN似乎并不能改善结果的视觉质量，并且实际上得到的FCN得分要低得多（表3）。这可能是因为ImageGAN比70×70 PatchGAN具有更多的参数和更大的深度，并且可能难以训练。

**Fully-convolutional translation** PatchGAN的优点是可以将固定大小的小片判别器应用于任意大图像。我们还可以将生成器卷积应用到比经过训练的生成器更大的图像上。我们在航空照片任务上对此进行了测试。在将生成器训练为256×256图像后，我们在512×512图像上对其进行了测试。图8中的结果证明了这种方法的有效性。

![Figure 8: 在512x512分辨率的Google Maps上获得示例结果（模型是在256×256分辨率的图像上训练的，并在测试时逐渐在较大的图像上运行）。 调整对比度以使其更加清晰。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611996329652.png)

## Perceptual validation

我们验证了我们的结果在地图航空照片和灰度→彩色任务上的感知现实性。表4给出了我们的AMT实验的结果。通过我们的方法生成的航拍照片在18.9％的试验中欺骗了参与者，大大高于L1基准，这会产生模糊的结果，并且几乎从未欺骗过参与者。相比之下，在照片->地图方向上，我们的方法仅使6.1％的试验欺骗了参与者，这与L1基线的性能（基于boostrap测试）没有显着差异。这可能是因为较小的结构错误在具有刚性几何形状的地图中比在航拍照片中更为明显，而航拍照片则更加混乱。

我们在ImageNet \[51\]上训练了色彩，并在\[62，35\]引入的测试分割上进行了测试。我们的方法因L1 + cGAN缺失，使22.5％的试验蒙骗了参与者（表5）。我们还测试了\[62\]的结果以及使用L2损失的方法的变体（有关详细信息，请参见\[62\]）。条件GAN的得分与\[62\]的L2变体相似（通过自举测试，差异不显着），但没有达到\[62\]的完整方法，这种方法在我们的实验中欺骗了27.8％的参与者。我们注意到，他们的方法经过专门设计，可以很好地实现着色。

![Table 5: AMT “real vs fake” test on colorization.](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611997495509.png)

## Semantic segmentation

有条件的GAN似乎可以有效解决输出非常详细或照相的问题，这在图像处理和图形任务中很常见。视觉问题（例如语义分割）又如何呢？为了对此进行测试，我们在城市景观照片→标签上训练了cGAN（有或没有L1损失）。图10显示了定性结果，表6中报告了定量分类的准确性。有趣的是，经过训练而没有L1损失的cGAN能够以合理的准确度解决此问题。据我们所知，这是GAN首次成功生成具有连续值变化的，几乎是离散的“标签”而不是“图像”的GAN。尽管cGAN取得了一定的成功，但它们远不是解决此问题的最佳方法：如表6所示，仅使用L1回归比使用cGAN可获得更好的分数。我们认为，对于视觉问题，目标（即预测接近真实实况的输出）可能不如图形任务那么模糊，并且像L1这样的重建损失就足够了。

![Figure 10: 将条件GAN应用于语义分割。cGAN产生清晰的图像，看起来像真实图像，但实际上包括许多小的幻觉物体。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611997814666.png)

![Table 6:  照片→标签在城市景观上的表现。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611997941183.png)


## Community-driven Research

自从最初发布论文和我们的pix2pix代码库以来，Twitter社区（包括计算机视觉和图形从业人员以及视觉艺术家）已经成功地将我们的框架应用于各种新颖的图像到图像翻译任务，而这远远超出了原始论文的范围 。图11和图12仅显示了＃pix2pix标签的一些示例，包括背景去除，调色板生成，Sketch→纵向，Sketch→Pokemon，“Do as I do”姿势转移，学习看：郁闷的星期日以及 异常流行的＃edges2cats和#fotogenerator。请注意，这些应用程序是创造性的项目，不是在受控的科学条件下获得的，并且可能依赖于我们发布的pix2pix代码的某些修改。但是，它们证明了我们的方法有望作为图像到图像翻译问题的通用商品工具。

![Figure 11: Example applications developed by online community based on our pix2pix codebase: #edges2cats [3] by Christopher Hesse, Background removal [6] by Kaihu Chen, Palette generation [5] by Jack Qiao, Sketch → Portrait [7] by Mario Klingemann, Sketch→Pokemon [1] by Bertrand Gondouin, “Do As I Do” pose transfer [2] by Brannon Dorsey, and #fotogenerator by Bosman et al. [4].](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611998602262.png)


![Figure 12: Learning to see: Gloomy Sunday: An interactive artistic demo developed by Memo Akten [8] based on our pix2pix codebase.](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611998654271.png)


# Appendix

## Network architectures

我们根据\[44\]中的内容调整网络架构。 有关模型的代码，请访问[https://github.com/phillipi/pix2pix](https://github.com/phillipi/pix2pix)。

令 $Ck$ 表示具有 $k$ 个滤波器的Convolution-BatchNorm-ReLU层。$CDk$表示具有50％的 dropout 的Convolution-BatchNorm-Dropout-ReLU层。所有卷积都是步长为为2的4×4二维滤波器。编码器和判别器中的卷积向下采样2倍，而在解码器中，它们向上采样2倍。

### Generator architectures

编解码器架构包括：

**encoder:**

$C64-C128-C256-C512-C512-C512-C512-C512$

**decoder:**

$CD512-CD512-CD512-C512-C256-C128-C64$

在解码器的最后一层之后，使用卷积映射到输出通道的数量（除着色外，一般为3，为2），然后是Tanh函数。作为上述符号的例外，BatchNorm不应用于编码器中的第一个C64层。编码器中的所有ReLU都使用Leaky，斜率为0.2，而解码器中的ReLU不使用Leaky。

除了编码器中的第 $i$ 层与解码器中的第 $n - i$ 层之间的跳跃连接外，U-Net架构是相同的，其中n是总层数。跳跃连接将激活从第 $i$ 层连接到第 $n - i$ 层， 这会更改解码器中的通道数：

**U-Net decoder:**

$CD512-CD1024-CD1024-C1024-C1024-C512-C256-C128$

### Discriminator architectures

70×70判别器架构为：

$C64-C128-C256-C512$

在最后一层之后，应用卷积以映射到一维输出，然后是Sigmoid函数。作为上述符号的例外，BatchNorm不适用于第一C64层。所有ReLU Leaky，斜率为0.2。

所有其他判别器都遵循相同的基本架构，但深度会有所不同，以感受野的大小：

**1 × 1 discriminator:**

$C64-C128$（请注意，在这种特殊情况下，所有卷积都是 1×1 空间滤波器）

**16 × 16 discriminator:**

$C64-C128$

**286 × 286 discriminator:**

$C64-C128-C256-C512-C512-C512$


### Training details

通过将256×256输入图像的大小调整为286×286，然后随机裁剪回256×256大小，来应用随机抖动。所有网络都是从头开始训练的。 权重由均值0和标准差0.02的高斯分布初始化。

**Cityscapes labels→photo** 来自Cityscapes训练集\[12\]的2975幅训练图像，训练了200个epoch，具有随机抖动和镜像。我们使用Cityscapes验证集进行测试。为了将U-Net与编码器/解码器进行比较，我们使用10的批量大小，而对于目标函数实验，我们使用1的批量大小。我们发现批量大小为1的U-Net产生更好的结果，但不适用于编码器/解码器。这是因为我们在网络的所有层上应用了BatchNorm，对于批次大小1，此操作会将瓶颈层上的激活归零。U-Net可以跳过瓶颈，但编码器-解码器无法跳过，因此编码器-解码器需要大于1的批处理大小。注意，另一种策略是从瓶颈层中删除BatchNorm。 有关更多详细信息，请参见勘误表。

**Architectural labels→photo** 来自\[45\]的400个训练图像，训练了200个epoch，批量大小1，具有随机抖动和镜像。数据随机分为训练和测试。

**Maps↔aerial photograph** 从Google Maps抓取的1096张训练图像，训练了200个epoch，批量大小1，具有随机抖动和镜像。图像取自纽约市及其周围地区。然后将数据拆分为训练，并测试采样区域的中间纬度（添加缓冲区以确保测试集中不会出现训练像素）。

**Edges→shoes** 来自UT Zappos50K数据集\[61\]的50k训练图像进行了15个epoch的训练，批量大小为4。将数据分成训练并随机测试。

**Edges→Handbag** 来自\[65\]的137K个Amazon Handbag图像，训练了15个epoch，批处理大小为4。将数据分为训练并随机进行测试。


# 几点困惑

## 关于BatchNorm 批次为1 时变成InstanceNorm， 为什么瓶颈层激活为0？


## 关于PatchGAN

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1612018675315.png)

对CycleGAN来说，判别器输出大小30x30x1，论文中却指出PatchGAN输入图像处理为70x70patches，就是根据判别器最终输出的特征图进行回溯，最终对应到输入图像70x70的区域．

为了便于理解，看下面的代码，其计算感受域大小

```python
def f(output_size, ksize, stride):
    return (output_size - 1) * stride + ksize

last_layer = f(output_size=1, ksize=4, stride=1)
# Receptive field: 4
fourth_layer = f(output_size=last_layer, ksize=4, stride=1)
# Receptive field: 7
third_layer = f(output_size=fourth_layer, ksize=4, stride=2)
# Receptive field: 16
second_layer = f(output_size=third_layer, ksize=4, stride=2)
# Receptive field: 34
first_layer = f(output_size=second_layer, ksize=4, stride=2)
# Receptive field: 70

print(f'最后一层感受域大小:{last_layer}')
print(f'第一层感受域大小:{first_layer}')
#最后一层感受域大小:4
#第一层感受域大小:70

```

f 即为计算卷积感受域的公式，最后一层的感受域即为卷积核大小4，那么这个卷积核能够感受到原始输入图像多大的范围呢？是70，也就是CycleGAN所说的70x70patches.

综上，PatchGAN并不神秘，其只是一个全卷积网络而已，只是最终输出是一个特征图X，而非一个实数.它就相当于对图像先进行若干次70x70的随机剪裁，将剪裁后图像输入普通的判别器，然后对所有输出的实数值取平均．

用卷积的公式倒推可以推一下反卷积， 也就是用最后一层的输出

计算感受野的一个通项公式：

$$ r_{l + 1} = r_l + ((k_{l+1} - 1) \times \prod_{i = 0}^l s_i) $$


# 代码

`train.py` 是一个通用训练脚本。 它用于不同的模型(选项 `--model`: e.g. `pix2pix`, `cyclegan`, `colorization`) 和 不同的数据集 (选项 `--dataset_mode`： e.g. `aligned`, `unaligned`, `single`, `colorization`)。 


`test.py` 是一个通用测试脚本。 一旦使用 `train.py` 训练好你的模型， 可以使用此脚本测试模型。 它会从 `--checkpoints_dir` 加载保存的模型 并且 保存结果到 `--results_dir`。 

`data` 文件夹包括所有和数据加载和处理的模块。 如果添加一个自定义的数据集类叫做 `dummy`， 你需要添加一个叫做 `dummy_dataset.py`的文件 并且 定义一个继承自 `BaseDataset` 的叫做 `DummyDataset` 子类。 你需要实现四个函数： `__init__`（初始化类， 你需要先调用 `BaseDataset.__init__(self, opt)`）， `__len__` （返回数据集的大小）， `__getitem__`（得到一个数据）， 以及可选择的 `modify_commandline_options`（增加特定数据集的选项 并且 设定默认选项）。  现在你可以通过指定 `--dataset_mode dummy`使用数据集类。

- `__init__.py`： 实现训练和测试脚本的接口。 给定选项 `opt`，` train.py` 和 `test.py` 调用 `from data import create_dataset` 和 `dataset = create_dataset(opt)`  创建数据集。
- `base_dataset.py`: 为数据集实现抽象基类。 它也包括了常见的预处理函数 (e.g. `get_transform`, `__scale_width`)， 它会用于之后的子类中。
- `image_folder.py` 实现 image folder 类。 我们修改了 PyTorch 官方的 image folder 代码， 使得这个类可以从当前文件夹以及它的子文件夹里加载图像。
- `template_dataset.py` 提供有细节文档的 dataset 模板。 如果你打算实现自己的 dataset ， 查阅这个文件。
- `aligned_dataset.py` 包括一个可以加载 图像对 的 dataset 类。 它假设单个图像文件夹 `/path/to/data/train`， 它以 `{A, B}` 的形式包含图相对。 在测试时， 你需要准备一个文件夹 `/path/to/data/test` 作为测试数据。
- `unaligned_dataset.py` 包含一个可以加载 未对齐/未配对 的 dataset 类。 它假设两个文件夹 分别从 A `/path/to/data/trainA` 和 B `/path/to/data/trainB` 加载训练图像。 然后你可以使用 `--dataroot /path/to/data` 训练模型。 相似地， 你在测试期间需要准备两个文件夹 `/path/to/data/testA` 和 `/path/to/data/testB` 。
- `single_dataset.py` 包括一个可以从 `--dataroot /path/to/data` 加载单张图像的 dataset 类。 当模型选项 `-model test` 时， 它可以用于生成 CycleGAN 的单侧结果。
- `colorization_dataset.py` 实现了一个可以加载 RGB 自然图像， 并且将 RGB 格式转化为 LAB 色彩空间的 dataset 类。 在 pix2pix-based colorization 模型中需要它 (`--model colorization`)。

`models` 文件夹包括和目标函数， 优化器 和 网络结构相关的模块。如果要添加一个叫做 `dummy` 的自定义模型类， 你需要添加一个叫做 `dummy_model.py` 的文件 并且定义一个继承 `BaseModel` 的子类 `DummyModel`。 你需要实现四个函数 `__init__`(初始化类； 你需要首先调用 `BaseModel.__init__(self, opt)`)， `set_input`(从 dataset 中解压 data 并且应用预处理)， `forward`（生成中间结果）， `optimize_parameters` (计算损失， 梯度， 并且更新网络权重)， 以及可选的 `modify_commandline_options`(增加一个特定模型的选择 并且 设置默认选项)。 现在你可以通过指定 `--model dummy` 使用模型类。

- `__init__.py` 实现训练脚本和测试脚本的接口。 给定选项 `opt`， `train.py` 和 `test.py` 调用 `from models import create_model` 和 `model = create_model(opt)` 来创建模型。
- `base_model.py` 实现模型的抽象基类。 它也包括通用的 helper 函数 (e.g. `setup`, `test`, `update_learning_rate`, `save_networks`, `load_networks`)， 这些可用于后面的子类。
- `template_model.py` 提供有细节文档的 model 模板。 如果你打算实现你自己的模型， 查阅这个文件。
- `pix2pix_model.py` 实现了 pix2pix 模型， 给定成对的数据， 从输入图像映射到输出图像。  这个模型的训练需要 `--dataset_mode aligned` dataset。 默认地， 它使用一个 `--netG unet256` U-Net 生成器， `--netD basic` 判别器 (PatchGAN)， 以及 `gan_mode vanilla` GAN loss(标准的交叉熵目标)。
- `colorization_model.py` 实现 `Pix2PixModel` 的子类 用于图像上色 (黑白图像到彩色图像)。模型训练需要 `-dataset_model colorization` dataset。 默认地， 它使用 `--netG resnet_9blocks` ResNet 生成器，  `--netD basic` 判别器(由 pix2pid 引入的 PatchGAN)， 以及 最小均方 GANs 目标 (`--gan_mode lsgan`)。
- `networks.py` 模块实现网络结构 (包括生成器和判别器)， 以及规范化层， 初始化方式， 优化调度器(i.e. learning rate 策略)， 以及 GAN 的目标函数 （`vanilla`, `lsgan`, `wgangp`）。
- test_model.py 实现了用于生成 CycleGAN 仅一个方向结果的模型。 这个模型将自动设置 `dataset_mode single`， 它仅从一个集合中加载图像。 


`options` 文件夹包括 option 模块： training options ， test options， 以及 basic options（同时用于训练和测试）。 `TrainOptions` 和 `TestOptions` 同时是 `BaseOptions` 的子类。 它们将复用定义在 `BaseOptions` 中的选项。

- `__init__.py` 使 Python 将 `options` 文件夹视为 包含的包。
- `base_options.py` 包括同时用于训练和测试的选项。 它也实现了一个 helper 函数， 比如 parsing, printing, 以及 saving 选项。 它也从 dataset 类 和 model 类的 `modify_commandline_options` 函数搜集额外的选项。
- `train_options.py` 包括仅用于训练期间的选项。
- `test_options.py` 包括仅用于测试期间的选项。


`util` 文件夹包括一系列有用的 helper 函数。

- `__init__.py` 使 Python 将 `util` 文件夹视为包含的包。
- `get_data.py` 提供下载 CycleGAN 和 pix2pix 数据集的Python 脚本。可选地， 你可以使用 bash 脚本， 比如 `download_pix2pix_model.sh` 和 `download_cyclegan_model.sh`。
- `html.py` 实现了保存图像到单个HTML文件的模块。 它由 `add_header`(给HTML文件增加文本标题),  `add_images` (给HTML文件增加一行图像)， `save` (保存HTML到磁盘)。 它基于 Python 库 `dominate`， 一个使用 DOM API用于创建和操控 HTML 文档的 Python 库。
- `image_pool.py` 实现了存储之前生成图像的 image buffer。 这个 buffer 使得我们使用历史生成的图像， 而不是最近的生成器更新判决器。 原始的idea来自于 [paper](http://openaccess.thecvf.com/content_cvpr_2017/papers/Shrivastava_Learning_From_Simulated_CVPR_2017_paper.pdf)。 buffer 的大小由 `--pool_size` 决定。
- `visualizer.py` 包括 展示/保存 图像 以及 打印/保存 logging信息的几个函数。 它使用 `visdom`
 Python 库 和 使用`dominate` Python 库 (封装为 `HTML`)将图像创建 HTML 文件 来 展示。
 - `util.py` 由几个简单的 helper 函数组成， 比如 `tensor2im`(将tensor array 转换为 numpy image array)， `diagnose_network` (计算并打印梯度值的平均绝对值)， 以及 `mkdirs`(创建多个文件夹)。

# References
1.  [Understanding PatchGAN](https://sahiltinky94.medium.com/understanding-patchgan-9f3c8380c207)
2. [一文看懂PatchGAN](https://blog.csdn.net/weixin_35576881/article/details/88058040)
3. [你知道如何计算CNN感受野吗？这里有一份详细指南](https://zhuanlan.zhihu.com/p/35708466)
4. [junyanz/pytorch-CycleGAN-and-pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix)
---
layout:     post
title:      "【深度学习】CVPR2021：MultiModal 相关论文"
subtitle:   ""
date:     2021-11-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Human-like Controllable Image Captioning with Verb-specific Semantic Roles

Controllable Image Captioning (CIC) —— 根据指定的控制信号生成图像描述 —— 在过去的几年里受到了前所未有的关注。 为了模仿人类控制描述生成的能力，目前的CIC研究只关注与客观属性有关的控制信号，如 contents of interest 或 descriptive patterns。然而，几乎所有现有的客观控制信号都忽略了理想控制信号的两个不可缺少的特性： 1）Event-compatible: 在一句话中提到的所有视觉内容都应该与所描述的活动相兼容。2）Sample-suitable: 控制信号应该适合于特定的图像样本。为此，这篇文章为CIC提出了一种新的控制信号: Verb-specific Seman-tic Roles (VSR)。VSR由一个 verb 和一些 semantic roles 组成，表示目标活动和该活动中涉及的 entity 角色。给定一个设计好的的VSR,，首先训练一个  grounded semantic role labeling (GSRL) 模型来 identify 和 ground 每个角色的所有 entity。然后，提出了一个 semantic structure planner (SSP) 来学习像人类一样的 descriptive semantic structures。最后，使用 role-shift captioning 模型来生成描述。


这篇文章认为所有现有的CIC客观控制信号都忽略了两个不可缺少的特性: event-compatibl和sample-suitable。为此，提出了一种新的控制信号VSR。VSR由一个 verb 和几个 semantic roles 组成，也就是说，所有 components 都保证是  event-compatible 的。


# Improving OCR-based Image Captioning by Incorporating Geometrical Relationship 

基于 OCR 的 image captioning 目标是基于图像中 visual entities（同时包括 visual objects 和 scene text）自动描述图像。与传统的 image captioning 相比，基于 OCR 的 image captioning 需要场景文本的推理，因为生成的描述往往包含多个OCR token。现有的方法试图通过用丰富的 visual 和 visual 表征对 OCR token 进行编码来实现这一目标。然而，OCR token之间的强相关性可能无法在这种有限的表征下建立。这篇文章提出从利用 geometrical 的角度来增强OCR token 之间的联系。其综合考虑 OCR token 之间的高度、宽度、距离、IoU和方向关系来构造几何关系。为了将学习到的关系 以及 视觉和语义表征 整合到一个统一的框架中，这篇提出了 Long Short-Term Memory + Relation-aware pointer 网络(LSTM-R)结构。在 OCR tokens 之间的几何关系的指导下，LSTM-R 利用新设计的 Relation-aware pointer 网络从场景文本中选择OCR token，用于基于OCR的 image captioning 。

这片文章提出了一种  Long Short-Term Memory + Relation-aware pointer 网络(LSTM-R)结构，利用 OCR token 之间的几何关系实现了基于OCR的 image captioning 。为了将学习到的关系融入到框架中，设计了一个 relation-based pointer 网络，该网络在几何关系的指导下从OCR tokens 中复制单词。为了便于模型的训练，还设计了一种字编码方法，并提出了多标签损失去优化模型。


# FAIEr: Fidelity and Adequacy Ensured Image Caption Evaluation 

Image caption 的评估是一个重要的任务， 它包括语义准确度结合图像和文本的匹配度。良好的评估指标的目标是公平、全面和 与人类的判断 一致。当人们评价一个描述时，他们通常会考虑多个方面，比如它是否与目标图像相关而没有失真，它传达了多少图像要点，以及语言和措辞有多流利和漂亮。以上三种不同的评价取向可以概括为 fidelity 、 adequacy 和 fluency。前两者依赖于图像内容，而 fluency 则纯粹与语言学有关，更加主观。受人类评价的启发，这篇文章提出了一个基于学习的指标，名为 FAIEr，以确保评价描述的准确性和充分性。由于 image captioning 包含两种不同的模态，采用  scene graph 作为两者之间的桥梁来表示images 和 captions。FAIEr主要以 visual scene graph 作为衡量 fidelity 的标准。然后在参考描述的指导下，在 visual scene graph 上突出图像的要点，以评价候选描述的 adequacy。

这篇文章试图将 image captioning 的人类复杂主观的评价分解为：fidelity， adequacy 和 fluency。 为了解决 fidelity 和 adequacy 的评估，提出了一个基于学习的标准 FAIEr。给定图像、参考标题和候选标题作为输入，FAIEr 使用 scene graph 来表征人类对视觉和文本信息的语义感知。它主要依靠 visual scene graph 来衡量候选对象的 fidelity，将参考信息融合到 visual scene graph 中，进一步检验其 adequacy。


# Towards Accurate Text-based Image Captioning with Content Diversity Exploration


Text-based image captioning (TextCap)是一种利用文本阅读图像并进行推理的技术，鉴于文本在日常生活中无处不在，它对于机器理解详细而复杂的场景环境至关重要。然而，这项任务是非常具有挑战性的，因为图像通常包含复杂的文本和视觉信息，很难全面描述。现有的方法试图扩展传统的 image captioning 方法来解决这一问题，其重点是通过一个 global caption 来描述图像的整体场景。这是不可行的，因为复杂的文本和视觉信息无法在一个 caption  中很好地描述。为了解决这个困难，这篇文章试图生成多个 caption ，准确地描述图像的不同部分的细节。要实现这一目标，有三个关键挑战： 1）很难决定要 copy 或 paraphrase 图像的文本的哪一部分 2）在图像中捕捉不同文本之间的复杂关系并非易事 3）如何生成具有不同内容的多个描述仍然是一个有待解决的问题。 为了克服这些问题，这篇文章提出了一种新的 Anchor-Captioner 方法。 具体来说，我们首先找到需要更多关注的重要 token，并将其作为 anchors。然后，对于每个选择的 anchors，我们对其相关文本进行分组，构建相应的 anchor-centred graph(ACG)。最后，基于不同的 ACGs 进行 multi-view caption 生成，以提高生成 caption 的内容多样性。


这篇文章提出了一个 Anchor-Captioner 来解决 TextCap 任务。为了解决这个问题，现有的方法往往只生成一个粗略的全局标题，在复杂的场景中包含一个或两个显著的目标。从直观上看，这种方法可能会忽略一些人们真正感兴趣的区域。与现有的方法不同，这篇文章寻求从不同的视角生成多个 captions，覆盖更有价值的场景信息。具体来说，首先提出一个 anchor proposal 模块，对OCR tokens进行分组，并通过建模图像内容之间的关系构建 anchor-centred graphs(ACGs)。之后， anchor captioning 模块首先生成一个粗略的特定于视觉的 caption，然后使用上面的 ACGs 进一步将其细化为多个特定于文本的 caption。
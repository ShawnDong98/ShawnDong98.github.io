---
layout:     post
title:      "【深度学习】SGEITL：Scene Graph Enhanced Image-Text Learning for Visual Commonsense Reasoning"
subtitle:   ""
date:       2022-03-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
回答关于图像的一个复杂问题对于机器智能来说是困难的问题， 其需要图像、文本和常识的联合理解， 以及强大的推理能力。

近年来，多模态 Transformer 在视觉常识推理(VCR)方面取得了很大的进展，它通过跨模态注意力层共同理解视觉目标和文本token。

然而，这些方法并没有利用场景的丰富结构和目标之间的相互关系，而这些在回答复杂的常识问题时是必不可少的。

这篇文章提出了一个场景图增强的图像-文本学习(SGEITL)框架来将视觉场景图整合到常识推理中。

为了充分利用场景图结构，在模型结构层次上，我们提出了一种 multihop  graph transformer 来正则化 hop 间的注意交互。

在预训练方面，利用视觉场景图中提取的结构知识，提出了一种场景图感知的预训练方法。

在此基础上，提出了一种基于文本标注的弱监督训练和生成domain relevant视觉场景图的方法。

在VCR和其他任务上的大量实验表明，与目前最先进的方法相比，该方法的性能有显著提高，并证明了所提出的每个组件的有效性。
# Conclusion

在现有的VL模型的基础上，这篇文章提出了一个框架将视觉场景图整合到预训练、微调和模型结构层次。

这项工作首次有效地证明了视觉场景图在VCR等高度语义数据集上的预训练和微调的有效性。

其 multihop transformer 有助于保持 graphical 结构，其场景图生成器能够使用文本标注和弱监督生成 domain-relevant 的场景图。

最后提供了广泛的实验结果，以证明每个提出的组件的优势，并与SOTA方法进行了比较。
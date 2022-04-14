---
layout:     post
title:      "【深度学习】Kernelized Bayesian Softmax for Text Generation "
subtitle:   ""
date:       2022-04-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract
用于文本生成的神经模型在解码阶段需要一个 softmax 层和适当的词嵌入层。

大多数现有方法采用为每个词采用单个点 embedding。

然而， 一个词语可能根据上下文不同有多重含义， 这可能会带来混淆。

这篇文章提出一种新的可以用于文本生成的学习更好的 embeddings 的方法 KerBS。

KerBS 有两个优势： a) 它使有多个含义的词使用 embeddings 的 Bayesian composition; b) 它对 variances of words 有自适应性 并且 通过施加可学习 kernels 在 embedding 空间 捕获 词语 的 closeness 是的少见句子的上下文更健壮。

实证研究表明，KerBS显著提高了多个文本生成任务的性能。
# Conclusion


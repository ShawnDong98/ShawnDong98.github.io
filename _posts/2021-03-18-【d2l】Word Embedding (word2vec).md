---
layout:     post
title:      "【d2l】Word Embedding (word2vec)"
subtitle:   ""
date:       2021-03-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 深度学习
    - NLP
---


# Word Embedding (word2vec)

自然语言是我们用来表达意义的复杂系统。在这个体系中，词是语言意义的基本单位。顾名思义，词向量是用来表示一个单词的向量。它也可以被认为是一个单词的特征向量。将词映射到实数向量的技术也称为词嵌入。近年来，词嵌入逐渐成为自然语言处理的基础知识。


# Why Not Use One-hot Vectors?

在第8.5节中，我们使用了一个独热向量来表示单词(字符就是单词)。回想一下,当我们假设在字典中不同的单词的数量(字典大小)是 $N$， 每个单词可以一对一的从整数0连续对应到整数 $N - 1$。 这些与单词对应的整数称为单词的索引。我们假设一个词的索引是 $i$， 为了得到单词的一个热向量表示，我们创建一个长度为 $N$ 的全0的向量并将元素 $i$ 置为 1。通过这种方式， 每个词可以表示为长度为 $N$ 的向量， 它可以直接用于神经网络。

虽然一个独热词向量很容易构建，但它们通常不是一个好的选择。其中一个主要原因是独热的词向量不能准确表达不同词之间的相似度，例如我们常用的余弦相似度。对于向量 $x, y  \in R^d$， 它们的余弦相似度是它们夹角的余弦：

$$\frac{x^T y}{\| x \| \| y \|} \in [-1, 1]$$


由于任意两个不同单词的一个独热向量之间的余弦相似度为0，因此很难用一个独热向量来准确地表示多个不同单词之间的相似度。

[Word2vec](https://code.google.com/archive/p/word2vec/)是我们用来解决上述问题的一个工具。它用一个固定长度的向量表示每个单词，并使用这些向量更好地表示不同单词之间的相似和相似关系。Word2Vec工具包含两个模型： skip-gram  [Mikolov et al., 2013b](https://d2l.ai/chapter_references/zreferences.html#mikolov-sutskever-chen-ea-2013) 和 continuous bag of words (CBOW) [Mikolov et al., 2013a](https://d2l.ai/chapter_references/zreferences.html#mikolov-chen-corrado-ea-2013)。 下面我们来看看这两种模型及其训练方法。



# The Skip-Gram Model


skip-gram模型假设可以使用一个单词来生成文本序列中包围它的单词。例如，我们假设文本序列是“the”, “man”, “loves”, “his”, 和 “son”. 我们使用 “loves” 作为中心目标词 并且 设置文本窗口大小为2。 如图所示， 在给定中心目标词 love 的情况下，skip-gram模型考虑生成上下文词的条件概率， “the”, “man”, “his” 和 “son”, 它们距离中心词的距离不超过2个单词:

$$P(the, man, his, son \mid loves)$$

我们假设，给定中心目标词，上下文词是相互独立生成的。在这种情况下，上面的公式可以改写为

$$P(the \mid loves) · P(man \mid loves) · P(his \mid loves) · P(son \mid loves)$$

![skip-gram模型关心 给定的中心目标词生成上下文词的条件概率。](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616071245968.png)

在skip-gram模型中,每个词表示为两个d维向量,用于计算条件概率。我们假设这个词在字典中的索引是 $i$， 当它为中心词时， 向量被表示为 $v_i \in R^d$， 当它为上下文词时， 向量被表示为 $u_i \in R^d$。 令中心目标词 $w_c$ 和 上下文词 $w_o$ 在字典中的索引分别为 $c$ 和 $o$。 通过对向量内积执行softmax操作，可以获得给定中心目标词生成上下文词的条件概率：

$$P(w_o \mid w_c) = \frac{exp(u_0^T v_c)}{\sum_{i \in V} exp(u_i^T v_c)}$$

其中词的索引集合为 $V = \{0, 1, ..., \mid V \mid - 1\}$。 假设给定序列长度为 $T$ 的文本， 其中每个时间 $t$ 的词表示为 $w^{t}$。 假设上下文词是根据中心词独立生成的。当上下文窗口大小为$m$， skip-gram模型的似然函数是 给定任意中心词 生成的所有上下文词的联合概率。

$$\prod_{i=1}^T \prod_{-m \leq j \leq m, j \neq 0} P(w^{(t + j)} \mid w^{(t)})$$


这里， 任意小于 $1$ 或者大于 $T$ 的时间步可以忽略。


Q: 为什么最大似然估计用的是乘法？

A: 多个独立事件同时发生的概率公式

# Skip-Gram Model Training

skip-gram模型参数是每个单词的中心目标词向量和上下文词向量。在训练过程中，我们将通过最大化似然函数来学习模型参数，也称为最大似然估计。



# Reference
1. [为什么最大似然估计用的是乘法不是加法？](https://www.zhihu.com/question/264818377)
---
layout:     post
title:      "【深度学习】Understanding LSTM Networks"
subtitle:   ""
date:       2021-01-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Recurrent Neural Networks

人类不从头开始他们的思考。 就像你读这篇文章 ，你理解每个单词都是基于之前的那些单词的理解。 你不会丢掉所有的东西， 然后再次从头开始思考。 你的思维是有持续性的。


传统的神经网络不能做到这样， 这似乎像是一个主要的缺点。 比如， 假设你想要分类一个电影中每个时间点发生了什么时间。 尚不清楚一个传统的神经网络如何可以使用它对于之前事件的推理来告知后期的事件。

循环神经网络解决这个问题。 它们是在它们之间有一个循环的网络， 允许信息可以保持。


![Recurrent Neural Networks have loops.
In](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1610934762277.png)


在上图中， 神经网络A有着输入$x_t$并输出了$h_t$。 一个循环使得信息可以从一步传递到网络的下一步。

这些循环使得循环神经网络似乎有些神秘。然而， 如果我们多思考以下， 会发现它们和普通的神经网络并无差别。 一个循环神经网络可以被认为是相同网络的多份复制，每份复制传递一个信息给它的后续。 如果我们展开循环， 我们可以看到发生了什么：

![An unrolled recurrent neural network.](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1610935121369.png)

这种链式揭露了循环神经网络对序列和列表的内在联系。它们是对这些数据使用的神经网络的自然地结构。

在过去的几年里， 在大量的问题上应用RNNs有很多惊人的成功： 语音识别、语言模型、翻译、图片字幕...等等。 


这些成功的必要是使用了“LSTMs"， 一种非常特殊的循环神经网络， 它可用于多种任务， 比标准的RNN更好。 几乎所有都是基于循环神经网络的令人激动的结果都是通过它们得到的。

# The Problem of Long-Term Dependencies


RNN吸引人的主意之一就是它们能够连接之前的信息到现在的任务上， 比如使用之前的视频帧理解现在的视频帧。如果RNNs可以做到这样， 它们是非常有用的。但是它们能做到吗？ 这视情况而定。


有时， 我们仅需要最近的信息来执行现在的任务。 比如， 一个语言模型想要基于前面的词去预测下一个词。 如果我们想要预测"the clouds are in the sky"中的最后一个词 ，我们不需要更多的上下文信息——显然下一个词应该是sky。 在这种情况下， 相对信息和位置之间的距离较小， RNNs能够学习使用过去的信息。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1610938949208.png)

但是有些情况需要更多的上下文信息。比如想要预测"I grew up in France... I speak fluent French." 的最后一个单词。 最近的信息表明下一个词很能是一种语言的名字， 但是如果我们想要进一步知道是哪种语言， 我们需要France的上下文， 回退到更远的地方。这很可能相对信息和点之间的距离变得非常大。

不幸的是， 随着距离的增加， RNNs变地不能够学习连接这些信息。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1610939552798.png)

理论上， RNNs有能力处理这种 “long-term dependencies” . 人们可以细心地为它们挑选参数解决这种形式的问题。 然而， 事实上， RNNs似乎不能学习它们。 


# LSTM Networks

LSTMs设计用来避免长期依赖的问题。 记住长期时间的信息是它们默认的表现，而不是学习到的。

所有的循环神经网络有一种链式的重复的神经网络模块。 在标准的RNNs中， 这种重复的模块有一种非常简单的结构， 比如单个tanh层。

![The repeating module in a standard RNN contains a single layer.](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611025112867.png)

LSTM也有这样的链式结构， 但是重复模块有一种不同的结构。 不是有单个神经网络层，而是有四个， 以一种特殊的方式。

![The repeating module in an LSTM contains four interacting layers.](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611025206930.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611025277684.png)

在上面的表中， 每行携带者整个向量， 从一个节点的输出到其它的输入。 粉色的圆圈表示元素级别的操作， 比如向量加法， 黄色的方形表示学习到的神经网络层。 两条线融合表示拼接， 一条线分叉表示它的内容被复制， 复制的内容去到不同的位置。






# Reference
1. [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)
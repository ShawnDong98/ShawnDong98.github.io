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


传统的神经网络不能做到这样， 它似乎像是一个短路。 比如， 假设你想要分类一个电影中每个时间点发生了什么时间。 尚不清楚一个传统的神经网络如何可以使用它对于之前事件的推理来告知后期的事件。

循环神经网络解决这个问题。 它们是在它们之间有一个循环的网络， 允许信息可以保持。


![Recurrent Neural Networks have loops.
In](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1610934762277.png)


在上图中， 神经网络A有着输入$x_t$并输出了$h_t$。 一个循环使得信息可以从一步传递到网络的下一步。

这些循环使得循环神经网络似乎有些神秘。然而， 如果我们多思考以下， 会发现它们和普通的神经网络并无差别。 一个循环神经网络可以被认为是相同网络的多份复制，每份复制传递一个信息给它的后续。 如果我们展开循环， 我们可以看到发生了什么：

![An unrolled recurrent neural network.](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1610935121369.png)

这种链式揭露了循环神经网络对序列和列表的内在联系。它们是对这些数据使用的神经网络的自然地结构。

在过去的几年里， 在大量的问题上应用RNNs有很多惊人的成功： 语音识别、语言模型、翻译、图片字幕...等等。 


这些成功的必要是使用了“LSTMs"， 一种非常特殊的循环神经网络， 它可用于多种任务， 比标准的RNN更好。 几乎所有都是基于循环神经网络的令人激动的结果都是通过它们得到的。


# Reference
1. [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)
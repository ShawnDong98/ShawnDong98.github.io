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



# The Core Idea Behind LSTMs

LSTMs 的关键是细胞状态， 水平线贯穿图的上方。

细胞状态用一些小的线性变换贯穿整条链。 信息不改变流过它是非常容易的。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611030362945.png)

LSTM有能力移除或增加信息到细胞状态， 通过叫做门的结构调节。

门是选择性地让信息通过。 它们是由一个simoid神经网络层和一个按元素级别的乘法操作组成。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611030604193.png)


sigmoid层输出介于0到1之间， 描述每个部分多少信息能够通过。值为0表示不让任何信息通过， 值为1表示让所有信息通过。

一个LSTM有三个门， 来保护和控制细胞状态。

# Step-by-Step LSTM Walk Through

LSTM的第一步是决定什么信息将会从细胞状态中丢掉。 这个决定由一个叫做“遗忘门”的sigmoid层实现。 它的输入是$h_{t-1}$和$x_t$， 它的输出是0到1。 1表示“完全保持它”， 0表示“完全忘记它”。

让我们来回顾我们的语言模型的例子， 它想要基于之前所有的词来预测下一个词。 在这样一个问题中，细胞状态可能包括当前目标的词性， 这样可以使用正确的名词。当我们看到一个新的名词， 我们想要忘词之前的词的词性。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611031685483.png)


下一步是决定什么样的新信息将会存储到细胞状态中。这有两个部分。 首先， 一个叫做“输入门”的simoid层决定哪些值我们将会更新。 接下来， 一个tanh层创建新的候选值向量$\tilde C_t$， 它可以被添加到状态。 在下一步， 我们将会结合它们两个创建一个新的状态。

以我们的语言模型为例， 我们想要添加新的词的词性到细胞状态中， 取替换到我们要遗忘的老的词。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611031985356.png)

现在去更新来的细胞状态$C_{t-1}$到新的细胞状态$C_t$。 之前的步骤已经决定了要做什么，我们仅仅去实现它。

我们将老的状态乘以$f_t$， 遗忘掉我们决定遗忘的更早的事情。 然后加上$i_t * \tilde C_t$。 这是一个新的候选值， 由我们决定更新的每个状态值放缩。

在语言模型的例子中， 这是我们实际丢弃的关于旧的词的词性的信息 以及 添加的新信息， 按我们之前步骤决定的那样。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611032390516.png)


最后， 我们需要决定哪些信息我们将要输出。 这个输出将会基于我们的细胞状态， 但会是一个过滤后的版本。 首先， 我们执行一个simoid层决定那一部分的细胞状态我们将会输出。 然后， 我们让细胞状态穿过tanh(使值在-1到1之间)并且乘以它通过simoid门的输出， 因此我们仅输出我们决定的部分。

以语言模型为例， 当它看到一个主语， 它可能想要输出和一个动词相关的信息。例如，它可能输出是否为单数或者复数， 这样我们才能知道接下来的动词应采用哪种形式。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611033379300.png)


# Variants on Long Short Term Memory

到目前为止我们所讲的LSTM是常规的LSTM。 但是不是所有的LSTM都和上面一样。 事实上， 每篇文章都是用一些不同的版本提升LSTM。 差别很小， 但是有一些改变需要我们注意。

一个流行的LSTM的变体， 由[Gers & Schmidhuber (2000)](ftp://ftp.idsia.ch/pub/juergen/TimeCount-IJCNN2000.pdf)引进， 添加"peephole connection"。 这意味着我们可以让门层增加一个细胞状态这个输入。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611108209167.png)

上面的图在所有的门增加了"peepholes", 但是文章都给出了一些peepholes。

另外的变体是使用两个遗忘门和输入门。不是分别考虑遗忘什么和什么新信息应该添加， 我们一起做出这些决策。 我们仅遗忘我们将在在这里输入的一些事情。只有当我们遗忘老的事情的时候， 我们输入新的值。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611108943958.png)

另一个在LSTM的变体是GRU。 它将遗忘门和输入门结合成单个的"更新门"。它融合了细胞状态和隐藏状态。 这个模型比标准的LSTM更简单， 而且越来越流行。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1611124958868.png)

这些只是LSTM变体中的一小部分。 还有像 Depth Gated RNNs之类的其他变体。还有一些完全不同的方式解决长期依赖的方法， 比如Clockwork RNNs。

哪一种变体是最好的？ 这些差异重要吗？ Greff, et al. (2015) (http://arxiv.org/pdf/1503.04069.pdf)作了热门变体的比较， 发现它们差不多。 Jozefowicz, et al. (2015) (http://jmlr.org/proceedings/papers/v37/jozefowicz15.pdf) 测试了上万种RNN结构， 发现它们在特定任务上工作地更好。

# Reference
1. [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)
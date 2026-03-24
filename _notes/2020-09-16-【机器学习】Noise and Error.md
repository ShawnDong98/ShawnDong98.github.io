---
layout:     post
title:      "【机器学习】Noise and Error"
subtitle:   ""
date:       2020-09-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 
---


如果Hypotheses set的VC Dimension是有限的，且有足够多N的资料，同时能够找到一个hypothesis使它的$E_{in} \approx 0$，那么就能说明机器学习是可行的。

# Noise and Probablistic target

首先，Data Sets的Noise一般有三种情况：
- 由于人为因素，正类被误分为负类，或者负类被误分为正类；
- 同样特征的样本被模型分为不同的类；
- 样本的特征被错误记录和使用

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600261791924.png)

之前的数据集是确定的，即没有Noise的，我们称之为Deterministic。现在有Noise 了，也就是说在某点处不再是确定分布，而是概率分布了，即对每个(x，y)出现的概率是$P(y \mid x)$。

因为Noise的存在，比如在x点，有0.7的概率y=1，有0.3的概率y=0，即y是按照$P(y \mid x)$分布的。数学上可以证明如果数据集按照$P(y \mid x)$概率分布且是iid的，那么以前证明机器可以学习的方法依然奏效，VC Dimension有限即可推断$E_{in}$和$E_{out}$是近似的。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600262271639.png)

$P(y \mid x)$称之为目标分布（Target Distribution）。它实际上告诉我们最好的选择是什 么，同时伴随着多少noise。其实，没有noise的数据仍然可以看成“特殊”的$P(y \mid x)$概率分布，即概率仅是1和0.对于以前确定的数据集：

$$P(y \mid x) = 1, \text{for y = f(x)}$$

$$P(y \mid x) = 0, \text{for y $\neq$ f(x)}$$

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600262402923.png)

在引入noise的情况下，新的学习流程图如下所示：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600262433451.png)

# ERROR Measure

机器学习需要考虑的问题是找出的g与目标函数f有多相近，我们一直使用$E_{out}$进行误差的估计，那一般的错误测量有哪些形式呢？


我们介绍的g对错误的衡量有三个特性：
- out-of-sample：样本外的未知数据
- pointwise：对每个数据点x进行测试
- classification：看prediction与target是否一致，classification error通常称为 0/1 error

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600262652803.png)

PointWise error实际上就是对数据集的每个点计算错误并计算平均，$E_{in}$和$E_{out}$的 pointwise error的表达式为：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600262717933.png)

pointwise error一般可以分成两类：0/1 error和squared error。0/1 error通常用在分类（classification）问题上，而squared error通常用在回归 （regression）问题上。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600262781763.png)

Ideal Mini-Target由$P(y \mid x)$和err共同决定，0/1 error和squared error的Ideal Mini-Target计算方法不一样。例如下面这个例子，分别用0/1 error和squared error来估计最 理想的mini-target是多少。0/1 error中的mini-target是取P(y|x)最大的那个类，而 squared error中的mini-target是取所有类的加权平方和。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600263105625.png)

有了错误衡量，就会知道当前的g是好还是不好，并会让演算法不断修正，得到更好的g，从而使得g与目标函数更接近。所以，引入error measure后，学习流程图如下所示：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600263137252.png)

# Algorithmic Error Measure

Error有两种：false accept和false reject。false accept意思是误把负类当成正类， false reject是误把正类当成负类。根据不同的机器学习问题，false accept和false reject应该有不同的权重，这根实际情况是符合的，比如是超市优惠，那么false reject 应该设的大一些；如果是安保系统，那么false accept应该设的大一些。


![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600263199077.png)

机器学习演算法A的cost function error估计有多种方法，真实的err一般难以计算，常用的方法可以采用plausible或者friendly，根据具体情况而定。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600263242745.png)

引入algorithm error measure之后，学习流程图如下：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600263264150.png)


# Weighted Classification

机器学习的Cost Function即来自于这些error，也就是算法里面的迭代的目标函数，通过优化使得Error（$E_{in}$）不断变小。

cost function中，false accept和false reject赋予不同的权重，在演算法中体现。对不同权重的错误惩罚，可以选用virtual copying的方法。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600263514955.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600263525491.png)
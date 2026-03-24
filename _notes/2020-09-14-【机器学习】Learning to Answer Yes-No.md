---
layout:     post
title:      "【机器学习】Learning to Answer Yes-No"
subtitle:   ""
date:       2020-09-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 
---


# Perceptron Hypothesis Set

银行要根据用户的年龄、性别、年收入等情况来判断是否给该用户发信用卡。

现在有训练样本D， 我们根据D， 通过A， 在H中选择最好的h， 得到g， 接近目标函数f。

银行用这个模型对以后用户进行判断：发信用卡(+1)， 不发信用卡(-1)。

## 模型选择(Hypothesis Set)

下面介绍一个常用的Hypothesis Set：感知机(Perceptron)。

我们把用户的个人信息作为特征向量x， 共有d个特征， 每个特征赋予不同的权重w， 表示该特征对输出(是否发信用卡)的影响有多大。所有特征的加权和的值与一个设定的阈值threshold进行比较。感知机模型， 就是当特征加权和与阈值的差大于或等于0， 则输出$h(x) = 1$；当特征加权和与阈值的差小于0， 则输出$h(x) = -1$， 而我们的目的就是计算出所有权值w和阈值threshold。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600045056125.png)

通常我们将阈值threshold当作$w_0$， 引入一个$x_0 = 1$的量与$w_0$相乘， 这样就把threshold也转变成了权值$w_0$，简化了计算。

思考：为什么简化了计算？

$h(x)$的表达式做如下变换：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600045536089.png)


假设Perceptrons在二维平面上， 即$h(x) = sign(w_0 + w_1 x_1 + w_2 x_2)$。其中， $w_0 + w_1 x_1 + w_2 x_2 = 0$是平面上一条分类直线， 直线一侧是正类(+1)， 直线另一侧是负类(-1)。 权重w不同， 对应于平面上不同的直线。


![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600045889972.png)


那么我们所说的Perceptron， 在这个模型上就是一条直线， 称之为linear(binary)  classifiers。 注意， 感知机线性分类不限定在二维空间中， 在3D中，线性分类用平面表示， 在更高维度中，线性分类用超平面表示， 即只要是形如$w^T x$的线性模型就都属于linear(binary) classifiers。

这里说的linear(binary) classifiers是用简单的感知器模型建立的， 线性分类问题还可以使用logistic regression来解决。

# Perceptron Learning Algorithm(PLA)

我们知道hypothesis set由许多条直线构成. 接下来我们目的就是如何设计一个演算法A， 来选择一个最好的直线， 能将平面上所有的正类和负类完全分开， 也就是找到最好的g， 使$g \approx f$。

我们可以使用逐点修正的思想，首先在平面上随意取一条直线，看看哪些点分类错误。然后开始对第一个错误点就行修正，即变换直线 的位置，使这个错误点变成分类正确的点。接着，再对第二个、第三个等所有的错误 分类点就行直线纠正，直到所有的点都完全分类正确了，就得到了最好的直线。这 种“逐步修正”，就是PLA思想所在。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600047056769.png)


首先随机选择一条直线分类。 然后找到第一个分类错误的点， 如果这个点表示正类，被误分为负类， 即$w^T_t x_n(t) < 0$， 那表示w和x夹角大于90度， 其中w是直线的法向量。所以， x被误分在直线的下侧（相对于法向量， 法向量的方向即为正类所在的一侧）， 修正的方法就是使w和x夹角小于90度。通常的做法是$x \leftarrow w + yx, y=1$， 如图右上角所示， 一次或多次更新后的$w + yx$与$x$夹角小于90度， 能保证x位于直线的上侧， 则对误分为负类的错误点完成了直线修正。

同理，如果是误分为正类的点，即$w^T_t x_n(t) > 0$，那表示w和x夹角小于90度，其中w是直线的法向量。所以，x被误分在直线的上侧，修正的方法就是使w和x夹角大于90 度。通常做法是$w \leftarrow w + yx, y=-1$ ，如图右下角所示，一次或多次更新后的$w + yx$与x夹角大于90度，能保证x位于直线的下侧，则对误分为正类的错误点也完 成了直线修正。


按照这种思想，遇到个错误点就进行修正，不断迭代。要注意一点：每次修正直线， 可能使之前分类正确的点变成错误点，这是可能发生的。但是没关系，不断迭代，不 断修正，最终会将所有点完全正确分类（PLA前提是线性可分的）。

实际操作中，可以一个点一个点地遍历，发现分类错误的点就进行修正，直到所有点 全部分类正确。这种被称为Cyclic PLA。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052587053.png)

下面用图解的形式来介绍PLA的修正过程：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052619008.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052634096.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052661027.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052672216.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052685638.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052911611.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052931375.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052943782.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052960165.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052972196.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600052984511.png)

对PLA，我们需要考虑以下两个问题：

- PLA迭代一定会停下来吗？如果线性不可分怎么办？
- PLA停下来的时候，是否能保证$f \approx g$？如果没有停下来，是否有$f \approx g$？

# Guarantee of PLA

根据PLA的定义， 当找到一条直线， 能将所有平面上的点都分类正确， 那么PLA就停止了。要达到这个终止条件， 就必须保证D是线性可分（Linear separable）。 如果是非线性可分的， 那么PLA就不会停止。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600069977872.png)

对于线性可分的情况， 如果有这样一条直线， 能够将正类和负类完全分开， 令这时候的目标权重为$w_f$， 则对每个点， 必然满足$y_n = sign(w_f^T x_n)$， 即对任一点：

$$y_{n(t)} w_f^T x_{n(t)} \geq \min_n y_n w_f^T x_n > 0$$

思考：为什么是这样？

回答：   $w^T x$表示各个特征的按权重加权的和， $y_n$表示对$w^T x$取符号， 所以它们同号永远大于0， 内积表示的是两个向量之间的距离。

PLA会对每次错误点进行修正， 更新权重$w_{t+1}$的值， 如果$w_{t+1}$与$w_f$越来越接近， 数学运算上就是内积越大， 那表示$w_{t+1}$是在接近目标权重$w_f$， 证明PLA是有学习效果的。 所以， 我们来计算$w_{t+1}$与$w_f$的内积：

$$
w^T w_{t+1} = w^T_f (w_t + y_{n(t)}x_{n(t)} 
\geq w_f^T w_t + \min_n y_n w_f^T x_n  > w_f^T w_t + 0
$$

从推导可以看出， $w_{t+1}$与$w_f$的内积相比更大了。但是内积更大， 可能是向量长度更长了， 不一定是向量角度更小。

所以，我们还需要证明$w_{t+1}$与$w_t$向量长度的关系：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600074227342.png)

$w_t$只会在分类错误的情况下更新， 最终得到的$\| w_{t+1}^2 \|$相比$\|w_t^2\|$的增量值不超过$max \| x_n^2 \|$。 也就是说， $w_t$的增长被限制了， $w_{t+1}$与$w_t$向量长度不会差别太大！

如果令初始权值$w_0 = 0$， 那么经过T次错误修正后， 有如下结论：

$$\frac{w_f^T}{\| w_f \|} \frac{w_T}{\| w_T \|} \geq \sqrt{T} · constant$$。

上述不等式左边其实是 与 夹角的余弦值，随着T增大，该余弦值越来越接近1，即$w_T$与$w_f$越来越近。 同时， 需要注意的是， $\sqrt{T} · constant \leq 1$， 也就是说， 迭代次数T是有上界的。

我们最终得到的结论是： $w_{t+1}$与$w_f$的是随着迭代次数增加， 逐渐接近的。 而且， PLA最终会停下来（因为T有上界）， 实现对线性可分的数据集完全分类。

# Non-Separable Data

对于线性可分的情况， PLA是可以停下来并正确分类的， 但对于非线性可分的情况， $w_f$实际上并不存在， 那么PLA不一定会停下来。

对于非线性可分的情况，我们可以把它当成是数据集D中掺杂了一下noise，事实上， 大多数情况下我们遇到的D，都或多或少地掺杂了noise。这时，机器学习流程是这样 的：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600079896505.png)

在非线性情况下，我们可以把条件放松，即不苛求每个点都分类正确，而是容忍有错 误点，取错误点的个数最少时的权重w：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600079952936.png)

ps： NP-hard 指 非常困难 的问题， 很多年没有解决的问题。


事实证明，上面的解是NP-hard问题，难以求解。然而，我们可以对在线性可分类型中表现很好的PLA做个修改，把它应用到非线性可分类型中，获得近似最好的g。

修改后的PLA称为Packet Algorithm。它的算法流程与PLA基本类似，首先初始化权重$w_0$，计算出在这条初始化的直线中，分类错误点的个数。然后对错误点进行修正，更新w，得到一条新的直线，在计算其对应的分类错误的点的个数，并与之前错误点个数比较，取个数较小的直线作为我们当前选择的分类直线。之后，再经过n次迭代，不 断比较当前分类错误点个数与之前最少的错误点个数比较，选择最小的值保存。直到 迭代次数完成后，选取个数最少的直线对应的w，即为我们最终想要得到的权重值。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600080388458.png)

如何判断数据集D是不是线性可分？对于二维数据来说，通常还是通过肉眼观察来判 断的。一般情况下，Pocket Algorithm要比PLA速度慢一些。

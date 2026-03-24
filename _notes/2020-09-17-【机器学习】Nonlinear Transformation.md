---
layout:     post
title:      "【机器学习】Nonlinear Transformation"
subtitle:   ""
date:       2020-09-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 
---


# Quadratic Hypothesis

之前介绍的线性模型，在2D平面上是一条直线，在3D空间中是一个平面。数学上，我们用线 性得分函数s来表示： $s = w^T x$。其中，x为特征值向量，w为权重，s是线性的。


![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600329416416.png)

线性模型的优点就是，它的VC Dimension比较小，保证了$E_{in} \approx E_{out}$。但是缺点也很明显， 对某些非线性问题，可能会造成$E_{in}$很大，虽然$E_{in} \approx E_{out}$，但是也造成$E_{out}$ 很大，分类效果不佳。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600329519858.png)

为了解决线性模型的缺点，我们可以使用非线性模型来进行分类。例如数据集D不是线性可分 的，而是圆形可分的，圆形内部是正类，外面是负类。假设它的hypotheses可以写成：

$$h_{SEP}(x) = sign(-x_1^2 - x_2^2 + 0.6)$$

基于这种非线性思想，我们之前讨论的PLA、Regression问题都可以有非线性的形式进行求解。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600329616859.png)

还是上面介绍的平面圆形分类例子，它的h(x)的权重￥$w_0=0.6，w_1=-1，w_2=-1$，但是h(x)的特征不是线性模型的$(1, x_1, x_2)$， 而是$(1, x_1^2, x_2^2)$。

我们令$z_0 = 1, z_1 = x_1^2, z_2 = x_2^2$， 那么， h(x)变成

$$h(x) = sign(\check{w_0} · z_0 + \check{w_1}·z_1 + \check{w_2} · z_2) = sign(0.6·z_0 - 1 · z_1 - 1 · z_2) = sign(\check{w^T z})$$

这种$x_n \rightarrow z_n$的转换可以看成是x空间的点映射到z空间中去，而在z域中，可以用一条直线进行分类，也就是从x空间的圆形可分映射到z空间的线性可分。z域中的直线对应于x域中的圆形。因此，我们把$x_n \rightarrow z_n$这个过程称之为特征转换（Feature Transform）。通过这种特征转换，可以将非线性模型转换为另一个域中的线性模型。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600330469063.png)

已知x域中圆形可分在z域中是线性可分的，那么反过来，如果在z域中线性可分，是否在x域中 一定是圆形可分的呢？答案是否定的。由于权重向量w取值不同，x域中的hypothesis可能是圆 形、椭圆、双曲线等等多种情况。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600330500522.png)

目前讨论的x域中的圆形都是圆心过原点的，对于圆心不过原点的一般情况， 映射公 式包含的所有项为：

$$\Phi_2(x) = (1, x_1, x_2, x_1^2, x_1x_2, x_2^2)$$

也就是说，对于二次hypothesis，它包含二次项、一次项和常数项1，z域中每一条线对应x域中 的某二次曲线的分类方式，也许是圆，也许是椭圆，也许是双曲线等等。那么z域中的 hypothesis可以写成：

$$H_{\Phi_2} = \{h(x) ： h(x) = \tilde h(\Phi_2(x)) \text{ for some linear $\tilde h$ on Z}\}$$


# Nonlinear Transform


上一部分我们定义了什么了二次hypothesis，那么这部分将介绍如何设计一个好的二次 hypothesis来达到良好的分类效果。那么目标就是在z域中设计一个最佳的分类线。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600330895497.png)

其实，做法很简单，利用映射变换的思想，通过映射关系，把x域中的最高阶二次的多项式转 换为z域中的一次向量，也就是从quardratic hypothesis转换成了perceptrons问题。用z值代替x 多项式，其中向量z的个数与x域中x多项式的个数一致（包含常数项）。这样就可以在z域中利 用线性分类模型进行分类训练。训练好的线性模型之后，再将z替换为x的多项式就可以了。具 体过程如下：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600331013144.png)

整个过程就是通过映射关系，换个空间去做线性分类，重点包括两个：
- 特征转换
- 训练线性模型

其实，我们以前处理机器学习问题的时候，已经做过类似的特征变换了。比如数字识别问题， 我们从原始的像素值特征转换为一些实际的concrete特征，比如密度、对称性等等，这也用到 了feature transform的思想。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600331093975.png)

# Price of Nonlinear Transform

若x特征维度是d维的，也就是包含d个特征，那么二次多项式个数，即z域特征维度是：

$$\check d = 1 + C_d^1 + C_d^2 + d = \frac{d(d+3)}{2} + 1$$

如果x特征维度是2维的，即$(x_1, x_2)$，那么它的二次多项式为$(1, x_1, x_2, x_1^2, x_1x_2, x_2^2)$，有6 个。

现在，如果阶数更高，假设阶数为Q，那么对于x特征维度是d维的，它的z域特征维度为：

$$\check d = C_{Q+d}^Q = C_{Q+d}^d = O(Q^d)$$

由上式可以看出，计算z域特征维度个数的时间复杂度是Q的d次方，随着Q和d的增大，计算量 会变得很大。同时，空间复杂度也大。也就是说，这种特征变换的一个代价是计算的时间、空间复杂度都比较大。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600345932528.png)

另一方面，z域中特征个数随着Q和d增加变得很大，同时权重w也会增大，即自由度增加，VC Dimension增大。令z域中的特征维度是$1 + \check d$，则在在域中，任何$\check d + 2$的输入都不能被 shattered；同样，在x域中，任何 的输入也不能被shattered。 $\check d + 1$是VC Dimension的 上界，如果$\check d + 1$很大的时候，相应的VC Dimension就会很大。根据之前章节课程的讨论， VC Dimension过大，模型的泛化能力会比较差。


![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600346897985.png)

下面通过一个例子来解释为什么VC Dimension过大，会造成不好的分类效果：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600347075580.png)

上图中，左边是用直线进行线性分类，有部分点分类错误；右边是用四次曲线进行非线性分 类，所有点都分类正确，那么哪一个分类效果好呢？单从平面上这些训练数据来看，四次曲线 的分类效果更好，但是四次曲线模型很容易带来过拟合的问题，虽然它的$E_{in}$比较小，从泛化能力上来说，还是左边的分类器更好一些。也就是说VC Dimension过大会带来过拟合问题， $\check d + 1$不能太大了。

那么如何选择合适的Q，来保证不会出现过拟合问题，使模型的泛化能力强呢？一般情况下， 为了尽量减少特征自由度，我们会根据训练样本的分布情况，人为地减少、省略一些项。但 是，这种人为地删减特征会带来一些“自我分析”代价，虽然对训练样本分类效果好，但是对训 练样本外的样本，不一定效果好。所以，一般情况下，还是要保存所有的多项式特征，避免对训练样本的人为选择。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600347358853.png)

# Structured Hypothesis Sets

下面，我们讨论一下从x域到z域的多项式变换。首先，如果特征维度只有1维的话，那么变换 多项式只有常数项：

$$\Phi_0(x) = (1)$$

如果特征维度是两维的， 变换多项式包含了一维的$\Phi_0(x)$：

$$\Phi_1(x) = (\Phi_0(x), x_1, x_2, ..., x_d)$$

如果特征维度是三维的，变换多项式包含了二维的$\Phi_1(x)$：

$$\Phi_2(x) = (\Phi_1(x), x_1^2, x_1x_2, ..., x_d^2)$$

以此类推，如果特征维度是Q次，那么它的变换多项式为：

$$\Phi_Q(x) = (\Phi_{Q-1}(x), x_1^Q, x_1^{Q-1}x_2, ..., x_d^Q)$$

对于不同阶次构成的hypothesis有如下关系：

$$H_{\Phi_0} \subset H_{\Phi_1} \subset H_{\Phi_2} \subset ... \subset H_{\Phi_Q}$$

我们把这种结构叫做Structured Hypothesis Sets：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600348149448.png)

那么对于这种Structured Hypothesis Sets，它们的VC Dimension满足下列关系：

$$d_{VC}(H_0) \leq d_{VC}(H_1) \leq d_{VC}(H_2) \leq ... \leq d_{VC}(H_Q)$$

它的$E_{in}$满足下列关系：

$$E_{in}(g_0) \geq E_{in}(g_1) \geq E_{in}(g_2) \geq \cdots \geq E_{in}(g_Q)$$

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600348308165.png)

从上图中也可以看到，随着变换多项式的阶数增大，虽然$E_{in}$逐渐减小，但是model complexity会逐渐增大，造成$E_{out}$很大，所以阶数不能太高。

那么，如果选择的阶数很大，确实能使$E_{in}$接近于0，但是泛化能力通常很差，我们把这种情况叫做tempting sin。所以，一般最合适的做法是先从低阶开始，如先选择一阶hypothesis，看看$E_{in}$是否很小，如果$E_{in}$足够小的话就选择一阶，如果$E_{in}$大的话，再逐渐增加阶数，直到满足要求为止。也就是说，尽量选择低阶的hypothes，这样才能得到较强的泛化能力。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1600348448814.png)
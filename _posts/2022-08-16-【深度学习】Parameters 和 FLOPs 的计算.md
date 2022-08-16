---
layout:     post
title:      "【深度学习】Parameters 和 FLOPs 的计算"
subtitle:   ""
date:       2022-08-16
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    -
---

假设输入的维度为 $C_{in}$， 输出维度为 $C_{out}$， 不考虑bias。

# 全连接层



参数量：

$$
\text{Params} = C_{in} \times C_{out} 
$$

FLOPs：

多个输入神经元对应单个输出神经元进行乘法的次数为 $C_{in}$，进行加法的次数为 $C_{in} - 1$

$$
\text{FLOPs} = (C_{in} + (C_{in} - 1)) \times C_{out} = (2 \times C_{in} - 1) \times C_{out}
$$

# 池化层



参数量为0


FLOPs：

$$
\text{FLOPs} =  C_{in} \times H_{in} \times W_{in} 
$$

ptflops 中对所有池化忽略 kernel 的计算。

```python
def pool_flops_counter_hook(module, input, output):
    input = input[0]
    module.__flops__ += int(np.prod(input.shape))
```


# Vanilla Convolution

Params:

$$
\text{Params} = (K_h \times  K_w \times  C_{in}) \times  C_{out} 
$$


FLOPs:

$$
\text{FLOPs} =[（K_h \times K_w \times  C_{in}) + (K_h \times  K_w \times  C_{in} - 1）] \times  H_{out} \times  W_{out} \times  C_{out}
$$

上式中，把卷积计算分为两个部分，一部分表示乘法，一部分表示加法，加法只需 n-1 次

# Group Convolution

Params：

分组卷积的输出特征图的每个通道，只和输入特征图的一部分通道有关，而这部分通道，就是一个分组(Group)。假设输入特征图的尺寸为 $C_{in} * H * W$， 分为 $g$ 组进行分组卷积，对于每一组输出特征图的通道数是 $\frac{C_{out}}{g}$， 每组的卷积核参数为：

$$
\text{Params} = K_h \times  K_w \times  \frac{C_{in}}{g} \times  \frac{C_{out}}{g}
$$

最后只需要将各个分组的计算结果按照通道进行连接(Cat)即可，总体的参数量为：

$$
\text{Params} = K_h \times  K_w \times  \frac{C_{in}}{g} \times  \frac{C_{out}}{g} \times  g
$$

参数量减少为普通卷积的 $1/g$。


FLOPs：

$$
\text{FLOPs} =[（K_h \times  K_w \times  \frac{C_{in}}{g}) + (K_h \times  K_w \times  \frac{C_{in}}{g} - 1）] \times  H_{out} \times  W_{out} \times  \frac{C_{out}}{g} \times  g
$$

FLOPs 也减少为接近原来的 $1 / g$

# Depthwise Convolution

Params:

Depthwise 卷积的分组数与输入通道数相同，参数量为：

$$
\text{Params} = K_h \times  K_w \times  \frac{C_{in}}{C_{in}} \times  \frac{C_{in}}{C_{in}}  \times  C_{in} = K_h \times  K_w \times  C_{in}
$$

FLOPs：

$$
\text{FLOPs}  = [（K_h \times  K_w) + (K_h \times  K_w  - 1）] \times  H_{out} \times  W_{out} \times C_{in}
$$


# Pointwise Convolution
Params：

Poisntwise 卷积就是 $1 \times 1$ 卷积：

$$
\text{Params} = 1 \times 1 \times C_{in} \times C_{out}
$$
FLOPs：

$$
\text{FLOPs} = [（1 \times 1 \times C_{in}) + (1 \times 1 \times C_{in} - 1）] \times H_{out}  \times  W_{out} \times C_{out}
$$
$1 \times 1$ 卷积就是空间上共享权重，在通道上的全连接层。



# ReLU / GELU

Params 为 0

FLOPs：

$$
\text{FLOPs} = C_{out} \times H_{out} \times W_{out}
$$


# BN 
$$
y = \frac{x - E[x]}{\sqrt{Var[x] + \epsilon}} \times \gamma + \beta
$$
参数为 $\gamma$ 和 $\beta$。

Params:



$$
\text{Params} = 2 \times C_{in}
$$

FLOPs：

$$
\text{FLOPs} = C_{in} \times H_{out} \times W_{out} 
$$



ptflops 中的实现：

```python
def bn_flops_counter_hook(module, input, output):
    input = input[0]

    batch_flops = np.prod(input.shape)
    if module.affine:
        batch_flops *= 2
    module.__flops__ += int(batch_flops)
```




# References
1. [Parameters & FLOP](https://surui.ink/2020/05/27/FLOPs/)
2. [神经网络的FLOPs计算（一）：理论篇](https://blog.csdn.net/weixin_43915709/article/details/94566125)
3. [https://github.com/sovrasov/flops-counter.pytorch/blob/master/ptflops/pytorch_ops.py](https://github.com/sovrasov/flops-counter.pytorch/blob/master/ptflops/pytorch_ops.py)
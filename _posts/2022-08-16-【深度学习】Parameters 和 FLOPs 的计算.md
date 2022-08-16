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

假设输入的维度为 $C_{in}$， 输出维度为 $C_{out}$， 不考虑bias

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
\text{FLOPs} =  H_{in} \times W_{in} \times C_{in}
$$




# Vanilla Convolution 

# Group Convolution

# Depthwise Convolution

# Pointwise Convolution



# References
1. [Parameters & FLOP](https://surui.ink/2020/05/27/FLOPs/)
2. [神经网络的FLOPs计算（一）：理论篇](https://blog.csdn.net/weixin_43915709/article/details/94566125)
3. 
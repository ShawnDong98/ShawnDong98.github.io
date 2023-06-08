---
layout:     post
title:      "【深度学习】Deep Unfolding， Diffusion Model and CASSI"
subtitle:   ""
date:       2023-06-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Diffusion
    - HSI
---

# Deep Unfolding

病态逆问题通常求解下式：

$$
y = \Phi x + n \tag{1}
$$

从贝叶斯视角，可以使用最大后验估计（MAP），求解上式

$$
\hat x = \text{arg} \max_x p(x \mid y) = \text{arg} \max_x \frac{p(y \mid x) p(x)}{p(y)} = \text{arg} \max_x p(y \mid x)p(x) \tag{2}
$$

假设 $y$ 的加性高斯白噪声 $\epsilon \thicksim N(0, \sigma_\epsilon^2)$, MAP形式的等式（2）可以写作：

$$
\begin{aligned}
\hat x &= \text{arg} \max_x \exp[-\frac{1}{2 \sigma_\epsilon^2} \|y - Ax\|_2^2 + \log p(x)] \\
&= \text{arg} \min_x \frac{1}{2} \|y - Ax\|_2^2 - \sigma_\epsilon^2 \log p(x) 
\end{aligned}\tag{3}
$$

通过将位置噪声变量 $\sigma_\epsilon^2$ 替换为噪声平衡系数 $\lambda$， 将负对数先验函数 $p(x)$ 替换为正则项 $R(x)$， 等式（3）可写作：

$$
\hat x = \text{arg}\max_x \frac{1}{2} \| y - Ax\|_2^2 + \lambda R(x) \tag{4}
$$


## Proximal Gradient Descent (PGD)

PGD 算法通过以下迭代函数将等式（4）估计为迭代收敛问题：


$$
\hat x^k = \text{arg} \min_x \frac{1}{2 \rho} \| x - (\hat x^{k-1} - \rho \Phi^T(\Phi \hat x^{k-1} - y))\|_2^2 + \lambda R(x)
$$

它得到一个数据子问题（梯度下降）和一个先验子问题（近端映射）：

$$
v^k = \hat x^{k-1} - \rho \Phi^T(\Phi x^{k-1} - y)
$$

$$
\hat x^k = \text{prox}_{\lambda, J}(v^k) 
$$




## HQS

## ADMM

# Diffusion Model

## DDPM

## SMLD


## SDEs


## ODEs



# CASSI System


# Reference


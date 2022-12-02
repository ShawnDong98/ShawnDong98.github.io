---
layout:     post
title:      "【深度学习】Diffusion Model"
subtitle:   ""
date:       2022-12-02
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - 深度学习
    - Diffusion
---



# 条件概率公式与高斯分布的KL散度

## 条件概率的一般形式

$$
P(A, B, C) = P(C \mid B, A) P(B, A) = P(C \mid B, A) P(B \mid A) P(A)
$$

$$
P(B, C \mid A) = P(B \mid A) P(C \mid A, B)
$$

## 基于马尔科夫假设的条件概率

如果满足马尔科夫链关系 $A \rightarrow B \rightarrow C$， 那么有：

$$
P(A, B, C) = P(C \mid B, A) P(B, A) = P(C \mid B) P(B \mid A) P(A)
$$
$$
P(B, C \mid A) = P(B \mid A) P(C \mid B)
$$
## 高斯分布的 KL 散度公式

对于两个单一变量的高斯分布 $p$ 和 $q$ 而言， 它们的 KL 散度为：

$$
KL(p, q) = \log \frac{\sigma_2}{\sigma_1} + \frac{\sigma^2 + (\mu_1 - \mu_2)^2}{2 \sigma_2^2} - \frac{1}{2}
$$

## 重参数技巧

若希望从高斯分布 $N(\mu, \sigma)$ 中采样， 可以先从标准发布 $N(0, 1)$ 采样出 $z$， 再得到 $\sigma * z + \mu$。 这样做的好处是将随机性转移到变量 $z$ 上， 而 $\sigma$ 和 $\mu$ 当做仿射变换网络的一部分。


# VAE 与多层 VAE

## 单层 VAE 的原理公式与变分下限

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1669963890693.png)

$$p(x) = \int_z p_\theta(x \mid z)p(z)$$

$$
p(x) = \int_z q_\phi(z \mid x) \frac{p_\theta(x \mid z) p(z)}{q_\phi(z \mid x)}
$$

$$
\log p(x) = \log E_{z \thicksim q_\phi(z \mid x)}[\frac{p_\theta(x \mid z)p(z)}{q_\phi(z \mid x)}]
$$
$$
\log p(x) \geq E_{z \thicksim q_\phi(z \mid x)}[\log \frac{p_\theta(x \mid z)p(z)}{q_\phi(z \mid x)}]
$$


## 多层 VAE 的原理与变分下限

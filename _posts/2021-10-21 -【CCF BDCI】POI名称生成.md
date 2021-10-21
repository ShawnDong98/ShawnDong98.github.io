---
layout:     post
title:      "【CCF BDCI】POI名称生成"
subtitle:   ""
date:      2021-10-21 
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Competition
    - 
---


# 评测标准

评测集每个挂牌的名称真值由一个最优名称和大于等于0个可接受名称组成。


预测结果命中最优名称得1分；命中可接受名称得0.5分；其他情况为预测错误，不得分。最终得分为所有样本得分除以测试样本总数。


如下公式所示：

$$
s_i = \begin{cases}
1, & \text{if } p_i = g_i \\
0.5, & \text{elif } p_i \in C_i \\
0, & \text{else}
\end{cases}
$$

$$S = \frac{\sum_{i}^N s_i}{N}$$ 

$p_i$ 表示第 $i$ 个测试数据的预测结果， $g_i$ 表示第 $i$ 个测试数据的最优名称， $C_i$ 表示第 $i$ 个测试数据的得分。 $N$ 表示测试数据的个数。 $S$ 表示最后得分。
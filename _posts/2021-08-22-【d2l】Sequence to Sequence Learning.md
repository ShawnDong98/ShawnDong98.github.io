---
layout:     post
title:      "【d2l】Sequence to Sequence Learning"
subtitle:   ""
date:       2021-08-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 深度学习
---


# Evaluation of Predicted Sequences

我们可以通过将预测序列与标签序列(ground-truth)进行比较来评估该序列。BLEU (Bilingual Evaluation Understudy),  尽管最初提出用于评估机器翻译结果\[Papineni等人，2002\]，但现在已广泛用于评价不同应用输出序列的质量。原则上， 对于预测序列的所有 n-grams (n-grams 表示连续出现的n个词)， BLEU 评估这个 n-grams 是否出现在标签序列中。

n-grams 的准确率表示为 $p_n$， 它是在预测序列与标签序列匹配的 n-grams 数量 与  预测序列的 n-grams  数量的比值。 
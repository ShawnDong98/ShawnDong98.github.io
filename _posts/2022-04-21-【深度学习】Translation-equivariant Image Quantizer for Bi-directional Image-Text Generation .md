---
layout:     post
title:      "【深度学习】Translation-equivariant Image Quantizer for Bi-directional Image-Text Generation "
subtitle:   ""
date:       2022-04-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - MMML
---


# Abstract
近年来，vector-quantized 图像建模在文本到图像的生成等生成任务中取得了令人印象深刻的性能。

然而， 这篇文章发现现在的 image quantizers 由于 aliasing 在 quantized 空间中不能满足平移不变性， 损害了下游任务 text-to-image 生成 和 image-to-text 生成的性能。

这篇文章没有专注于 anti-aliasing，而是采取了一种直接的方法来鼓励 quantized 空间中的 translation equvariance。

特别地，这篇文章探索了 image quantizers 的一个理想性质，称为 quantized 空间中的 Translation Equivariance，并提出了一种简单而有效的方法，通过在 codebook embedding vectors 正则化或正交化来实现translation equivariance。

使用该方法，文本-图像生成的准确率提高了22%，图像-文本生成的准确率提高了26%，优于VQGAN。
# Conclusion

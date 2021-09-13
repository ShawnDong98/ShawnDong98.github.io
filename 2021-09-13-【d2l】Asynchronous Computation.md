---
layout:     post
title:      "【d2l】Asynchronous Computation"
subtitle:   ""
date:       2021-09-13
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - d2l
    - 深度学习
---


今天的计算机是高度并行的系统，由多个CPU核(通常每个核有多个线程)、每个GPU有多个处理单元、每个设备通常有多个GPU组成。简而言之，我们可以同时处理许多不同的事情，通常是在不同的设备上。不幸的是，Python不是编写并行和异步代码的好方法，至少没有一些额外的帮助是不行的。毕竟，Python是单线程的，这在未来不太可能改变。MXNet和TensorFlow等深度学习框架采用异步编程模型来提高性能，而PyTorch使用Python自己的调度器，导致了不同的性能权衡。对于PyTorch，默认情况下，GPU操作是异步的。当你调用一个使用GPU的函数时，这些操作会排队到特定的设备上，但不一定会在之后执行。


因此，了解异步编程如何工作有助于我们开发更高效的程序， 异步编程主动减小计算需求和相互依赖。这允许我们减少内存开销并增加处理器利用率。
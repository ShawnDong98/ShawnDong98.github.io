---
layout:     post
title:      "【深度学习笔录】Windows下Docker深度学习环境配置"
subtitle:   ""
date:       2019-12-25
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - Docker
    - 深度学习
---

## 配置Nvida-Docker

Windows上不支持从Docker容器内进行GPU访问.
您需要nvidia-docker,但目前仅在Linux平台上支持.使用Hyper-v的GPU直通将需要离散设备分配(DDA),目前仅在Windows Server中,并且(at least in 2015)没有计划改变这种状态.因此,NVIDIA目前还没有将nvidia-docker移植到Windows.
这里有更多信息：https://devblogs.nvidia.com/nvidia-docker-gpu-server-application-deployment-made-easy/

卒

## Reference
1. [是否可以使用适用于Windows的docker进行GPU传递？](https://bbs.csdn.net/topics/394360047)
2. [NVIDIA docker on windows?](https://github.com/NVIDIA/nvidia-docker/issues/665)
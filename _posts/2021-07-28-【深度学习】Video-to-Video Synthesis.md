---
layout:     post
title:      "【深度学习】Video-to-Video Synthesis"
subtitle:   ""
date:       2021-07-28
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - GAN
---



# 安装vid2vid

安装 dominate 和 requests

```
pip install dominate requests
```

安装dlib：

```
pip install dlib
```

如果报错，可能需要安装：

```
apt-get install cmake

apt-get install libboost-python-dev

pip install dlib
```

如果使用 以下 docker环境 (cuda9)，一切安装顺利

```
docker pull zhiyuanzhao/cuda9-py36-pytorch1.1-nccl-ompi
```
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



# 运行vid2vid


## 安装

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



## 下载模型和数据集

下载运行的示例数据集

```
python scripts/download_datasets.py
```

可能会因为网络原因报错， 直接使用链接下载[https://docs.google.com/u/0/uc?export=download&confirm=Ccgd&id=1rPcbnanuApZeo2uc7h55OneBkbcFCnnf](https://docs.google.com/u/0/uc?export=download&confirm=Ccgd&id=1rPcbnanuApZeo2uc7h55OneBkbcFCnnf)

编译安装FlowNet2

```
python scripts/download_flownet2.py
```

可能会报错

如果使用 以下 docker环境 (cuda9)，则一切安装顺利

```
docker pull zhiyuanzhao/cuda9-py36-pytorch1.1-nccl-ompi
```


### 



下载模型和数据集，
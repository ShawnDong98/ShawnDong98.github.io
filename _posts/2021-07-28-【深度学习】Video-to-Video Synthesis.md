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

可能会因为网络原因报错， 直接使用链接下载 [https://docs.google.com/u/0/uc?export=download&confirm=Ccgd&id=1rPcbnanuApZeo2uc7h55OneBkbcFCnnf](https://docs.google.com/u/0/uc?export=download&confirm=Ccgd&id=1rPcbnanuApZeo2uc7h55OneBkbcFCnnf)

编译安装FlowNet2

```
python scripts/download_flownet2.py
```

可能会报错

如果使用 以下 docker环境 (cuda9)，则一切安装顺利

```
docker pull zhiyuanzhao/cuda9-py36-pytorch1.1-nccl-ompi
```


### Cityscapes

下载预训练模型

```
python scripts/street/download_models.py
```

网络原因可能下载失败， 直接用链接下 [https://docs.google.com/u/0/uc?export=download&confirm=Ccgd&id=1MKtImgtnGC28EPU7Nh9DfFpHW6okNVkl](https://docs.google.com/u/0/uc?export=download&confirm=Ccgd&id=1MKtImgtnGC28EPU7Nh9DfFpHW6okNVkl)



测试模型(`bash ./scripts/street/test_2048.sh`)

```
#!./scripts/street/test_2048.sh
python test.py --name label2city_2048 --label_nc 35 --loadSize 2048 --n_scales_spatial 3 --use_instance --fg --use_single_G
```

结果被保存在： `./results/label2city_2048/test_latest/`

也提供单GPU更小模型的训练， 产生稍微差些的效果(1024 x 512 分辨率)

下载模型

```
python scripts/street/download_models_g1.py
```

测试模型(`bash ./scripts/street/test_g1_1024.sh`)：

```
#!./scripts/street/test_g1_1024.sh
python test.py --name label2city_1024_g1 --label_nc 35 --loadSize 1024 --n_scales_spatial 3 --use_instance --fg --n_downsample_G 2 --use_single_G
```

在 `scripts/street/` 文件夹下找到这些脚本

### Faces

下载预训练模型：

```
python scripts/face/download_models.py
```

网络原因可能下载失败， 直接用链接下 [https://docs.google.com/u/0/uc?export=download&confirm=Ccgd&id=10LvNw-2lrh-6sPGkWbQDfHspkqz5AKxb](https://docs.google.com/u/0/uc?export=download&confirm=Ccgd&id=10LvNw-2lrh-6sPGkWbQDfHspkqz5AKxb)

测试模型 `bash ./scripts/face/test_512.sh`

```
#!./scripts/face/test_512.sh
python test.py --name edge2face_512 --dataroot datasets/face/ --dataset_mode face --input_nc 15 --loadSize 512 --use_single_G
```

测试结果保存在： `./results/edge2face_512/test_latest/`


## 其他bug


`TypeError: object of type <class 'numpy.float64'> cannot be safely interpreted as an integer.`

这个错误由 numpy 1.18 的 api 导致， 将它降级为 1.17

` Object arrays cannot be loaded when allow_pickle=False`



# Reference
1. [Error when evaluate: object of type <class 'numpy.float64'> cannot be safely interpreted as an integer #580](https://github.com/facebookresearch/detectron2/issues/580)




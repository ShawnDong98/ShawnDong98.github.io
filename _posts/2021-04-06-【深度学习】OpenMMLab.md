---
layout:     post
title:      "【深度学习】OpenMMLab"
subtitle:   ""
date:       2021-04-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# MMCV

## 安装


```
pip install mmcv-full==1.3.0 -f https://download.openmmlab.com/mmcv/dist/cu110/torch1.7.0/index.html
```


# MMPose

## 安装

先安装MMCV， 然后再进行下面的安装

```
# install mmpose
git clone git@github.com:open-mmlab/mmpose.git
cd mmpose
pip install -r requirements.txt
python setup.py develop
```

要求numpy版本 1.20.0




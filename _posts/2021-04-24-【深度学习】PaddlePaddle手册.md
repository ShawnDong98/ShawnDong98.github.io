---
layout:     post
title:      "【深度学习】PaddlePaddle手册"
subtitle:   ""
date:       2021-04-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# PaddlePaddle

## 安装


cuda 11.0 paddlepaddle 2.0.2 稳定版本


```
python -m pip install paddlepaddle-gpu==2.0.2.post110 -f https://paddlepaddle.org.cn/whl/mkl/stable.html
```


# PaddleHub


# VisualDL可视化


```
python -u tools/train.py -c configs/yolov3_mobilenet_v1_fruit.yml --use_vdl=True -- vdl_log_dir=vdl_fruit_dir/scalar --eval
```

- 启动命令添加--use_vdl=True
- 通过 --vdl_log_dir 设置日志保存路径


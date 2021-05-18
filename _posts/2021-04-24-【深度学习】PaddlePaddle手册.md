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

# PaddleDetection

## VisualDL可视化


```
python -u tools/train.py -c configs/yolov3_mobilenet_v1_fruit.yml --use_vdl=True -- vdl_log_dir=vdl_fruit_dir/scalar --eval
```

- 启动命令添加--use_vdl=True
- 通过 --vdl_log_dir 设置日志保存路径


过visualdl命令实时查看变化曲线：

```
visualdl --logdir vdl_dir/scalar/ --host 127.0.0.1 --port 6006
```

## 一键式训练、评估、预测

```
python slim/prune/prune.py -c ./configs/yolov3_mobilenet_v1_voc.yml --pruned_params "yolo_block.0.0.0conv.weights" --pruned_ratios="0.2"
```

## 导出模型

```
python slim/prune/export_model.py -c ./configs/yolov3_mobilenet_v1_voc.yml --pruned_params "yolo_block.0.0.0conv.weights" --pruned_ratios="0.2" -o weights=output/yolov3_mobilenet_v1_voc/model_final
```


## 新增模型算法

PaddleDetection的网络模型模块所有代码逻辑在ppdet/modeling/中，所有网络模型是以组件的形式进行定义与组合，网络模型模块的主要构成如下架构所示：

```
ppdet/modeling/
  ├── architectures      #
  │   ├── faster_rcnn.py # Faster Rcnn模型
  │   ├── ssd.py         # SSD模型
  │   ├── yolov3.py      # YOLOv3模型
  │   │   ...
  ├── anchor_heads       # anchor生成检测头模块
  │   ├── xxx_head.py    # 定义各类anchor生成检测头
  ├── backbones          # 基干网络模块
  │   ├── resnet.py      # ResNet网络
  │   ├── mobilenet.py   # MobileNet网络
  │   │   ...
  ├── losses             # 损失函数模块
  │   ├── xxx_loss.py    # 定义注册各类loss函数
  ├── roi_extractors     # 检测感兴趣区域提取
  │   ├── roi_extractor.py  # FPNRoIAlign等实现
  ├── roi_heads          # 两阶段检测器检测头
  │   ├── bbox_head.py   # Faster-Rcnn系列检测头
  │   ├── cascade_head.py # cascade-Rcnn系列检测头
  │   ├── mask_head.py   # Mask-Rcnn系列检测头
  ├── tests  # 单元测试模块
  │   ├── test_architectures.py  # 对网络结构进行单元测试
  ├── ops.py  # 封装及注册各类PaddlePaddle物体检测相关公共检测组件/算子
  ├── target_assigners.py # 封装bbox/mask等最终结果的公共检测组件
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1621360356334.png)

### 新增模型

搭建新模型的一般步骤是：Backbone编写、检测组件编写与模型组网这三个步骤

#### Backbone编写

1） 代码编写： PaddleDetection中现有所有Backbone网络代码都放置在ppdet/modeling/backbones目录下，所以我们在其中新建res2net.py如下：

```python
from ppdet.core.workspace import register

@register
class DarkNet(object):

    __shared__ = ['norm_type', 'weight_prefix_name']

    def __init__(self,
                 depth=53,
                 norm_type='bn',
                 norm_decay=0.,
                 weight_prefix_name=''):
        # 省略内容
        pass

    def __call__(self, input):
        # 省略处理逻辑
        pass
```


然后在backbones/\_\_init\_\_.py中加入引用：

```
from . import darknet
from .darknet import *
```

**几点说明：**

- 为了在yaml配置文件中灵活配置网络，所有Backbone、模型组件与architecture类需要利用`ppdet.core.workspace` 里的 `register` 进行注册，形式请参考如上示例；
- 在Backbone中都需定义__init__函数与__call__函数，\_\_init\_\_函数负责初始化参数，在调用此Backbone时会执行__call__函数；
- \_\_shared\_\_为了实现一些参数的配置全局共享，具体细节请参考配置文件说明文档。

# PaddleX

安装

```
pip install paddlex -i https://mirror.baidu.com/pypi/simple
```


## 数据标注、转换、划分

### 格式转换

LabelMe标注后的数据还需要进行转换为PascalVOC或MSCOCO格式，才可以用于目标检测任务的训练，创建D:\dataset_voc目录，在python环境中安装paddlex后，使用如下命令即可

```
paddlex --data_conversion --source labelme --to PascalVOC \
        --pics D:\MyDataset\JPEGImages \
        --annotations D:\MyDataset\Annotations \
        --save_dir D:\dataset_voc
```


### 数据集划分

转换完数据后，为了进行训练，还需要将数据划分为训练集、验证集和测试集，同样在安装paddlex后，使用如下命令即可将数据划分为70%训练集，20%验证集和10%的测试集

```
paddlex --split_dataset --format VOC --dataset_dir D:\MyDataset --val_value 0.2 --test_value 0.1
```

执行上面命令行，会在D:\MyDataset下生成labels.txt, train_list.txt, val_list.txt和test_list.txt，分别存储类别信息，训练样本列表，验证样本列表，测试样本列表


# Reference
1. [PaddlePaddle/PaddleDetection](https://github.com/PaddlePaddle/PaddleDetection)
2. [PaddlePaddle/PaddleX](https://github.com/PaddlePaddle/PaddleX)
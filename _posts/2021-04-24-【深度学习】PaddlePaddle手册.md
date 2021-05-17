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
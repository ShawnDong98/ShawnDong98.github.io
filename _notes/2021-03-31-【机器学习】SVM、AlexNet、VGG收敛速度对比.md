---
layout:     post
title:      "【机器学习】SVM、AlexNet、VGG收敛速度对比"
subtitle:   ""
date:       2021-03-31
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 
---


# SVM

## 数据集

```python
from sklearn.datasets import fetch_mldata
mnist = fetch_mldata('MNIST original')
mnist
```

直接下载MNST数据集文件：

[https://github.com/amplab/datascience-sp14/raw/master/lab7/mldata/mnist-original.mat](https://github.com/amplab/datascience-sp14/raw/master/lab7/mldata/mnist-original.mat)

把下载好的mnist-original.mat放在datasets\mldata下


拆分数据集

```python
x,test_x,y,test_y = train_test_split(mnist['data'],mnist['target'],test_size=1/7,random_state=40)
x.shape
```

## 模型

```python
model = svm.LinearSVC()
```

训练：

```python
model.fit(x, y)
```


预测：

```python
z = model.predict(test_x)
```

准确率：

```python
print('准确率:',np.sum(z==test_y)/z.size)
```


## 损失




# AlexNet


# VGG



# Reference
1. [机器学习实战3-sklearn使用下载MNIST数据集进行分类项目](https://blog.csdn.net/qq_30815237/article/details/87972110)




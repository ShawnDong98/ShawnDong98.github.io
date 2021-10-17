---
layout:     post
title:      "【Kaggle】PetFinder"
subtitle:   ""
date:       2021-10-17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Kaggle
    - 
---

# Overview

## Description

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1634437283803.png)

一图胜千言。你知道吗，一张照片可以拯救千万条生命？世界各地每天都有数百万流浪动物在街头受苦或在收容所被安乐死。你可能会认为带着迷人照片的宠物会引起更多的兴趣，并更快地被收养。但怎样才能拍出好照片呢？在数据科学的帮助下，你可以准确地判断宠物照片的吸引力，甚至提出改进建议，让这些被救助的动物有更高的机会拥有爱的家。

[PetFinder.my](PetFinder.my)使用基本的可爱指数(Cuteness Meter)来对宠物照片进行排名。它分析了图片组成和其他因素，并将其与成千上万的宠物档案的表现进行了比较。虽然这个基本工具很有用，但它仍处于实验阶段，算法还可以改进。

在本次比赛中，您将分析原始图像和元数据，以预测宠物照片的Pawpularity。你将会在 [PetFinder.my](PetFinder.my) 上千个宠物档案中训练和测试你的模型。获胜的版本将会提供更准确的推荐， 这会帮助到动物福利。如果成功，你的解决方案将被应用到人工智能工具中，指导世界各地的庇护所和救援人员提高他们宠物档案的吸引力，自动提高照片质量，并推荐改进构图。因此，流浪狗和流浪猫可以更快地找到它们“永远”的家。在Kaggle社区的一点点帮助下，许多宝贵的生命可以被拯救，更多的幸福家庭可以建立起来。

顶级参与者可能会被邀请合作实施他们的解决方案，并利用他们的人工智能技能创造性地改善全球动物福利。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1634437747688.png)

## Evaluation

**Root Mean Squared Error 𝑅𝑀𝑆𝐸**

提交使用均方根损失打分。 RMSE 定义为：

$$
RMSE = \sqrt{\frac{1}{n} \sum_{i=1}^n(y_i - \hat y_i)^2} 
$$

对于每个样本 $i$， 其中 $\hat y_i$ 是预测值， $y_i$ 是原始值

**Submission File**

对于测试集中的每个 `Id`， 你必须预测目标变量中 `Pawpularity` 的概率。 该文件应该包含一个 header ，并具有以下格式： 

```
Id, Pawpularity
0008dbfb52aa1dc6ee51ee02adf13537, 99.24
0014a7b528f1682f0cf3b73a991c17a0, 61.71
0019c1388dfcd30ac8b112fb4250c251, 6.23
00307b779c82716b240a24f028b0031b, 9.43
00320c6dd5b4223c62a9670110d47911, 70.89
etc.
```

## Code Requirements

参赛作品必须通过 Notebooks 提交。为了使“提交”按钮在提交后处于活动状态，必须满足以下条件：

- CPU Notebook <= 9 小时运行时间
- GPU Notebook <= 9 小时运行时间
- 互联网接入禁用
- 允许免费和公开的外部数据，包括预训练的模型
- 提交文件必须命名为 `submission.csv`


# Data

在这个比赛中，你的任务是根据宠物的照片和宠物的文件预测其互动程度。您将会被提供每张照片手工标记的元数据。因此，本次竞赛的数据集包括图像和表格数据。

# How Pawpularity Score Is Derived

- Pawpularity Score是通过对不同页面、平台(网页和手机)和各种指标的流量数据进行标准化的算法，从列表页面上的每个宠物的页面视图统计数据中得到的。
- 重复点击、爬虫机器人访问和 sponsored profiles 将从分析中排除。
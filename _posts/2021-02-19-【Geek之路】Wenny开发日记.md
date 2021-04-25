---
layout:     post
title:      "【Geek之路】Wenny开发日记"
subtitle:   ""
date:       2021-02-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - 
---

# Wenny是什么

Wenny是一款**基于传感器的**、**易于唤醒的**、**主动式的**、**有温度的**人工智能助手。

**基于传感器**， 指的是Wenny基于可穿戴设备上的智能传感器的数据融合完成决策。如耳机、眼镜、手表、鞋子、衣物等。

**易于唤醒**， 指的是Wenny的唤醒方式多样， 可通过耳机麦克风、眼镜骨传导、手表麦克风收音唤醒；可通过与耳机、眼镜、手表接触式操作唤醒， 如触摸或双击耳机、 触摸眼镜支架、手表实体按键等。


**主动式的**， 指的是与当前的人工智能助手等待主体唤醒不同， Wenny基于多传感器融合， 计算得到当前主体的状态， 主动地向主体发问是否需要某种需求。 例如， 当耳机监测到环境噪声过大时，询问主体是否开启主动降噪；例如， 当眼镜监测到眼球的注意力集中在某物体时，询问主体是否放大该方位的物体；例如，当通过鞋子手表等传感器监测到主体在运动， 并且戴上了耳机时， 询问主体是否需要播放音乐。

**有温度的**， 人工智能助手不应该是仅为主体提供服务的冰冷的机器。 Wenny基于当前的时间以及过去主体的生活习惯， 在适时向主体发出问候。 例如，清晨时， 基于日期和闹钟等预测主体起床时间， 播放音乐帮助主体起床；例如，当监测到主体久坐到下午茶时间时， 询问是否需要点下午茶；例如， 午饭、晚饭时基于评价向主体推荐不同的美食。


# Wenny开发技术路线

## 唤醒词

备选1：基于科大讯飞唤醒词SDK

## 语音识别

备选1： [https://github.com/binzhouchn/masr](https://github.com/binzhouchn/masr)
备选2： 科大讯飞语音识别


## 文本生成


备选1： 百度PaddleHub开源文本生成模型
备选2：[chitchat](https://github.com/yangjianxin1/GPT2-chitchat)（可用、易用）
备选3： [GPT2-Chinese](https://github.com/Morizeyao/GPT2-Chinese)
备选4：[CDial-GPT](https://github.com/thu-coai/CDial-GPT)(可用、易用)

## 语音生成

备选1： 百度PaddleHub语音生成
备选2： [zhrtvc](https://github.com/KuangDD/zhrtvc/blob/master/zhrtvc/README.md)
备选3： [zhtts](https://github.com/Jackiexiao/zhtts)（可用、易用）

### 问题

第一个词大部分时候发音不清楚

## 播放声音


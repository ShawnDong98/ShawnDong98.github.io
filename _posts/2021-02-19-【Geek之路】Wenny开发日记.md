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

# wenny的核心能力

## OS调度

## 推荐算法

基于**多传感器数据融合** **上下文环境感知**后的**推荐算法**


## 闲聊能力

闲聊是个伪需求，当我们知道和我们交流的是机器而不是人的时候就会失去聊天的欲望。

聊天是带有目的性的，是有欲望的， 不管是性欲， 还是从对方身上得到知识， 如果我们知道机器不能给我们带来有用的信息， 就不会产生聊天/交流的欲望。 

交流的欲望 其实 是得到信息的欲望。 



# Wenny开发技术路线

## 唤醒词

备选1：基于科大讯飞唤醒词SDK \\
备选2： Snowboy \\
备选3： Mycroft Precise \\
备选4： [Porcupine](https://github.com/Picovoice/Porcupine)

## 语音识别

备选1： [masr](https://github.com/binzhouchn/masr)（可用、易用）\\
备选2： 科大讯飞语音识别 \\

目前选用 masr


### 安装 pyaudio

```
sudo apt-get install libasound-dev portaudio19-dev libportaudio2 libportaudiocpp0 portaudio19-dev python-all-dev python3-all-dev
pip install pyaudio

```


## 文本生成


备选1： 百度PaddleHub开源文本生成模型 \\
备选2：[GPT2-chitchat](https://github.com/yangjianxin1/GPT2-chitchat)（可用、易用）\\
备选3： [GPT2-Chinese](https://github.com/Morizeyao/GPT2-Chinese) \\
备选4：[CDial-GPT](https://github.com/thu-coai/CDial-GPT)(可用、易用) 

目前选用 GPT2-chitchat

## 语音生成

备选1： 百度PaddleHub语音生成 \\
备选2： [zhrtvc](https://github.com/KuangDD/zhrtvc/blob/master/zhrtvc/README.md) \\
备选3： [zhtts](https://github.com/Jackiexiao/zhtts)（可用、易用）

目前选用 zhtts

### 问题

第一个词大部分时候发音不清楚

## 播放声音

### pydub

和pyaudio一起会有bug, 播放是杂音

```
from pydub import AudioSegment
from pydub.playback import play

sound = AudioSegment.from_wav('myfile.wav')
play(sound)
```

### sounddevice

```python
import sounddevice as sd
import soundfile as sf

filename = 'myfile.wav'
# Extract data and sampling rate from file
data, fs = sf.read(filename, dtype='float32')  
sd.play(data, fs)
status = sd.wait()  # Wait until file is done playing
```


### 问题

需要将生成的东西保存成文件再读取文件播放出来，这样是低效的。


# Reference
1. [一个轻量级的RNN语音唤醒引擎](http://fancyerii.github.io/books/mycroft-precise/)
2. [Playing and Recording Sound in Python](https://realpython.com/playing-and-recording-sound-python/)
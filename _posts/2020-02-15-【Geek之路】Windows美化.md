---
layout:     post
title:      "【Geek之路】Windows美化"
subtitle:   ""
date:       2020-02-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - Windows
---

# Rainmeter

## Rainmeter监控GPU

安装完毕后

右下角右键管理皮肤->System->System.ini->右键编辑->

在[meterBarSWAP]

底下加入编辑保存

```
[measureGPU]
Measure=Plugin
Plugin=UsageMonitor
Alias=GPU
;Percent=1


[meterLabelGPU]
Meter=String
MeterStyle=styleLeftText
X=10
Y=100
W=190
H=14
Text=GPU Usage

[meterValueGPU]
Meter=String
MeterStyle=styleRightText
MeasureName=measureGPU
X=200
Y=0r
W=190
H=14
AntiAlias=1
Text=[measureGPU:1]%
DynamicVariables=1
;Percentual=1

[meterBarGPU]
Meter=Bar
MeterStyle=styleBar
MeasureName=measureGPU
X=10
Y=112
W=190
H=1
```


# Reference
1. [Rainmeter监控GPU](https://blog.csdn.net/weixin_33699914/article/details/92760589)
---
layout:     post
title:      "【Geek之路】Windows美化及使用技巧"
subtitle:   ""
date:       2020-02-15
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - Windows
---

# windows美化

## Rainmeter

### Rainmeter监控GPU

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

## EarTrumpet

替代原生声音调节软件， 可以切换不同声音输出设备， 调节不同软件声音， 非常好用。

Microsoft Store 自带。

## TranslucentTB

美化状态栏， 透明、毛玻璃等， 配合 wallpaper engine 使用。


## PowerToys

包含八个小工具， 主要使用第7个小工具， 类似于mac中的SpotLight功能， 保持桌面清爽的同时，快速地搜索到要使用的应用， 十分好用。

## Traffic Monitor

Traffic Monitor是一款用于Windows平台的网速监控悬浮窗软件，可以显示当前网速、CPU及内存利用率，支持嵌入到任务栏显示，支持更换皮肤、历史流量统计等功能。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1634831073855.png)


![](https://markdown.xiaoshujiang.com/img/spinner.gif "[[[1634831079447]]]" )

# windows 使用技巧

查看端口占用情况

> netstat -ano

查看进程

> tasklist

杀死进程：

> taskkill /f /t /im "进程id或者进程名称"


# Reference
1. [Rainmeter监控GPU](https://blog.csdn.net/weixin_33699914/article/details/92760589)
2. [windows系统如何查看端口被占用、杀进程](https://jingyan.baidu.com/article/fdffd1f89a0c8af3e98ca10e.html)
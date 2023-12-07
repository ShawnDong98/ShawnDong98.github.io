---
layout:     post
title:      "【Geek】Mac OS 环境配置"
subtitle:   ""
date:       2021-12-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - 
---

# Dock 只显示已经打开的软件

在「终端」（你可以通过 Spotlight 或定位至「应用程序」-「实用工具」-「终端」找到它）中输入如下命令，回车确认即可：

```
defaults write com.apple.dock static-only -boolean true; killall Dock
```


# Reference
1. [让 Dock 栏只显示已打开的应用程序 | 一日一技 · Mac](https://sspai.com/post/33479)
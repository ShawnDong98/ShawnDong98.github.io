---
layout:     post
title:      "【Geek】To be a Vimer"
subtitle:   ""
date:       2021-11-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - 
---


# Vim 命令

## 打开目录树

```
#vim命令模式下
:Explore #当前窗口下打开
:Vexplore #竖直分割窗口打开
:Sexplore #水平分割窗口打开
```


## 复制粘贴

复制的命令是y，即yank（提起） ，常用的命令如下：

- `y`      在使用v模式选定了某一块的时候，复制选定块到缓冲区用；
- `yy`    复制整行（nyy或者yny ，复制n行，n为数字）；
- `y^`   复制当前到行头的内容；
- `y$`    复制当前到行尾的内容；
- `yw`   复制一个word （nyw或者ynw，复制n个word，n为数字）；
- `yG`    复制至档尾（nyG或者ynG，复制到第n行，例如1yG或者y1G，复制到档

剪切的命令是d，即delete，d与y命令基本类似，所以两个命令用法一样，包括含有数字的用法

- `d`      剪切选定块到缓冲区；
- `dd`    剪切整行
- `d^`    剪切至行首
- `d$`     剪切至行尾
- `dw`    剪切一个word
- `dG`     剪切至档尾 

粘贴的命令式p，即put（放下）

-  `p`      小写p代表贴至游标后（下），因为游标是在具体字符的位置上，所以实际是在该字符的后面
-  `P`      大写P代表贴至游标前（上）


## 跳转第一行和最后一行

底线命令模式

:0或:1跳到文件第一行

`:$` 跳到文件最后一行

命令模式

gg跳到第一行

shift+g跳到文件最后一行

## 撤销和恢复

u   撤销上一步的操作
Ctrl+r 恢复上一步被撤销的操作


---
layout:     post
title:      "【Geek之路】Chrome使用技巧"
subtitle:   ""
date:       2020-03-07
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Chrome
    - 
---

# 新版chrome导入密码方法

1、找到你的chrome快捷方式，右键打开属性

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1583566060815.png)

 2、在“目标”一栏的后面加上以下代码：
 
 > --enable-features=PasswordImport

注意和路径之间有一个空格 

提示需要管理员权限，点击继续即可

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1583566095849.png)

 3、重启chrome
 
 在地址栏里输入
 
 > chrome://flags/

按ctrl+f搜索password，将default改成enable
 
 找到密码设置，发现在密码设置的地方有了导入密码功能了
# Reference
1. [新版chrome导入密码方法](https://www.cnblogs.com/since-AUG/p/11852353.html)
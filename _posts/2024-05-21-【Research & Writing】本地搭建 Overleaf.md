---
layout:     post
title:      "【Research & Writing】本地搭建 Overleaf"
subtitle:   ""
date:      2024-05-21
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Research & Writing
    - 
---

# 


# tlmgr 下载速度慢

可以尝试更换到一个离你较近的镜像源。使用tlmgr可以查看可用的镜像并选择合适的一个。


查看可用的镜像列表：

```
tlmgr repository list
```

选择一个离你较近的镜像，替换现有的镜像源。例如：

```
tlmgr option repository http://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/tlnet
```
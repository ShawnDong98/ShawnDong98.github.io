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

#  环境配置

在阿里云服务器上，没有图形界面配置 overleaf 会有一些坑

## 安装 docker

## 安装 docker-compose


## 安装图形界面



# Overleaf Toolkit


## Upgrading TexLive

要在 Overleaf 容器内启动 shell，请运行


```
bin/shell
```

你将收到如下提示：


```
root@309b192d4030:/#

```

在以下说明中，我们将假设您位于容器中。

## 
## 确定当前的 TeX Live 版本

TeX Live 每年在 4 月份左右发布。使用 `tlmgr` 的步骤有所不同，具体取决于您使用的是当前版本还是旧版本。您可以使用 `tlmgr --version` 检查正在运行的 TeX Live 版本。例如，此安装运行 TeX Live 2021：


```
tlmgr --version
tlmgr revision 59291 (2021-05-21 05:14:40 +0200)
tlmgr using installation: /usr/local/texlive/2021
TeX Live (https://tug.org/texlive) version 2021
```


## 安装软件包

要安装完整的 TeX Live 安装，请在 Overleaf 容器内运行以下命令：


```
tlmgr install scheme-full
```


## 保存你的更改

您刚刚所做的更改已经更改了 `sharelatex` 容器，但它们是短暂的 --- 如果 Compose 重新创建容器，它们将会丢失，例如作为更新配置的一部分。

要使它们持久化，请使用 `docker commit` 将更改保存到新的 docker 映像：


```
cat config/version
5.0.3
#^^^^ --------------- matching version ----------- |
#                                                vvvvv
$ docker commit sharelatex sharelatex/sharelatex:5.0.3-with-texlive-full

$ echo 5.0.3-with-texlive-full > config/version
```

提交更改后，相应地更新 `config/version` 。然后运行 `bin/up` 来重新创建容器。



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


# Bugs




## rosetta error: Rosetta is only intended to run on Apple Silicon with a macOS host using Virtualization.framework with Rosetta mode enabled

Update: I'm not sure if this is a generalizable workaround for others, but in Docker Desktop under Features in development -> Beta features, unchecking `Use Rosetta for x86/amd64 emulation on Apple Silicon` seems to at least prevent the Java-based containers from going down on startup for me.

# Reference
1. [# Community Edition: Upgrading TexLive](https://github.com/overleaf/toolkit/blob/master/doc/ce-upgrading-texlive.md)
2. [本地部署 Overleaf 服务](https://www.cnblogs.com/Undefined443/p/18155463)
3. [rosetta error: Rosetta is only intended to run on Apple Silicon with a macOS host using Virtualization.framework with Rosetta mode enabled](https://github.com/docker/for-mac/issues/7006)
4. [阿里云服务器部署ShareLaTex(Overleaf)](https://blog.csdn.net/CYS_zxcvbnm/article/details/106139505)
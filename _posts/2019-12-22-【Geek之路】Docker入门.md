---
layout:     post
title:      "【Geek之路】Docker入门"
subtitle:   ""
date:      2019-12-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - Docker
    - Geek
---


# Docker 命令

## 概念

Docker系统有两个程序：docker服务端和docker客户端。

docker服务端是一个服务进程，管理着所有的容器。

docker客户端则扮演着docker服务端的远程控制器，可以用来控制docker的服务端进程。

**容器和镜像的区别**

我的理解是容器是还没成型的镜像。
我们不断向容器里添加内容，当容器环境配置好了以后，进行打包，打包好的容器就叫镜像。
当然这么形容不太合适，设计到读写权限的问题。



## 在容器中安装程序以及进入容器

> docker run learn/tutorial apt-get install -y ping 

出现

Reading package lists...
E: Unable to locate package ping
Building dependency tree...
Reading state information

先进入容器

> docker run -t -i ubuntu
> apt-get update
> apt-get upgrade
> apt install iputils-ping # ping

**Docker 参数 -i -t 的作用***

通常的解释是: -t让docker分配一个伪终端并绑定到容器的标准输入上, -i则让容器的标准输入保持打开.

**问题**

所以通常都是这样的: sudo docker run -it ubuntu 进入了命令交互界面
但是如果不加呢? sudo docker run ubuntu 或sudo docker create ubuntu & sudo docker start ubuntu
这样的话, docker容器无法启动。

**原因**

Docker中系统镜像的缺省命令是 bash，如果不加 -ti bash 命令执行了自动会退出。这是因为如果没有衔接输入流，本身就会马上结束。加-ti 后docker命令会为容器分配一个伪终端，并接管其stdin/stdout支持交互操作，这时候bash命令不会自动退出。


## 保存对容器的修改

**查看容器id**

> docker ps -l

**提交指定容器保存为新的镜像**

> docker commit `<container id> <new image name>`

**查看本地所有镜像**

> docker images

注意：

> docker commit前需要停止容器 我安装完ping之后试了下ping www.baidu.com 然后 commit，结果就是查看镜像信息时里面COMMAND有“ping www.baidu.com”,造成每次以这个镜像启动一个容器就会去ping 百度了


## 运行新的镜像

>　docker run ubuntu/learn ping www.google.com

## 检查运行中的镜像

> docker inspect efe

efe为镜像的id前面部分

## 发布自己的镜像

首先需要登录docker的站点，然后docker login，成功后使用docker tag修改测试运行过的image，然后再docker push 【账号】/【docker】：【tag】，如果没给tag，默认就是latest，如果制定了，以后pull镜像就需要指定tag

先在https://hub.docker.com/注册个账号，然后再linux端docker login，打tag,再然后docker push上去

**登陆之后仍然报错**
![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1577184491501.png)


learn/ping前面的learn是你在Docker Hub的注册名,所以把learn改成你的注册名再push

先login

> docker login

再打tag

> docker tag ubuntu/learn xxx/learn

xxx是你的dockerHub的id

再push

> docker push xxx/learn

## 删除镜像和容器

删除镜像

> docker rmi id

当一个镜像被多次打tag后需要先把tag的镜像删了

> docker rmi xxx

xxx是镜像名称


删除镜像前必须先删除使用着的容器

删除容器

> docker rm id

删除容器前必须先停止容器

停止容器

> docker stop id

## 删除所有的容器和镜像

删除之前需要停止所有的容器

> docker stop `$(docker ps -a -q)`

删除所有容器

>  docker  rm `$(docker ps -a -q)`

删除所有镜像

> docker rmi `$(docker images -q)`


# 配置Nvida-Docker

Windows上不支持从Docker容器内进行GPU访问.

您需要nvidia-docker,但目前仅在Linux平台上支持.使用Hyper-v的GPU直通将需要离散设备分配(DDA),目前仅在Windows Server中,并且(at least in 2015)没有计划改变这种状态.因此,NVIDIA目前还没有将nvidia-docker移植到Windows.
这里有更多信息：https://devblogs.nvidia.com/nvidia-docker-gpu-server-application-deployment-made-easy/

卒


# ubuntu 配置 Nvida-Docker

## 安装 Docker 环境

各类操作系统下安装命令略有不同，可自行搜索。以 Ubuntu 系统为例：

```
sudo apt-get update # 可选
sudo apt install docker.io
```

面向 Mac OS 和Windows 操作系统还推出了Docker桌面。

Mac：[https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

Windows：[https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)


## 开通阿里云容器镜像服务

阿里云容器镜像服务 [https://www.aliyun.com/product/acr?](https://www.aliyun.com/product/acr?)

免费开通镜像托管。 建议设置私有仓库，并一定牢记 **仓库密码**，后续提交需要使用。

开通后进入镜像仓库 [https://cr.console.aliyun.com](https://cr.console.aliyun.com)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623587955163.png)


切换标签页到命名空间，创建地址唯一的命名空间

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623587971729.png)


根据任务/比赛要求选择对应的地域（本次练习选择 **上海**），其他的按照自己需求选择或填写。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623587989815.png)


选择代码源为本地仓库，灵活度大，完成创建。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623588140662.png)


点击 **管理**，可查看仓库的基本信息，以及 **登录、拉取、推送** 等简单操作的指南。


详情页如下，有基本的操作命令，仓库地址一般使用公网地址即可。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623588172801.png)


## 构建镜像并推送

在安装好Docker环境的本机/服务器构建并推送容器镜像。过程中可能会使用docker命令，如拉取 `docker pull` ,  推送 `docker push`, 构建 `docker build` 等等。

为简化构建镜像的难度，天池已准备了常用的Python基础镜像，可直接拉取使用，更多基础镜像说明[点击](https://tianchi.aliyun.com/forum/postDetail?spm=5176.12586973.0.0.281b2232bNFLQ5&postId=67720)。

自行构建镜像请确保安装curl.

```
sudo docker pull registry.cn-shanghai.aliyuncs.com/tcc-public/python:3
```

在用户权限下docker 命令需要 sudo 否则出现以下问题

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623588473136.png)

### 准备所需文件

新建一个文件夹 (例如 `tianchi_submit_demo` ) 用于存放这次任务镜像所需的文件，文件夹中内容示例，其中 `hello_world.py` 中是各位自己的代码部分：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623588563615.png)


`Dockerfile` 配置文件参考,  `Dockerfile` 是固定名称，注意首字母大写。 `Dockerfile` 中命令皆大写：

```
# Base Images
## 从天池基础镜像构建
FROM registry.cn-shanghai.aliyuncs.com/tcc-public/python:3

## 把当前文件夹里的文件构建到镜像的根目录下
ADD . /

## 指定默认工作目录为根目录（需要把run.sh和生成的结果文件都放在该文件夹下，提交后才能运行）
WORKDIR /

## 镜像启动后统一执行 sh run.sh
CMD ["sh", "run.sh"]
```


## 构建镜像并推送（2.1与2.2皆可走通）


### IDE + Cloud Toolkit

推荐使用 [Alibaba Cloud Toolkit](https://cn.aliyun.com/product/cloudtoolkit?spm=5176.12586973.0.0.281b2232bNFLQ5) 进行操作。





## Reference
1. [是否可以使用适用于Windows的docker进行GPU传递？](https://bbs.csdn.net/topics/394360047)
2. [NVIDIA docker on windows?](https://github.com/NVIDIA/nvidia-docker/issues/665)
3. [手把手超详细操作说明](https://tianchi.aliyun.com/competition/entrance/231759/tab/174?spm=5176.12281978.0.0.37721a4a3S5tas)










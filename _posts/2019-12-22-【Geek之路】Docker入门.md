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

## Docker 架构

## 镜像命令

### docker images

列出全部容器详细信息

```
docker images -a
```

仅列出id

```
docker images -q
```

### docker search

搜索镜像

```
docker search mysql
```

参数：

- filter=STAR=3000： 只列出STAR大于3000的


### docker pull 下载镜像

```
docker pull mysql:5.7
```

5.7 是tag， 版本号， 不加的话默认是latest。

### docker rmi 删除镜像

删除指定的容器

```
docker rmi -f 容器id 
```

删除全部容器

```
docker -rmi -f $(docker images -aq)
```




# ubuntu 配置 Nvida-Docker

## 安装 Docker 环境（CPU）

各类操作系统下安装命令略有不同，可自行搜索。以 Ubuntu 系统为例：

```
sudo apt-get update # 可选
sudo apt install docker.io
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623860212603.png)



面向 Mac OS 和Windows 操作系统还推出了Docker桌面。

Mac：[https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

Windows：[https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)


## 安装 Docker 环境（GPU）

```
sudo apt-get remove docker docker-engine docker.io ###清除系统原有docker 如果提示找不到就不用理会
```


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

推荐使用 [Alibaba Cloud Toolkit](https://cn.aliyun.com/product/cloudtoolkit?spm=5176.12586973.0.0.281b2232bNFLQ5) 进行操作。Cloud Toolkit 与主流 IDE 及阿里云容器镜像服务无缝集成，可以简化操作。 这里以在 IntelliJ IDEA 中使用 Alibaba Cloud Toolkit 为例。只需配置一次，之后都可一键推送～


1） 在本地 IDE 中安装 Alibaba Cloud Toolkit 并进行阿里云账户配置。参见：


[在 IntelliJ IDEA 中安装和配置 Cloud Toolkit](https://help.aliyun.com/document_detail/98762.html?spm=5176.12586973.0.0.281b2232bNFLQ5)


2） 设置用于打包本地镜像的 Docker 环境。

1> 在 IntelliJ IDEA 工具栏单击 Tools > Alibaba Cloud > Preferences… 。
2> 在 Settings 对话框的左侧导航栏中单击 Docker。
3>  在 Docker 界面中设置 Cloud Toolkit 需要连接的 Docker 环境。

- 本地为 Mac 或 Linux 操作系统，勾选 Unix Socket，然后单击 Browse，输入unix:///var/run/docker.sock。
- 本地为 Windows 操作系统，勾选 TCP Connection，然后在 URI 右侧文档框输入本地 Docker 的 URI，如 http://127.0.0.1:2375。
- 远程 Docker 环境：勾选 Tcp Connection，在 URI 右侧的文本框里输入远端的 Docker 环境的 URI（包括 IP 地址和端口），如 http://x.x.x.x:2375，并确保远程主机的 HTTP 服务开启。
- 单击 Test Connection 进行连接测试。

**注意：如果出现连接测试报错，可进入 Docker 的 Settings 界面，单击左侧导航栏中的 General，然后选择 Expose daemon on tcp://localhost:2375 without TLS。**

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623589343724.png)


3） 构建并上传应用

1> 在 IntelliJ IDEA 的菜单栏中选择 **File > Open…**，选择参赛的工程文件。

2> 在 IntelliJ IDEA 界面左侧的 Project 中右键单击您的 Docker 应用工程名，在弹出的下拉菜单中选择 **Alibaba Cloud > Deploy to ACR/ACK > Deploy to ACR**。

3> 在 Deploy to ACR 对话框中进行以下配置。

在 Image 页签中选择 Context Directory 和 Dockerfile。
- Context Directory：参赛的工程文件所在的目录，例如上文中的 tianchi_submit_demo 。
- Dockerfile：选择上文中创建的 Dockerfile。
- Version：对上传的工程文件做版本标记。例如 1.0

在 Image Repositories 区域选择上文中创建的容器镜像服务的地域、命名空间和镜像仓库。

4> 单击 RUN。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623589470895.png)


### 服务器上直接操作

执行 `docker build -t registry.cn-shenzhen.aliyuncs.com/test_for_tianchi/test_for_tianchi_submit:1.0 .`

注意：`registry.~~~` 是上面创建仓库的公网地址，用 **自己仓库地址替换**。地址后面的 `:1.0`为自己指定的版本号，用于区分每次build的镜像。最后的 `.` 是构建镜像的路径，不可以省掉。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623589589357.png)

构建完成后可先验证是否正常运行，正常运行后再进行推送。

**CPU** 镜像： `docker run your_image sh run.sh`

**GPU**镜像： `nvidia-docker run your_image sh run.sh`

这里的 `your_image` 可以是你镜像的id。 

推送到镜像仓库  `docker push registry.cn-shenzhen.aliyuncs.com/test_for_tianchi/test_for_tianchi_submit:1.0`

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1623590463764.png)

如果这步出错，可能你没有登录，按照仓库里描述操作登录即可。


```
docker login --username=**** registry.cn-shanghai.aliyuncs.com
```

用于登录的用户名为阿里云账号全名，密码为开通服务时设置的密码。

## Reference
1. [是否可以使用适用于Windows的docker进行GPU传递？](https://bbs.csdn.net/topics/394360047)
2. [NVIDIA docker on windows?](https://github.com/NVIDIA/nvidia-docker/issues/665)
3. [手把手超详细操作说明](https://tianchi.aliyun.com/competition/entrance/231759/tab/174?spm=5176.12281978.0.0.37721a4a3S5tas)










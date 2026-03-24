---
layout:     post
title:      "【Geek之路】Docker手册"
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

### 镜像是什么

镜像包含软件所需的所有内容， 包括代码、库、环境变量和配置文件。


所有应用直接打包docker镜像， 就可以直接运行起来。

如何获取镜像

 - 从远程仓库下载
 - 拷贝
 - 自己制作一个镜像 DockerFile

### Docker 镜像加载原理

> UnionFS(联合文件系统)

bootfs

rootfs

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

删除指定的镜像

```
docker rmi -f 镜像id 
```

删除全部镜像

```
docker -rmi -f $(docker images -aq)
```


## 容器命令

有了镜像才可以创建容器 ，下载一个 centos 镜像来测试学习

```
docker pull centos
```

新建容器并启动

```
docker run [可选参数] image

# 参数说明
--name="Name" 		容器名字 tomcat01 tomcat02， 用来区分容器
-d 					后台方式运行
-it					使用交互方式运行，进入容器查看内容
-p					指定容器的端口 -p 8080:8080
		-p	ip：主机端口：容器端口
		-p	主机端口：容器端口（常用）
		-p	容器端口
		容器端口
-P					随机指定端口
```

测试， 启动并进入容器

```
docker run -it centos /bin/bash
```

从容器中退出

```
exit
```

列出所有运行中的容器

```
docker ps 
				 # 列出当前正在运行的容器
-a		# 列出当前正运行的容器 + 历史运行过的容器
-n=?	# 显示最近创建的容器
-q		# 只显示容器的编号
```


退出容器

```
exit 		# 停止容器并退出
ctrl + P + Q 	# 不停止退出
```

删除容器

```
docker rm 容器id					   # 删除指定的容器， 不能删除正在运行的容器， 如果要强制删除 -f
docker rm -f $(docker ps -aq)		# 全部删除容器
docker ps -a -q|xargs docker rm		# 删除所有容器
```

启动和停止容器的操作

```
docker start 容器id			# 启动容器
docker restart 容器id			# 重启容器
docker stop 容器id			# 停止当前正在运行的容器
docker kill 容器id			# 强制停止当前容器
```

## 常用其他命令

### 后台启动容器

命令 docker run -d 镜像名

```
docker run -d centos
```

问题 docker ps， 发现 centos 停止了

常见的坑， docker 容器使用后台运行， 就必须要有一个前台进程， docker发现没有应用， 就会自动停止

### 查看日志

```
docker logs -f -t --tail 容器
```

自己编写一段shell脚本 


```
docker run -d centos /bin/sh -c "while true; do echo ShawnD; sleep 1; done"
```


```
docker ps
```

显示日志

```
-tf 		# 显示日志
--tail number	# 要显示日志条数
```

```
docker log -tf --tail 10 容器id
```


### 查看容器中进程信息

docker top 容器id

```
docker top 容器id
```


查看镜像的元数据


```
docker inspect 容器id
```


### 进入当前正在运行的容器

我们通常容器都是使用后台方式运行的，需要进入容器， 修改一些配置

方式1：

```
docker exec -it 容器id bashShell
```

进入容器后打开一个新的终端， 可以在里面操作


方式2：

```
docker attach 容器id
```

进入容器正在执行的终端， 不会启动新的进程



### 从容器内拷贝文件到主机上

```
docker cp 容器id:容器内路径 主机路径
```

拷贝是一个手动过程，未来我们可以使用 -v 卷的计数， 可以实现目录互通。


## 可视化


### portainer


Docker 图形化界面管理工具， 提供一个后台面板供我们操作。

## commit 镜像

docker commit 提交容器称为一个新的副本

命令和git类似

```
docker commit -m="提交的描述信息" -a="作者" 容器id 目标镜像名：[TAG]
```

实战测试：

启动一个默认的tomcat

发现这个默认的 tomcat 没有 webapps 应用， 镜像的原因， 官方的镜像默认 webapps 下面是没有文件的！

自己拷进去基本的文件

将我们操作过的容器通过 commit 提交为镜像， 我们以后就使用修改过的镜像即可。

## 容器数据卷

### 什么是容器数据卷

如果数据都在容器中，那么我们容器删除， 数据就会丢失！ 需求： 数据可以持久化

容器之间可以有一个数据共享的计数！ Docker容器中产生的数据， 同步到本地。

这就是卷计数， 目录的挂载， 将容器内的目录， 挂载到Linux上面。

### 使用数据卷

> 方式一：直接使用命令来挂载 -v

```
docker run -it -v 主机目录：容器内目录

# 测试
docker run -it -v /home/ceshi:/home centos /bin/bash
```

启动起来的时候我们可以通过 docker inspect 容器id 查看挂载信息


### 具名和匿名挂载

匿名挂载

- -v 容器内路径

```
docker  run -d -P --name nginx01 -v /ect/nginx nginx
```

查看 volume 的情况

```
docker volume ls
```

这种就是匿名挂载， 我们在 -v 只写了容器内的路径， 没有写容器外的路径


具名挂载， 通过 -v 卷名：容器内路径

```
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
```

所有docker容器内的卷， 没有指定目录的情况下都是在： `/var/lib/docker/volumes/xxxx/_data`

我们通过具名挂载可以方便的找到一个卷， 大多数情况使用 `具名挂载`。


如何确定具名挂载还是匿名挂载

```
-v	容器内路径		# 匿名挂载
-v 卷名：容器内路径		# 具名挂载
-v ./宿主机路径: 容器内路径		# 指定路径挂载
```

拓展：

通过 -v 容器内路径:ro rw 改变读写权限
 
- ro： read only 只读， 只能通过宿主机操作， 容器内部无法操作
- rw： read write 可读可写

一旦设置了容器权限， 容器对挂在出来的内容就有限定了

```
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:ro nginx
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:rw nginx
```


### 数据卷之DockerFile

DockerFile 用来构建 docker 镜像的构建文件， 命令脚本。

通过这个脚本可以生成镜像， 镜像是一层一层的， 脚本一个个的命令， 每个命令都是一层。

```
# 创建一个dockerfile文件， 名字可以随机 建议 Dockerfile
# 文件中的内容 指令(大写) 参数
FROM centos

VOLUME ["/volume01", "/volume02"]

CMD echo "----end----"

CMD /bin/bash

# 这里的每一个命令就是镜像的一层
```


这种方式未来使用十分多，因为我们通常会构建自己的镜像。

假设构建镜像的时候没有挂在卷， 要手动镜像挂载 -v 卷名: 容器内路径


### 数据卷容器

多个 mysql 实现数据共享

```
docker run -d p 3301:3306 -v /etc/mysql/conf.d -v /var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7


docker run -d p 3301:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql02 --volumes-from mysql01 mysql:5.7
```

容器之间配置信息的传递， 数据卷容器的生命周期一致持续到没有容器为止。


## 容器使用宿主机的代理

```bash
sudo docker run -it --shm-size 8G --net=host --env HTTP_PROXY="http://127.0.0.1:7890" --env HTTPS_PROXY="https://127.0.0.1:7890" --gpus all -v $(pwd):/home 1b5ecb66d7b6 /bin/bash
```

修改容器中的 `~/.bashrc`

```
host_ip=$(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
# export ALL_PROXY="http://$host_ip:7890"

export http_proxy=http://$host_ip:7890
export https_proxy=http://$host_ip:7890
```


```
export http_proxy="http://host.docker.internal:7890"
export https_proxy="http://host.docker.internal:7890"
```

## DockerFile

DockerFile 是用来构建 docker 镜像的文件， 命令参数脚本。


构建步骤：

- 编写一个 dockerfile 文件
- docker build 构建成为一个镜像
- docker run 运行镜像
- docker push 发布镜像（DockerHub、阿里云镜像仓库）

### DockerFile 构建过程

**基础知识**：

- 每个保留关键字(指令)都是必须是大写字母
- 执行从上到下顺序执行
- #表示注释
- 每一个指令都会创建提交一个镜像层， 并提交

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1624783111892.png)


dockerfile 是面向开发的， 我们以后要发布项目， 做镜像， 就需要编写dockerfile文件。

步骤：

- DockerFile： 构建文件， 定义了一切的步骤， 源代码
- DockerImages： 通过DockerFile构建生成的镜像， 最终发布和运行的产品
- Docker容器： 容器就是镜像运行起来提供服务


### DockerFile 指令

```
FROM 			# 基础镜像， 一切从这里开始构建
MAINTAINER		# 镜像是谁写的， 姓名+邮箱
RUN				# 镜像构建的时候需要运行的命令
ADD 			# 步骤， tomcat镜像， tomcat的压缩包就是添加内容
WORKDIR			# 镜像的工作目录
VOLUME			# 挂载的目录
EXPOSE			# 暴露端口配置
CMD				# 指定容器启动时要运行的命令
ENTRYPOINT		# 指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD			# 当构建一个被集成 Dockerfile 就会运行 ONBUILD 指令， 触发指令
COPY			# 类似ADD， 将文件拷贝到镜像中
ENV				# 构建的时候设置环境变量
```

Docker Hub 中 99% 的镜像都是从这个基础镜像


CMD 和 ENTRYPOINT 的区别

- CMD： 指定这个容器启动的时候要运行的命令， 只有最后一个会生效， 可被替代
- ENTRYPOINT： 指定这个容器启动的时候要运行的命令，可以追加命令


### 实战

1） 准备镜像文件， tomcat压缩包， 

2）创建Dockerfile ， 官方命名

```
FROM centos
MAINTAINER ShawnD<ShawnDong98@gmail.com>

COPY readme.txt /use/local/readme.txt

ADD jdk-8ull-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.22.tar.gz /usr/local/

RUN yum -y install vim

ENV MYPATH /usr/local
WORK $MYPATH

ENV JAVA_HOME /usr/local/jdk1.8.0_11
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.22
ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.22
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

EXPOSE 8080

CMD /usr/local/apache-tomcat-9.0.22/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.22/bin/logs/catalina.out
```

ADD 命令会自动解压

3） docker build -t diytomcat .

4） 启动镜像

5）访问测试


## 发布自己镜像

 1） [https://hub.docker.com/](https://hub.docker.com/)  注册账号
 
 2） 登录账号
 
```
 docker login -u xxx -p xxx
```

3） 提交镜像

```
docker push image:tag
```

## 发布到阿里云镜像服务器

1） 登录阿里云

2） 找到容器镜像服务

3） 创建命名空间

4）创建容器镜像


参考官方地址


## docker 配置java环境

下载 jdk8， oracle需要注册账号下载， 建议保存到网盘。

```
tar -zxvf jdk-8u291-linux-x64.tar.gz
```

设置环境变量：

```
export JAVA_HOME=/usr/local/jdk1.8.0_291  #jdk安装目录
 
export JRE_HOME=${JAVA_HOME}/jre
 
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH
 
export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
 
export PATH=$PATH:${JAVA_PATH}
```


立即生效 

```
source /etc/profile
```

测试：

```
javac
```

```
java -version
```



## 常用命令

### 运行容器

```
sudo docker run --net=host --env HTTP_PROXY="127.0.0.1:7890" --env HTTPS_PROXY="127.0.0.1:7890"  -p 8888:8888 -p 8787:8787 -p 8786:8786 -p 5555:5555 --gpus all --shm-size 8G -it -v $(pwd):/home kaggle /bin/zsh
```

### 删除运行中的容器

```
sudo docker rm -f $(sudo docker ps -aq) 
```



### 容器自动重启

情况一：启动容器前的指令设置restart选项

在启动容器的时候，添加--restart=always即可，例如：

```
docker run --restart=always docker_id
```

情况二：已启动容器通过 docker update 对设置 restart 选项


```
docker update --restart=always docker_id
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

### bug1

```
E: Sub-process /usr/bin/dpkg returned an error code (1)
```

进入如下目录：

```
cd /var/lib/dpkg
```

删除该文件：

```
sudo mv info info.baksudo
```

重新创建该文件：

```
sudo mkdir info
```


再次安装Docker。成功安装。






### 删除之前安装的残留

 删除某软件,及其安装时自动安装的所有包

```
sudo apt-get autoremove docker docker-ce docker-engine  docker.io  containerd runc
```

删除docker其他没有没有卸载

```
dpkg -l | grep docker
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P # 删除无用的相关的配置文件
```

卸载没有删除的docker相关插件(结合自己电脑的实际情况)

```
sudo apt-get autoremove docker-ce-*sudo apt-get autoremove docker-ce-*
```

删除docker的相关配置&目录

```
sudo rm -rf /etc/systemd/system/docker.service.d
sudo rm -rf /var/lib/docker
```

```
sudo apt-get purge docker-ce
sudo apt-get purge docker-ce-cli
sudo apt-get purge containerd.io
```

查看是否卸载完毕

```
apt list --installed | grep docker
apt list --installed | grep contain.io
```

删除残留文件

```
rm -rf /var/lib/docker
rm -rf /var/run/docker
rm -rf /etc/docker
rm -rf /run/docker.sock
rm -rf /var/lib/containerd
rm -rf /run/containerd
rm -rf /opt/containerd
```

确定docker卸载完毕

```
docker --version
```

### 安装

Ubuntu上的 Docker-CE 使用 Docker的官方脚本设置：

```bash
sudo curl https://get.docker.com | sh \
  && sudo systemctl --now enable docker
```

**在wsl2中使用以下命令**：

```bash
sudo curl https://get.docker.com | sh \
  && sudo /etc/init.d/docker start
```


设置 `stable` repository 和 GPG key：

```
distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
      && curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
      && curl -s -L https://nvidia.github.io/libnvidia-container/experimental/$distribution/libnvidia-container.list | \
         sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
         sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

这里可能需要翻墙，  `curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -` 主要是这句。


更新包列表之后， 安装 `nvidia-docker2`  包和依赖

```
sudo apt-get update
```

这里可能报错 `错误:5 https://nvidia.github.io/libnvidia-container/stable/ubuntu18.04/amd64  InRelease
  无法连接上 nvidia.github.io:443 (::1)。 - connect (111: 拒绝连接) 无法连接上 nvidia.github.io:443 (127.0.0.1)。 - connect (111: 拒绝连接)`
  
原因可能是DNS污染, 可以通过修改 hosts文件 / 修改DNS服务器 / 代理 的方式访问。 可将 DNS 修改为 114.114.114.114。


```
sudo vim /etc/resolv.conf 

# Dynamic resolv.conf(5) file for glibc resolver(3) generated by resolvconf(8)
#     DO NOT EDIT THIS FILE BY HAND -- YOUR CHANGES WILL BE OVERWRITTEN
# nameserver 202.96.128.86
nameserver 114.114.114.114
```



```
sudo apt-get install -y nvidia-docker2
```

设置默认运行时后，重新启动Docker守护进程以完成安装

```
sudo systemctl restart docker
```

这里可能报错 `Failed to allocate directory watch: Too many open files`, 可能是 inotify 数量限制了，修改后服务可以正常启动

```
vim /etc/sysctl.conf


fs.inotify.max_user_instances=512
fs.inotify.max_user_watches=262144
```

现在可以通过运行一个CUDA容器测试：

```
sudo docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi
```

结果如下所示：

```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 455.32.00    Driver Version: 455.32.00    CUDA Version: 11.1     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  GeForce RTX 3090    On   | 00000000:65:00.0  On |                  N/A |
| 82%   67C    P2   323W / 350W |  11646MiB / 24265MiB |    100%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
+-----------------------------------------------------------------------------+

```

### wslg 配置 gpu docker




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


## 阿里云镜像加速器

针对Docker客户端版本大于 1.10.0 的用户

您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器


```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxx.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
# 设置默认工作路径

创建一个新的 Dockerfile

```
FROM mmf

## 指定默认工作目录为根目录（需要把run.sh和生成的结果文件都放在该文件夹下，提交后才能运行）
WORKDIR /home/

EXPOSE 8888
EXPOSE 6666

## 镜像启动后统一执行 sh run.sh
CMD ["zsh"]
```

# 非 root 用户使用 Docker

要解决Docker权限被拒绝错误，并以非root用户的身份使用Docker，请使用以下命令创建一个名为“docker”的组：

```
sudo groupadd docker 
```

接下来，将你的用户添加到docker组：

```
sudo gpasswd -a user userG

或：sudo usermod -aG userG user
```

将用户添加到docker组后，注销并重新登录，使更改生效。

从现在开始，普通用户(非root用户)可以在没有sudo权限的情况下使用Docker。

不妨以普通用户的身份运行以下命令：

```
docker version  
docker run hello-world 
```

# Bugs

## docker: Error response from daemon: could not select device driver "" with capabilities: [[gpu]].

```
docker: Error response from daemon: could not select device driver "" with capabilities: [[gpu]].
```

验证是否安装了nvidia-container-runtime 或者 重新启动守护进程

```
sudo apt-get install nvidia-container-runtime
```

```
systemctl restart  docker
```


## Failed to allocate directory watch: Too many open files

vim /etc/sysctl.conf， 添加

```
fs.inotify.max_user_instances=512
fs.inotify.max_user_watches=262144
```

生效：

```
sysctl -p
```

## Docker 找不到/etc/docker/daemon.json问题解决

在配置dock镜像加速的时候需要把加速阿里的加速写入daemon.json文件。

但是奇怪的是别说daemon.json文件了，在etc目录下，我连docker目录都找不到。

于是访问官网， 看到下面一句话：

**To configure the Docker daemon using a JSON file, create a file at /etc/docker/daemon.json on Linux systems, or C:\ProgramData\docker\config\daemon.json on Windows. On MacOS go to the whale in the taskbar > Preferences > Daemon > Advanced.**

使用json配置 Docker daemon，请在linux系统创建/etc/docker/daemon.json。

# Reference
1. [是否可以使用适用于Windows的docker进行GPU传递？](https://bbs.csdn.net/topics/394360047)
2. [NVIDIA docker on windows?](https://github.com/NVIDIA/nvidia-docker/issues/665)
3. [手把手超详细操作说明](https://tianchi.aliyun.com/competition/entrance/231759/tab/174?spm=5176.12281978.0.0.37721a4a3S5tas)
4. [重新安装Docker出现E: Sub-process /usr/bin/dpkg returned an error code (1)](https://blog.csdn.net/M82_A1/article/details/92186791)
5. [github.io （nvidia.github.io）无法访问问题及解决（2021.01）](https://blog.csdn.net/u010006102/article/details/112272543)
6. [Failed to allocate directory watch: Too many open files](https://blog.csdn.net/Bobsweetie/article/details/111688878)
7. [docker19.03＋NVIDIA显卡＋docker: Error response from daemon: could not select device driver "" with c](https://blog.csdn.net/BigData_Mining/article/details/104991349)
8. [完美解决docker问题：Failed to allocate directory watch: Too many open files](https://blog.csdn.net/weixin_41194129/article/details/115762769)
9. [Docker 找不到/etc/docker/daemon.json问题解决](https://blog.csdn.net/qq_36481502/article/details/105991891)
10. [linux安装jdk8](https://blog.csdn.net/pdsu161530247/article/details/81582980)
11. [System has not been booted with systemd as init system (PID 1). Can't operate #457](https://github.com/MicrosoftDocs/WSL/issues/457)
12. [ubuntu16.04离线安装与卸载docker和nvidia-docker](https://blog.csdn.net/weixin_43077628/article/details/114520707)
13. [Ubuntu(20.04)：用户和用户组的相关命令](https://blog.csdn.net/jiemashizhen/article/details/127060663)
14. [如何在Linux中以非root用户运行Docker？](https://www.51cto.com/article/614623.html)
15. [解决特定情况下 Docker Container 内无法使用代理的问题](https://zhuanlan.zhihu.com/p/606348321)
16. [# Docker 容器开机自动启动](https://lingshunlab.com/book/docker/docker-automatic-container-start-up-on-power-up)


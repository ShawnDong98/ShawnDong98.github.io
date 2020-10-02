---
layout:     post
title:      "【Geek之路】Linux相关命令"
subtitle:   ""
date:       2020-06-19
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    - Linux
---


# 创建sudo用户


## 创建新用户

> sudo adduser username

如果命名不符合规范， --force-badname


## 把用户添加到sudo组

> sudo usermod -aG sudo username


## 删除用户

> sudo userdel -r username



# CPU

lscpu：显示cpu架构信息

cat /proc/cpuinfo：查看CPU详细信息

```
# 查看物理CPU个数
cat /proc/cpuinfo | grep "physical id" | sort | uniq

# 查看每个物理CPU中core的个数(即核数)
cat /proc/cpuinfo | grep "cpu cores" | uniq

# 查看每个物理CPU中线程的个数
cat /proc/cpuinfo | grep "siblings" | uniq

# 查看逻辑CPU的个数
cat /proc/cpuinfo| grep "processor"

# 查看CPU型号
cat /proc/cpuinfo | grep "model name" | uniq
```
# 内存

查看/proc/meminfo或者使用free命令。free命令就是从meminfo中获取的信息。一般情况下，使用free就能得到我们想知道的信息：

> free -m

# 硬盘

 lsblk：blk是block的缩写。列出块设备
 
 ```
 [xxx@localhost ~]$ lsblk
NAME                        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sr0                          11:0    1 1024M  0 rom  
sdb                           8:16   0  100G  0 disk 
└─sdb1                        8:17   0  100G  0 part /data
sda                           8:0    0   60G  0 disk 
├─sda1                        8:1    0  500M  0 part /boot
└─sda2                        8:2    0 59.5G  0 part 
  ├─VolGroup-lv_root (dm-0) 253:0    0   50G  0 lvm  /
  ├─VolGroup-lv_swap (dm-1) 253:1    0    4G  0 lvm  [SWAP]
  └─VolGroup-lv_home (dm-2) 253:2    0  5.6G  0 lvm  /home
 ```
 
 df：查看硬盘使用情况
 
 ```
 [xxx@localhost ~]$ df -h
Filesystem                    Size  Used Avail Use% Mounted on
/dev/mapper/VolGroup-lv_root   50G  1.7G   46G   4% /
tmpfs                         3.9G     0  3.9G   0% /dev/shm
/dev/sda1                     485M   39M  421M   9% /boot
/dev/mapper/VolGroup-lv_home  5.5G  165M  5.1G   4% /home
/dev/sdb1                      99G  188M   94G   1% /data
 ```
 
 
 ## 挂载硬盘
 
 
 ### 分区：fdisk
 
 > fdsk \[-l\] 设备名称

d删除一个分区

n新增一个分区

p列出当前的分区

### 删除分区

### 将新分区的文件系统格式化为ext4类型

> sudo mkfs -t ext4 /dev/sdx1


### 修改文件夹权限给用户

> sudo chown -R 你的用户名 /media/datadisk




# GPU

> nvidia-smi

# 进程

ps -l   列出与本次登录有关的进程信息；

ps -aux   查询内存中进程信息；

ps -aux | grep \*\*\*   查询\*\*\*进程的详细信息；

top   查看内存中进程的动态信息；

kill -9 pid   杀死进程。


# screen命令

进入screen会话后，可在会话中创建多个窗口（window），并对窗口进行管理，管理命令以ctrl + a开头。

在已有screen会话中创建新的窗口:

1. 在当前screen窗口中键入C-a c，即Ctrl键+a键，之后再按下c键，screen 在该会话内生成一个新的窗口并切换到该窗口

2. C-a n，即Ctrl键+a键,之后再按下n键, 切换到下一个窗口； C-a p，即Ctrl键+a键,之后再按下p键, 切换到前一个窗口

3. ctrl a + k 关闭当前窗口

4. 常用screen参数:

screen -S yourname -> 新建一个叫yourname的session

screen -ls -> 列出当前所有的session

screen -r yourname -> 回到yourname这个session

screen -d yourname -> 远程detach某个session

screen -d -r yourname -> 暂时断开当前session并回到yourname这个session

screen -D -r yourname-> 暂停当前的session,并logout,再链接yourname这个session

用screen -d命令detached 会话后， 如何杀死会话：

screen -S 23536 -X quit

ps: 暂时断开（detach）screen会话

# 压缩与解压

# iptables 开启指定端口

iptables其实不是真正的防火墙，我们可以把它理解成一个客户端代理，用户通过iptables这个代理，将用户的安全设定执行到对应的"安全框架"中，这个"安全框架"才是真正的防火墙，这个框架的名字叫netfilter

 

netfilter才是防火墙真正的安全框架（framework），netfilter位于内核空间。

iptables其实是一个命令行工具，位于用户空间，我们用这个工具操作真正的框架。

 

netfilter/iptables（下文中简称为iptables）组成Linux平台下的包过滤防火墙，与大多数的Linux软件一样，这个包过滤防火墙是免费的，它可以代替昂贵的商业防火墙解决方案，完成封包过滤、封包重定向和网络地址转换（NAT）等功能。

  

Netfilter是Linux操作系统核心层内部的一个数据包处理模块，它具有如下功能：

网络地址转换(Network Address Translate)

数据包内容修改

以及数据包过滤的防火墙功能


所以说，虽然我们使用service iptables start启动iptables"服务"，但是其实准确的来说，iptables并没有一个守护进程，所以并不能算是真正意义上的服务，而应该算是内核提供的功能。



iptables -I INPUT -p tcp --dport 8080 -j ACCEPT

iptables -I OUTPUT -p tcp --sport 8080 -j ACCEPT

给指定ip开启某端口访问权限：

iptables -I INPUT -p tcp --dport 55618  -j DROP

iptables -I INPUT -s 115.28.139.46 -p tcp --dport 55618  -j ACCEPT

iptables -I INPUT -p tcp --dport 2181 -j DROP

iptables -I INPUT -s 127.0.0.1 -p tcp --dport 2181 -j ACCEPT

 

删除某一条规则：
iptables -D INPUT 2

 

service iptables save

service iptables restart


## UFW和iptables的关系

UFW全称为Uncomplicated Firewall，是Ubuntu系统上配置iptables防火墙的工具。UFW提供一个非常友好的命令用于创建基于IPV4，IPV6的防火墙规则。由于Ubuntu下的iptables操作起来比较复杂，依赖关系比较多，所以使用UFW时可以简化很多操作。



# 装系统

## 华硕主板相关

华硕主板进入bios， 按住del健。

在boot选项中，选择Hard Disk Drives启动方式，进入后，可选U盘启动。

## 工具
首先下载工具Refu： [http://rufus.ie/](http://rufus.ie/)

# Reference
1. [Linux下查看系统配置](https://www.cnblogs.com/fengff/p/11776284.html)
2. [linux screen 命令小结](https://zhuanlan.zhihu.com/p/42551093)
3. [iptables 开启指定端口](https://blog.csdn.net/iteye_7816/article/details/82584207)
4. [UbuntuServer-18.04 U 盘安装教程](https://www.jianshu.com/p/da49cd69e8ff)
5. [如何从命令行创建和调整ext4分区？](https://ubuntuqa.com/article/7013.html)
6. [Linux中查看进程状态信息](https://blog.csdn.net/qq_24754061/article/details/83350691)
7. [ubuntu创建和删除用户](https://blog.csdn.net/ninnyyan/article/details/88059092)
8. [我的主板是华硕老主板，请问我u盘装系统怎么设置？](https://zhidao.baidu.com/question/1756148692115529908.html)
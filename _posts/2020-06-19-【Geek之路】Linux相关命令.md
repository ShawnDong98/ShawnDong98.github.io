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

# GPU

> nvidia-smi

# 进程


# screen命令

进入screen会话后，可在会话中创建多个窗口（window），并对窗口进行管理，管理命令以ctrl + a开头。

在已有screen会话中创建新的窗口:

1.在当前screen窗口中键入C-a c，即Ctrl键+a键，之后再按下c键，screen 在该会话内生成一个新的窗口并切换到该窗口

2. C-a n，即Ctrl键+a键,之后再按下n键, 切换到下一个窗口； C-a p，即Ctrl键+a键,之后再按下p键, 切换到前一个窗口

3. ctrl a + k 关闭当前窗口

4.常用screen参数:

screen -S yourname -> 新建一个叫yourname的session

screen -ls -> 列出当前所有的session

screen -r yourname -> 回到yourname这个session

screen -d yourname -> 远程detach某个session

screen -d -r yourname -> 结束当前session并回到yourname这个session

screen -D -r yourname-> 结束当前的session,并logout,再链接yourname这个session

用screen -d命令detached 会话后， 如何杀死会话：

screen -S 23536 -X quit

# 压缩与解压

# iptables 开启指定端口

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




# Reference
1. [Linux下查看系统配置](https://www.cnblogs.com/fengff/p/11776284.html)
2. [linux screen 命令小结](https://zhuanlan.zhihu.com/p/42551093)
3. [iptables 开启指定端口](https://blog.csdn.net/iteye_7816/article/details/82584207)
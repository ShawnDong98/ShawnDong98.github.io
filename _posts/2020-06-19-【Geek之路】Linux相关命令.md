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

训练时我们经常需要检测内存的占用情况,使用free命令即可,具体用法如下

> watch free -h

-h指的是human,该选项会将内存用量转换为以GB为单位,方便直观.

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

先把已有的分区删掉， 再重新建， 避免不必要的bug。

### 将新分区的文件系统格式化为ext4类型

> sudo mkfs -t ext4 /dev/sdx1


### 查看磁盘块ID

> blkid


### 编辑/etc/fstab

> sudo vim /etc/fstab

```
UUID=0fa95857-d952-41c8-838a-ca3dea2d57ad /home/ShawnD/4t1     ext4    errors=remount-ro 0       1
```

重启

### 修改文件夹权限给用户

> sudo chown -R 你的用户名 /media/datadisk



某次挂载一直失败， 寻找原因

1. 打开系统自带的“Disks”软件
2. 点击你想自动挂载的硬盘
3. 点击Additional Partition Options图标

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1601886173192.png)

4. 选择Edit Mount Options,把User Session Defaults设成Off，并确定Mount at system startup已经选中即可。

就是这里出的问题， 它设计到fstab是否有效。


# GPU

> nvidia-smi

# 进程

ps -l   列出与本次登录有关的进程信息；

ps -aux   查询内存中进程信息；

ps -aux \| grep \*\*\*   查询\*\*\*进程的详细信息；

top   查看内存中进程的动态信息；

kill -9 pid   杀死进程。

## 批量杀死进程


```
ps -ef | grep tools/train.py | grep -v grep | awk '{print $2}' | xargs kill -9 
```

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

# 添加和删除 ppa 源

## 添加 ppa 源

**添加PPA源：**

```
sudo add-apt-repository ppa:app-name/ppa-name
```

**更新：**


```
sudo apt update
```


## 删除 ppa 源

**删除PPA源：**

```
sudo add-apt-repository -r ppa:app-name/ppa-name
```

**更新：**

```
sudo apt update
```

# apt安装卸载软件

## 查看已安装的软件

```
apt list --installed
```



# dpkg安装卸载软件

## 安装

```
sudo dpkg -i 软件名
```


## 卸载

```
sudo dpkg -r 软件名
```


## 查询已安装的软件

```
dpkg --get-selections
```


## dpkg 安装缺少依赖的方法


```
 sudo apt-get -f -y install
```


# 压缩与解压

## tar

tar是把文件打成一个包，并不压缩;

gz是用gzip把打成包的.tar文件压缩;

所以成了一个.tar.gz的文件

## 压缩

```
# tar cvfz backup.tar.gz /xxx/
```

- c, --create, create a new archive
- v, --verbose, verbosely list files processed
- f, --file \[HOSTNAME:\]F, use archive file or device F (default /dev/rmt0)
- z, --gzip, --ungzip, filter the archive through gzip


## 解压

```
tar -zxvf xxx.tar.gz
```

- z, --gzip, --ungzip, filter the archive through gzip
- x, --extract, --get,  extract files from an archive
- v, --verbose,  verbosely list files processed
- f, --file \[HOSTNAME:\]F, use archive file or device F (default /dev/rmt0)


## Read more: tar，gzip的使用方法

1） 压缩一组文件为tar.gz后缀。

```
tar cvf backup.tar /etc

gzip -q backup.tar
```

或 

```
tar cvfz backup.tar.gz /etc/
```

2） 释放一个后缀为tar.gz的文件。

```
gunzip backup.tar.gz #tar xvf backup.tar
```

或

```
tar xvfz backup.tar.gz
```

3） 用一个命令完成压缩

```
tar cvf - /etc/ | gzip -qc > backup.tar.gz
```

4） 用一个命令完成释放

```
gunzip -c backup.tar.gz | tar xvf -
```

5） 如何解开tar.Z的文件？
   
```
tar xvfz backup.tar.Z
```

或

```
uncompress backup.tar.Z #tar xvf backup.tar
```

6） 如何解开.tgz文件？

```
gunzip backup.tgz
```

7） 如何压缩和解压缩.bz2的包？

```
bzip2 /etc/smb.conf
```

这将压缩文件smb.conf成smb.conf.bz2

```
bunzip2 /etc/smb.conf.bz2
```

这将在当前目录下还原smb.conf.bz2为smb.conf

注:.bz2压缩格式不是很常用，可以man bzip2

8） 如何解压tar.bz2的包？


```
tar   jxf   linux-2.8.18.8.tar.bz2
```

## 解压.gz

> sudo gunzip filename.gz


# 端口

## 查看端口


> netstat -a


## 查看占用端口的进程

> sudo lsof -i :1087



##  iptables 开启指定端口

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


# 修改DNS

## 怎么找到DNS配置文件

如果你不想看DNS配置的工作原理，你可以直接跳到“如何修改DNS配置文件”。

接下来我们将一步一步说明如何配置自定义的DNS服务器地址。如果你尝试修改/etc/resolv.conf文件，你将会看到文件顶部如下提示。

```
# This file is managed by man:systemd-resolved(8). Do not edit.
#
# This is a dynamic resolv.conf file for connecting local clients directly to
# all known uplink DNS servers. This file lists all configured search domains.
#
# Third party programs must not access this file directly, but only through the
# symlink at /etc/resolv.conf. To manage man:resolv.conf(5) in a different way,
# replace this symlink by a static file or a different symlink.
#
# See man:systemd-resolved.service(8) for details about the supported modes of
# operation for /etc/resolv.conf.

```

## 


# 代理

## terminal 设置代理

```
export http_proxy=http://proxyAddress:port
```

http的代理端口是12333，想执行wget或者curl来下载国外的东西，可以使用如下命令：

```
export http_proxy=http://127.0.0.1:12333
```

如果是https那么就经过如下命令：

```
export https_proxy=http://127.0.0.1:12333
```

## terminal 默认代理

编辑~/.bashrc， 在末尾添加

```
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
```

如果在conda环境， 切换到默认环境

```
source ~/.bashrc
```

# 装系统

## 华硕主板相关

华硕主板进入bios， 按住del健。

在boot选项中，选择Hard Disk Drives启动方式，进入后，可选U盘启动。

## 工具


首先下载工具Refu： [http://rufus.ie/](http://rufus.ie/)


## ssh

安装SSH服务:

> sudo apt install openssh-client #本地主机运行此条，实际上通常是默认安装client端程序的 \\
sudo apt install openssh-server #在被连接的服务器运行此条命令安装


启动SSH服务:

> sudo /etc/init.d/ssh start

启动后通过以下指令判断SSH服务是否正确启动：

> ps -e \| grep ssh


### bugs

vscode配置远程连接失败：过程试图写入的管道不存在


报错信息：

```
[20:46:09.521] Log Level: 3
[20:46:09.530] remote-ssh@0.49.0
[20:46:09.530] win32 x64
[20:46:09.531] SSH Resolver called for "ssh-remote+7b22686f73744e616d65223a2254656e63656e74227d", attempt 1
[20:46:09.532] SSH Resolver called for host: Tencent
[20:46:09.532] Setting up SSH remote "Tencent"
[20:46:09.559] Using commit id "c47d83b293181d9be64f27ff093689e8e7aed054" and quality "stable" for server
[20:46:09.559] Install and start server if needed
[20:46:09.565] Checking ssh with "ssh -V"
[20:46:09.625] > OpenSSH_for_Windows_7.7p1, LibreSSL 2.6.5
[20:46:09.628] Running script with connection command: ssh -T -D 51303 Tencent bash
[20:46:09.630] Terminal shell path: C:\WINDOWS\System32\cmd.exe
[20:46:09.776] > 
> 
...
> �]0;C:\WINDOWS\System32\cmd.exe�
[20:46:09.776] Got some output, clearing connection timeout
[20:46:09.783] > 
> 
...
[20:46:09.992] > @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
> 
[20:46:09.999] > @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
> @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
> IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
> Someone could be eavesdropping on you right now (man-in-the-middle attack)!     
> It is also possible that a host key has just been changed.
> The fingerprint for the ECDSA key sent by the remote host is
> SHA256:teZb8yKzveqH5iVGOEalepGRmKhWlD2LZLNe0QqOChg.
> Please contact your system administrator.
> Add correct host key in C:\\Users\\bob/.ssh/known_hosts to get rid of this mes
> sage.
> Offending ECDSA key in C:\\Users\\bob/.ssh/known_hosts:14
> ECDSA host key for 106.*.249.* has changed and you have requested strict chec
> king.
> Host key verification failed.
> 过程试图写入的管道不存在。
> 
[20:46:10.332] "install" terminal command done
[20:46:10.332] Install terminal quit with output: 过程试图写入的管道不存在。
[20:46:10.332] Received install output: 过程试图写入的管道不存在。
[20:46:10.334] Stopped parsing output early. Remaining text: 过程试图写入的管道不存在。
[20:46:10.334] Failed to parse remote port from server output
[20:46:10.335] Resolver error: 
[20:46:10.341] ------
```

解决方案就是把本地的known_hosts的原服务器信息全部删掉（根据IP地址删除），然后重新连接就可以了。

known_hosts在.ssh文件夹下。


## sftp

一、适用场景

　　我们平时习惯了使用 ftp 来上传下载文件，尤其是很多 Linux 环境下，我们一般都会通过第三方的SSH 工具连接到 Linux，但是当我们需要传输文件到 Linux 服务器当中，很多人习惯用 ftp 来传输，其实 Linux 默认是不提供 ftp 的，需要你额外安装 FTP 服务器。而且 ftp 服务器端会占用一定的 VPS 服务器资源。尤其笔者更建议使用 sftp 代替 ftp.

　　主要原因：① 可以不用额外安装任何服务器端程序；② 会更省系统资源；③ SFTP 使用加密传输认证信息和传输数据，相对来说会更安全；④ 也不需要单独配置，对新手来说比较简单（开启 SSH 默认就开启了 STFP）。

二、主要区别

　　FTP 是一种文件传输协议，一般是为了方便数据共享的。包括一个 FTP 服务器和多个 FTP 客户端。FTP 客户端通过 FTP 协议在服务器上下载资源。而 SFTP 协议是在 FTP 的基础上对数据进行加密，使得传输的数据相对来说更安全。但是这种安全是以牺牲效率为代价的，也就是说 SFTP 的传输效率比 FTP 要低（不过现实使用当中，没有发现多大差别）。
  
  
 安装filezilla

```
sudo apt-get install filezilla
```


sftp默认的连接端口号是22


## 安装Nvidia驱动

更换阿里源， 用默认源安装很慢

```
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

在终端输入：ubuntu-drivers devices，可以看到自己的显卡型号以及推荐的驱动版本。

如果没有推荐版本， 添加ppa源

```
sudo add-apt-repository ppa:graphics-drivers/ppa
```



- 如果同意安装推荐版本，那我们只需要终端输入：sudo ubuntu-drivers autoinstall 就可以自动安装了。
- 当然我们也可以使用 apt 命令安装自己想要安装的版本，比如我想安装 340 这个版本号的版本，终端输入：sudo apt install nvidia-340 就自动安装了。
- 安装过程中按照提示操作，除非你知道每个提示的真实含义，否则所有的提示都选择默认就可以了，安装完成后重启系统，NVIDIA 显卡就可以正常工作了。安装完成后你可以参照[https://linuxconfig.org/benchmark-your-graphics-card-on-linux](https://linuxconfig.org/benchmark-your-graphics-card-on-linux) 上的介绍测试你的显卡。



# 打开摄像头

```
sudo apt-get install guvcview
```

```
guvcview -d /dev/video
```

# 分辨率

## 查看现有分辨率

```
xrandr
```

## 增加新的分辨率模式

```
cvt 1920 1080 #查看具体正确设置
```

输出为:

> Modeline “1920x1080_60.00” 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync


```
xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync #创建创建分辨率1980X1080
xrandr --addmode HDMI-0 "1920x1080_60.00"#将分辨率 1980 X1080添加值分辨率选项中
```

注意:此处HDMI-0应于前面xrandr处的输出一致,并不一定是HDMI-0

## 删除已有分辨率模式

删除已有模式

```
xrandr --rmmode name
```

给输出设备删除已有模式

```
xrandr --delmode output name
```

## 更改分辨率
```
 xrandr -s 1920x1080_60.00    #更改分辨率模式 
```


# 快捷键

- Ctrl+Alt+T 启动终端


# 显示网速

打开Ubuntu软件中心，搜索netspeed，安装立即生效。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1616844566166.png)


# 调整字体大小

单击Ubuntu桌面的top-right角處的向下箭頭，然後從以下視圖中單擊設置圖標：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1617598983754.png)

默認情況下，“設置”實用程序在Wi-Fi選項卡中打開。您需要單擊通用訪問選項卡以配置文本大小。

通用訪問視圖如下所示：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1617599008504.png)


# 将控制台同时输出并保存至文件

在 Linux 终端执行直接 run 代码时，可以在执行命令后加上 `2>&1`，在保存输出信息到文件的同时，终端仍正常打印信息。

```
python run.py 2>&1 | tee train.log
```

# 解压分块的zip文件

直接 `unzip xxx.zip` 报错：

```
file #1:  bad zipfile offset (local header sig):  4
file #2:  bad zipfile offset (local header sig):  207105
file #3:  bad zipfile offset (local header sig):  209345
..
..
file #302:  bad zipfile offset (lseek):  2924544
file #303:  bad zipfile offset (lseek):  2940928
..
..
..
inflating: en_US/1/2.zip
```

```
zip -F file.zip --out file-large.zip 
```

```
unzip file-large.zip 
```

# 通过

# Bugs

## apt-get常见错误——Unmet dependencies


安装错误：“E: Unmet dependencies.”

原因：非正常停止apt-get install *

错误提示：E: Unmet dependencies. Try 'apt-get -f install' with no packages (or specify a solution)

解决方法：sudo apt-get --fix-broken install

注意后面啥也没有，直接用这个命令修复apt-get。

# Reference
1. [Linux下查看系统配置](https://www.cnblogs.com/fengff/p/11776284.html)
2. [linux screen 命令小结](https://zhuanlan.zhihu.com/p/42551093)
3. [iptables 开启指定端口](https://blog.csdn.net/iteye_7816/article/details/82584207)
4. [UbuntuServer-18.04 U 盘安装教程](https://www.jianshu.com/p/da49cd69e8ff)
5. [如何从命令行创建和调整ext4分区？](https://ubuntuqa.com/article/7013.html)
6. [Linux中查看进程状态信息](https://blog.csdn.net/qq_24754061/article/details/83350691)
7. [ubuntu创建和删除用户](https://blog.csdn.net/ninnyyan/article/details/88059092)
8. [我的主板是华硕老主板，请问我u盘装系统怎么设置？](https://zhidao.baidu.com/question/1756148692115529908.html)
9. [Ubuntu环境下SSH服务安装、SSH远程登录以及SSH数据传输](https://www.cnblogs.com/asyang1/p/9467646.html)
10. [Ubuntu 18.04 安装 NVIDIA 显卡驱动](https://zhuanlan.zhihu.com/p/59618999)
11. [vscode配置远程连接失败：过程试图写入的管道不存在（已解决）](https://www.jianshu.com/p/7c59ea90693b)
12. [Ubuntu18.04 自动挂载硬盘](https://www.cnblogs.com/jiahangok/p/12015441.html)
13. [dpkg安装以及卸载软件](https://blog.csdn.net/u012300744/article/details/80267225)
14. [http error - listen tcp 127.0.0.1:1087: bind: address already in use - Mac](https://blog.csdn.net/weixin_42108437/article/details/106072810)
15. [Linux 让终端走代理的几种方法](https://zhuanlan.zhihu.com/p/46973701)
16. [SFTP和FTP的区别](https://www.cnblogs.com/maigy/p/11641616.html)
17. [Ubuntu下FTP工具推荐](https://blog.csdn.net/michaelpp/article/details/5966611)
18. [apt如何列出所有已经安装的软件包](https://www.cnblogs.com/it-tsz/p/11107510.html)
19. [Ubuntu下查看内存使用情况](https://zhuanlan.zhihu.com/p/47687203)
20. [Ubuntu 打开摄像头](https://blog.csdn.net/tajon1226/article/details/99854348)
21. [ubuntu18.04 修改屏幕分辨率](https://blog.csdn.net/recher_He1107/article/details/107226192)
22. [tar.gz文件命名及压缩解压方法](https://blog.csdn.net/maray/article/details/4312768)
23. [Ubuntu18显示实时网速](https://blog.csdn.net/bornfree5511/article/details/110292459)
24. [如何在Ubuntu 18.04 LTS中更改文本大小](https://ubuntuqa.com/zh-tw/article/8457.html#:~:text=%E6%96%B9%E6%B3%951%EF%BC%9A%E9%80%9A%E9%81%8EUbuntu%E8%A8%AD%E7%BD%AE%E5%AF%A6%E7%94%A8%E7%A8%8B%E5%BA%8F&text=%E6%82%A8%E9%9C%80%E8%A6%81%E5%96%AE%E6%93%8A%E9%80%9A%E7%94%A8%E8%A8%AA%E5%95%8F%E9%81%B8%E9%A0%85%E5%8D%A1%E4%BB%A5%E9%85%8D%E7%BD%AE%E6%96%87%E6%9C%AC%E5%A4%A7%E5%B0%8F%E3%80%82&text=%E6%88%96%E8%80%85%EF%BC%8C%E6%82%A8%E5%8F%AF%E4%BB%A5%E5%9C%A8Dash,%E5%AD%97%E9%AB%94%E8%A8%AD%E7%BD%AE%E5%8D%B3%E6%9C%83%E7%94%9F%E6%95%88%E3%80%82)
25. [apt-get常见错误——Unmet dependencies](https://www.cnblogs.com/x_wukong/p/5254183.html)
26. [Ubuntu系统批量杀死进程方法](https://www.cnblogs.com/hewm/articles/11427874.html)
27. [【小记】将控制台输出保存至文件](https://blog.csdn.net/qq_31347869/article/details/96586433)
28. [bad zip file offset when unzipping multi-part files](https://blog.csdn.net/Tjj_1998/article/details/109612196)
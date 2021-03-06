---
layout:     post
title:      "【Geek之路】Colab使用手册"
subtitle:   ""
date:       2020-01-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - Geek
    - 深度学习
---


# 查看分配的GPU

> ! /opt/bin/nvidia-smi

# 挂载硬盘


> from google.colab import drive \\
> drive.mount("/content/drive")

# 安装pytorch和torchvision

colab本身就安装好pytorch的，但是安装的是最新版本的pytorch，常有坑出现

因此追求稳定， 使用pytorch1.3版本

>!pip install 'pillow<7.0.0'  \\
>!pip install torch==1.3.0 torchvision==0.4.1 \\
>!pip install numpy==1.16.0

# 使用apex加速

安装方法1：

> !git clone https://github.com/NVIDIA/apex
> %cd apex


full functionality：

> !pip install -v --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" ./

Python-only build：

> !pip install -v --no-cache-dir ./

如果完全安装full functionality， 大概需要十分钟。

如果仅安装python-only build， 无法加速，甚至更慢。


安装方法二：

> !export CUDA_HOME=/usr/local/cuda-10.1
> !pip install -v --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" pytorch-extension


三行代码即可无痛使用：

```python
from apex import amp
model, optimizer = amp.initialize(model, optimizer, opt_level="O1") # 这里是“欧一”，不是“零一”
with amp.scale_loss(loss, optimizer) as scaled_loss:
    scaled_loss.backward()
```

实验发现，按照上述方法使用， 并没有加速，反而慢了（使用前batch_time: 1.3s, 使用之后batch_time: 1.7s），费解。

并且显存占用量并没有降低多少（大概500M）。


> Also for completeness, pure fp16 training on P100 is not recommended and not supported, pseudo-fp16 (with storage in fp16, and math in fp32) can be used, but it's math throughput is approx equal to fp32 throughput on P100, so the only benefit is coming from less memory needed.

>  Because of accumulation in fp16. If you use Apex on p100, it would still call pytorch, and pytorch does not support fp16 accumulation, you'll get pseudo-fp16 whether you want it or not.



# kaggle 上传与更新数据

建立数据文件夹：

１．建立文件夹放入数据

２．初始化数据集

> kaggle datasets init -p ~/Documents/barley_data/

３．编辑json文件

上传数据：

> kaggle datasets create -p ~/Documents/barley_data/

更新数据：

> kaggle datasets version -p ~/Documents/barley_data/ -m "added info file with additional metadata"

【注】下载数据可以用curl工具



# 下载kaggle数据集


```
%cd /content/
!mkdir .kaggle
!pip install kaggle
import json
import zipfile
import os
token = {"username":"xxx","key":"xxx"}
with open('/content/.kaggle/kaggle.json', 'w') as file:
    json.dump(token, file)

!chmod 600 /content/.kaggle/kaggle.json
!cp /content/.kaggle/kaggle.json ~/.kaggle/kaggle.json
!kaggle config set -n path -v /content

!kaggle datasets download -d jessicali9530/celeba-dataset
os.chdir('/content/datasets/jessicali9530/celeba-dataset')
for file in os.listdir():
    zip_ref = zipfile.ZipFile(file, 'r')
    zip_ref.extractall()
    zip_ref.close()
```
 
 这里将username和key改为自己的。
 
 数据集也换成自己要下载的。
 
 
 $$z = \epsilon \times \sigma + \mu \tag {1}$$
 

# python查看已用显存

首先安装：

> pip install nvidia-ml-py3

```python
import pynvml
pynvml.nvmlInit()
# 这里的0是GPU id
handle = pynvml.nvmlDeviceGetHandleByIndex(0)
meminfo = pynvml.nvmlDeviceGetMemoryInfo(handle)
print(meminfo.used)
```


# 解压缩


## 解压缩卡死问题
**unzip**
- -d<目录> 指定文件解压缩后所要存储的目录
- -o 不必先询问用户，unzip执行后覆盖原有文件。

> !unzip -o celeba-dataset.zip >train.log

压缩包超过650M，并且文件太多时会导致网页无响应．

因为解压的时候会有大量的log, log会导致网页卡死．

在上面的最后加了一个>train.log来重定向，这样网页就不会卡死，

也就可以顺利解压了．

重定向以后，解压进度看不见了怎么办？

你可以现在本地解压一遍，解压的时候同样重定向到train.log（202599行）

colab上的train.log和本地的train.log的两者大小的比值就是当前的解压进度．


# ipynb文件直接在colab中打开
 
 
 添加markdown，输入以下内容
 
 ```html
 <a href="https://colab.research.google.com/github/ShawnDong98/GAN/blob/master/DCGAN/DCGAN.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
 ```
 
 将后面github的内容改为自己的
 
>  <a href="https://colab.research.google.com/github/ShawnDong98/GAN/blob/master/DCGAN/DCGAN.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>



# Colab掉线问题

```
function ClickConnect(){
console.log("Working"); 
document.querySelector("colab-toolbar-button#connect").click() 
}
setInterval(ClickConnect,60000)
```

打开你的浏览器，执行F12或者Ctrl + Shift + i ， 将上面代码复制粘贴到Console框里按回车即可。

报错:


![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1583111833616.png)

```
function ClickConnect(){
console.log("Working"); 
document.querySelector("colab-toolbar-button").click() 
}setInterval(ClickConnect,60000)
```

这个有效，但是会产生这样的cell

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1583137163151.png)

其他的一些方案：


2020-02-26:
```
function ClickConnect(){
var reconnect = document.querySelector("colab-toolbar-button#connect")
if(reconnect != null){
console.log("working")
reconnect.click()
}
}
setInterval(ClickConnect,60000)
```

```
function ClickConnect(){
var reconnect = document.querySelector("paper-button#ok")
if(reconnect != null){
console.log("working")
reconnect.click()
}
}
setInterval(ClickConnect,60000)
```

2020-02-24

The reason it didn’t work was due to `shadowRoot` blocking getElementById.

```
function ClickConnect(){
console.log("Working");
document.querySelector("colab-connect-button").shadowRoot.getElementById('connect').click()
}
setInterval(ClickConnect,60000)
```

2020-02-23

```
function ClickConnect(){
console.log("Working");
document.querySelector("colab-connect-button").click()
}
setInterval(ClickConnect,6000)
```

# 使用vscode连接到colab

这似乎是可行的， 但是体验并不好，因为每次colab terminate之后seesion会断开，端口号也会切换。

先[mark](https://stackoverflow.com/questions/59508225/is-it-possible-to-connect-vscode-on-a-local-machine-with-google-colab-the-fre)一下


# Reference
1. [google drive的压缩包直接解压到google drive](https://blog.csdn.net/appleyuchi/article/details/102539962)
2. [利用kaggle的API将数据集直接下载到Google Colab](https://blog.csdn.net/qq_35654046/article/details/87621396)
3. [探索Baidu AI Studio时的一些坎坷](https://blog.csdn.net/Hilary_Choi/article/details/98250715)
4. [不做无用功 Google Colab掉线自动重连“助手”](https://zhuanlan.zhihu.com/p/101652327)
5. [google colab断线自动重连](https://blog.csdn.net/qq_35493664/article/details/94726560)
6. [How to prevent Google Colab from disconnecting ?](https://medium.com/@shivamrawat_756/how-to-prevent-google-colab-from-disconnecting-717b88a128c0)
7. [kaggle 上传与更新数据](https://www.jianshu.com/p/f964baa360e5)
8. [Is it possible to connect vscode (on a local machine) with Google Colab (the free service) runtime?](https://stackoverflow.com/questions/59508225/is-it-possible-to-connect-vscode-on-a-local-machine-with-google-colab-the-fre)
9. [NVIDIA/apex](https://github.com/NVIDIA/apex)
10. [【PyTorch】唯快不破：基于Apex的混合精度加速](https://zhuanlan.zhihu.com/p/79887894)
11. [Solution for CUDA Installation Issues #754](https://github.com/NVIDIA/apex/issues/754)
12. [pynvml 查看GPU已使用的显存](https://blog.csdn.net/jacke121/article/details/82982693)
13. [Would apex still be useful for non Volta architectures? #14](https://github.com/NVIDIA/apex/issues/14)

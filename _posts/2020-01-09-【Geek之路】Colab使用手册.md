---
layout:     post
title:      "【Geek之路】Colab使用手册"
subtitle:   ""
date:       2020-01-09
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - Colab
    - 深度学习
---


## 挂载硬盘
> from google.colab import drive
drive.mount('/content/drive')

## 下载kaggle数据集
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
 
 ## ipynb文件直接在colab中打开
 
 
 添加markdown，输入以下内容
 
 ```
 <a href="https://colab.research.google.com/github/ShawnDong98/GAN/blob/master/DCGAN/DCGAN.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
 ```
 
 将后面github的内容改为自己的
 
>  <a href="https://colab.research.google.com/github/ShawnDong98/GAN/blob/master/DCGAN/DCGAN.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>




## 解压缩


### 解压缩卡死问题
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

## Colab掉线问题

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




## Reference
1. [google drive的压缩包直接解压到google drive](https://blog.csdn.net/appleyuchi/article/details/102539962)
2. [利用kaggle的API将数据集直接下载到Google Colab](https://blog.csdn.net/qq_35654046/article/details/87621396)
3. [探索Baidu AI Studio时的一些坎坷](https://blog.csdn.net/Hilary_Choi/article/details/98250715)
4. [不做无用功 Google Colab掉线自动重连“助手”](https://zhuanlan.zhihu.com/p/101652327)
5. [google colab断线自动重连](https://blog.csdn.net/qq_35493664/article/details/94726560)
6. [How to prevent Google Colab from disconnecting ?](https://medium.com/@shivamrawat_756/how-to-prevent-google-colab-from-disconnecting-717b88a128c0)

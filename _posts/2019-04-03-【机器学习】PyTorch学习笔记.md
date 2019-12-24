---
title: 【机器学习】PyTorch学习笔记
date: 2019-04-03 22:02:36
tags:
---


##### --------------------------------
##### Author ： ShawnDong
##### updateDate ：2019.4.3
##### Blog ： ShawnDong98.github.io
##### --------------------------------


### Tensor
rand 0~1随机分布
randint (min, max, shape) [min, max)随机分布
randn 0~1正态分布
torch.normal(mean, std): 生成根据mean和std生成正态分布
torch.full(shape, value)
torch.arange(min, max, stride): 按照递增顺序生成序列(min. max)
torch.linespace(min, max, steps): 按照steps等分[min, max]
torch.ones
torch.zeros
torch.eye()：只能接受一维或二维参数，因为只能用于二维矩阵
torch,randperm(10)：生成不包括10的随机序列，用于shuffle，生成随机种子，类似numpy_seed
torch.all
torch.eq

### 索引与切片

1. : [0, n]
2. :n [0, n]
3. n: [n, -1]
4. : : 3

a.index_select(dim, torch.tensor[shape])
a[0， ..., ::2]:  ...表示剩下的维度都取

mask = x.ge(0.5): 选取大于等于0.5的元素 
torch.masked_select(a, mask)
torch.take(src, torch.tensor([shape]):

### 维度变换
view/reshape
Squeeze/unsqueeze
![](https://upload-images.jianshu.io/upload_images/8332901-2deb658d042cc0e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






![](https://upload-images.jianshu.io/upload_images/8332901-f364601882db0027.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Expand/repeat：
Expand：broadcasting 参数是目标维度
Repeat：memory copied 参数是倍数
![](https://upload-images.jianshu.io/upload_images/8332901-fac3119660378eb4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






![](https://upload-images.jianshu.io/upload_images/8332901-9b0adff8e0f72bfd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Transpose：两个维度交换
contiguous：
permute: 任意多个维度交换

### Broadcast
expand
expand_as(A)
小维度往大维度扩张
![](https://upload-images.jianshu.io/upload_images/8332901-ae583afafb9560d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 合并与切割
![](https://upload-images.jianshu.io/upload_images/8332901-48071589eda040e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-01d9f916f9d19d3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





![](https://upload-images.jianshu.io/upload_images/8332901-f8ddf101ffe02d71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-e924afd91919d923.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 基本运算
![](https://upload-images.jianshu.io/upload_images/8332901-9059aea636dec89d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





![](https://upload-images.jianshu.io/upload_images/8332901-d9b08b5bc0612488.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





![](https://upload-images.jianshu.io/upload_images/8332901-76f3a0b1951bedae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)








![](https://upload-images.jianshu.io/upload_images/8332901-48b8dfc1f6ba26c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-ba30459ffbdcb0e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-69f5a2c1d8608fe0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)









![](https://upload-images.jianshu.io/upload_images/8332901-04bc5c5c494a75a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






![](https://upload-images.jianshu.io/upload_images/8332901-e30d20258dc7ac0c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 统计属性
![](https://upload-images.jianshu.io/upload_images/8332901-1e8381d67d2a1ebd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





![](https://upload-images.jianshu.io/upload_images/8332901-a12a75554fd2a9bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-e9889cb9aa97c462.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-52c6de96b6cc471e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-79d53f40a135067e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-e7ba1cbcd38ed00d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)








![](https://upload-images.jianshu.io/upload_images/8332901-2c7ac33afc7fa67b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 高阶OP
![](https://upload-images.jianshu.io/upload_images/8332901-7ad7610a7461810f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-a83523e9d0b1c905.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






![](https://upload-images.jianshu.io/upload_images/8332901-de6e4396f3241010.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






![](https://upload-images.jianshu.io/upload_images/8332901-b50588a0b08ded43.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-f3db7d3cec9ced35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






### 常见激活函数及其梯度
![](https://upload-images.jianshu.io/upload_images/8332901-883cda4a87e5a20e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





![](https://upload-images.jianshu.io/upload_images/8332901-7c47ac8298f2496a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






![](https://upload-images.jianshu.io/upload_images/8332901-20422dd2013e1a3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





![](https://upload-images.jianshu.io/upload_images/8332901-94269ea5d41451e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![](https://upload-images.jianshu.io/upload_images/8332901-55d0931253b9f6cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![](https://upload-images.jianshu.io/upload_images/8332901-640e3f5df524ec93.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Loss及其梯度
![](https://upload-images.jianshu.io/upload_images/8332901-bd2b83a033e1ad3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![](https://upload-images.jianshu.io/upload_images/8332901-71d94100f2384142.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





![](https://upload-images.jianshu.io/upload_images/8332901-20538f71f95b113a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![](https://upload-images.jianshu.io/upload_images/8332901-f284408090839c47.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![](https://upload-images.jianshu.io/upload_images/8332901-85ef732c3a8ef7c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![](https://upload-images.jianshu.io/upload_images/8332901-d80103bb8f5ca077.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





























































![](https://upload-images.jianshu.io/upload_images/8332901-a320a5639b4da2df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




















![](https://upload-images.jianshu.io/upload_images/8332901-c60e4fb98e686d82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







![](https://upload-images.jianshu.io/upload_images/8332901-68ea92eb3d82d0ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






### 单一输出感知机
![](https://upload-images.jianshu.io/upload_images/8332901-4fe26a564a5e7fa2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






















![](https://upload-images.jianshu.io/upload_images/8332901-d7df9e8f41ebfeae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)












![](https://upload-images.jianshu.io/upload_images/8332901-f447571ed67fa782.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 多输出感知机











![](https://upload-images.jianshu.io/upload_images/8332901-fac6d9d5af3d7634.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)













![](https://upload-images.jianshu.io/upload_images/8332901-4641d539227cd9df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)









![](https://upload-images.jianshu.io/upload_images/8332901-188a3a5ae5059c6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)













![](https://upload-images.jianshu.io/upload_images/8332901-e4ebf652924156dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)














---
layout:     post
title:      "【深度学习】Bottom-Up and Top-Down Attention for Image Captioning and Visual Question Answering"
subtitle:   ""
date:       2021-10-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---



# 


# 环境配置


## make: python: Command not found

将 Makefile 中的python 改为 python3


## AttributeError: 'dict' object has no attribute 'iteritems'

Python3.5中：iteritems变为items

## make: protoc: Command not found


```bash
sudo apt-get install  protobuf-compiler
```

## src/caffe/internal_thread.cpp:1:28: fatal error: boost/thread.hpp: 没有那个文件或目录 compilation terminated.

```bash
sudo apt-get install libboost-all-dev  
```


## .build_release/src/caffe/proto/caffe.pb.h:9:10: fatal error: google/protobuf/stubs/common.h: No such file or directory


```bash
sudo apt-get install libprotobuf-dev protobuf-compiler
```

## src/caffe/net.cpp:8:10: fatal error: hdf5.h: No such file or directory

在 `Makefile.config` 添加 `/usr/include/hdf5/serial/` 到 `INCLUDE_DIRS`

```bash
--- INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include
+++ INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include /usr/include/hdf5/serial/
```

## ./include/caffe/common.hpp:5:10: fatal error: gflags/gflags.h: No such file or directory

```bash
sudo apt-get install libgflags-dev libgoogle-glog-dev liblmdb-dev
```



# Reference

1. [Caffe didn't see hdf5.h when compiling](https://stackoverflow.com/questions/37007495/caffe-didnt-see-hdf5-h-when-compiling/44912342)
2. [caffe安装问题06——gflags.h没有那个文件或者目录](https://blog.csdn.net/sdlypyzq/article/details/85237020)
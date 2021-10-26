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


## ./include/caffe/util/mkl_alternate.hpp:14:10: fatal error: cblas.h: No such file or directory

```bash
sudo apt-get install libopenblas-dev
```

## src/caffe/layers/data_layer.cpp:2:10: fatal error: opencv2/core/core.hpp: No such file or directory

```bash
sudo apt-get install libopencv-dev
```

## 安装opencv-python

```bash
pip install  opencv-python==3.1.0 -i http://pypi.douban.com/simple/    --trusted-host pypi.douban.com
```


```
cmake -DCMAKE_BUILD_TYPE=Release \
-D CMAKE_INSTALL_PREFIX=/usr/local \
-D OPENCV_GENERATE_PKGCONFIG=ON \
-D OPENCV_EXTRA_MODULES_PATH=../opencv_contrib-3.4.15/modules \
-D BUILD_DOCS=ON \
-D BUILD_EXAMPLES=ON \
-D INSTALL_C_EXAMPLES=ON \
-D WITH_QT=ON \
-D WITH_GSTREAMER=ON \
-D VIDEOIO_PLUGIN_LIST=gstreamer \
-D OPENCV_ENABLE_NONFREE=ON \
-D BUILD_opencv_python2=ON \
-D BUILD_opencv_python3=ON \
-D WITH_LAPACK=ON \
-D WITH_EIGEN=ON \
-D WITH_OPENGL=ON \
-D WITH_CUDA=ON \
-D WITH_CUFFT=ON \
-D WITH_CUBLAS=ON \
-D WITH_CUDNN=ON \
-D WITH_NVCUVID=ON \
-D INSTALL_PYTHON_EXAMPLES=ON \
-D BUILD_EXAMPLES=ON \
-D PYTHON_DEFAULT_EXECUTABLE=/usr/bin/python3\
-D PYTHON3_EXCUTABLE=/usr/bin/python3\
-D PYTHON3_INCLUDE_DIR=/usr/include/python3.6m\
-D PYTHON3_LIBRARY=/usr/lib/x86_64-linux-gnu/libpython3.6m.so \
-D PYTHON_NUMPY_PATH=/usr/local/lib/python3.6/dist-packages/numpy/core/include \
-D PYTHON3_PACKAGES_PATH=/usr/local/lib/python3.6/dist-packages ..
```

# Opencv 3.4.5

##  Add the installation prefix of "Qt5" to CMAKE_PREFIX_PATH or set "Qt5_DIR" to a directory containing one of the above files.  If "Qt5" provides a separate development package or SDK, be sure it has been installed.

## CMake Error at cmake/OpenCVModule.cmake:273 (message):


## Could NOT find Pylint (missing: PYLINT_EXECUTABLE)

```bash
sudo apt install -y pyflakes pylint
```
## Could NOT find Doxygen (missing: DOXYGEN_EXECUTABLE)

```bash
apt-get install doxygen
```

# Reference

1. [Caffe didn't see hdf5.h when compiling](https://stackoverflow.com/questions/37007495/caffe-didnt-see-hdf5-h-when-compiling/44912342)
2. [caffe安装问题06——gflags.h没有那个文件或者目录](https://blog.csdn.net/sdlypyzq/article/details/85237020)
3. [cblas.h : no such file or directory #3599](https://github.com/BVLC/caffe/issues/3599)
---
layout:     post
title:      "【深度学习笔录】Tensorflow及Keras学习笔记"
subtitle:   ""
date:       2018-09-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Tensorflow
    - Keras
---


# Keras

## K.function

> keras.backend.function(inputs, outputs, updates=None)

实例化 Keras 函数。

**参数**

- inputs: 占位符张量列表。
- outputs: 输出张量列表。
- updates: 更新操作列表。
- \*\*kwargs: 需要传递给 tf.Session.run 的参数。


**返回**

输出值为 Numpy 数组。

**异常**

- ValueError: 如果无效的 kwargs 被传入。

## Input

>Input(shape=None,batch_shape=None,name=None,dtype=K.floatx(),sparse=False,tensor=None)

Input():用来实例化一个keras张量

**参数**

- shape: 形状元组（整型），不包括batch size。for instance, shape=(32,) 表示了预期的输入将是一批32维的向量。
- batch_shape: 形状元组（整型），包括了batch size。for instance, batch_shape=(10,32)表示了预期的输入将是10个32维向量的批次。
- name: 对于该层是可选的名字字符串。在一个模型中是独一无二的（同一个名字不能复用2次）。如果name没有被特指将会自动生成。
- dtype: 预期的输入数据类型
- sparse: 特定的布尔值，占位符是否为sparse
- tensor: 可选的存在的向量包装到Input层，如果设置了，该层将不会创建一个占位张量。

返回 一个张量

```python
image_input = Input(shape=(None, None, input_shape[2])) #input_shape= (416, 416, 1),
model_body = tiny_yolo_body(image_input, num_anchors//2, num_classes)
```

## Lambda


> keras.layers.core.Lambda(function, output_shape=None, mask=None, arguments=None)

本函数用以对上一层的输出施以任何Theano/TensorFlow表达式。

如果你只是想对流经该层的数据做个变换，而这个变换本身没有什么需要学习的参数，那么直接用Lambda Layer是最合适的了。

- function：要实现的函数，该函数仅接受一个变量，即上一层的输出
- output_shape：函数应该返回的值的shape，可以是一个tuple，也可以是一个根据输入shape计算输出shape的函数
- mask: 
- arguments：可选，字典，用来记录向函数中传递的其他关键字参数


## 保存和加载模型

### 保存模型


使用keras.models.load_model(filepath)来重新实例化模型，如果文件中存储了训练配置的话，该函数还会同时完成模型的编译

```python
from keras.models import load_model
 
model.save('my_model.h5')  # creates a HDF5 file 'my_model.h5'
del model  # deletes the existing model
 
# returns a compiled model
# identical to the previous one
model = load_model('my_model.h5')
```

如果你只是希望保存模型的结构，而不包含其权重或配置信息，可以使用：

```python
# save as JSON
json_string = model.to_json()
 
# save as YAML
yaml_string = model.to_yaml()
```

如果需要保存模型的权重，可通过下面的代码利用HDF5进行保存。注意，在使用前需要确保你已安装了HDF5和其Python库h5py

```python
model.save_weights('my_model_weights.h5')
```

### 加载模型

```python
from keras.models import load_model

load_model = load_model(path)
```

从保存好的json文件或yaml文件中载入模型：

```python
# model reconstruction from JSON:
from keras.models import model_from_json
model = model_from_json(json_string)
 
# model reconstruction from YAML
model = model_from_yaml(yaml_string)
```

如果需要在代码中初始化一个完全相同的模型，请使用：

```python
model.load_weights('my_model_weights.h5')
```

如果需要加载权重到不同的网络结构（有些层一样）中，例如fine-tune或transfer-learning，可以通过层名字来加载模型：

```python
model.load_weights('my_model_weights.h5', by_name=True)
```
# Tensorflow


## tf.io

### tf.io.gfile

#### glob

```python
tf.io.gfile.glob(
    pattern
)
```

- patterns 定义为字符串。这里定义了受支持的 patterns。注意，patterns 可以是可迭代的Python string patterns。
- return： 包含匹配给定 patterns 的文件名的字符串列表。


## tf.random

### uniform

```python
tf.random.uniform(
    shape, minval=0, maxval=None, dtype=tf.dtypes.float32, seed=None, name=None
)
```

## 设置显存动态增长

```python
import tensorflow as tf
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "1"
config=tf.compat.v1.ConfigProto() 
# 设置最大占有GPU不超过显存的80%（可选）
# config.gpu_options.per_process_gpu_memory_fraction=0.8
config.gpu_options.allow_growth = True  # 设置动态分配GPU内存
sess=tf.compat.v1.Session(config=config)
```

## TensorFlow的数据读取机制

> tf.train.string_input_producer(list， shuffle， num_epochs)

这个函数需要传入一个list，系统会自动将它转换为一个文件名队列。
shuffle指在一个epoch内文件的顺序是否被打乱。
epoth：对于一个数据集来讲，运行一个epoch就是将这个数据集中的图片
全部计算一遍。两个epoch就是每张图片都计算了两边。

> tf.train.start_queue_runners

 在使用tf.train.string_input_producer创建文件名队列后，整个系统其实还处于“停滞状态”，也就是说，文件名并没有真正被加入队列中。

而使用tf.train.start_queue_runners之后，才会启动填充队列的线程，这时的系统就不再“停滞”。计算单元可以拿到数据并进行计算，整个程序就运行起来了。

## TensorFlow读取数据的具体步骤
- 第一步， 用tf.train.string_input_producer建立队列。
- 第二步， 通过reader.read读数据。
 tf.WholeFileReader()
tf.FixedLengthReader()
- 第三步，调用tf.train.start_queue_runners。
- 最后通过sess.run()取出图片结果。

## 在数据的读取中线程的同步与停止
>coord = tf.train.Coordinator()
threads = tf.train.start_queue_runners(sess=sess, coord=coord)


tf.train.start_queue_runners函数中有一个参数coord，这个参数叫做线程协调器，用于协调线程之间的关系。

tf.train.start_queue_runners执行之后，会启动一个线程，线程协调器在最后负责对所有线程的接受和处理，即当一个线程结束以后，线程协调器会对所有线程发送通知，协调其完毕。

比如在主线程结束后，加上以下内容
>coord.request_stop()
        coord.join(threads)
             
## TensorBoard: 

输入命令：
>tensorboard --logdir=你训练数据保存的文件夹路径

打开服务器的6006端口，在浏览器里输入
> 服务器的IP地址:6006

# Bug

## Tensorflow2.1安装

> ImportError: DLL load failed: 找不到指定的模块问题


根据提示信息，去微软的官网下载Visual C++即可：

[微软的官网下载Visual C++](https://support.microsoft.com/zh-cn/help/2977003/the-latest-supported-visual-c-downloads)


## AlreadyExistsError: Another metric with the same name already exists

tensorlfow-estimator 和 keras 全部安装 v2.6.0



# Reference
1. [Tensorflow2.1-gpu安装后出现 ImportError: DLL load failed: 找不到指定的模块问题](https://blog.csdn.net/qq_43060552/article/details/104614124)
2. [keras Input 介绍](https://blog.csdn.net/weixin_38145317/article/details/90694258)
3. [Keras：Lambda 层](https://blog.csdn.net/VeritasCN/article/details/89884036)
4. [如何保存Keras模型](https://blog.csdn.net/u010159842/article/details/54407745)
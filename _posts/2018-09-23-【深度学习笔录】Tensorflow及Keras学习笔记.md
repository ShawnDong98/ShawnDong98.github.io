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

### 保存 TextVectorization 层

下面的结果得到的是 `dense` 张量

```python
text_dataset = tf.data.Dataset.from_tensor_slices([
                                                   "this is some clean text", 
                                                   "some more text", 
                                                   "even some more text"]) 
vectorizer = TextVectorization(max_tokens=10, output_mode='int', output_sequence_length = 10)   
vectorizer.adapt(text_dataset.batch(1024))

print(vectorizer("this"))
pickle.dump({'config': vectorizer.get_config(),
             'weights': vectorizer.get_weights()}
            , open("tv_layer.pkl", "wb"))

from_disk = pickle.load(open("tv_layer.pkl", "rb"))
new_vectorizer = TextVectorization(max_tokens=from_disk['config']['max_tokens'],
                                          output_mode='int',
                                          output_sequence_length=from_disk['config']['output_sequence_length'])
new_vectorizer.adapt(tf.data.Dataset.from_tensor_slices(["xyz"]))
new_vectorizer.set_weights(from_disk['weights'])

print(new_vectorizer("this"))
```

```
tf.Tensor([5 0 0 0 0 0 0 0 0 0], shape=(10,), dtype=int64)
tf.Tensor([5 0 0 0 0 0 0 0 0 0], shape=(10,), dtype=int64)
```


下面得到的是 `ragged` 张量：

```python
import tensorflow as tf

text_dataset = tf.data.Dataset.from_tensor_slices([
                                                   "this is some clean text", 
                                                   "some more text", 
                                                   "even some more text"]) 
vectorizer = TextVectorization(max_tokens=10, output_mode='int', output_sequence_length = 10)   
vectorizer.adapt(text_dataset.batch(1024))

print(vectorizer("this"))
pickle.dump({'config': vectorizer.get_config(),
             'weights': vectorizer.get_weights()}
            , open("tv_layer.pkl", "wb"))

from_disk = pickle.load(open("tv_layer.pkl", "rb"))
new_vectorizer = TextVectorization(max_tokens=from_disk['config']['max_tokens'],
                                          output_mode=from_disk['config']['output_mode'],
                                          output_sequence_length=from_disk['config']['output_sequence_length'])
new_vectorizer.adapt(tf.data.Dataset.from_tensor_slices(["xyz"]))
new_vectorizer.set_weights(from_disk['weights'])

print(new_vectorizer("this"))
```

```python
tf.Tensor([5 0 0 0 0 0 0 0 0 0], shape=(10,), dtype=int64)
tf.Tensor([5], shape=(1,), dtype=int64)
```

## 固定随机性

```python
seed = 999
random.seed(seed)
np.random.seed(seed)
tf.random.set_seed(seed)
tf.config.experimental.enable_op_determinism() # tf == 2.9.1
os.environ['PYTHONHASHSEED'] = str(seed)
```

将 PYTHONHASHSEED 环境变量设置。对于 Python 3.2.3 以上版本，它对于某些基于散列的操作具有可重现的行为是必要的（例如，集合和字典的 item 顺序，请参阅 [Python 文档](https://docs.python.org/3.7/using/cmdline.html#envvar-PYTHONHASHSEED)和 [issue #2280](https://github.com/keras-team/keras/issues/2280#issuecomment-306959926) 获取更多详细信息）

## Customize Keras(2.6.0)

增加 keras.Model.compute_loss

```
def compute_loss(self, x=None, y=None, y_pred=None, sample_weight=None):
    del x  # The default implementation does not use `x`.
    return self.compiled_loss(
        y, y_pred, sample_weight, regularization_losses=self.losses
    )
```

 keras.model.train_step: 
- 789 : loss = self.compute_loss(x, y, y_pred, sample_weight)
- 804 ：return_metrics['loss'] = loss

keras.model.test_step:
- 1280 ： loss = self.compute_loss(x, y, y_pred, sample_weight)
- 1293 :  return_metrics['loss'] = loss

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
- -  tf.WholeFileReader()
- - tf.FixedLengthReader()
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

## OpKernel for 'GPU' devices compatible with node {{node RngReadAndSkip}}. Registered: device='CPU'

这是因为一些TF/Keras高级方法没有在tensorflow-metal中实现。您可以尝试此解决方法：

```python
with tf.device('/cpu:0'):
    ...  # your code which need RngReadAndSkip low-level method here
```

# tensorflow.python.framework.errors_impl.ResourceExhaustedError: Too many open files


```python
import resource
low, high = resource.getrlimit(resource.RLIMIT_NOFILE)
resource.setrlimit(resource.RLIMIT_NOFILE, (high, high))
```

# Reference
1. [Tensorflow2.1-gpu安装后出现 ImportError: DLL load failed: 找不到指定的模块问题](https://blog.csdn.net/qq_43060552/article/details/104614124)
2. [keras Input 介绍](https://blog.csdn.net/weixin_38145317/article/details/90694258)
3. [Keras：Lambda 层](https://blog.csdn.net/VeritasCN/article/details/89884036)
4. [如何保存Keras模型](https://blog.csdn.net/u010159842/article/details/54407745)
5. [[苹果M1]：我没有注册与节点{{RngReadAndSkip RngReadAndSkip}}兼容的'GPU‘设备的’OpKernel‘节点。已注册:设备=‘CPU’](https://cloud.tencent.com/developer/ask/sof/749100)
6. [How to save TextVectorization to disk in tensorflow?](https://stackoverflow.com/questions/65103526/how-to-save-textvectorization-to-disk-in-tensorflow)
7. [os.environ[‘PYTHONHASHSEED‘] = ‘0‘ | 如何在 Keras 开发过程中获取可复现的结果？](https://blog.csdn.net/weixin_38665509/article/details/105349060)
8. [dataset_builder._prepare_split ResourceExhaustedError](https://github.com/tensorflow/datasets/issues/1441)
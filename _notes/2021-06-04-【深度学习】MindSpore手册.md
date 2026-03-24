---
layout:     post
title:      "【深度学习】MindSpore手册"
subtitle:   ""
date:       2021-06-04
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---



# 入门教程

## 初学入门

### 配置运行信息

MindSpore通过 `context.set_context` 来配置运行需要的信息，譬如运行模式、后端信息、硬件等信息。

导入 `context` 模块，配置运行需要的信息。

```python
import os
import argparse
from mindspore import context

parser = argparse.ArgumentParser(description='MindSpore LeNet Example')
parser.add_argument('--device_target', type=str, default="CPU", choices=['Ascend', 'GPU', 'CPU'])

args = parser.parse_known_args()[0]
context.set_context(mode=context.GRAPH_MODE, device_target=args.device_target)
```

在样例中，我们配置样例运行使用图模式。根据实际情况配置硬件信息，譬如代码运行在Ascend AI处理器上，则 `--device_target` 选择Ascend，代码运行在CPU、GPU同理。详细参数说明，请参见context.set_context接口说明。


### 下载数据集


我们示例中用到的MNIST数据集是由10类28∗28的灰度图片组成，训练数据集包含60000张图片，测试数据集包含10000张图片。

你可以从[MNIST数据集下载页面](http://yann.lecun.com/exdb/mnist/)下载，并按下方目录结构放置，或直接运行如下命令完成下载和放置：

```python
!mkdir -p ./datasets/MNIST_Data/train ./datasets/MNIST_Data/test
!wget -NP ./datasets/MNIST_Data/train https://mindspore-website.obs.myhuaweicloud.com/notebook/datasets/mnist/train-labels-idx1-ubyte
!wget -NP ./datasets/MNIST_Data/train https://mindspore-website.obs.myhuaweicloud.com/notebook/datasets/mnist/train-images-idx3-ubyte
!wget -NP ./datasets/MNIST_Data/test https://mindspore-website.obs.myhuaweicloud.com/notebook/datasets/mnist/t10k-labels-idx1-ubyte
!wget -NP ./datasets/MNIST_Data/test https://mindspore-website.obs.myhuaweicloud.com/notebook/datasets/mnist/t10k-images-idx3-ubyte
!tree ./datasets/MNIST_Data
```

```
./datasets/MNIST_Data
├── test
│   ├── t10k-images-idx3-ubyte
│   └── t10k-labels-idx1-ubyte
└── train
    ├── train-images-idx3-ubyte
    └── train-labels-idx1-ubyte

2 directories, 4 files
```


### 数据处理

数据集对于模型训练非常重要，好的数据集可以有效提高训练精度和效率。 MindSpore提供了用于数据处理的API模块 `mindspore.dataset` ，用于存储样本和标签。在加载数据集前，我们通常会对数据集进行一些处理，`mindspore.dataset` 也集成了常见的数据处理方法。 

```python
import mindspore.dataset as ds
import mindspore.dataset.transforms.c_transforms as C
import mindspore.dataset.vision.c_transforms as CV
from mindspore.dataset.vision import Inter
from mindspore import dtype as mstype
```

数据集处理主要分为四个步骤：

- 定义函数 `create_dataset` 来创建数据集。
- 定义需要进行的数据增强和处理操作，为之后进行map映射做准备。
- 使用map映射函数，将数据操作应用到数据集。
- 进行数据shuffle、batch操作。


```python
def create_dataset(data_path, batch_size=32, repeat_size=1,
                   num_parallel_workers=1):
    # 定义数据集
    mnist_ds = ds.MnistDataset(data_path)
    resize_height, resize_width = 32, 32
    rescale = 1.0 / 255.0
    shift = 0.0
    rescale_nml = 1 / 0.3081
    shift_nml = -1 * 0.1307 / 0.3081

    # 定义所需要操作的map映射
    resize_op = CV.Resize((resize_height, resize_width), interpolation=Inter.LINEAR)
    rescale_nml_op = CV.Rescale(rescale_nml, shift_nml)
    rescale_op = CV.Rescale(rescale, shift)
    hwc2chw_op = CV.HWC2CHW()
    type_cast_op = C.TypeCast(mstype.int32)

    # 使用map映射函数，将数据操作应用到数据集
    mnist_ds = mnist_ds.map(operations=type_cast_op, input_columns="label", num_parallel_workers=num_parallel_workers)
    mnist_ds = mnist_ds.map(operations=resize_op, input_columns="image", num_parallel_workers=num_parallel_workers)
    mnist_ds = mnist_ds.map(operations=rescale_op, input_columns="image", num_parallel_workers=num_parallel_workers)
    mnist_ds = mnist_ds.map(operations=rescale_nml_op, input_columns="image", num_parallel_workers=num_parallel_workers)
    mnist_ds = mnist_ds.map(operations=hwc2chw_op, input_columns="image", num_parallel_workers=num_parallel_workers)

    # 进行shuffle、batch操作
    buffer_size = 10000
    mnist_ds = mnist_ds.shuffle(buffer_size=buffer_size)
    mnist_ds = mnist_ds.batch(batch_size, drop_remainder=True)

    return mnist_ds
```


其中，`batch_size` 为每组包含的数据个数，现设置每组包含32个数据。


### 创建模型

使用MindSpore定义神经网络需要继承 `mindspore.nn.Cell` 。`Cell` 是所有神经网络（如 `Conv2d-relu-softmax` 等）的基类。

神经网络的各层需要预先在 `__init__` 方法中定义，然后通过定义 `construct` 方法来完成神经网络的前向构造。按照LeNet的网络结构，定义网络各层如下：


```python
import mindspore.nn as nn
from mindspore.common.initializer import Normal

class LeNet5(nn.Cell):
    """
    Lenet网络结构
    """
    def __init__(self, num_class=10, num_channel=1):
        super(LeNet5, self).__init__()
        # 定义所需要的运算
        self.conv1 = nn.Conv2d(num_channel, 6, 5, pad_mode='valid')
        self.conv2 = nn.Conv2d(6, 16, 5, pad_mode='valid')
        self.fc1 = nn.Dense(16 * 5 * 5, 120, weight_init=Normal(0.02))
        self.fc2 = nn.Dense(120, 84, weight_init=Normal(0.02))
        self.fc3 = nn.Dense(84, num_class, weight_init=Normal(0.02))
        self.relu = nn.ReLU()
        self.max_pool2d = nn.MaxPool2d(kernel_size=2, stride=2)
        self.flatten = nn.Flatten()

    def construct(self, x):
        # 使用定义好的运算构建前向网络
        x = self.conv1(x)
        x = self.relu(x)
        x = self.max_pool2d(x)
        x = self.conv2(x)
        x = self.relu(x)
        x = self.max_pool2d(x)
        x = self.flatten(x)
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        x = self.relu(x)
        x = self.fc3(x)
        return x

# 实例化网络
net = LeNet5()
```

### 优化模型参数

要训练神经网络模型，需要定义损失函数和优化器。

MindSpore支持的损失函数有 `SoftmaxCrossEntropyWithLogits`、`L1Loss`、`MSELoss` 等。这里使用交叉熵损失函数`SoftmaxCrossEntropyWithLogits`。


```python
# 定义损失函数
net_loss = nn.SoftmaxCrossEntropyWithLogits(sparse=True, reduction='mean')
```

MindSpore支持的优化器有 `Adam`、`AdamWeightDecay`、`Momentum` 等。这里使用 `Momentum` 优化器为例。

```python
# 定义优化器
net_opt = nn.Momentum(net.trainable_params(), learning_rate=0.01, momentum=0.9)
```


### 训练及保存模型

MindSpore提供了回调Callback机制，可以在训练过程中执行自定义逻辑，这里以使用框架提供的  `ModelCheckpoint` 为例。 `ModelCheckpoint` 可以保存网络模型和参数，以便进行后续的Fine-tuning（微调）操作。

```python
from mindspore.train.callback import ModelCheckpoint, CheckpointConfig
# 设置模型保存参数
config_ck = CheckpointConfig(save_checkpoint_steps=1875, keep_checkpoint_max=10)
# 应用模型保存参数
ckpoint = ModelCheckpoint(prefix="checkpoint_lenet", config=config_ck)
```

通过MindSpore提供的 `model.train` 接口可以方便地进行网络的训练，`LossMonitor` 可以监控训练过程中 `loss` 值的变化。

```python
# 导入模型训练需要的库
from mindspore.nn import Accuracy
from mindspore.train.callback import LossMonitor
from mindspore import Model
```

```python
def train_net(args, model, epoch_size, data_path, repeat_size, ckpoint_cb, sink_mode):
    """定义训练的方法"""
    # 加载训练数据集
    ds_train = create_dataset(os.path.join(data_path, "train"), 32, repeat_size)
    model.train(epoch_size, ds_train, callbacks=[ckpoint_cb, LossMonitor(125)], dataset_sink_mode=sink_mode)
```

其中， `dataset_sink_mode`用于控制数据是否下沉，数据下沉是指数据通过通道直接传送到Device上，可以加快训练速度，`dataset_sink_mode` 为True表示数据下沉，否则为非下沉。

通过模型运行测试数据集得到的结果，验证模型的泛化能力。

- 使用 `model.eval` 接口读入测试数据集。
- 使用保存后的模型参数进行推理。



```python
def test_net(network, model, data_path):
    """定义验证的方法"""
    ds_eval = create_dataset(os.path.join(data_path, "test"))
    acc = model.eval(ds_eval, dataset_sink_mode=False)
    print("{}".format(acc))
```

这里把 `train_epoch` 设置为1，对数据集进行1个迭代的训练。在 `train_net` 和 `test_net` 方法中，我们加载了之前下载的训练数据集，`mnist_path` 是MNIST数据集路径。

```python
train_epoch = 1
mnist_path = "./datasets/MNIST_Data"
dataset_size = 1
model = Model(net, net_loss, net_opt, metrics={"Accuracy": Accuracy()})
train_net(args, model, train_epoch, mnist_path, dataset_size, ckpoint, False)
test_net(net, model, mnist_path)
```

使用以下命令运行脚本：

```python
python lenet.py --device_target=CPU
```

其中，

`lenet.py` ：为你根据教程编写的脚本文件。
`--device_target=CPU`：指定运行硬件平台，参数为 `CPU`、`GPU`或者`Ascend`，根据你的实际运行硬件平台来指定。

训练过程中会打印loss值，类似下图。loss值会波动，但总体来说loss值会逐步减小，精度逐步提高。每个人运行的loss值有一定随机性，不一定完全相同。 训练过程中loss打印示例如下：


```python
epoch: 1 step: 125, loss is 2.3083377
epoch: 1 step: 250, loss is 2.3019726
...
epoch: 1 step: 1500, loss is 0.028385757
epoch: 1 step: 1625, loss is 0.0857362
epoch: 1 step: 1750, loss is 0.05639569
epoch: 1 step: 1875, loss is 0.12366105
{'Accuracy': 0.9663477564102564}
```


可以在打印信息中看出模型精度数据，示例中精度数据达到96.6%，模型质量良好。随着网络迭代次数train_epoch增加，模型精度会进一步提高。


### 加载模型

```python
from mindspore.train.serialization import load_checkpoint, load_param_into_net
# 加载已经保存的用于测试的模型
param_dict = load_checkpoint("checkpoint_lenet-1_1875.ckpt")
# 加载参数到网络中
load_param_into_net(net, param_dict)
```


### 验证模型

我们使用生成的模型进行单个图片数据的分类预测，具体步骤如下：

```python
import numpy as np
from mindspore import Tensor

# 定义测试数据集，batch_size设置为1，则取出一张图片
ds_test = create_dataset(os.path.join(mnist_path, "test"), batch_size=1).create_dict_iterator()
data = next(ds_test)

# images为测试图片，labels为测试图片的实际分类
images = data["image"].asnumpy()
labels = data["label"].asnumpy()

# 使用函数model.predict预测image对应分类
output = model.predict(Tensor(data['image']))
predicted = np.argmax(output.asnumpy(), axis=1)

# 输出预测分类与实际分类
print(f'Predicted: "{predicted[0]}", Actual: "{labels[0]}"')

```


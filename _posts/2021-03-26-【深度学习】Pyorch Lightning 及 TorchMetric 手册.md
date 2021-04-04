---
layout:     post
title:      "【深度学习】Pyorch Lightning 及 TorchMetric 手册"
subtitle:   ""
date:       2021-03-26
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---





# Tutorials


## Step-by-step walk-through


### The research

#### Model


lightning module 拥有所有核心研究成分：

- The model
- The optimizers
- The train/ val/ test steps

让我们先从模型开始。在这种情况下，我们将设计一个三层的神经网络。

```python
import torch
from torch.nn import functional as F
from torch import nn
from pytorch_lightning.core.lightning import LightningModule

class LitMNIST(LightningModule):

  def __init__(self):
    super().__init__()

    # mnist images are (1, 28, 28) (channels, width, height)
    self.layer_1 = nn.Linear(28 * 28, 128)
    self.layer_2 = nn.Linear(128, 256)
    self.layer_3 = nn.Linear(256, 10)

  def forward(self, x):
    batch_size, channels, width, height = x.size()

    # (b, 1, 28, 28) -> (b, 1*28*28)
    x = x.view(batch_size, -1)
    x = self.layer_1(x)
    x = F.relu(x)
    x = self.layer_2(x)
    x = F.relu(x)
    x = self.layer_3(x)

    x = F.log_softmax(x, dim=1)
    return x
```

注意  lightning module 而不是 torch.nn.Module。 LightningModule等价于纯PyTorch Module，只是它增加了一些功能。但是，您可以像使用PyTorch Module一样使用它。


```python
net = LitMNIST()
x = torch.randn(1, 1, 28, 28)
out = net(x)
```

输出：

```
torch.Size([1, 10])
```


现在我们添加包含所有训练循环逻辑的训练步骤：

```
class LitMNIST(LightningModule):

    def training_step(self, batch, batch_idx):
        x, y = batch
        logits = self(x)
        loss = F.nll_loss(logits, y)
        return loss
```


#### Data

Lightning 在纯 dataloader 上操作。 这里是用于加载 MNIST 的 PyTorch 代码。

```python
from torch.utils.data import DataLoader, random_split
from torchvision.datasets import MNIST
import os
from torchvision import datasets, transforms

# transforms
# prepare transforms standard to MNIST
transform=transforms.Compose([transforms.ToTensor(),
                              transforms.Normalize((0.1307,), (0.3081,))])

# data
mnist_train = MNIST(os.getcwd(), train=True, download=True, transform=transform)
mnist_train = DataLoader(mnist_train, batch_size=64)
```

你可以用三种方式使用数据加载器:

1> Pass DataLoaders to .fit()

将 dataloaders 送到 .fit() 函数

```python
model = LitMNIST()
trainer = Trainer()
trainer.fit(model, mnist_train)
```

2> LightningModule DataLoaders

对于快速研究原型，将模型与数据加载器链接起来可能更容易。

```python
class LitMNIST(pl.LightningModule):

    def train_dataloader(self):
        # transforms
        # prepare transforms standard to MNIST
        transform=transforms.Compose([transforms.ToTensor(),
                                      transforms.Normalize((0.1307,), (0.3081,))])
        # data
        mnist_train = MNIST(os.getcwd(), train=True, download=True, transform=transform)
        return DataLoader(mnist_train, batch_size=64)

    def val_dataloader(self):
        transforms = ...
        mnist_val = ...
        return DataLoader(mnist_val, batch_size=64)

    def test_dataloader(self):
        transforms = ...
        mnist_test = ...
        return DataLoader(mnist_test, batch_size=64)
```

数据加载器已经在模型中，不需要再使用 .fit()

```python
model = LitMNIST()
trainer = Trainer()
trainer.fit(model)
```

3> DataModules(recommended)

定义 free-floating 数据加载器， splits， download instructions等等可能变得混乱。 在这种情况下， 最好将数据集的完整定义分组到 DataModule， 它包含：

- Download instructions
- Processing instructions
- Split instructions
- Train dataloader
- Val dataloader(s)
- Test dataloader(s)


```python
class MyDataModule(LightningDataModule):

    def __init__(self):
        super().__init__()
        self.train_dims = None
        self.vocab_size = 0

    def prepare_data(self):
        # called only on 1 GPU
        download_dataset()
        tokenize()
        build_vocab()

    def setup(self, stage: Optional[str] = None):
        # called on every GPU
        vocab = load_vocab()
        self.vocab_size = len(vocab)

        self.train, self.val, self.test = load_datasets()
        self.train_dims = self.train.next_batch.size()

    def train_dataloader(self):
        transforms = ...
        return DataLoader(self.train, batch_size=64)

    def val_dataloader(self):
        transforms = ...
        return DataLoader(self.val, batch_size=64)

    def test_dataloader(self):
        transforms = ...
        return DataLoader(self.test, batch_size=64)
```

使用 DataModules 可以更容易地共享完整数据集定义。

```python
# use an MNIST dataset
mnist_dm = MNISTDatamodule()
model = LitModel(num_classes=mnist_dm.num_classes)
trainer.fit(model, mnist_dm)

# or other datasets with the same model
imagenet_dm = ImagenetDatamodule()
model = LitModel(num_classes=imagenet_dm.num_classes)
trainer.fit(model, imagenet_dm)
```


Note: prepare_data() 在分布式训练中(自动)只调用一个GPU。 

Note：setup()在每个GPU上调用(自动)


#### Models defined by data

当您的模型需要了解数据时，最好在将数据传递给模型之前处理数据。

```python
# init dm AND call the processing manually
dm = ImagenetDataModule()
dm.prepare_data()
dm.setup()

model = LitModel(out_features=dm.num_classes, img_width=dm.img_width, img_height=dm.img_height)
trainer.fit(model, dm)
```

1. 使用prepare data()下载和处理数据集。
2. 使用setup()进行分割，并构建模型内部构件

使用DataModule的另一种选择是将models模块的初始化延迟到LightningModule的 setup 方法，如下所示：

```python
class LitMNIST(LightningModule):

    def __init__(self):
        self.l1 = None

    def prepare_data(self):
        download_data()
        tokenize()

    def setup(self, stage: Optional[str] = None):
        # step is either 'fit', 'validate', 'test', or 'predict'. 90% of the time not relevant
        data = load_data()
        num_classes = data.classes
        self.l1 = nn.Linear(..., num_classes)
```

#### Optimizer

接下来，我们选择使用什么优化器来训练我们的系统。在PyTorch中，我们这样做：

```python
from torch.optim import Adam
optimizer = Adam(LitMNIST().parameters(), lr=1e-3)
```

在Lightning中，我们也这样做，但在configure optimizers()方法下进行组织。

```python
class LitMNIST(LightningModule):

    def configure_optimizers(self):
        return Adam(self.parameters(), lr=1e-3)
```


Note: LightningModule本身有参数，所以传入self.parameters()

但是，如果有多个优化器，请使用对应的参数

```python
class LitMNIST(LightningModule):

    def configure_optimizers(self):
        return Adam(self.generator(), lr=1e-3), Adam(self.discriminator(), lr=1e-3)
```


#### Training step

training step是在训练循环中发生的事情。

```python
for epoch in epochs:
    for batch in data:
        # TRAINING STEP
        # ....
        # TRAINING STEP
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

在 MNIST 中， 我们这样做：

```python
for epoch in epochs:
    for batch in data:
        # ------ TRAINING STEP START ------
        x, y = batch
        logits = model(x)
        loss = F.nll_loss(logits, y)
        # ------ TRAINING STEP END ------

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

在Lightning中，训练步骤中的所有内容都在 LightningModule 中的 training_step() 函数下进行组织。

```python
class LitMNIST(LightningModule):

    def training_step(self, batch, batch_idx):
        x, y = batch
        logits = self(x)
        loss = F.nll_loss(logits, y)
        return loss
```

同样，这是相同的PyTorch代码，只是它是由LightningModule组织的。这个代码没有限制，这意味着它可以像一个完整的 seq-2-seq, RL loop, GAN 等... 一样复杂。 


### The engineering


#### Training

到目前为止，我们在pure PyTorch中定义了4个关键成分，但使用LightningModule组织了代码。

- Model.
- Training data.
- Optimizer.
- What happens in the training loop.

为了清晰起见，我们回忆一下完整的LightningModule现在看起来是这样的。

```python
class LitMNIST(LightningModule):
    def __init__(self):
        super().__init__()
        self.layer_1 = nn.Linear(28 * 28, 128)
        self.layer_2 = nn.Linear(128, 256)
        self.layer_3 = nn.Linear(256, 10)

    def forward(self, x):
        batch_size, channels, width, height = x.size()
        x = x.view(batch_size, -1)
        x = self.layer_1(x)
        x = F.relu(x)
        x = self.layer_2(x)
        x = F.relu(x)
        x = self.layer_3(x)
        x = F.log_softmax(x, dim=1)
        return x

    def training_step(self, batch, batch_idx):
        x, y = batch
        logits = self(x)
        loss = F.nll_loss(logits, y)
        return loss
```


同样，这是相同的PyTorch代码，只是它是由LightningModule组织的。

##### Logging

使用我们最喜欢的logger Tensorboard 记录， 使用 log() 方法， 它可以在 LightningModule 的任意方法中调用。 

```python
def training_step(self, batch, batch_idx):
    self.log('my_metric', x)
```

log() 有以下几个设置：
- on_step(在训练的每个step记录metric)
- on_epoch(在epoch结束时自动累积并记录日志)
- prog_bar(记录进度条)
- logger(像Tensorboard一样的日志到记录器)

根据日志的调用位置，Lightning会自动为您确定正确的模式。当然，您可以通过手动设置 flags 来覆盖默认行为。

Note：设置为epoch=True将在整个培训时间内累积您的日志值。

```python
def training_step(self, batch, batch_idx):
    self.log('my_loss', loss, on_step=True, on_epoch=True, prog_bar=True, logger=True)
```

您还可以直接使用logger的任何方法。

```python
def training_step(self, batch, batch_idx):
    tensorboard = self.logger.experiment
    tensorboard.any_summary_writer_method_you_want())
```

一旦你的训练开始，你可以通过使用你最喜欢的 logger 或启动 Tensorboard 日志查看日志

```
tensorboard --logdir ./lightning_logs
```

这会自动生成 tensorboard 日志 (或者你选择的logger)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1617439156594.png)


但您也可以使用我们支持的任何其他记录器。

##### Train on CPU

```python
from pytorch_lightning import Trainer

model = LitMNIST()
trainer = Trainer()
trainer.fit(model, train_loader)
```

您应该看到以下 weights summary 和  progress bar：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1617439271617.png)

##### Train on GPU


但美妙之处在于你用trainer flag 所能做到的所有神奇之处。例如，在GPU上运行这个模型

```python
model = LitMNIST()
trainer = Trainer(gpus=1)
trainer.fit(model, train_loader)
```

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1617439341921.png)


##### Train on Multi-GPU


或者你也可以在多个gpu上训练。

```python
model = LitMNIST()
trainer = Trainer(gpus=8)
trainer.fit(model, train_loader)
```

或多个节点

```python
# (32 GPUs)
model = LitMNIST()
trainer = Trainer(gpus=8, num_nodes=4, accelerator='ddp')
trainer.fit(model, train_loader)
```


详情参见： [分布式计算手册](https://pytorch-lightning.readthedocs.io/en/latest/advanced/multi_gpu.html)

#### Hyperparameters

Lightning拥有与命令行ArgumentParser无缝交互的程序，并与您选择的超参数优化框架配合得很好。

##### ArgumentParser

Lightning的设计是为了增强Python内置ArgumentParser的很多功能

```python
from argparse import ArgumentParser
parser = ArgumentParser()
parser.add_argument('--layer_1_dim', type=int, default=128)
args = parser.parse_args()
```


这允许你像这样调用你的程序

```python
python trainer.py --layer_1_dim 64
```


##### Argparser Best Practices

最好的做法是把你的 arguments 分为三个部分。

- Trainer args (gpus, num_nodes, etc…)
- Model specific arguments (layer_dim, num_layers, learning_rate, etc…)
- Program arguments (data_path, cluster_email, etc…)

我们可以这样做。首先，在LightningModule中，定义特定于该模块的参数。请记住，数据分割或数据路径也可能特定于某个模块(例如:如果你的项目有一个在Imagenet上训练的模型，另一个在CIFAR-10上训练)


```python
class LitModel(LightningModule):

    @staticmethod
    def add_model_specific_args(parent_parser):
        parser = parent_parser.add_argument_group("LitModel")
        parser.add_argument('--encoder_layers', type=int, default=12)
        parser.add_argument('--data_path', type=str, default='/some/path')
        return parent_parser
```

现在在你的 main trainer 文件, 添加 Trainer 参数， program 参数， 和 model 参数

```python
# ----------------
# trainer_main.py
# ----------------
from argparse import ArgumentParser
parser = ArgumentParser()

# add PROGRAM level args
parser.add_argument('--conda_env', type=str, default='some_name')
parser.add_argument('--notification_email', type=str, default='will@email.com')

# add model specific args
parser = LitModel.add_model_specific_args(parser)

# add all the available trainer options to argparse
# ie: now --gpus --num_nodes ... --fast_dev_run all work in the cli
parser = Trainer.add_argparse_args(parser)

args = parser.parse_args()
```

现在你可以调用你的程序像这样运行:

```
python trainer_main.py --gpus 2 --num_nodes 2 --conda_env 'my_env' --encoder_layers 12
```

最后，确保像这样开始训练：

```python
# init the trainer like this
trainer = Trainer.from_argparse_args(args, early_stopping_callback=...)

# NOT like this
trainer = Trainer(gpus=hparams.gpus, ...)

# init the model with Namespace directly
model = LitModel(args)

# or init the model with all the key-value pairs
dict_args = vars(args)
model = LitModel(**dict_args)
```


##### LightningModule hyperparameters

我们经常训练一个模型的多个版本。您可能会分享这个模型，或者几个月后再回到这个模型，这时了解这个模型是如何训练的就非常有用了(即:什么学习速率，神经网络等)。


Lightning有几种方法可以将这些信息保存在检查点和yaml文件中。这里的目标是提高可读性和再现性。

1> 第一种方法是要求lightning为您将 \_\_init\_\_ 中的所有值保存到 checkpoint。 这也使得这些值可以通过self.hparams获得。

```python
class LitMNIST(LightningModule):

    def __init__(self, layer_1_dim=128, learning_rate=1e-2, **kwargs):
        super().__init__()
        # call this to save (layer_1_dim=128, learning_rate=1e-4) to the checkpoint
        self.save_hyperparameters()

        # equivalent
        self.save_hyperparameters('layer_1_dim', 'learning_rate')

        # Now possible to access layer_1_dim from hparams
        self.hparams.layer_1_dim
```

2> 有时候你的init可能有你不想保存的对象或其他参数。那样的话，就选几个吧

```python
class LitMNIST(LightningModule):

    def __init__(self, loss_fx, generator_network, layer_1_dim=128 **kwargs):
        super().__init__()
        self.layer_1_dim = layer_1_dim
        self.loss_fx = loss_fx

        # call this to save (layer_1_dim=128) to the checkpoint
        self.save_hyperparameters('layer_1_dim')

# to load specify the other args
model = LitMNIST.load_from_checkpoint(PATH, loss_fx=torch.nn.SomeOtherLoss, generator_network=MyGenerator())
```

3> 赋值给 self.hparams. 所有赋值给 self.hparams 将会自动保存

```python
# using a argparse.Namespace
class LitMNIST(LightningModule):
    def __init__(self, hparams, *args, **kwargs):
        super().__init__()
        self.hparams = hparams
        self.layer_1 = nn.Linear(28 * 28, self.hparams.layer_1_dim)
        self.layer_2 = nn.Linear(self.hparams.layer_1_dim, self.hparams.layer_2_dim)
        self.layer_3 = nn.Linear(self.hparams.layer_2_dim, 10)
    def train_dataloader(self):
        return DataLoader(mnist_train, batch_size=self.hparams.batch_size)
```

4> 还可以将dict或Namespace等完整对象保存到 checkpoint。

```python
# using a argparse.Namespace
class LitMNIST(LightningModule):

    def __init__(self, conf, *args, **kwargs):
        super().__init__()
        self.save_hyperparameters(conf)

        self.layer_1 = nn.Linear(28 * 28, self.hparams.layer_1_dim)
        self.layer_2 = nn.Linear(self.hparams.layer_1_dim, self.hparams.layer_2_dim)
        self.layer_3 = nn.Linear(self.hparams.layer_2_dim, 10)

conf = OmegaConf.create(...)
model = LitMNIST(conf)

# Now possible to access any stored variables from hparams
model.hparams.anything
```

##### Trainer args

回顾一下，将所有可能的训练器标记添加到argparser中，并以这种方式初始化 Trainer

```python
parser = ArgumentParser()
parser = Trainer.add_argparse_args(parser)
hparams = parser.parse_args()

trainer = Trainer.from_argparse_args(hparams)

# or if you need to pass in callbacks
trainer = Trainer.from_argparse_args(hparams, checkpoint_callback=..., callbacks=[...])
```


##### Multiple Lightning Modules

我们经常有多个 Lightning 模块，每个模块都有不同的参数。LightningModule让您为每个定义参数，而不是污染main.py文件。

```python
class LitMNIST(LightningModule):

    def __init__(self, layer_1_dim, **kwargs):
        super().__init__()
        self.layer_1 = nn.Linear(28 * 28, layer_1_dim)

    @staticmethod
    def add_model_specific_args(parent_parser):
        parser = parent_parser.add_argument_group("LitMNIST")
        parser.add_argument('--layer_1_dim', type=int, default=128)
        return parent_parser
```

```python
class GoodGAN(LightningModule):

    def __init__(self, encoder_layers, **kwargs):
        super().__init__()
        self.encoder = Encoder(layers=encoder_layers)

    @staticmethod
    def add_model_specific_args(parent_parser):
        parser = parent_parser.add_argument_group("GoodGAN")
        parser.add_argument('--encoder_layers', type=int, default=12)
        return parent_parser
```


现在，我们在 main.py 里可以允许每个模型注入它需要的参数 

```python
def main(args):
    dict_args = vars(args)

    # pick model
    if args.model_name == 'gan':
        model = GoodGAN(**dict_args)
    elif args.model_name == 'mnist':
        model = LitMNIST(**dict_args)

    trainer = Trainer.from_argparse_args(args)
    trainer.fit(model)

if __name__ == '__main__':
    parser = ArgumentParser()
    parser = Trainer.add_argparse_args(parser)

    # figure out which model to use
    parser.add_argument('--model_name', type=str, default='gan', help='gan or mnist')

    # THIS LINE IS KEY TO PULL THE MODEL NAME
    temp_args, _ = parser.parse_known_args()

    # let the model add what it wants
    if temp_args.model_name == 'gan':
        parser = GoodGAN.add_model_specific_args(parser)
    elif temp_args.model_name == 'mnist':
        parser = LitMNIST.add_model_specific_args(parser)

    args = parser.parse_args()

    # train
    main(args)
```


现在我们可以使用命令行接口训练MNIST或GAN

```
$ python main.py --model_name gan --encoder_layers 24
$ python main.py --model_name mnist --layer_1_dim 128
```


#### Validating

在大多数情况下，当数据验证分割的性能达到最小值时，我们停止训练模型。

就像 training_step, 我们可以定义一个 validation_step 来检查我们关心的任何指标，生成样本，或者向我们的日志中添加更多的内容。

```python
def validation_step(self, batch, batch_idx):
    loss = MSE_loss(...)
    self.log('val_loss', loss)
```

现在我们也可以带验证循环训练。

```python
from pytorch_lightning import Trainer

model = LitMNIST()
trainer = Trainer(tpu_cores=8)
trainer.fit(model, train_loader, val_loader)
```

你可能已经注意到 Validation sanity check 被记录。 这是因为 Lightning 在开始训练之前运行两个batch的 validation。 这是一种单元测试，以确保如果在验证循环中出现错误，您不需要等待完整的epoch来发现。


Note: Lightning 禁用梯度， 将模型置成eval模式， 并且做任何用于validation的事情。

##### Val loop under the hood

在 hood 下， Lightning 作了如下事情：

```python
model = Model()
model.train()
torch.set_grad_enabled(True)

for epoch in epochs:
    for batch in data:
        # ...
        # train

    # validate
    model.eval()
    torch.set_grad_enabled(False)

    outputs = []
    for batch in val_data:
        x, y = batch                        # validation_step
        y_hat = model(x)                    # validation_step
        loss = loss(y_hat, x)               # validation_step
        outputs.append({'val_loss': loss})  # validation_step

    total_loss = outputs.mean()             # validation_epoch_end
```

##### Optional methods

如果您仍然需要精细的控制，那么为循环定义其他的方法。

```python
def validation_step(self, batch, batch_idx):
    preds = ...
    return preds

def validation_epoch_end(self, val_step_outputs):
    for pred in val_step_outputs:
        # do something with all the predictions from each validation_step
```


#### Testing

一旦我们的研究完成，我们即将发布或部署一个模型，我们通常想弄清楚它如何在现实世界中推广。为此，我们使用了一个数据分割来进行测试。

就像 validation loop 一样，我们定义了一个 test loop

```python
class LitMNIST(LightningModule):
    def test_step(self, batch, batch_idx):
        x, y = batch
        logits = self(x)
        loss = F.nll_loss(logits, y)
        self.log('test_loss', loss)
```

为了确保测试集不会被无意中使用，Lightning有一个单独的API来运行测试。当你在训练你的模型时调用 .test() 。


```python
from pytorch_lightning import Trainer

model = LitMNIST()
trainer = Trainer(tpu_cores=8)
trainer.fit(model)

# run test set
result = trainer.test()
print(result)
```

输出：

```
--------------------------------------------------------------
TEST RESULTS
{'test_loss': 1.1703}
--------------------------------------------------------------
```

您还可以从保存的lightning模型运行测试

```python
model = LitMNIST.load_from_checkpoint(PATH)
trainer = Trainer(tpu_cores=8)
trainer.test(model)
```

Note: Lightning 禁用梯度， 将模型置于eval模式， 并且做任何用于训练的事情。

Warning： .test() 在 TPUs 上还不稳定。 


#### Predicting

同样，LightningModule与PyTorch模块完全相同。这意味着您可以加载它并使用它进行预测。

```python
model = LitMNIST.load_from_checkpoint(PATH)
x = torch.randn(1, 1, 28, 28)
out = model(x)
```

从表面上看，forward 和 training_step 是相似的。一般来说，我们要确保我们想让模型做的是在forward 中发生的事。 而 training_step 则从内部调用  forward。

```python
class MNISTClassifier(LightningModule):

    def forward(self, x):
        batch_size, channels, width, height = x.size()
        x = x.view(batch_size, -1)
        x = self.layer_1(x)
        x = F.relu(x)
        x = self.layer_2(x)
        x = F.relu(x)
        x = self.layer_3(x)
        x = F.log_softmax(x, dim=1)
        return x

    def training_step(self, batch, batch_idx):
        x, y = batch
        logits = self(x)
        loss = F.nll_loss(logits, y)
        return loss
```

```python
model = MNISTClassifier()
x = mnist_image()
logits = model(x)
```


在这种情况下，我们设置了这个 LightningModel 来预测logits。但我们也可以用它来预测特征图：

```python
class MNISTRepresentator(LightningModule):

    def forward(self, x):
        batch_size, channels, width, height = x.size()
        x = x.view(batch_size, -1)
        x = self.layer_1(x)
        x1 = F.relu(x)
        x = self.layer_2(x1)
        x2 = F.relu(x)
        x3 = self.layer_3(x2)
        return [x, x1, x2, x3]

    def training_step(self, batch, batch_idx):
        x, y = batch
        out, l1_feats, l2_feats, l3_feats = self(x)
        logits = F.log_softmax(out, dim=1)
        ce_loss = F.nll_loss(logits, y)
        loss = perceptual_loss(l1_feats, l2_feats, l3_feats) + ce_loss
        return loss
```

```python
model = MNISTRepresentator.load_from_checkpoint(PATH)
x = mnist_image()
feature_maps = model(x)
```



或者我们有一个模型，我们用它来做生成

```python
class LitMNISTDreamer(LightningModule):

    def forward(self, z):
        imgs = self.decoder(z)
        return imgs

    def training_step(self, batch, batch_idx):
        x, y = batch
        representation = self.encoder(x)
        imgs = self(representation)

        loss = perceptual_loss(imgs, x)
        return loss
```

```python
model = LitMNISTDreamer.load_from_checkpoint(PATH)
z = sample_noise()
generated_imgs = model(z)
```


为了进行大规模推理，可以使用 trainer.predict， 它使用 LightningModule 中的 predict_step 函数 。默认情况下，LightningModule predict_step 调用 forward，但它可以被重写以添加任何处理逻辑。

```python
class LitMNISTDreamer(LightningModule):

    def forward(self, z):
        imgs = self.decoder(z)
        return imgs

    def predict_step(self, batch, batch_idx: int , dataloader_idx: int = None):
        return self(batch)


model = LitMNISTDreamer()
trainer.predict(model, datamodule)
```

你如何划分 forward ，training_step 和 predict 取决于你想如何使用这个模型进行预测。但是，我们建议 forward 仅包含你的模型的tensor操作， training_step 使用 logging, metrics 和 loss计算 封装 forward 逻辑， 并且 predict 使用 preprocess， postprocess 函数 封装 forward。


### The nonessentials

#### Extensibility

虽然 lightning 让一切都变得超级简单，但它并不牺牲任何灵活性或控制。 lightning 提供多种管理训练状态的方法。

##### Training overrides

training、validation和testing循环的任何部分都可以修改。 例如，如果您想执行自己的反向传播，则可以重写默认实现。

```python
def backward(self, use_amp, loss, optimizer):
    loss.backward()
```

使用你自己的

```python
class LitMNIST(LightningModule):

    def backward(self, use_amp, loss, optimizer, optimizer_idx):
        # do a custom way of backward
        loss.backward(retain_graph=True)
```

training的每个部分都可以通过这种方式进行配置。参见 [LightningModule](https://pytorch-lightning.readthedocs.io/en/latest/common/lightning_module.html) 的完整列表。


#### Callbacks

添加任意功能的另一种方法是为您可能关心的 hooks 添加自定义回调：

```python
from pytorch_lightning.callbacks import Callback

class MyPrintingCallback(Callback):

    def on_init_start(self, trainer):
        print('Starting to init trainer!')

    def on_init_end(self, trainer):
        print('Trainer is init now')

    def on_train_end(self, trainer, pl_module):
        print('do something when training ends')
```


然后将 callbacks 传给 trainer

```python
trainer = Trainer(callbacks=[MyPrintingCallback()])
```

参见 [callbacks](https://pytorch-lightning.readthedocs.io/en/latest/extensions/callbacks.html) 的 12+ hooks 的完整列表。

# TorchMetric

## torchmetrics.Accuracy()


```python
torchmetrics.Accuracy(threshold=0.5, top_k=None, subset_accuracy=False, compute_on_step=True, dist_sync_on_step=False, process_group=None, dist_sync_fn=None)
```

计算准确率：

$$Accuracy = \frac{1}{N} \sum_{i}^N 1(y_i = \hat y_i)$$

其中 $y$ 是目标值的tensor， $\hat y$ 是预测值的tensor。

对于 多类 和 多维 多类 的概率预测， 参数 top_k 


```
mport torch
import torchmetrics

# initialize metric
metric = torchmetrics.Accuracy()

n_batches = 10
for i in range(n_batches):
    # simulate a classification problem
    preds = torch.randn(10, 5).softmax(dim=-1)
    target = torch.randint(5, (10,))
    # metric on current batch
    acc = metric(preds, target)
    print(f"Accuracy on batch {i}: {acc}")

# metric on all batches using custom accumulation
acc = metric.compute()
print(f"Accuracy on all data: {acc}")
```
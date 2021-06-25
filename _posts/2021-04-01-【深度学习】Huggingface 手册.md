---
layout:     post
title:      "【深度学习】Huggingface 手册"
subtitle:   ""
date:       2021-04-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---


# Transformers

Transformer模型通常都很大。 由于有数百万到数百亿的参数，训练和部署这些模型是一项复杂的工作。 此外，由于几乎每天都有新模型发布，而且每个模型都有自己的实现，所以把它们都试出来不是一件容易的事情。

Transformer库用来解决这个问题。 它的目标是提供一个单一的API，通过这个API可以加载、训练和保存任何Transformer模型。它的主要特点是：

- 易于使用：下载、加载和使用最先进的NLP模型进行推理只需两行代码。
-  灵活：它们的核心， 所有的模型都是像 PyTorch `nn.Module` 或者 Tensorflow `tf.keras.Model` 类， 并且可以以它们机器学习框架的方式处理任意模型。
-  简单： 几乎没有对整个库进行任何抽象。"All in one file" 是一个核心概念:模型的前向传递完全在一个文件中定义，因此代码本身是可以理解和破解的。

最后一个特性使得 Transformers 不同与其他 ML 库。 模型不是建立在跨文件共享的模块上； 相反， 每个模型有它自己的层。 除了使模型更容易接近和理解之外，这还允许您轻松地在一个模型上进行实验，而不影响其他模型。

## Behind the pipeline

让我们从一个完整的示例开始，看看在 ` Chapter 1` 中执行以下代码时幕后发生了什么:

```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
classifier([
    "I've been waiting for a HuggingFace course my whole life.", 
    "I hate this so much!",
])
```

得到：

```
[{'label': 'POSITIVE', 'score': 0.9598047137260437},
 {'label': 'NEGATIVE', 'score': 0.9994558095932007}]
```

如我们在 `Chapter 1` 中所见， 这个 pipeline 将三个 steps 组合在一起：preprocessing, passing inputs through the model, 以及  postprocessing ：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1624587057051.png)


### Preprocessing with a tokenizer

与其他神经网络一样，Transformer模型不能直接处理原始文本，因此我们 pipeline 的第一步是将文本输入转换为模型能够理解的数字。为了做到这一点我们使用一个 *tokenizer*, 它负责：

- 将输入分割成 words 、 subwords 或 symbols (如标点符号)，称为 *tokens*
- 将每个 token 映射到一个整数
- 添加可能对模型有用的额外输入


所有这些预处理都需要以与模型预训练时完全相同的方式进行, 所以我们首先需要从  Model Hub 下载这些信息。为此， 我们使用 **AutoTokenizer** 类 和 它的 **from_pretrained** 方法。 使用我们模型的 checkpoint 名字， 它将自动获取与模型 tokenizer 相关的数据并缓存它。

因为 **sentiment-analysis** pipeline 的默认 checkpoint 是 **distilbert-base-uncased-finetuned-sst-2-english**， 我们作如下运行：

```python
from transformers import AutoTokenizer

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
```

一旦我们有了 tokenizer， 我们可以直接将我们的句子传递给它，我们将得到一个字典，它用于好喂给我们的模型。 剩下要做的一件事是将输入id列表转换为 tensor 。

你可以使用 Transformers 而不需要关心它使用的后端 ML 框架。然而，Transformer模型只接受张量作为输入。

要指定我们想要返回的张量类型(PyTorch、TensorFlow或NumPy)，我们使用 **return_tensors** 参数：

```python
raw_inputs = [
    "I've been waiting for a HuggingFace course my whole life.", 
    "I hate this so much!",
]
inputs = tokenizer(raw_inputs, padding=True, truncation=True, return_tensors="pt")
print(inputs)
```

这里要记住的主要事情是，您可以传递一个句子或一个句子列表，以及指定想要返回的张量的类型(如果没有传递类型，您将得到一个列表的列表)。


下面是PyTorch张量的结果：

```
{
    'input_ids': tensor([
        [  101,  1045,  1005,  2310,  2042,  3403,  2005,  1037, 17662, 12172, 2607,  2026,  2878,  2166,  1012,   102],
        [  101,  1045,  5223,  2023,  2061,  2172,   999,   102,     0,     0,     0,     0,     0,     0,     0,     0]
    ]), 
    'attention_mask': tensor([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
}
```

输出本身是一个包含两个键的字典， **input_ids** 和 **attention_mask**。 **input_ids** 包含两行整数(每个句子一个)，它们是每个句子中 tokens 的唯一标识符。


### Going through the model

我们可以下载我们预训练好的模型，就像我们使用 tokenizer 一样。Transformers 提供一个 **AutoModel** ， 它也有一个 **from_pretrained** 方法：

```python
from transformers import AutoModel

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
model = AutoModel.from_pretrained(checkpoint)
```

在此代码片段中，我们下载了之前在 pipeline 中使用的 checkpoint(实际上应该已经缓存了)，并使用它实例化一个模型。

该体系结构只包含基本的Transformer模块:给定一些输入，它输出我们称之为 *hidden states* 的内容，也称为 *features*。对于每个模型输入，我们将检索一个高维向量，表征Transformer模型对该输入的上下文理解。

虽然这些 *hidden states* 本身可能很有用，但它们通常是模型的另一部分，即 *head* 的输入。在 Chapter 1,  可以使用相同的结构执行不同的任务，但是每个任务都有与之相关联的不同的 *head*。


### A high-dimensional vector?

Transformer 模块的输出向量通常很大。 它通常有三个维度。

- **Batch size**： 一次处理的序列数(在我们的示例中为2)。
- **Sequence length:** 序列长度(在我们的例子中是16)。
- **Hidden size**： 每个模型输入的向量维数。

由于最后一个值，它被称为高维的。Hidden size可以非常大(768对于较小的模型是常见的，在较大的模型中可以达到3072或更多)。

如果我们将预处理过的输入输入到模型中，就可以看到这一点：

```
outputs = model(**inputs)
print(outputs.last_hidden_state.shape)
```

```
torch.Size([2, 16, 768])
```

注意 Transformers 的输出像 **namedtuples** 或者 dictionaries。 你可以通过 attributes（outputs.last_hidden_state.shape） 或者 key（`outputs["last_hidden_state"]`） ，如果你知道你要找到东西的位置的话， 甚至通过索引  (`outputs[0]`)。


### Model heads: Making sense out of numbers

模型 heads 以 hidden states 的高维向量作为输入， 并且将它们投影到一不同的维度。 它们通常由一些线性层组成：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1624591323580.png)

Transformer模型的输出直接发送到模型 head 进行处理。

在这个图中， 模型被表示为 embeddings layer 和  subsequent layers。 embeddings layer 将 输入ID 转换为 tokenized 输入， 再转换成一个与 token 相关的向量。subsequent layers 使用注意力机制控制这些向量产生最终句子的表征。

在 Transformer 中有很多可用的不同的结构， 每一个都是解决特定任务设计的：

- `*Model (retrieve the hidden states)`
- `*ForCausalLM`
- `*ForMaskedLM`
- `*ForMultipleChoice`
- `*ForQuestionAnswering`
- `*ForSequenceClassification`
- `*ForTokenClassification`
- and others

对于我们的例子， 我们将需要一个带有 a sequence classification head 的模型（能把句子分为肯定和否定）。因此，我们实际上不使用 **AutoModel** 类， 而是 **AutoModelForSequenceClassification**：

```python
from transformers import AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)
outputs = model(**inputs)
```

现在，如果我们观察我们输入的形状，维度会低得多: model head将我们之前看到的高维向量作为输入，输出的向量包含两个值(每个标签一个):

```python
print(outputs.logits.shape)
```

```
torch.Size([2, 2])
```

因为我们只有两个句子和两个标签，我们从我们的模型得到的结果是形状为2 x 2。


### Postprocessing the output

我们从模型中获得的输出值本身并不一定有意义。让我们来看一看

```python
print(outputs.logits)
```

```
tensor([[-1.5607,  1.6123],
        [ 4.1692, -3.3464]], grad_fn=<AddmmBackward>)
```

我们模型对第一个句子的预测 (`[-1.5607, 1.6123]`) 和 第二个句子的预测 (`[ 4.1692, -3.3464]`)。 这些不是概率，而是 *logits*，即模型最后一层输出的原始的、未标准化的分数。为了转化成概率， 它们需要通过一个 `SoftMax` 层。 

```python
import torch

predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
print(predictions)
```

```
tensor([[4.0195e-02, 9.5980e-01],
        [9.9946e-01, 5.4418e-04]], grad_fn=<SoftmaxBackward>)
```

现在我们可以看到模型对第一个句子的预测 `[0.0402, 0.9598] ` 和 对第二个句子的预测 `[0.9995, 0.0005]`。  这些是可识别的概率得分。

为了获得每个位置对应的标签，我们可以检查模型配置的 **id2label** 属性(下一节将对此进行更多介绍)

```
model.config.id2label
```


```
{0: 'NEGATIVE', 1: 'POSITIVE'}
```

## Models

在本节中，我们将进一步了解模型的创建和使用。我们将使用 **AutoModel** 类，当您想从一个 checkpoint 实例化任何模型时，它很方便。

**AutoModel** 类及其所有相关类实际上是库中各种可用模型的简单封装。它是一个聪明的封装器，因为它可以自动地为您的 checkpoint 猜测适当的模型结构，然后用这个结构实例化一个模型。

但是，如果您知道您想要使用的模型类型，您可以使用直接定义其结构的类。让我们看看BERT模型是如何工作的。

### Creating a Transformer


始化BERT模型需要做的第一件事是加载一个 configuration 对象


```python
from transformers import BertConfig, BertModel

# Building the config
config = BertConfig()

# Building the model from the config
model = BertModel(config)
```

configuration 包含许多用于构建模型的属性:

```
print(config)
```


```
BertConfig {
  [...]
  "hidden_size": 768,
  "intermediate_size": 3072,
  "max_position_embeddings": 512,
  "num_attention_heads": 12,
  "num_hidden_layers": 12,
  [...]
}
```


虽然还没有看到所有这些 attributes 的作用，但是应该认识其中一些： **hidden_size** attribute 定义了 **hidden_states** 向量的大小， **num_hidden_layers** 定义了 Transformer 模型有多少层。


### Different loading methods

从默认 configuration 创建模型时，将使用随机值对其进行初始化：


```python
from transformers import BertConfig, BertModel

config = BertConfig()
model = BertModel(config)

# Model is randomly initialized!
```

模型可以在这种状态下使用，但它会输出乱码; 首先需要对它进行训练。我们可以从零开始训练模型，但正如你在  Chapter 1 看到的，这将需要很长时间和大量的数据，它将有不可忽视的环境影响。为了避免不必要和重复的工作，能够共享和重用已经训练过的模型是非常必要的。

加载一个已经训练过的Transformer模型很简单，我们可以使用 **from_pretrained** 方法来实现这一点：

```python
from transformers import BertModel

model = BertModel.from_pretrained("bert-base-cased")
```

正如您前面看到的，我们可以用等价的 AutoModel 类替换BertModel。我们将从现在开始这样做，因为这会产生 checkpoint-agnostic 的代码;如果您的代码对一个 checkpoint 有效，那么它应该与另一个 checkpoint 无缝地工作。只要 checkpoint 接受过类似任务的训练，即使结构不同，这也适用(for example, a sentiment analysis task)。

在上面的代码示例中，我们没有使用 **BertConfig**，而是通过 **bert-base-cased** 的标识符加载预先训练过的模型。这是BERT作者自己训练的一个模型 checkpoint;你可以在它的 [model card](https://huggingface.co/bert-base-cased)上找到更多的细节

# GET STARTED

## 安装


```
pip install transformers
```


## Philosophy
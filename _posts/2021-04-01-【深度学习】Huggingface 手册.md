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

在上面的代码示例中，我们没有使用 **BertConfig**，而是通过 **bert-base-cased** 的标识符加载预先训练过的模型。这是BERT作者自己训练的一个模型 checkpoint;你可以在它的 [model card](https://huggingface.co/bert-base-cased)上找到更多的细节。

这个模型现在使用 checkpoint 的所有权重进行初始化。它可以直接用于对训练的任务进行推理，也可以对新任务进行微调。通过预训练的权重训练，而不是从零开始，我们可以很快达到良好的效果。

权重已经被下载并缓存到缓存文件夹中(因此以后调用 **from_pretrained** 方法不会重新下载它们)， 它的默认路径是 *~/.cache/huggingface/transformers*。 你可以通过 **HF_HOME** 环境变量自定义缓存文件夹。

用于加载模型的标识符可以是 Model Hub上任何模型的标识符，只要它与BERT结构兼容。可用BERT checkpoints 的完整列表可以在[这里](https://huggingface.co/models?filter=bert)找到。

### Saving methods

保存模型和加载模型一样简单，我们使用 **save_pretrained** 方法，它类似于 **from_pretrained** 方法：

```python
model.save_pretrained("directory_on_my_computer")
```

这将在磁盘上保存两个文件:

```
ls directory_on_my_computer

config.json pytorch_model.bin
```

如果你看一下 config.json 文件，您将识别构建模型结构所需的属性。这个文件还包含了一些元数据,比如 checkpoint 源自哪里, 你最后一次保存 checkpoint 使用的 Transformers 版本。

*pytorch——model.bin* 文件被称为 *state dictionary*； 它包含所有模型的权重。这两个文件是密切相关的; configuration对于了解您的模型体系结构是必要的，而模型权重是您的模型参数。


### Using a Transformer model for inference

现在您已经知道了如何加载和保存模型，让我们尝试使用它来进行一些预测。Transformer 模型只能处理数字 —— 数字由 tokenizer 生成。 但是在讨论 tokenizers 之前，让我们先研究一下模型接受哪些输入。

Tokenizers 可以将输入转换成合适框架的 tensors， 而且可以帮助你理解发生了什么， 我们将快速了解在向模型发送输入之前必须做什么。

假设我们有几个序列：

```
sequences = [
  "Hello!",
  "Cool.",
  "Nice!"
]
```

tokenizer 转换这些词典的索引， 它们被称之为 input IDs. 每个序列现在都是一组数字！得到的输出是：

```
encoded_sequences = [
  [ 101, 7592,  999,  102],
  [ 101, 4658, 1012,  102],
  [ 101, 3835,  999,  102]
]
```

这是一个编码序列的列表:列表的列表。Tensors 仅接受矩形形状。 这个数组已经是矩形了，所以把它转换成张量很容易。

```python
import torch

model_inputs = torch.tensor(encoded_sequences)
```


### Using the tensors as inputs to the model

利用模型中的张量非常简单我们只需要调用带输入的模型

```python
output = model(model_inputs)
```

虽然模型接受许多不同的参数，但只有输入id是必需的。稍后，我们将解释其他参数的作用以及在什么时候需要它们，但首先，我们需要仔细研究 tokenizers， 它构建Transformer模型可以理解的输入。


## Tokenizers

Tokenizers 是NLP pipeline的核心组件之一。它们只有一个目的:将文本转换为模型可以处理的数据。模型只能处理数字，所以 tokenizers 需要将文本输入转换为数字数据。在本节中，我们将探究tokenization pipeline中到底发生了什么。

在NLP任务中，通常处理的数据是原始文本。以下是此类文本的一个例子：

```
Jim Henson was a puppeteer
```

但是，模型只能处理数字，所以我们需要找到一种将原始文本转换为数字的方法。这就是 tokenizers 的作用，有很多方法可以做到这一点。目标是找到最有意义的表示，也就是对模型最有意义的表示，如果可能的话，是最小的表示。


### Word-based

第一种 tokenize r是 *word-based* 的。 它的设置和使用通常非常简单，只需要一些规则，而且通常会产生不错的结果。例如，在下面的图片中，我们的目标是将原始文本分解成单词，并为每个单词找到数字表示：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1624602267035.png)

有不同的方法来拆分文本。例如，我们可以通过应用Python的split函数，使用空格将文本标记为单词：

```
tokenized_text = "Jim Henson was a puppeteer".split()
print(tokenized_text)
```

```
['Jim', 'Henson', 'was', 'a', 'puppeteer']
```

还有一些单词 tokenizers 的变体对标点有额外的规则。有了这种 tokenizer， 我们可以得到一些相当大的词汇表，其中，词汇表由语料库中独立 tokens 的总数来定义。

每个单词都被分配一个ID，从0开始，一直到词汇表的大小。模型使用这些id来标识每个单词。

如果我们希望使用 word-based 的 tokenizer 完全覆盖一种语言，那么我们需要为该语言中的每个单词提供一个标识符，这将生成大量标记。例如，英语中有超过50万个单词，因此要构建从每个单词到输入ID的映射，我们需要跟踪这些ID。此外，像 “dog”  这样的词与像 “dogs” 这样的词的表示方式是不同的，模型最初将无法知道  “dog” 和 “dogs” 是相似的:它将识别出两个词是不相关的。这同样适用于其他类似的词，如 “run” 和 “running”，模型最初不会看到它们是相似的。

最后，我们需要一个自定义 token 来表示不在词汇表中的单词。这被称为 “unknown” token，通常表示为 `[UNK]` 。如果 tokenizer 生成大量这样的标记，这通常是一个不好的迹象，因为它无法检索单词的合理表示，并且在此过程中会丢失信息。设计词汇表时的目标是让 tokenizer 将尽可能少的单词标记到未知标记中。

一种减少未知 tokens 的方法是更进一步， 使用 *character-based tokenizer*。


### Character-based

Character-based tokenizers 将文本拆分成 characters， 而不是 words。 它主要由两个好处：

- 词汇表(vocabulary)要小得多。
- 词汇表外(未知) tokens 要少得多，因为每个 word 都可以由 characters 构建。

但是这里也出现了一些关于空格和标点符号的问题：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1624604020844.png)

这种方法也不完美。因为现在的表现是基于 characters 而不是 words，所以我们可以从直觉上认为这是没有意义的: 每个 characters 本身的含义并不是很多，而 words 则不是。然而，这又因语言而异;例如，在中文中，每个 characters 所携带的信息比拉丁语中的一个 characters 要多。

需要考虑的另一件事是，我们的模型最终将处理大量的 tokens :虽然一个 word 只有一个 word-based  的 tokenizer，但在转换为 characters 时，它可以很容易地转换为10个或更多的 tokens。

为了获得这两种方法的最佳效果，我们可以使用结合这两种方法的第三种技术: *subword tokenization*。

### Subword tokenization

Subword tokenization 算法的基本原则是不将常用词分解为较小的子词，而将生僻词分解为有意义的子词。

例如， “annoyingly” 可能被认为是一个生僻词，可以被分解为 “annoying” 的和 “ly”。这两个词单独出现的频率更高，同时“annoyingly” 的意思由 “annoying” 和 “ly” 的复合意思保留。

下面是一个例子，展示了 subword tokenization 算法如何标记序列“Let’s do tokenization!”：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1624605284925.png)

这些 subwords 最终提供了很多语义含义:例如，在上面的例子中 “tokenization”  被拆分成 “token”  和  “ization”, 两个具有语义含义且具有空间效率的tokens(只需要两个tokens就可以表示一个长单词)。这允许我们用较小的词汇表获得相对较好的覆盖率，并且几乎没有未知的 tokens。

这种方法在黏着性语言(如土耳其语)中特别有用，在这种语言中，可以通过将子词串在一起形成(几乎)任意长的复杂单词。

### And more!

还有很多其他的技术。举几个例子:

- Byte-level BPE, as used in GPT-2
- WordPiece, as used in BERT
- SentencePiece or Unigram, as used in several multilingual models

您现在应该对 tokenizers 如何工作有了足够的了解，以便开始使用API。


### Loading and saving

加载和保存 tokenizers 和模型一样简单。实际上，它是基于相同的两个方法: **from_pretrained**和 **save_pretrained**。这些方法将加载或保存 tokenizer 使用的算法(有点像模型的结构)及其词汇表(有点像模型的权重)。

加载 BERT tokenizer 与加载模型的方式相同，只是我们使用了BertTokenizer类：

```
from transformers import BertTokenizer

tokenizer = BertTokenizer.from_pretrained("bert-base-cased")
```

与 **AutoModel** 类似，**AutoTokenizer** 类将基于 checkpoint 名称获取库中适当的 tokenizer ，并可以直接用于任何checkpoint：

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
```

我们现在可以使用tokenizer，如前一节所示

```
tokenizer("Using a Transformer network is simple")
```

```
{'input_ids': [101, 7993, 170, 11303, 1200, 2443, 1110, 3014, 102],
 'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 0],
 'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1]}
```

保存 tokenizer 和保存模型一样：

```python
tokenizer.save_pretrained("directory_on_my_computer")
```


我们将在  Chapter 3 中更多地讨论 **token_type_ids**，稍后我们将解释 **attention_mask**。首先， 我们看一下 **input_ids** 如何生成。 为此，我们需要查看 tokenizer 的中间方法。


### Encoding

将文本转换成数字称为编码。编码过程分为两个步骤: tokenization，然后转换为输入id。

正如我们所看到的，第一步是将文本拆分为单词(或部分单词、标点符号等)，通常称为 *tokens*。有多个规则可以管理这个过程，这就是为什么我们需要使用模型的名称来实例化 tokenizer，以确保我们使用了与模型预训练时使用的相同的规则。 

第二步是将这些 tokens 转换为数字，这样我们就可以用它们构建一个张量，并将它们提供给模型。为此，tokenizer 有一个 *vocabulary*，当我们使用 **from_pretrained** 方法实例化它时，就会下载这个词汇表。同样，我们需要使用预训练模型时使用的相同词汇表。

为了更好地理解这两个步骤，我们将分别研究它们。注意，我们将使用一些方法分别执行  tokenization pipeline 的部分内容，以向您显示这些步骤的中间结果，但在实践中，您应该直接在输入上调用 tokenizer (如 section 2 所示)。


#### Tokenization

tokenization 过程是通过 tokenizer 的 **tokenize** 方法完成的：

```python
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

sequence = "Using a Transformer network is simple"
tokens = tokenizer.tokenize(sequence)

print(tokens)
```

这个方法的输出是字符串或 tokens 的列表:

```
['Using', 'a', 'transform', '##er', 'network', 'is', 'simple']
```

这个 tokenizer 是一个 subword tokenizer:  它拆分 words，直到获得可以用词汇表表示的 tokens。以 Transformer 为例， 它被分为两个标记: **transform** 和 **##er**。


#### From tokens to input IDs

input IDs 的转换由 tokenizer 的  **convert_tokens_to_ids** 方法处理：
 
```python
ids = tokenizer.convert_tokens_to_ids(tokens)

print(ids)
```

```
[7993, 170, 11303, 1200, 2443, 1110, 3014]
```

这些输出一旦转换为适当的框架张量，就可以用作本章前面所见的模型的输入。


#### Decoding

解码则是反过来的:我们想从词汇表索引中获得一个字符串。这可以通过如下的解码方法来实现：

```python
decoded_string = tokenizer.decode([7993, 170, 11303, 1200, 2443, 1110, 3014])
print(decoded_string)
```

```
'Using a Transformer network is simple'
```

注意，**decode** 方法不仅将索引转换回标记，而且还将属于相同单词的标记组合在一起，以生成可读的句子。当我们使用预测新文本的模型时(无论是根据提示生成的文本，还是针对翻译或摘要等序列到序列的问题)，这种行为将非常有用。


## Handling multiple sequences

在前一节中，我们探索了最简单的用例:对一个较小长度的序列进行推理。然而，已经出现了一些问题：

- 我们如何处理多个序列？
- 我们如何处理多个不同长度的序列？
- 词汇表索引是允许模型良好工作的唯一输入吗？
- 有过长的序列吗？

让我们看看这些问题会带来什么样的问题，并且使用  Transformers API 如何解决它们。

### Models expect a batch of inputs

在前面的练习中，您看到了如何将序列转换为数字列表。让我们把这些数转换成一个张量并把它发送给模型：

```python
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence = "I've been waiting for a HuggingFace course my whole life."

tokens = tokenizer.tokenize(sequence)
ids = tokenizer.convert_tokens_to_ids(tokens)
input_ids = torch.tensor(ids)
# This line will fail.
model(input_ids)
```

```
IndexError: Dimension out of range (expected to be in range of [-1, 0], but got 1)
```

为什么失败了呢?我们遵循了  section 2 中的步骤。

这个问题是因为我们向模型发送了单个序列， 而 Transformers 模型默认情况下使用多个句子。在这里，当我们将 tokenizer 应用到序列时，我们试图完成 tokenizer 在幕后所做的一切， 但是如果你仔细观察，你会发现它不仅仅是把输入id的列表转换成一个张量，它还在上面加了一个维数。

```python
tokenized_inputs = tokenizer(sequence, return_tensors="pt")
print(tokenized_inputs["input_ids"])
```

```
tensor([[  101,  1045,  1005,  2310,  2042,  3403,  2005,  1037, 17662, 12172,
          2607,  2026,  2878,  2166,  1012,   102]])
```

让我们再试一次，添加一个新的维度:

```
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence = "I've been waiting for a HuggingFace course my whole life."

tokens = tokenizer.tokenize(sequence)
ids = tokenizer.convert_tokens_to_ids(tokens)

input_ids = torch.tensor([ids])
print("Input IDs:", input_ids)

output = model(input_ids)
print("Logits:", output.logits)
```


我们打印 输入id 以及 输出结果 logits —— 这里是输出：

```
Input IDs: [[ 1045,  1005,  2310,  2042,  3403,  2005,  1037, 17662, 12172,  2607, 2026,  2878,  2166,  1012]]
Logits: [[-2.7276,  2.8789]]
```

批处理是通过模型同时发送多个句子的行为。如果你只有一个句子，你可以用一个序列来构建一个batch：

```
batched_ids = [ids, ids]
```

这是由两个相同序列组成的一批。

批处理允许模型在输入多个句子时工作。使用多个序列就像用单个序列构建一批一样简单。不过还有第二个问题。当你试图将两个(或更多)句子组合在一起时，它们的长度可能不同。如果你以前用过张量，你就知道它们必须是矩形的，所以你不能把输入id的列表直接转换成张量。为了解决这个问题，我们通常 *pad* 输入。


### Padding the inputs

以下列表的列表不能转换为张量

```
batched_ids = [
  [200, 200, 200],
  [200, 200]
]
```

为了解决这个问题，我们将使用 *padding*  称一个矩形形状制作 tensor。Padding通过向具有较少值的句子添加一个称为Padding标记的特殊单词来确保我们所有的句子具有相同的长度。例如，如果你有10个含有10个单词的句子和1个含有20个单词的句子，填充会确保所有的句子都含有20个单词。在我们的例子中，得到的张量是这样的：


```
padding_id = 100

batched_ids = [
  [200, 200, 200],
  [200, 200, padding_id]
]
```


paddding token ID 可以在 **tokenizer.pad_token_id** 中找到。 让我们使用它，并将我们的两个句子分别和批量一起发送到模型。

```python
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence1_ids = [[200, 200, 200]]
sequence2_ids = [[200, 200]]
batched_ids = [[200, 200, 200], [200, 200, tokenizer.pad_token_id]]

print(model(torch.tensor(sequence1_ids)).logits)
print(model(torch.tensor(sequence2_ids)).logits)
print(model(torch.tensor(batched_ids)).logits)
```

```
tensor([[ 1.5694, -1.3895]], grad_fn=<AddmmBackward>)
tensor([[ 0.5803, -0.4125]], grad_fn=<AddmmBackward>)
tensor([[ 1.5694, -1.3895],
        [ 1.3373, -1.2163]], grad_fn=<AddmmBackward>)
```

在我们的批处理预测中，有一些错误的logit: 第二行应该与第二句的logits相同，但是我们得到了完全不同的值。

这是因为Transformer模型的关键特性是 attention 层， 它将每个token contextualize。这些将考虑padding tokens，因为它们涉及序列的所有 tokens。当通过模型传递不同长度的单个句子时，或者当传递应用了相同句子和填充的批处理时，为了获得相同的结果，我们需要告诉那些 attention 层忽略 padding tokens。这可以通过使用 attention mask 来实现。


### Attention masks

*Attention masks* 是有着和输入 IDs tensor 相同形状的 tensor，值为0和1： 1表示应该涉及的tokens， 0表示不应该涉及的tokens(也就是说，它们应该被模型的 attention 层忽略)。


让我们用一个  attention mask 来完成前面的示例：

```python
batched_ids = [
    [200, 200, 200],
    [200, 200, tokenizer.pad_token_id]
]

attention_mask = [
  [1, 1, 1],
  [1, 1, 0]
]

outputs = model(torch.tensor(batched_ids), attention_mask=torch.tensor(attention_mask))
print(outputs.logits)
```


```
tensor([[ 1.5694, -1.3895],
        [ 0.5803, -0.4125]], grad_fn=<AddmmBackward>)
```

现在我们得到了批处理中第二个句子相同的logit。

请注意第二个序列的最后一个值是一个padding ID，它在 attention mask 中是一个0值。

### Longer sequences

对于Transformer模型，可以传递给模型的序列的长度是有限制的。大多数模型处理最多512或1024个 tokens 的序列，当要求处理更长的序列时将崩溃。这个问题有两种解决方案：

- 使用支持较长的序列长度的模型。
- 截断你的序列。

模型支持不同的序列长度，有些模型专门处理非常长的序列。Longformer是一个例子，LED是另一个例子。如果你正在处理一个需要很长序列的任务，我们建议你看看这些模型。

否则，我们建议您通过指定 **max_sequence_length** 参数：

```
sequence = sequence[:max_sequence_length]
```

# GET STARTED

## 安装


```
pip install transformers
```


## Philosophy
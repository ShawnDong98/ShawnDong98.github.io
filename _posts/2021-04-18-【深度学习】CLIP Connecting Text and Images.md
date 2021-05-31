---
layout:     post
title:      "【深度学习】CLIP: Connecting Text and Images"
subtitle:   ""
date:       2021-04-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Blog

尽管深度学习已经彻底改变了计算机视觉，但当前的方法仍存在几个主要问题：典型的视觉数据集需要大量的劳动力，并且创建成本很高，而只学习一组狭窄的视觉概念；标准视觉模型擅长且只擅长一项任务，并且需要花费大量的精力来适应新的任务；在 benchmark 测试中表现良好的模型在压力测试中的表现令人失望， 这让人们对计算机视觉的整个深度学习方法产生了怀疑。


我们提出了一种旨在解决这些问题的神经网络:它在各种各样的图像上进行训练，并在互联网上大量提供各种各样的自然语言监督。通过设计，该网络可以用自然语言指导执行各种分类benchmark，而无需直接优化 benchmark 的性能，类似于GPT-2和GPT-3的零样本学习能力。这是一个关键的变化：通过对 benchmark 的直接优化，我们表明它变得更具表征性：我们的系统在不使用任何原始1.28M标记样本的情况下，将 ResNet-50 在 ImageNet 零样本的性能匹配时，将此“robustness gap”缩小了75%。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622176612922.png)

尽管两种模型在ImageNet测试集上具有相同的准确性， CLIP在不同的、非imagenet设置中数据集上的测量精度表明它更具表征性。例如，ObjectNet检查模型的能力通过识别家中许多不同姿态和不同背景的物体，而ImageNet Rendition和ImageNet Sketch检查模型识别物体的能力通过识别更抽象的描述。

## Background and related work

CLIP (Contrastive Language–Image Pre-training)建立在零样本迁移，自然语言监督和多模态学习的大量工作之上。零数据学习的概念可以追溯到十多年前，但直到最近才主要在计算机视觉中 作为当一种不知道物体类别时的方法 被研究。一个关键的见解是利用自然语言作为一个 灵活的预测空间 来实现泛化和迁移。2013年，斯坦福大学的Richer Socher和他的合著者开发了一个概念证明，他们在CIFAR-10上训练了一个模型，在词向量嵌入空间中做出预测，并证明该模型可以预测两个没见过的类。同年，DeVISE对这种方法进行了扩展，并证明了对ImageNet模型进行微调是可能的，这样它就可以推广到正确预测原来1000个训练集之外的对象。

最鼓舞人心的CLIP 是李安和他的合著者在 FAIR 的工作，他们在2016年演示了使用自然语言监督使 零样本 迁移到几个现有的计算机视觉分类数据集，如典型的ImageNet数据集。他们通过对ImageNet CNN进行微调，从3000万张Flickr照片的标题、描述和标签文本中预测出更广泛的视觉概念(visual n-grams)，并在ImageNet zero-shot中达到11.5%的准确性。


最后，CLIP是一组论文的一部分，这些论文回顾了过去一年里从自然语言监督中学习视觉表征。这项工作使用了更现代的架构，如Transformer，并包括VirTex，它探索了自回归语言建模，ICMLM，它研究了masked language modeling，  以及ConVIRT，它研究了我们用于CLIP的相同的对比目标，但是是在医学图像领域。


## Approach


我们证明，缩放一个简单的训练前任务足以在多种图像分类数据集上实现有竞争力的零样本性能
我们的方法使用了大量可用的监督源: 在互联网上找到的匹配的文本和图片。该数据用于为CLIP创建以下代理训练任务: 给定一张图像，预测在32,768个随机抽样文本片段中，哪一个在我们的数据集中与之配对。

为了解决这个任务，我们的直觉是CLIP模型将需要学习识别图像中各种各样的视觉概念，并将它们与其名称联系起来。因此，CLIP模型可以应用于几乎所有的视觉分类任务。例如，如果数据集的任务是对狗和猫的照片进行分类，我们就会使用CLIP模型预测每个图像的文本描述"a photo of a dog" 或 "a photo of a cat" 哪个更可能和它配对。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622189378435.png)


CLIP对图像编码器和文本编码器进行预处理，以预测数据集中哪些图像与哪些文本配对。然后，我们使用这个表现将CLIP转换为零样本分类器。我们将数据集的所有类转换为标题，比如“a photo of a dog” ，并预测 一张给定图像 CLIP估计最佳的 配对标题的种类。


CLIP的设计是为了缓解计算机视觉标准深度学习方法中的一些主要问题：

**Costly datasets:** 深度学习需要大量的数据，而视觉模型传统上是在人工标记的数据集上进行训练的，而这些数据集的构建成本昂贵，而且只能对有限数量的预先定义的视觉概念提供监督。ImageNet数据集是这一领域最大的努力之一，需要超过25000名工作人员为22000个对象类别注释1400万张图像。相比之下，CLIP从已经在互联网上公开的文本图像对中学习。减少对昂贵的大型标记数据集的需要已经在以前的工作中得到了广泛的研究，特别是自监督学习， 对比方法， 自训练方法， 以及生成模型。


**Narrow** ImageNet模型很擅长预测1000个ImageNet类别，但这就是它所能做的全部。如果我们希望执行任何其他任务，ML从业者需要构建一个新的数据集，添加一个输出头，并对模型进行微调。相比之下，CLIP可以用于执行各种各样的视觉分类任务，而不需要额外的训练示例。要将CLIP应用到新任务，我们所需要做的就是告诉CLIP文本编码器任务视觉概念的名称，然后它将输出CLIP视觉表征的线性分类器。这种分类器的准确性可以与完全监督模型相竞争。

我们展示了随机的、非精心挑选的、零样本 CLIP分类器的预测，下面是来自不同数据集的例子。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622190503570.png)

**Poor real-world performance:** 据报道，深度学习系统通常可以实现人类甚至超过人类的表现
但当在部署时，它们的性能可能远远低于基准设定的预期。换句话说，基准性能和实际性能之间存在差距。我们推测之所以会出现这种差距，是因为模型只根据基准测试的表现进行了优化，就像一个学生只学习过去几年的考试问题就通过了考试一样。相比之下，CLIP模型可以在基准测试上进行评估，而不必对其数据进行训练，因此它不能以这种方式作弊。这使得它的基准性能更能代表其在部署时的性能。为了验证作弊假说，我们还测量了当CLIP可以ImageNet进行学习时，它的性能是如何变化的。当线性分类器被拟合在CLIP特征上时，它可以提高CLIP在ImageNet测试集上的准确率近10%。然而，在其他7个衡量“鲁棒性”性能的数据集的评估中，该分类器的平均性能并没有提高。

## Key takeaways

### CLIP is highly efficient

CLIP从未经过滤、高度变化和高度噪声的数据中学习，并旨在以零样本的方式使用。我们从GPT-2和GPT-3中知道，根据这些数据训练的模型可以实现令人信服的零样本性能。然而，这样的模型需要大量的训练计算。为了减少所需的计算量，我们着重研究了提高训练效率的算法方法。


我们报告了两种可显著节省计算的算法选择。第一种选择是采用对比目标来连接文本和图像。我们最初探索了一种类似于VirTex的图像到文本的方法， 但在扩展这一功能以实现最先进的性能方面遇到了困难。在小型到中型规模的实验中，我们发现CLIP使用的对比目标在零样本的ImageNet分类中效率是4到10倍。第二种选择是采用Vision Transformer，它使我们的计算效率比标准的ResNet提高了3倍。最后，我们的CLIP模型在256个GPU上运行了2周，与现有的大规模图像模型相似。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622192143950.png)


我们最初探索的是训练图像到标题的语言模型，但发现这种方法在零样本迁移方面遇到了困难。在这个16天的GPU实验中，一个语言模型在对4亿张图像进行训练后，在ImageNet上只能达到16%的准确率。CLIP的效率更高，达到同样的精度大约快10倍。


### CLIP is flexible and general

因为他们直接从自然语言中学习了大量的视觉概念， CLIP模型比现有的ImageNet模型更加灵活和通用。我们发现他们能够零样本执行许多不同的任务。为了验证这一点，我们在30多个不同的数据集上测量了CLIP的零样本性能，这些数据集包括fine-grained对象分类、地理定位、视频中的动作识别和OCR。特别是，学习OCR是标准ImageNet模型中不会出现的令人兴奋的表现的一个例子。在上面，我们从每个零样本分类器中可视化一个随机非精心选择的预测。

这一发现也反映在使用 linear probes 的标准表征学习评价上。在我们测试26个不同的迁移数据集中的20个数据集中， 最好的CLIP模型优于最好的公共可用的ImageNet模型Noisy Student EfficientNet-L2。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622192779332.png)

通过27个数据集的测试任务，如细粒度对象分类、OCR、视频中的活动识别和地理定位，我们发现CLIP模型可以学习更广泛有用的图像表征。CLIP模型的计算效率也比我们之前比较的10种方法的模型更高。

## Limitations

虽然CLIP通常在识别普通物体上表现得很好，但在更抽象或更系统的任务(如计算图像中物体的数量)和更复杂的任务(如预测照片中最近的汽车有多近)上却表现得很困难。在这两个数据集上，零样本CLIP只比随机猜测好一点点。与特定任务模型相比，Zero-shot CLIP在非常细粒度的分类上也很困难，比如区分汽车模型、飞机变体或花卉品种之间的差异。

CLIP对于训练前数据集中未覆盖的图像仍有较差的泛化能力。例如，尽管CLIP学习了一个有能力的OCR系统，但当从MNIST数据集中对手写数字进行评估时，零样本CLIP只能达到88%的准确率，远低于数据集中人类的99.75%。最后，我们观察到CLIP的零样本分类器对 wording 或 phrasing 很敏感，有时需要trial 和  error “prompt engineering” 才能执行良好。

## Broader impacts

CLIP允许人们设计自己的分类器，并消除了对特定任务训练数据的需要。这些类的设计方式会严重影响模型性能和模型偏差。例如，我们发现，当给定一组标签（包括Fairface race标签）和一些糟糕的标签（如“罪犯”、“动物”等）时，该模型倾向于将0-20岁的人的图像分类为糟糕的类别，分类率约为32.3%。然而，当我们将类的子类添加到可能的类列表中时，这种行为下降到~8.7%。

此外，由于CLIP不需要特定任务的训练数据，它可以更轻松地解锁特定的小众任务。其中一些任务可能会增加隐私或监视相关的风险，我们通过研究CLIP在名人识别方面的表现来探讨这一问题。CLIP在从100个候选人中选择名人图像时，其最高准确率为59.2%;在从1000个可能选项中选择时，其最高准确率为43.3%。虽然值得注意的是，通过 task agnostic pre-training 实现这些结果，但与广泛使用的生产级模型相比，这种表现并不具有竞争力。我们进一步探讨了CLIP在我们的论文中提出的挑战，我们希望这项工作能够推动未来对此类模型的能力、缺点和偏差的特性的研究。我们很高兴能在这类问题上与研究界接触。

## Conclusion

通过CLIP，我们测试了在互联网规模的自然语言上的 task agnostic 预训练是否也可以用来提高其他领域的深度学习性能。我们对迄今为止将这种方法应用于计算机视觉的结果感到兴奋。就像GPT家族一样，CLIP在训练前学习各种各样的任务，我们通过零样本迁移来演示。我们在ImageNet上的发现也让我们感到鼓舞，该发现表明零样本评估是一个更有代表性的模型能力的衡量方法。



# Paper

## Abstract

最先进的计算机视觉系统训练预测一组固定的预定义对象类别。直接从原始文本中学习图像是一种很有前景的选择，它利用了更广泛的监督来源。我们展示了在从互联网上收集的4亿对（图像、文本）数据集上，预测哪个标题与哪个图像搭配的简单预训练任务 是 学习SOTA图像表征 的有效方法。在预训练之后，自然语言被用来引用学习到的视觉概念（或描述新的概念），从而实现模型到下游任务的零样本迁移。我们通过在30多个不同的现有计算机视觉数据集上进行基准测试来研究这种方法的性能，包括OCR、视频中的动作识别、地理定位和许多类型的细粒度对象分类等任务。例如，我们不需要使用128万个训练样本中的任何一个， 就可以在ImageNet zero shot上匹配原始ResNet-50的精度。


## Introduction and Motivating Work

在过去的几年里，直接从原始文本中学习的预训练方法已经彻底改变了自然语言处理。Task-agnostic 目标（如autoregressive和masked language modeling ）在计算、模型容量和数据方面已经扩展了许多数量级，稳步提高了能力。“文本到文本”作为标准化输入-输出接口的发展使得任务无关的体系结构能够零样本迁移到下游数据集，从而无需专门的输出头或特定数据集的定制。像GPT-3这样的旗舰系统现在在许多定制模型的任务中都具有竞争力，同时几乎不需要特定于数据集的训练数据。这些结果表明，在互联网规模的文本集合中，现代预训练方法可获得的总体监督优于高质量的人类标记的NLP数据集。


# Blog

## 介绍

OpenAI开放了一些与CLIP模型相关的代码，但我发现它令人生畏，它远不是什么简短和简单的东西。我还遇到了一个很好的教程，灵感来自Keras代码示例上的CLIP模型，我将其中的一些部分迁移到PyTorch中，完全用我们喜爱的PyTorch构建了这个教程！


## CLIP是什么？为什么它有趣？

在[Learning Transferable Visual Models From Natural Language Supervision ](https://arxiv.org/abs/2103.00020)文章中， OpenAI介绍了他们的新模型，叫做CLIP，用于对比语言-图像预训练。简而言之，该模型学习整个句子与其描述的图像之间的关系;在某种意义上，当模型被训练时，给定一个输入句子，它将能够检索出与该句子最相关的图像。重要的是，它是在完整的句子中训练的，而不是像car, dog等单一的类别。直觉告诉我们，当对整个句子进行训练时，该模型可以学习更多的东西，并在图像和文本之间找到一些模式。

他们还表明，当这个模型在一个巨大的图像和相应的文本数据集上进行训练时，它也可以作为一个分类器。仅举一个例子，使用这种策略训练的CLIP模型对ImageNet的分类比那些在ImageNet上训练的SOTA模型更好，这些SOTA模型针对分类任务进行了优化。

让我们看看本文从头构建的最终模型能够实现什么: 给定 “a boy jumping with skateboard” 或 “a girl jumping from swing”这样的查询，模型将检索最相关的图像：


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622202145329.png)


## 开始

首先，我们需要一个包含图像和一些描述它们的文本的数据集。网上有很多这样的网站。我们将使用Flickr 8k数据集(你可以使用30k版本，它更大，最终的模型将表现更好)，它主要用于Image Captioning任务。但是，这是没有限制的，我们也可以使用它来训练CLIP模型。

关于这个数据集需要注意的一点是，每个图像都有5个标题。


## 数据集

我们需要对图像和它们的描述文本进行编码。因此，数据集需要返回图像和文本。当然，我们不会将原始文本提供给我们的文本编码器。 我们将使用来自 `HuggingFace` 库的 `DistilBERT` 模型(比BERT小，但性能几乎和BERT一样好)作为我们的文本编码器。 因此，我们需要用 `DistilBERT` tokenizer 对句子(标题)进行分词，然后将token id(input_ids)和attention masks提供给`DistilBERT`。因此，数据集还需要处理 tokenization。下面可以看到数据集的代码。下面我将解释代码中发生的最重要的事情。

关于config和CFG的注意事项:我用python脚本编写代码，然后把它转换成一个jupiter Notebook。
因此，在python脚本的情况下，config是一个普通的python文件，我放置所有的超参数，在jupiter Notebook的情况下，它是一个在 Notebook 的开始定义的类，以保存所有的超参数。


```python
import os
import cv2
import torch
import albumentations as A

import config as CFG

class CLIPDataset(torch.utils.data.Dataset):
    def __init__(self, image_filenames, captions, tokenizer, transforms):
        """
        image_filenames and cpations must have the same length; so, if there are
        multiple captions for each image, the image_filenames must have repetitive
        file names 
        """

        self.image_filenames = image_filenames
        self.captions = list(captions)
        self.encoded_captions = tokenizer(
            list(captions), padding=True, truncation=True, max_length=CFG.max_length
        )
        self.transforms = transforms

    def __getitem__(self, idx):
        item = {
            key: torch.tensor(values[idx])
            for key, values in self.encoded_captions.items()
        }

        image = cv2.imread(f"{CFG.image_path}/{self.image_filenames[idx]}")
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = self.transforms(image=image)['image']
        item['image'] = torch.tensor(image).permute(2, 0, 1).float()
        item['caption'] = self.captions[idx]

        return item


    def __len__(self):
        return len(self.captions)



def get_transforms(mode="train"):
    if mode == "train":
        return A.Compose(
            [
                A.Resize(CFG.size, CFG.size, always_apply=True),
                A.Normalize(max_pixel_value=255.0, always_apply=True),
            ]
        )
    else:
        return A.Compose(
            [
                A.Resize(CFG.size, CFG.size, always_apply=True),
                A.Normalize(max_pixel_value=255.0, always_apply=True),
            ]
        )
```
 
在 `__init__` 函数中， 我们接收一个  tokenizer object， 它实际上是一个 HuggingFace tokinzer； 这个 tokenizer 将在运行模型时加载。我们 padding 和 truncating 标题到一个指定的最大长度。在 `__getitem__` 中， 我们将会首先加载一个编码后的 标题， 它是一个字典， key为 `input_ids` 和 `attention_mask`， 将它的值变为张量。然后我们将会加载对应的图像， 转换并增强它， 然后我们将它变成一个张量并且把它放入字典的key为 `image` 的value中。  最后，我们将标题的原始文本放入字典的 key 为 "caption"的 value 中，仅用于可视化目的。



## 图像编码器


图像编码器的代码很简单。我在这里使用的是PyTorch Image Models library (timm)，它可以提供许多不同的图像模型，从ResNets到EfficientNets等。这里我们将使用ResNet50作为我们的图像编码器。如果你不想安装一个新的库，你可以很容易地使用torchvision库来使用ResNets。

```python
class ImageEncoder(nn.Module):
    """
    Encode images to a fixed size vector
    """

    def __init__(
        self, model_name=CFG.model_name, pretrained=CFG.pretrained, trainable=CFG.trainable
    ):
        super().__init__()
        self.model = timm.create_model(
            model_name, pretrained, num_classes=0, global_pool="avg"
        )
        for p in self.model.parameters():
            p.requires_grad = trainable

    def forward(self, x):
        return self.model(x)
```


该代码将每个图像编码为一个固定大小的向量，其大小为模型的输出通道的大小(在ResNet50的情况下，向量大小将是2048)。这是nn.AdaptiveAvgPool2d()层之后的输出。


## 文本编码器

我们使用 `DistilBERT` 作为文本编码器。 像BERT一样， 两个特殊的 tokens 将会被添加到真正的输入tokens： `CLS` 和 `SEP` 标记一个句子的开始和结束。 为了获取一个句子的整个表征(正如相关的 BERT 和 DistilBERT 论文指出的那样)，我们使用CLS token的最终表征，我们希望这个表征能够捕获句子的整体含义(caption)， 就像我们把图像转换成固定大小的向量。

```python
from transformers import DistilBertModel, DistilBertConfig

class TextEncoder(nn.Module):
    def __init__(self, model_name=CFG.text_encoder_model, pretrained=CFG.pretrained, trainable=CFG.trainable):
        super().__init__()
        if pretrained:
            self.model = DistilBertModel.from_pretrained(model_name)
        else:
            self.model = DistilBertModel(config=DistilBertConfig())
            
        for p in self.model.parameters():
            p.requires_grad = trainable

        # we are using the CLS token hidden representation as the sentence's embedding
        self.target_token_idx = 0

    def forward(self, input_ids, attention_mask):
        output = self.model(input_ids=input_ids, attention_mask=attention_mask)
        last_hidden_state = output.last_hidden_state
        return last_hidden_state[:, self.target_token_idx, :]
```

在 `DistilBERT` (以及`BERT`)的情况下，每个token的输出隐藏表征是一个大小为768的向量。因此，整个caption将被编码在大小为768的 `CLS` token 表征中。


## Projection Head

我们已经将图像和文本编码成固定大小的向量（2048表示图像，768表示文本），我们需要将它们带到一个新的空间， 这个空间图像和文本具有相似的维度，以便能够进行比较，将不相关的图像和文本分开，并将匹配的图像和文本拉到一起。


因此，下面的代码将把2048维和768维的向量带入256维(投影维度)的空间，在那里我们可以比较它们：

```python
import torch
from torch import nn

class ProjectionHead(nn.Module):
    def __init__(
        self,
        embedding_dim,
        projection_dim=CFG.projection_dim,
        dropout=CFG.dropout
    ):
        super().__init__()
        self.projection = nn.Linear(embedding_dim, projection_dim)
        self.gelu = nn.GELU()
        self.fc = nn.Linear(projection_dim, projection_dim)
        self.dropout = nn.Dropout(dropout)
        self.layer_norm = nn.LayerNorm(projection_dim)
    
    def forward(self, x):
        projected = self.projection(x)
        x = self.gelu(projected)
        x = self.fc(x)
        x = self.dropout(x)
        x = x + projected
        x = self.layer_norm(x)
        return x
```

`embedding_dim` 是输入向量的大小(2048为图像，768为文本)，`projection_dim` 是输出向量的大小，在我们的例子中是256。


## CLIP Model

```
import torch
from torch import nn
import torch.nn.functional as F

import config as CFG
from modules import ImageEncoder, TextEncoder, ProjectionHead


class CLIPModel(nn.Module):
    def __init__(
        self,
        temperature=CFG.temperature,
        image_embedding=CFG.image_embedding,
        text_embedding=CFG.text_embedding,
    ):
        super().__init__()
        self.image_encoder = ImageEncoder()
        self.text_encoder = TextEncoder()
        self.image_projection = ProjectionHead(embedding_dim=image_embedding)
        self.text_projection = ProjectionHead(embedding_dim=text_embedding)
        self.temperature = temperature

    def forward(self, batch):
        # Getting Image and Text Features
        image_features = self.image_encoder(batch["image"])
        text_features = self.text_encoder(
            input_ids=batch["input_ids"], attention_mask=batch["attention_mask"]
        )
        # Getting Image and Text Embeddings (with same dimension)
        image_embeddings = self.image_projection(image_features)
        text_embeddings = self.text_projection(text_features)

        # Calculating the Loss
        logits = (text_embeddings @ image_embeddings.T) / self.temperature
        images_similarity = image_embeddings @ image_embeddings.T
        texts_similarity = text_embeddings @ text_embeddings.T
        targets = F.softmax(
            (images_similarity + texts_similarity) / 2 * self.temperature, dim=-1
        )
        texts_loss = cross_entropy(logits, targets, reduction='none')
        images_loss = cross_entropy(logits.T, targets.T, reduction='none')
        loss =  (images_loss + texts_loss) / 2.0 # shape: (batch_size)
        return loss.mean()


def cross_entropy(preds, targets, reduction='none'):
    log_softmax = nn.LogSoftmax(dim=-1)
    loss = (-targets * log_softmax(preds)).sum(1)
    if reduction == "none":
        return loss
    elif reduction == "mean":
        return loss.mean()
```

在这里，我们将使用之前构建的用于实现主模型的模块。在前向函数中，我们首先将图像和文本分别编码为固定大小(不同维度)的向量。在此之后，使用单独的投影模块，我们将它们投射到前面提到的共享空间中。这里的编码将变成相同的形状(在我们的例子中是256)。然后我们再计算损失。

在线性代数中，衡量两个向量是否具有相似特征(它们彼此相似)的一种常见方法是计算它们的点积(将匹配项相乘，然后取它们的和);如果最终的数字大，它们是相似的，如果它小，它们就不相似(相对而言)。

**注： 单位向量的是话成立的，因为点积就是余弦距离，越大夹角越接近于0。否则不成立。亦或，在过完归一化类型的激活函数之后，大体也能成立，因为||vector||不会太大。**

现在我们有图像嵌入矩阵， 形状为(batch_size，256)和文本嵌入矩阵， 形状为(batch_size，256)。这意味着我们有两组向量，而不是两个单独的向量。我们如何度量两组向量(两个矩阵)之间的相似性？使用点积。为了能把这两个矩阵相乘，我们把第二个矩阵转置。我们得到一个形状为(batch_size, batch_size)的矩阵，我们称之为logits。现在我们有了logits，我们需要target。

让我们考虑一下我们希望这个模型能学到什么：我们想让它对给定的图像和描述它的标题学习类似的表征(向量)。也就是说，我们给它一个图像或者描述它的文本，我们想让它们产生相同大小的256维的向量。

所以，在最好的情况下，文本嵌入和图像嵌入矩阵应该是相同的，因为它们描述的是相似的东西。我们现在想想，如果发生这种情况，logits矩阵会是什么样的?我们来看一个简单的例子：

```python
import torch
from torch import nn
import torch.nn.functional as F
import matplotlib.pyplot as plt

batch_size = 4
dim = 256
embeddings = torch.randn(batch_size, dim)
out = embeddings @ embeddings.T
print(F.softmax(out, dim=-1))

-----------
# tensor([[1., 0., 0., 0.],
#         [0., 1., 0., 0.],
#         [0., 0., 1., 0.],
#         [0., 0., 0., 1.]])
```

因此在这个最好的例子中， 如果我们对它取softmax， 对角线上将会为1.0(一个单位矩阵)。 由于损失函数的工作是使模型预测类似于目标(至少在大多数情况下!)，我们需要这样一个矩阵作为我们的目标。这就是为什么我们在上面的代码块中计算图像相似度和文本相似度矩阵的原因。


现在我们已经得到了目标矩阵，我们将使用简单的交叉熵来计算实际损失。我们已经把交叉熵的完整矩阵形式写成了一个函数，可以在代码块的底部看到。

我承认在PyTorch中有一个更简单的方法来计算这个损失; 通过这样做：`nn.CrossEntropyLoss()(logits, torch.arange(batch_size))`。为什么我没有在这里使用它？ 有两个原因：

- 我们使用的数据集对单个图像有多个标题; 因此，在一个batch中有可能存在两个相似标题的相同图像(这是罕见的，但它可能发生)。使用这种简单方式的loss将会忽略这种可能性并且模型学习将两个实际相同的分成两种不同的表征。 显然， 我们不希望这种情况发生， 因此我们以这种方式计算整个 target matrix 来处理这种极少见出现的情况。 
- 这样做，让我们更好地理解这个损失函数中发生了什么； 


## 训练

这里有一个方便的函数来训练我们的模型。这里仅仅是加载batches， 将它们喂给模型， 然后更新优化器，以及 lr_scheduler。

```
def train_epoch(model, train_loader, optimizer, lr_scheduler, step):
    loss_meter = AvgMeter()
    tqdm_object = tqdm(train_loader, total=len(train_loader))
    for batch in tqdm_object:
        batch = {k: v.to(CFG.device) for k, v in batch.items() if k != "caption"}
        loss = model(batch)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        if step == "batch":
            lr_scheduler.step()

        count = batch["image"].size(0)
        loss_meter.update(loss.item(), count)

        tqdm_object.set_postfix(train_loss=loss_meter.avg, lr=get_lr(optimizer))
    return loss_meter
```


我们完成了对模型的训练。现在，我们需要进行推理，在我们的例子中，将给模型一段文本，并希望它从一个没有见过的验证(或测试)集中检索最相关的图像。

## 得到图像嵌入

在这个函数中，我们将加载训练后保存的模型，将图像输入验证集，并返回图像嵌入(valid_set_size， 256)和模型本身。

```python
def get_image_embeddings(valid_df, model_path):
    tokenizer = DistilBertTokenizer.from_pretrained(CFG.text_tokenizer)
    valid_loader = build_loaders(valid_df, tokenizer, mode="valid")
    
    model = CLIPModel().to(CFG.device)
    model.load_state_dict(torch.load(model_path, map_location=CFG.device))
    model.eval()
    
    valid_image_embeddings = []
    with torch.no_grad():
        for batch in tqdm(valid_loader):
            image_features = model.image_encoder(batch["image"].to(CFG.device))
            image_embeddings = model.image_projection(image_features)
            valid_image_embeddings.append(image_embeddings)
    return model, torch.cat(valid_image_embeddings)
```


## Finding Matches

这个函数完成了我们希望模型能够完成的最后一个任务:它获得模型、图像嵌入和文本查询。它将显示验证集中最相关的图像!是不是很神奇?让我们看看它到底表现如何


```python
def find_matches(model, image_embeddings, query, image_filenames, n=9):
    tokenizer = DistilBertTokenizer.from_pretrained(CFG.text_tokenizer)
    encoded_query = tokenizer([query])
    batch = {
        key: torch.tensor(values).to(CFG.device)
        for key, values in encoded_query.items()
    }
    with torch.no_grad():
        text_features = model.text_encoder(
            input_ids=batch["input_ids"], attention_mask=batch["attention_mask"]
        )
        text_embeddings = model.text_projection(text_features)
    
    image_embeddings_n = F.normalize(image_embeddings, p=2, dim=-1)
    text_embeddings_n = F.normalize(text_embeddings, p=2, dim=-1)
    dot_similarity = text_embeddings_n @ image_embeddings_n.T
    
    # multiplying by 5 to consider that there are 5 captions for a single image
    # so in indices, the first 5 indices point to a single image, the second 5 indices
    # to another one and so on.
    values, indices = torch.topk(dot_similarity.squeeze(0), n * 5)
    matches = [image_filenames[idx] for idx in indices[::5]]
    
    _, axes = plt.subplots(math.sqrt(n), math.sqrt(n), figsize=(10, 10))
    for match, ax in zip(matches, axes.flatten()):
        image = cv2.imread(f"{CFG.image_path}/{match}")
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        ax.imshow(image)
        ax.axis("off")
    
    plt.show()
```

让我们来看一些例子!这个模型实际上是在学习图像和文本之间的关系， 那种感觉简直不可思议。

```python
find_matches(model, 
             image_embeddings,
             query="one dog sitting on the grass",
             image_filenames=valid_df['image'].values,
             n=9)
```

现在我们调用这个函数， 结果如下：

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622454967733.png)


当然这不是完美的，因为一些图片中有两只狗，但是考虑到小的训练集和短的训练时间，我认为这很好。

让我们看看其他的输出。查询被写在每个图像的顶部。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622455045585.png)

它还能计算， 把这个和之前的比较一下。该模型知道“2”的含义，与之前的查询对比， 带来了包含两只狗的图像。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622455169647.png)

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622455176773.png)

对于下面的例子，模型犯了一些错误，但总的来说，它显然对文本和图像都有很好的理解。


![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1622455214917.png)





# Reference
1. [CLIP: Connecting Text and Images](https://openai.com/blog/clip/)
2. [Simple Implementation of OpenAI CLIP model: A Tutorial](https://towardsdatascience.com/simple-implementation-of-openai-clip-model-a-tutorial-ace6ff01d9f2)
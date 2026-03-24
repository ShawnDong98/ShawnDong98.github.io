---
layout:     post
title:      "【d2l】Subword Embedding"
subtitle:   ""
date:       2021-03-30
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - d2l
    - NLP
---


英语单词通常有内部结构和构词方法。例如，我们可以通过拼写推导出dog、dogs和dogcatcher之间的关系。所有这些词都有相同的词根dog，但它们使用不同的后缀来改变单词的意思。例如，“dog” 和 “dogs” 之间的关系就像  “cat”  和 “cats” 之间的关系。“boy” 和  “boyfriend” 的关系就像 “girl” 和  “girlfriend” 的关系一样。这一特点并非英语所独有。在法语和西班牙语中，根据上下文的不同，很多动词可以有40多种不同的形式。在芬兰语中，一个名词可能有15种以上的形式。词法是语言学的一个重要分支，它研究的是词的内部结构和形式。


# fastText

在word2vec中，我们没有直接使用词法信息。在skip-gram模型和 continuous bag-of-words 模型中，我们都使用不同的向量来表示不同形式的词。例如，"dog" 和 "dogs" 用两个不同的向量来表示，而这两个向量之间的关系在模型中并没有直接表示。有鉴于此，fastText [[Bojanowski et al.， 2017]](http://d2l.ai/chapter_references/zreferences.html#bojanowski-grave-joulin-ea-2017)提出了subword embedding 的方法，试图在word2vec的skip-gram模型中引入词法信息。

在fastText中，每个中心词都表示为子词的集合。下面我们以 "where" 为例来理解子词是如何构成的。首先，我们在单词的开头和结尾添加特殊字符 "<" 和 ">" ，以区分作为前缀和后缀的子词。然然后，我们将该单词视为一个字符序列以提取 𝑛-grams。。 例如， 当 $n = 3$， 我们能够得到所有长度为3的子词：

$$\text{"<wh", "whe", "her", "ere", "re>"}$$

以及特殊子词 “\<where\>”

在fastText中， 对于一个词 $w$， 我们记录它所有长度为3到6的子词的集合 以及 空间子词 为 $G_w$。 因此，词典是所有词的子词集合的总和。假设词典中子词 $g$ 的向量是 $z_g$。 然后对于词 $w$， 中心词向量 $u_w$ 在 skip-gram 模型可以被表示为：

$$u_w = \sum_{g \in G_w} z_g$$


fastText过程的其余部分与skip-gram模型一致，因此这里不再重复。如我们所见，与skip-gram模型相比，fastText中的字典更大，从而产生更多的模型参数。另外，一个词的向量需要所有子词向量的总和，这导致了更高的计算复杂度。然而，我们可以通过查找具有相似结构的其他单词，为不常见的复杂单词，甚至词典中不存在的单词，获得更好的向量。


# Byte Pair Encoding

在fastText中，所有提取的子词都必须是指定的长度，比如 3到 6，因此词典大小不能预定义。为了在固定大小的词汇表中允许可变长度的子词，我们可以使用字节对编码(byte pair encoding, BPE)压缩算法来提取子词[[Sennrich et al.， 2015]](http://d2l.ai/chapter_references/zreferences.html#sennrich-haddow-birch-2015)。


字节对编码对训练数据集执行统计分析，以发现单词内的公共符号，例如任意长度的连续字符。从长度为 1 的符号开始，字节对编码迭代地合并最常见的连续符号对，以产生新的更长的符号。注意，为了提高效率，不考虑跨越单词边界的配对。最后，我们可以使用这些符号作为子词来分割单词。字节对编码及其变体已被用于流行的自然语言处理预训练模型的输入表示，如GPT-2 [[Radford et .， 2019]](http://d2l.ai/chapter_references/zreferences.html#radford-wu-child-ea-2019)和RoBERTa [[Liu et .， 2019]](http://d2l.ai/chapter_references/zreferences.html#liu-ott-goyal-ea-2019)。下面，我们将说明字节对编码的工作原理。

```python
import collections

symbols = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '_', '[UNK]']
```

由于我们不考虑跨越单词边界的符号对，我们只需要一个词典 raw_token_freqs， 它在一个数据集中将词与频率(出现的次数)映射起来。 注意特殊符号 '\_' 倍添加到每个词后 以便 我们可以轻易地从一个但词序列 (例如，"a_tall er_man")恢复一个词序列 (例如， "a taller man")。 因为我们从只有单个字符和特殊字符的词典中开始合并过程， 在每个词的每对连续字符之间插入空格 (词典的键值 token_freqs)。 换句话说，空格是单词中符号之间的分隔符。

```python
raw_token_freqs = {'fast_': 4, 'faster_': 3, 'tall_': 5, 'taller_': 4}
token_freqs = {}
for token, freq in raw_token_freqs.items():
    token_freqs[' '.join(list(token))] = raw_token_freqs[token]
token_freqs
```

输出 

```
{'f a s t _': 4, 'f a s t e r _': 3, 't a l l _': 5, 't a l l e r _': 4}
```

我们定义以下 get_max_frequency_pair 函数，它返回一个单词中最频繁的连续符号对，其中单词来自输入字典 token_freqs 的键值。

```python
def get_max_freq_pair(token_freqs):
    pairs = collections.defaultdict(int)
    for token, freq in token_freqs.items():
        #--- 将每个token拆成一个list ---
        symbols = token.split()
        for i in range(len(symbols) - 1):
            #--- key 为 symbols[i], symbols[i + 1] ---
            #--- value 为 symbols[i], symbols[i + 1] 组合 出现的频率 ---
            pairs[symbols[i], symbols[i + 1]] += freq
    return max(pairs, key=pairs.get)
```

作为一种基于连续符号频率的贪婪方法，字节对编码将使用下面的 merge_symbols 函数将最频繁的一对连续符号合并生成新的符号。

```python
def merge_symbols(max_freq_pair, token_freqs, symbols):
    #--- 将两个字符的tuple转成字符串 ---
    #--- 在函数改变list， 会改变原始list ---
    symbols.append(''.join(max_freq_pair))
    new_token_freqs = dict()
    for token, freq in token_freqs.items():
        #--- 将 max_freq_pair 的两个符号合并成一个符号 ---
        new_token = token.replace(' '.join(max_freq_pair),
                                  ''.join(max_freq_pair))
        #--- 将 原两个符号的频率 赋值给 新的 max_freq_pair 的两个符号合并成一个符号---
        new_token_freqs[new_token] = token_freqs[token]

    return new_token_freqs
```


现在我们在字典 token_freqs 的 key 上迭代地执行字节对编码算法。 在第一次迭代中，最常见的连续符号对是't'和'a'，因此字节对编码将它们合并产生一个新的符号'ta'。在第一次迭代中，最常见的连续符号对是't'和'a'，因此字节对编码将它们合并产生一个新的符号'ta'。在第二次迭代中，字节对编码继续合并'ta'和'l'以产生另一个新符号'tal'。


```python
num_merges = 10
for i in range(num_merges):
    max_freq_pair = get_max_freq_pair(token_freqs)
    token_freqs = merge_symbols(max_freq_pair, token_freqs, symbols)
    print(f'merge #{i + 1}:', max_freq_pair)
```

输出：

```
merge #1: ('t', 'a')
merge #2: ('ta', 'l')
merge #3: ('tal', 'l')
merge #4: ('f', 'a')
merge #5: ('fa', 's')
merge #6: ('fas', 't')
merge #7: ('e', 'r')
merge #8: ('er', '_')
merge #9: ('tall', '_')
merge #10: ('fast', '_')
```

经过10次字节对编码的迭代，我们可以看到列表符号现在包含了10多个从其他符号迭代合并而来的符号。

```python
print(symbols)
```

输出：

```
['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '_', '[UNK]', 'ta', 'tal', 'tall', 'fa', 'fas', 'fast', 'er', 'er_', 'tall_', 'fast_']
```


对于同样的数据集 在词典 raw_token_freqs 中的 指定键值， 每个在数据集中的词被分割成 子词 "fast_"， "fast"， "er_", "tall_"， 和 "tall" ， 作为字节对编码算法的结果。 例如， 词 "faster_" 和 "taller_" 分别被分割成 "fast er_" 和 "tall er_"。


```python
print(list(token_freqs.keys()))
```

输出：

```
['fast_', 'fast er_', 'tall_', 'tall er_']
```

注意，字节对编码的结果取决于所使用的数据集。我们也可以使用从一个数据集学习到的子词来分割另一个数据集的词。作为一种贪婪的方法，下面的 segment_BPE 函数试图将单词从输入参数 symbols 中分割成可能最长的子单词。

```python
def segment_BPE(tokens, symbols):
    outputs = []
    for token in tokens:
        start, end = 0, len(token)
        cur_output = []

        while start < len(token) and start < end:
            #--- 如果从start到end都在symbols中。 那么将它加入output ---
            #--- 如果不在symbols中， end指针往前走， 一旦符合start到end都在symbols， 那么start指针指向end， end指针指向最后 ---
            if token[start:end] in symbols:
                cur_output.append(token[start:end])
                start = end
                end = len(token)
            else:
                end -= 1
        #--- 如果end一直走到了start前面， 在输出里面加入 UNK ---
        if start < len(token):
            cur_output.append('[UNK]')
        outputs.append(' '.join(cur_output))
    return outputs
```


接下来， 我们使用从先前的数据集中学习到的列表 symbols 中的子词， 对表示另一个数据集的 tokens 进行分割。


```python
tokens = ['tallest_', 'fatter_']
print(segment_BPE(tokens, symbols))
```

输出：

```
['tall e s t _', 'fa t t er_']
```


# Summary

- FastText提出一种子词嵌入的方法。 基于在word2vec中的skip-gram模型， 它表示 中心词向量 为 词的子词向量的和。
- 子词的嵌入利用了词法的原理，通常可以提高不常见词的表征质量。
- 字节对编码对训练数据集进行统计分析，以发现单词内的公共符号。作为一种贪婪的方法，字节对编码迭代地合并最频繁的连续符号对。


# Exercises

1. 当有很多子词(例如， 6个词 在英语中 可以有 $3 \times 10^8$ 种组合)， 会出现什么问题？ 你能想到什么方法解决他们吗？提示:请参考fastText论文3.2节的结尾部分 [[Bojanowski et al., 2017]](http://d2l.ai/chapter_references/zreferences.html#bojanowski-grave-joulin-ea-2017)。
2. 如何基于 continuous bag-of-words 模型 设计一个 子词嵌入 模型？
3. 为了得到大小为 $m$ 的词典， 当初始 symbol 词典大小为 $n$  我们需要多少合并操作？
4. 如何拓展字节对编码的思想到提取阶段？
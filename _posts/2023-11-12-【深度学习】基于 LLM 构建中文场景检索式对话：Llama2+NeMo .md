---
layout:     post
title:      "【深度学习】基于 LLM 构建中文场景检索式对话：Llama2+NeMo "
subtitle:   ""
date:       2023-11-12
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Geek
---
# 安装 NeMo (mac)

Note: 需要  python 3.10 以上，否则部分代码会报错

```
# [optional] install mecab using Homebrew, to use sacrebleu for NLP collection
# you can install Homebrew here: https://brew.sh
brew install mecab

# [optional] install pynini using Conda, to use text normalization
conda install -c conda-forge pynini

# install Cython manually
pip install cython

# clone the repo and install in development mode
git clone https://github.com/NVIDIA/NeMo
cd NeMo
./reinstall.sh
```

```
 pip install opencc-python-reimplemented==0.1.4
```

# 安装 Llama index

```
pip install llama-index
```

```
pip install accelerate
```

```
pip install -i https://test.pypi.org/simple/ bitsandbytes
```

```
pip install pypdf
```



# Reference
1. [https://github.com/NVIDIA/NeMo](https://github.com/NVIDIA/NeMo)
2. [OSError: dlopen(libopencc.so.1, 6): image not found](https://blog.csdn.net/GodDavide/article/details/94892949)
3. [ImportError: Using `low_cpu_mem_usage=True` or a `device_map` requires Accelerate: `pip install accelerate`](https://stackoverflow.com/questions/76902752/importerror-using-low-cpu-mem-usage-true-or-a-device-map-requires-accelerat)
4. [使用HuggingFace的Accelerate库加载和运行超大模型](https://zhuanlan.zhihu.com/p/605640431?utm_id=0&wd=&eqid=adb7385f00032b0e000000066480ba12)
5. 
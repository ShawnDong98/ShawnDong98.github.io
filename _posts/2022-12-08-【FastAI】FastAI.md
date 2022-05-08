---
layout:     post
title:      "【FastAI】FastAI"
subtitle:   ""
date:       2022-12-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - FastAI
    - 
---



# Reproducible

每次实验结果不一样， 即便使用了 `set_seed(seed, reproducible=True)`。

每次 `fit` 之前都需要

```
seed_everything(seed)
dls.rng.seed(seed)
```

# AUC

```python
from sklearn.metrics import roc_auc_score

def my_auc(inp, targ):
    "Simple wrapper around scikit's roc_auc_score function for regression problems"
    inp,targ = flatten_check(inp,targ)
    return roc_auc_score(targ.cpu().numpy(), inp.cpu().numpy())
```



# Reference
1. https://github.com/fastai/fastai/issues/2832[](https://github.com/fastai/fastai/issues/2832)
2. [https://forums.fast.ai/t/using-auc-as-metric-in-fastai/38917/38](https://forums.fast.ai/t/using-auc-as-metric-in-fastai/38917/38)
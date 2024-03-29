---
layout:     post
title:      "【深度学习】Lazy Configs"
subtitle:   ""
date:       2023-04-22
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    -
---


# Lazy Configs

传统的基于yacs的配置系统提供基本的、标准的功能。然而，它不能为许多新项目提供足够的灵活性。我们开发了一个可替代的、non-intrusive 的配置系统，可以与detectron2或其他任何复杂的项目一起使用。


# Python Syntax

我们的配置对象仍然是字典。我们没有使用Yaml来定义字典，而是直接在Python中创建字典。这为用户提供了以下在Yaml中不存在的功能：

- 使用Python轻松操作字典(添加和删除)。
- 编写简单的算术或调用简单的函数。
- 使用更多数据类型/对象。
- 使用熟悉的Python导入语法导入/编写其他配置文件。

Python配置文件可以这样加载

```python
# config.py:
a = dict(x=1, y=2, z=dict(xx=1))
b = dict(x=3, y=4)

# my_code.py:
from detectron2.config import LazyConfig
cfg = LazyConfig.load("path/to/config.py")  # an omegaconf dictionary
assert cfg.a.z.xx == 1
```

LazyConfig.load 后，`cfg` 将是一个字典，其中包含配置文件全局范围内定义的所有字典。请注意:

- 在加载期间，所有字典都转换为 omegaconf 配置对象。这样就可以访问 omegaconf 的特性，比如它的访问语法和插值。
- `config.py` 中的绝对导入与普通Python中的工作原理相同。
- 相对导入只能从配置文件中导入字典。它们只是 `LazyConfig.load_rel` 的语法糖。它们可以在相对路径上加载Python文件，而不需要 `__init__.py`。

`LazyConfig.save` 可以将配置对象保存为yaml。注意，如果配置文件中出现了不可序列化的对象(例如lambdas)，这并不总是成功的。这取决于用户是否要牺牲储蓄的能力来换取灵活性。


# Recursive Instantiation


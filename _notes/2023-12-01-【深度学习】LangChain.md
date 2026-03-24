---
layout:     post
title:      "【深度学习】LangChain"
subtitle:   ""
date:       2023-12-01
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Get Started

## Introduction

LangChain是一个用于由语言模型驱动的应用程序的框架。它使应用程序能够：

- 具有上下文意识:将语言模型与上下文源(提示指令，少量示例，基于其响应的内容等)联系起来。
- 推理:依靠语言模型进行推理(关于如何根据提供的上下文进行回答，采取什么行动等)。

该框架由几个部分组成。

- LangChain Libraries: Python和JavaScript库。包含无数组件的接口和集成，将这些组件组合成 Chains 和 Agents 的基本运行时，以及 Chains 和 Agents 的现成实现。
- LangChain Templates: 一组用于各种任务的可轻松部署的参考体系结构。
- LangServe: 一个用于将 LangChain chain 部署为REST API的库。
- LangSmith: 一个开发平台，允许您调试、测试、评估和监控构建在任何LLM框架上的 chains，并与 LangChain 无缝集成。


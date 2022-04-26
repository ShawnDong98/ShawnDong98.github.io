---
layout:     post
title:      "【深度学习】How Much Can CLIP Benefit Vision-and-Language Tasks?"
subtitle:   ""
date:       2022-02-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# Abstract

大规模的预训练通常可以产生更好的泛化性能，例如，在大量的图像-文本对上进行训练的CLIP (contrast Language-Image pre-training)，在各种视觉任务中表现出了很强的 zero-shot 能力。

为了进一步研究CLIP带来的优势，我们提出在两种典型的场景下的各种V&L模型中使用CLIP作为视觉编码器：

- 将 CLIP 插入特定任务的微调
-  将 CLIP 与 V&L 预训练任务结合并迁移的下游任务。


结果表明 CLIP 比广泛使用的视觉编码器 BottomUp-TopDown 表现更好。


# Introduction

近期工作(Anderson et al.， 2018a;Jiang等，2020;Zhang等人，2021)观察到视觉表示已经成为V&L模型的性能瓶颈，并强调了学习一种强大的视觉编码器的重要性。

这些高性能视觉编码器使用类别标签(例如，Im-ageNet) (Russakovsky等人，2015年)或边界框(例如，Visual Genome)(Krishna等人，2017年)的人工标注的数据进行训练。

然而，此类检测或图像分类数据的采集成本较高，且视觉表现受到预定义类标签的限制。

因此，需要一种视觉编码器，它可以在更多样化和大规模的数据源上训练，不受一组固定标签的限制，并具有对未见过的目标和概念具有泛化能力。

CLIP在ImageNet分类等基准测试中显示了强大的 zero-shot 能力。我们假设它对于V&L任务也具有很大的潜力。然而，将CLIP作为 zero-shot 模型直接应用于 V * L 任务被证明是困难的(第5节和Kim等人(2021年))，因为许多V&L任务需要复杂的多模态推理。因此，我们建议将CLIP与现有的V&L模型结合起来，用CLIP的视觉编码器取代它们的视觉编码器。

# Conclusion

这篇文章提出利用CLIP作为视觉特征编码器在不同任务上用于不同的 V&L 模型。

用两种方法进行实验： 

1) 直接将 CLIP 插入特定任务的微调
2) 将CLIP 与 VL 预训练结合， 然后在下游任务上微调。

大量的实验表明， CLIP-ViL 和 CLIP-ViL_p 能够取得有竞争力或更好的成绩。


# Bug

## RuntimeError: NCCL Error 1: unhandled cuda error 

使用 pytorch 1.7.1 无此问题



# MMF

提取特征 `no kernel image is available for execution on the device`

将 `maskrcnn/layers/nms.py` 中的：

```python
nms = _C.nms
```

改为 

```python
try:
    import torchvision
    from torchvision.ops import nms
except:
    nms = _C.nms
```

将 `maskrcnn/layers/roi_align.py` 中的：

```python
roi_align = _ROIAlign.apply
```

改为

```python
try:
    import torchvision
    from torchvision.ops import roi_align
except:
    roi_align = _ROIAlign.apply
```


## 安装 MMF

```
conda create -n mmf python=3.7
conda activate mmf
```

```
git clone https://github.com/facebookresearch/mmf.git
cd mmf
pip install --editable .
```

## 配置提取特征环境

```
conda create -n maskrcnn_benchmark
conda activate maskrcnn_benchmark
```

```
# first, make sure that your conda is setup properly with the right environment
# for that, check that `which conda`, `which pip` and `which python` points to the
# right path. From a clean conda env, this is what you need to do

# this installs the right pip and dependencies for the fresh python
conda install ipython

# maskrcnn_benchmark and coco api dependencies
pip install ninja yacs cython matplotlib

conda install pytorch==1.7.1 torchvision==0.8.2 torchaudio==0.7.2 -c pytorch


git clone https://gitlab.com/vedanuj/vqa-maskrcnn-benchmark.git
cd vqa-maskrcnn-benchmark
```


将 `maskrcnn/layers/nms.py` 中的：

```python
nms = _C.nms
```

改为 

```python
try:
    import torchvision
    from torchvision.ops import nms
except:
    nms = _C.nms
```

将 `maskrcnn/layers/roi_align.py` 中的：

```python
roi_align = _ROIAlign.apply
```

改为

```python
try:
    import torchvision
    from torchvision.ops import roi_align
except:
    roi_align = _ROIAlign.apply
```

```
python setup.py build develop
```

## Bug

### pytorch/vision 安装失败

pytorch 1.7.1 安装分支 -b v0.8.2。

### opencv 依赖


```
apt install libgl1-mesa-glx
```

```
apt-get install libglib2.0-dev
```
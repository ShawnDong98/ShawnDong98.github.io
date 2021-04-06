---
layout:     post
title:      "【深度学习】OpenMMLab"
subtitle:   ""
date:       2021-04-05
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - 
---

# MMCV

## 安装


```
pip install mmcv-full==1.3.0 -f https://download.openmmlab.com/mmcv/dist/cu110/torch1.7.0/index.html
```


# MMPose

## 安装

先安装MMCV， 然后再进行下面的安装

```
# install mmpose
git clone git@github.com:open-mmlab/mmpose.git
cd mmpose
pip install -r requirements.txt
python setup.py develop
```

要求numpy版本 1.20.0

## run demo

### Using gt human bounding boxes as input


```
python demo/top_down_img_demo.py \
    configs/top_down/hrnet/coco/hrnet_w48_coco_256x192.py \
    https://download.openmmlab.com/mmpose/top_down/hrnet/hrnet_w48_coco_256x192-b9e0b3ab_20200708.pth \
    --img-root tests/data/coco/ --json-file tests/data/coco/test_coco.json \
    --out-img-root vis_results
```

### Using mmdet for human bounding box detection

```
python demo/top_down_img_demo_with_mmdet.py \
    demo/mmdetection_cfg/faster_rcnn_r50_fpn_1x_coco.py \
    http://download.openmmlab.com/mmdetection/v2.0/faster_rcnn/faster_rcnn_r50_fpn_1x_coco/faster_rcnn_r50_fpn_1x_coco_20200130-047c8118.pth \
    configs/top_down/hrnet/coco/hrnet_w48_coco_256x192.py \
    https://download.openmmlab.com/mmpose/top_down/hrnet/hrnet_w48_coco_256x192-b9e0b3ab_20200708.pth \
    --img-root tests/data/coco/ \
    --img 000000196141.jpg \
    --out-img-root vis_results
```

### 2D Human Pose Top-Down Video Demo


```
python demo/top_down_video_demo_with_mmdet.py \
    demo/mmdetection_cfg/faster_rcnn_r50_fpn_1x_coco.py \
    http://download.openmmlab.com/mmdetection/v2.0/faster_rcnn/faster_rcnn_r50_fpn_1x_coco/faster_rcnn_r50_fpn_1x_coco_20200130-047c8118.pth \
    configs/top_down/hrnet/coco/hrnet_w48_coco_256x192.py \
    https://download.openmmlab.com/mmpose/top_down/hrnet/hrnet_w48_coco_256x192-b9e0b3ab_20200708.pth \
    --video-path demo/demo_video.mp4 \
    --out-video-root vis_results
```

### 2D Human Pose Bottom-Up Image Demo


```
python demo/bottom_up_img_demo.py \
    configs/bottom_up/hrnet/coco/hrnet_w32_coco_512x512.py \
    https://download.openmmlab.com/mmpose/bottom_up/hrnet_w32_coco_512x512-bcb8c247_20200816.pth \
    --img-root tests/data/coco/ --json-file tests/data/coco/test_coco.json \
    --out-img-root vis_results
```

### 2D Human Pose Bottom-Up Video Demo

```
python demo/bottom_up_video_demo.py \
    configs/bottom_up/hrnet/coco/hrnet_w32_coco_512x512.py \
    https://download.openmmlab.com/mmpose/bottom_up/hrnet_w32_coco_512x512-bcb8c247_20200816.pth \
    --video-path demo/demo_video.mp4 \
    --out-video-root vis_results
```


# MMDetection


## 安装
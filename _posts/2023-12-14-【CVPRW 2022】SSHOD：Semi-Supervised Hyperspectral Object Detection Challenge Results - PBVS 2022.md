---
layout:     post
title:      "【CVPRW 2022】SSHOD：Semi-Supervised Hyperspectral Object Detection Challenge Results - PBVS 2022"
subtitle:   ""
date:       2023-12-14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - CVPRW 2022
    - Detection
---

# Abstract

本文总结了2022年感知超越可见光谱（PBVS）研讨会及计算机视觉与模式识别（CVPR）会议上首次半监督式高光谱目标检测（SSHOD）挑战的主要贡献。

SSHOD挑战赛是首个此类高光谱数据集，包含连续拍摄的帧，这些帧是在三天内从大学楼顶观察一个四路交通路口收集的。数据集共包含2890帧，平均分辨率为1600×192像素，具有从400纳米至900纳米的51个高光谱波段。SSHOD挑战赛使用989张图片作为训练集、605张图片作为验证集以及1296张图片作为评估（测试）集。每个集合都在不同的天气条件下获取，以最大化天气条件的变化。为了形成半监督学习任务，数据集的10%提供了标签，挑战赛的评估标准是整体类别集合以及单独移动目标类别（即车辆、公交车和自行车）的平均精度。

该挑战赛共有 38 人注册参加，其中 8 人参与验证阶段，3 人参与测试阶段。本文描述了数据集的获取、挑战赛的制定、提出的方法以及定性和定量的结果。
---
layout:     post
title:      "【深度学习】Auto-Encoding Scene Graphs for Image Captioning"
subtitle:   ""
date:       2022-01-03
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 深度学习
    - Scene Graph
    - Image Captioning
---

# Abstract

# Conclusion


# Details

## Scene Graph 所对应的含义

```
array([[  0.,   9., 408.],
       [  0.,  14., 425.],
       [  0.,  26., 425.],
       [  1.,  14., 408.],
       [  1.,  26., 425.],
       [  2.,  22., 410.],
       [  3.,  13., 429.],
       [  3.,  14., 408.],
       [  5.,   7., 410.],
       [  5.,  26., 408.],
       [  7.,  14., 408.],
       [  7.,  26., 408.],
       [ 13.,  14., 463.],
       [ 14.,  26., 408.],
       [ 18.,  20., 408.]])
```

scene graph matrix： `[0., 9., 408.]` 意思是第 0 个 box 和 第9个 box 之间的关系是 `dict[408]`， 如果 `dict[408]` 的关系是 `on`， 那么它们对应的关系就是 `on`。

attrbute matrix ：`[0, 1, 2]` 意味着 bbox 有三种属性， 分别是 `dict[0]`， `dict[1]` 和 `dict[2]`。


## 如何可视化 Scene Graph


```python
from __future__ import print_function
import argparse
import numpy as np

parser = argparse.ArgumentParser()
# Input paths
parser.add_argument('--id', type=str, default='558579',
                help='id of image')
parser.add_argument('--mode', type=str,  default='sen',
                help='image or sen')

opt, _ = parser.parse_known_args()

if opt.mode == 'sen':
    sg_dict = np.load('../datasets/Caption/SGAE/spice_sg_dict2.npz', allow_pickle=True)['spice_dict'][()]
    sg_dict = sg_dict['ix_to_word']
    folder = '../datasets/Caption/SGAE/coco_spice_sg2/'
else:
    sg_dict = np.load('../datasets/Caption/SGAE/coco_pred_sg_rela.npy', allow_pickle=True)[()]
    sg_dict = sg_dict['i2w']
    folder = '../datasets/Caption/SGAE/coco_img_sg/'

sg_path = folder + opt.id + '.npy'
sg_use = np.load(sg_path, allow_pickle=True, encoding="bytes")[()]
if opt.mode == 'sen':
    rela = sg_use['rela_info'.encode('utf-8')]
    obj_attr = sg_use['obj_info'.encode('utf-8')]
else:
    rela = sg_use['rela_matrix'.encode('utf-8')]
    obj_attr = sg_use['obj_attr'.encode('utf-8')]
N_rela = len(rela)
N_obj = len(obj_attr)

for i in range(N_obj):
    if opt.mode == 'sen':
        print('obj #{0}'.format(i), end = ': ')
        if len(obj_attr[i]) >= 2:
            print ('(', end = '')
            for j in range(len(obj_attr[i])-1):
                print('{0} '.format(sg_dict[obj_attr[i][j + 1]]), end = '')
            print (') ', end = '')
        print(sg_dict[obj_attr[i][0]])
    else:
        print('obj #{0}'.format(i), end = ': ')  # maybe it means 'bounding box' but not 'object'
        N_attr = 3
        for j in range(N_attr - 1):
            print('{0} {1}, '.format(sg_dict[obj_attr[i][j + 4]],\
                sg_dict[obj_attr[i][j+1]]), end = '')
        j = N_attr - 1
        print('{0} {1}'.format(sg_dict[obj_attr[i][j + 4]],\
            sg_dict[obj_attr[i][j+1]]))

for i in range(N_rela):
    obj_idx = 0 if opt.mode == 'sen' else 1
    sbj = sg_dict[ int(obj_attr[int(rela[i][0])][obj_idx]) ]
    obj = sg_dict[ int(obj_attr[int(rela[i][1])][obj_idx]) ]
    rela_name = sg_dict[rela[i][2]]
    print('rel #{3}: {0}-{1}-{2}'.format(sbj,rela_name,obj,i))
```

## 如何处理 sentence scene graph

> 以下内容是如何处理sentence scene graph的：
1).create_coco_sg.py
通过spice中的parser方法来生成coco dataset中每个图片的scene graph
运行的时候要先进代码将coco_use设置为coco_train,然后把self-critical.pytorch/coco-caption/pycocoevalcap/spice/中的sg.json保存为spice_sg_train.json，然后把这个文件放到/data中去，同理把coco_use设置为coco_val，然后把生成的sg.json保存为spice_sg_val.json。
>
> 2).process_spice_sg.py
将spice_sg_val.json和spice_sg_train.json处理为按照image_id.npy形式保存在coco_spice_sg中。具体格式为：
ssg['obj_info']:list,每一个list都代表着一个object以及其对应的attribute，
 第一个元素是object name在dict中的index，后面的元素都是
 attribute对应dict中的index。
ssg['rela_info']:numpy数组，每一行3个元素，分别为[sbj_id,obj_id,relation_id]
 其中的sbj_id和obj_id对应于ssg['obj_info']中的obj list的index，
 relation_id为其在dict中的index。
还有处理完的dict可以保存为spice_sg_dict.npz.
我先生成了一个spice的字典，其中把很多词语正则化了一下，前9487个词和原始的词典一致，后面的为增补的词典。
>
> 3).process_sg_extend.py
生成适合attention extend model的数据,直接从之前的生成的数据中来改。
先生成一个字典，其中前9487个词和原始词典一致，然后加入sentence scene graph的字典，以及image scene graph的字典。
然后把image scene graph的数据改了就好了。也就是只改变cocobu_rela中的数据，然后把改变完的数据保存到cocobu_sg_img中去。
而对于sentence scene graph，其还是保存在coco_spice_sg中。
新的字典保存在sg_dict_extend.npz中。
>
> 对于coco_spice_sg2，其实就是字典更大了，比如coco_spice_sg中对应的字典是caption生成的字典时把小于等于5个词的词给删除了，然而coco_spice_sg2中对应的字典是caption生成的字典时把小于等于4个词的词给删除了.不同的字典对最后影响不是那么大。

## 生成 sentence scene graph

需要把 `coco_caption/pycocoevalcap/spice` 文件夹下的 `spice-1.0.jar`  替换为主文件夹下的 `spice-1.0.jar`。

# Reference
1. [How do you generate coco_pred_sg.zip and coco_spice_sg2.zip, and what does the value in those npy files means? #7](https://github.com/yangxuntu/SGAE/issues/7)
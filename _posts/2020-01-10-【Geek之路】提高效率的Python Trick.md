---
layout:     post
title:      "【Geek之路】提高效率的Python Trick"
subtitle:   ""
date:       2020-01-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - Python
    - 
---

## 将20W张图片分别存放在100个文件夹中

```python
import os
import shutil
import traceback

def move_file(src_path, dst_path, file):
    print('from : ',src_path)
    print('to : ',dst_path)
    try:
        # cmd = 'chmod -R +x ' + src_path
        # os.popen(cmd)
        f_src = os.path.join(src_path, file)
        if not os.path.exists(dst_path):
            os.mkdir(dst_path)
        f_dst = os.path.join(dst_path, file)
        shutil.move(f_src, f_dst)
    except Exception as e:
        print('move_file ERROR: ',e)
	
i = 0
j = 0
for i in range(200000):
    move_file(("./data/img_align_celeba/"),\
                  ("./data/"+str(j)+"/"), (str(i).rjust(6,'0')+".jpg"))
    if (((i+1) % 2000) == 0):
        j = j + 1
```


## Reference
1. [python 字符串补全填充固定长度（补0）的三种方法](https://blog.csdn.net/weixin_42317507/article/details/93411132)
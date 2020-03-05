---
layout:     post
title:      "【Geek之路】《剑指offer》思路及代码合集"
subtitle:   ""
date:       2020-02-24
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 
    - 
---

# 二维数组中的查找

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582537671052.png)

看到这个题目的第一想法，就是二分查找。

然而在本地调试通过后在牛客上不通过

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582537767677.png)

百度了一下段错误的定义
所谓的段错误 就是指访问的内存超出了系统所给这个程序的内存空间
大概是超出了程序的内存空间大小。这道题要求内存空间为32768K

二分查找的方法：

```c++
class Solution {
public:
    bool Find(int target, vector<vector<int> > array) {
        for(vector<vector<int> >::iterator it=array.begin();it<array.end();++it)
        {
            if(Binary_Search(target, *it)) return true;
        }
        return false;
    }
    bool Binary_Search(int target, vector<int> a){
        int l = a.front(), r = a.back();
        int mid;
        while(l<=r){
            mid = l + (r - l) / 2;
            if(a[mid] == target) return true;
            if(a[mid] < target){
                l = mid + 1;
            }else{
                r = mid - 1;
            }
        }
        return false;
    }
};
```

然后使用暴力遍历查找的方法， AC：

```c++
class Solution_1 {
public:
    bool Find(int target, vector<vector<int> > array) {
        for(vector<vector<int> >::iterator it=array.begin();it<array.end();++it)
        {
            for(int i=0; i<(*it).size(); ++i)
            {
                if(target == (*it)[i]) return true;
            }
        }
        return false;
    }
};
```

# Reference
1. [剑指offer(1)二维数组中的查找](https://blog.csdn.net/weixin_43624053/article/details/84204474)
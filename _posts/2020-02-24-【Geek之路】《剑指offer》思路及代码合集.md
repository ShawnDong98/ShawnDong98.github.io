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

# 替换空格

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582632770744.png)

算法分为两部分：
- 检测空格，将空格后的字符后移两位
- 将空格及其后两个的位置替换

一开始做考虑数组的大小问题

遇到了realloc和静态数组的问题。

新分配在堆内的内存,数组定义之后不能改变大小，realloc(p,sizeof(p)+sizeof(int))函数不会改变p的值，新的内存地址是函数的返回值。

realloc只能给动态数组重新分配大小。

后来发现题目并不需要考虑数组大小的问题， 很容易就解决了

代码：

```c++
class Solution {
public:
	void replaceSpace(char *str,int length) {
	    for(int i=0; i<length; ++i){
            if(str[i] == ' '){
                houyi(str, length, i);
                length += 2;
                str[i] = '%';
                str[i+1] = '2';
                str[i+2] = '0';
            }
	    }

	}
	void houyi(char *str, int length, int pos){
	    char *p1, *p2;
	    length += 2;
	    p1 = str + length - 1;
	    p2 = str + length - 3;
	    for(int i=pos+3; i<length; ++i){
            *p1 = *p2;
            --p2;
            --p1;
	    }

	}
};
```

# 从尾到头打印链表

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582720386152.png)

这道题很简单，将单链表头插法逆序，然后顺序将val存入vector即可。

一开始不知道单链表是否带有头结点， 经测试，单链表为不带头结点的单链表。

这道题解决长久以来多级指针， 以及指针的引用上的困惑。

长久以来，我对指针的理解都是 多一个 * 就是深一级的地址。

我都是将 " \*变量名称" 理解为一个整体， 事实上这样理解很容易把自己整懵。

如果将 "数据类型*" 理解为一个整体，这就是一个地址， 每多一个 \*， 那么地址就深一级， 而变量就是指代这个深一级的地址， 这样就会好理解很多。

将这个多级指针视作一个变量后， 就很容易理解指针的引用了。

代码：

```c++
class Solution {
public:
    // 经测试，链表为不带头节点的单链表
    // 将链表使用头插法逆置，再将val顺序存入vector
    vector<int> printListFromTailToHead(ListNode* head) {

        vector<int> buffer;
        if(!head) return buffer;

        ListNode* H = (ListNode*)malloc(sizeof(ListNode));
        H->next = head;
        ListNode* p = H->next;
        ListNode* r;

        H->next = NULL;
        while(p){
            r = p->next;
            p->next = H->next;
            H->next = p;
            p = r;

        }
        p = H->next;
        while(p){
            buffer.push_back(p->val);
            p = p->next;
        }
        delete H;
        return buffer;

    }

    void CreateLinkList(ListNode* &L, int n){
        ListNode* H = (ListNode*)malloc(sizeof(ListNode));
        H->next = NULL;
        ListNode *p;
        for(int i=0; i<n; ++i){
            p = (ListNode*)malloc(sizeof(ListNode));
            p->next = H->next;
            p->val = i;
            H->next = p;
        }
        L = H->next;
    }

    void printList(ListNode* &L){
        ListNode *p = L;
        while(p!=NULL){
            cout << p->val << ' ';
            p = p->next;
        }
        cout << endl;
    }
};
```

# 重建二叉树

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582898688205.png)

这个题想起来很容易，尤其是手动模拟，简直是送分题。

但是如果要用代码实现，就需要编程的思维，每一步都要非常清楚，写起来还是有点麻烦的。

通过这道题，理解了以下vector赋值的方式，原理上是如何赋值的

> // 这种方式得到的是两个地址之间截到的的变量
>    vector\<int\> test = vector\<int\>(vin.begin(), vin.begin()+1);

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582899219223.png)

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582899556431.png)

这是一个手动模拟的过程，每一步理解清楚，非常必要。

代码

```c++
class Solution {
public:
    int find(vector<int> vec, int target){
        for(int i=0; i<vec.size(); ++i){
            if(vec[i] == target) return i;
        }
        return -1;
    }

    TreeNode* reConstructBinaryTree(vector<int> pre,vector<int> vin) {
        if(pre.size()==0||vin.size()==0){
            return NULL;
        }
        TreeNode* p = (TreeNode*)malloc(sizeof(TreeNode));
        p->val = pre[0];
        int pos = find(vin, pre[0]);
        if(pre.begin() > pre.begin() + pos){
            p->left = NULL;
        }else{

            p->left = reConstructBinaryTree(vector<int>(pre.begin()+1, pre.begin()+pos+1),
                                            vector<int>(vin.begin(), vin.begin()+pos));
        }
        if(pre.begin() + pos + 1 > pre.end()){
            p->right = NULL;
        }else{
            p->right = reConstructBinaryTree(vector<int>(pre.begin()+pos+1, pre.end()),
                                             vector<int>(vin.begin()+pos+1, vin.end()));
        }
        return p;
    }


    void printTree(TreeNode* root){
        if(root==NULL) return;
        cout << root->val << ' ';
        printTree(root->left);
        printTree(root->right);
    }
};

```


# Reference
1. [剑指offer(1)二维数组中的查找](https://blog.csdn.net/weixin_43624053/article/details/84204474)
2. [静态数组不能扩容（realloc），动态的才可以（如何创建动态数组）](https://blog.csdn.net/WXXGoodJob/article/details/74296420)
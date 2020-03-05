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

# 用两个栈实现队列

> 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。


思路很简单，一个栈stack1用来push，另一个栈stack2用来pop。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582965285485.png)

代码：

```c++
class Solution
{
public:
    void push(int node) {
        while(!stack2.empty()){
            stack1.push(stack2.top());
            stack2.pop();
        }
        stack1.push(node);
    }

    int pop() {
        while(!stack1.empty()){
            stack2.push(stack1.top());
            stack1.pop();
        }
        int node = stack2.top();
        stack2.pop();
        return node;
    }

private:
    stack<int> stack1;
    stack<int> stack2;
};
```

# 旋转数组的最小数字

> 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
> 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
> 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。
> NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

很简单的题目，找到最小的元素的位置，然后对相应元素进行搬移，输出搬移后的数组的第一个元素即可。

代码：

```c++
class Solution {
public:
    int minNumberInRotateArray(vector<int> rotateArray) {
        if(rotateArray.size() == 0) return 0;
        int m = find_min(rotateArray);
        for(int i=0; i<m; ++i){
            rotateArray.push_back(rotateArray[i]);
        }
        rotateArray.erase(rotateArray.begin(), rotateArray.begin()+m);
        return rotateArray[0];

    }
    int find_min(vector<int> rotateArray){
        int m = 0;
        for(int i=0; i<rotateArray.size();++i){
            if(rotateArray[i]<rotateArray[m]){
                m = i;
            }
        }
        return m;
    }
    void print(vector<int> A){
        for(vector<int>::iterator it=A.begin();it!=A.end();++it){
            cout << *it << ' ';
        }
        cout << endl;
    }
};

```

# 斐波那契数列

大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
n<=39


斐波那契数列：
F(1)=1，F(2)=1,
F(n)=F(n - 1)+F(n - 2)（n ≥ 3，n ∈ N*）


斐波那契数列第一想法当然是递归，于是写递归算法， 内存超限。

于是使用迭代方法， AC。

代码：

```c++
class Solution {
public:
    int Fibonacci(int n){
        if(n==0) return 0;
        int F, F_pre, F_pre_pre;
        F_pre = 1;
        F_pre_pre = 0;
        F = F_pre + F_pre_pre;
        for(int i=2; i<=n; ++i){
            F = F_pre + F_pre_pre;
            F_pre_pre = F_pre;
            F_pre = F;
        }
        return F;
    }

    // 递归， 超出内存限制
    int Fibonacci_1(int n) {
        if(n==1 || n == 2){
            return 1;
        }
        return Fibonacci(n-1) + Fibonacci(n-2);

    }
};
```

# 跳台阶以及变态跳台阶

## 跳台阶

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

一开始还是想着递归，然后时间超限， 放弃。

后来没什么思路， 百度得到结果， 原来思路和斐波那契数列是一样的。

另外，上楼梯比下楼梯想起来要容易一些。

代码：

```c++
class Solution {
public:
    int jumpFloor(int number){
        if(number==2) return 2;
        if(number==1) return 1;
        int F, F_pre, F_pre_pre;
        F_pre = 2;
        F_pre_pre = 1;
        for(int i=3; i<=number; ++i){
            F = F_pre + F_pre_pre;
            F_pre_pre =F_pre;
            F_pre = F;
        }
        return F;
    }
    // 时间超限
    int jumpFloor_1(int number) {
        if(number==0) return 1;
        if(number<0) return 0;
        return jumpFloor(number-1) + jumpFloor(number-2);
    }
};
```

## 变态跳台阶

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1583140936014.png)

 我们用f(n)来表示跳n级台阶的跳法数量
 
  f(1)=1表示跳1级台阶的跳法数量;
  
   f(2)=2表示跳2级台阶的跳法数量;
   
   f(3)=f(2)+f(1)+1  我们可以递推出  f(n)=f(n-1)+f(n-2)+ *** +f(1)+1 ,
   
   而f(n-1)=f(n-2)+ *** +f(1)+1。
   
   将两式相减可以求出递推公式，也即是 f(n)-f(n-1)=f(n-1)，即f(n)=2\*f(n-1); 

代码：

```c++
class Solution {
public:
    int jumpFloorII(int number) {
        if(number == 1) return 1;
        return 2*jumpFloorII(number-1);
    }
};
```

# Reference
1. [剑指offer(1)二维数组中的查找](https://blog.csdn.net/weixin_43624053/article/details/84204474)
2. [静态数组不能扩容（realloc），动态的才可以（如何创建动态数组）](https://blog.csdn.net/WXXGoodJob/article/details/74296420)
3. [剑指Offer | 跳台阶](https://blog.csdn.net/mengmengdastyle/article/details/80304755?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task)
4. [变态跳台阶（剑指offer第九题）](https://blog.csdn.net/alan_gaohaodong/article/details/80987412)
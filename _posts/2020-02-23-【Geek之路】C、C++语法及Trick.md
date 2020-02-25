---
layout:     post
title:      "【Geek之路】C、C++语法及Trick"
subtitle:   ""
date:       2020-02-23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     true
tags:
    - C/C++
    - 
---

# C/C++语法

## Vector用法

### vector 说明

- vector是向量类型，可以容纳许多类型的数据，因此也被称为容器
- (可以理解为动态数组，是封装好了的类）
- 进行vector操作前应添加头文件#include \<vector\>

### vector初始化

方式1：

```c++
//定义具有10个整型元素的向量
//（尖括号为元素类型名，它可以是任何合法的数据类型）
//不具有初值，其值不确定
vector<int>a(10);
```

方式2：

```c++
//定义具有10个整型元素的向量，且给出的每个元素初值为1
vector<int>a(10,1);
```

方式3：

```c++
//用向量b给向量a赋值，a的值完全等价于b的值
vector<int>a(b);
```

方式4：

```c++
//将向量b中从0-2（共三个）的元素赋值给a，a的类型为int型
vector<int>a(b.begin(),b.begin+3);
```

方式5：

```c++
 //从数组中获得初值
int b[7]={1,2,3,4,5,6,7};
vector<int> a(b,b+7）;
```

### vector对象的常用内置函数使用（举例说明）

```c++
#include<vector>
vector<int> a,b;
//b为向量，将b的0-2个元素赋值给向量a
a.assign(b.begin(),b.begin()+3);
//a含有4个值为2的元素
a.assign(4,2);
//返回a的最后一个元素
a.back();
//返回a的第一个元素
a.front();
//返回a的第i元素,当且仅当a存在
a[i];
//清空a中的元素
a.clear();
//判断a是否为空，空则返回true，非空则返回false
a.empty();
//删除a向量的最后一个元素
a.pop_back();
//删除a中第一个（从第0个算起）到第二个元素
//也就是说删除的元素从a.begin()+1算起（包括它）一直到a.begin()+3（不包括它）结束
a.erase(a.begin()+1,a.begin()+3);
//在a的最后一个向量后插入一个元素，其值为5
a.push_back(5);
//在a的第一个元素（从第0个算起）位置插入数值5,
a.insert(a.begin()+1,5);
//在a的第一个元素（从第0个算起）位置插入3个数，其值都为5
a.insert(a.begin()+1,3,5);
//b为数组，在a的第一个元素（从第0个元素算起）的位置插入b的第三个元素到第5个元素（不包括b+6）
a.insert(a.begin()+1,b+3,b+6);
//返回a中元素的个数
a.size();
//返回a在内存中总共可以容纳的元素个数
a.capacity();
//将a的现有元素个数调整至10个，多则删，少则补，其值随机
a.resize(10);
//将a的现有元素个数调整至10个，多则删，少则补，其值为2
a.resize(10,2);
//将a的容量扩充至100，
a.reserve(100);
//b为向量，将a中的元素和b中的元素整体交换
a.swap(b);
//b为向量，向量的比较操作还有 != >= > <= <
a==b;
```

### 顺序访问vector的几种方式，举例说明

**对向量a添加元素的几种方式**

1. 向向量a中添加元素

```c++
vector<int>a;
for(int i=0;i<10;++i){a.push_back(i);}
```

2. 从数组中选择元素向向量中添加

```c++
int a[6]={1,2,3,4,5,6};
vector<int> b;
for(int i=0;i<=4;++i){b.push_back(a[i]);}
```
3.从现有向量中选择元素向向量中添加

```c++
int a[6]={1,2,3,4,5,6};
vector<int>b;
vector<int>c(a,a+4);
for(vector<int>::iterator it=c.begin();it<c.end();++it)
{
	b.push_back(*it);
}
```

4.从文件中读取元素向向量中添加

```c++
ifstream in("data.txt");
vector<int>a;
for(int i;in>>i){a.push_back(i);}
```

5. 常见错误赋值方式

```c++
vector<int>a;
for(int i=0;i<10;++i){a[i]=i;}//下标只能用来获取已经存在的元素
```
**从向量中读取元素**

1.通过下标方式获取

```c++
int a[6]={1,2,3,4,5,6};
vector<int>b(a,a+4);
for(int i=0;i<=b.size()-1;++i){cout<<b[i]<<endl;}
```
2. 通过迭代器方式读取

```c++
int a[6]={1,2,3,4,5,6};
 vector<int>b(a,a+4);
 for(vector<int>::iterator it=b.begin();it!=b.end();it++){cout<<*it<<"  ";}
 
```

### 几个常用的算法

```c++
#include<algorithm>
 //对a中的从a.begin()（包括它）到a.end()（不包括它）的元素进行从小到大排列
 sort(a.begin(),a.end());
 //对a中的从a.begin()（包括它）到a.end()（不包括它）的元素倒置，
 //但不排列，如a中元素为1,3,2,4,倒置后为4,2,3,1
 reverse(a.begin(),a.end());
  //把a中的从a.begin()（包括它）到a.end()（不包括它）的元素复制到b中，
  //从b.begin()+1的位置（包括它）开始复制，覆盖掉原有元素
 copy(a.begin(),a.end(),b.begin()+1);
 //在a中的从a.begin()（包括它）到a.end()（不包括它）的元素中查找10，
 //若存在返回其在向量中的位置
  find(a.begin(),a.end(),10);
```

### vector的嵌套使用

**1. 定义**

> vector\<vector\<int\>\> M;

**2. 添加元素**

这里是vector的嵌套使用，本质是vector元素里的每个元素也是vector类型，所以抓住本质来添加元素就比较容易理解。

我们假设外层的vector的对象为M，为外层vector对象，则M中的每一个元素也是vector类型，记为N1，N2，N3……，为内层对象

则，我们得先形成一个个的N1，N2等的vector对象，然后再将这些vector对象添加进入外层vector对象M中

这样就比较容易理解向vector\<vector\<int\>\>对象添加元素的原理了，实现如下：

如M=[[1 2 3], [4 5 6]]，添加方式如下：

```c++

vector<vector<int>> M;  //外层vector对象M
vector<int> N;   //内层vector对象
 
N.push_back(1);
N.push_back(2);
N.push_back(3);  //已经形成第一个内层vector对象N1
 
M.push_back(N);  //将形第一个内层vector对象N添加到外层vector对象M中
N.clear();       //清楚N中的元素，可以继续存放后续vector对象
 
N.push_back(4);
N.push_back(5);
N.push_back(6);  //已经形成第一个内层vector对象N2
 
M.push_back(N);  //将形第一个内层vector对象N添加到外层vector对象M中
N.clear();       //清楚N中的元素，可以继续存放后续vector对象
```

**3. 访问元素**

访问元素和二维数组相同，M[0][0]，访问M中第一个vector对象的第一个元素，值为1；

**4、长度**

（1）M中vector的个数：M.size();

（2）M中第i个vector元素的长度：M[i].size();


## string用法

### 初始化

初始化有两种方式，其中使用等号的是拷贝初始化，不使用等号的是直接初始化。

```c++
string str1 = "hello world";      // str1 = "hello world"
string str2("hello world");       // str2 = "hello world"
string str3 = str1;               // str3 = "hello world"
string str4(str2);                // str4 = "hello world"
string str5(10,'h');              // str5 = "hhhhhhhhhh"
string str6 = string(10,'h');     // str6 = "hhhhhhhhhh"
string str7(str1,6);              // str7 = "world"     从字符串str1第6个字符开始到结束，拷贝到str7中
string str8 = string(str1,6);     // str8 = "world"
string str9(str1,0,5);            // str9 = "hello"     从字符串str1第0个字符开始，拷贝5个字符到str9中
string str10 = string(str1,0,5);  // str10 = "hello"
char c[] = "hello world";
string str11(c,5);                // str11 = "hello"    将字符数组c的前5个字符拷贝到str11中
string str12 = string(c,5);       // str12 = "hello"
```

值得一提的是， 如果：

```c++
string str13 = string("hello world",5)      
// str13 = "hello"  而非  " world"
```

此时，"hello world"应看作字符数组(参见str11)，而非string对象(参见str7)
为了避免发生意外，在字符串插入、替换、添加、赋值、比较中去除了关于后一种的相关操作(参见后文)。


### 获取长度（length、size）

length()函数与size()函数均可获取字符串长度。

```c++
string str = "hello world";
cout << str.length() << str.size();     // 11   11
```

当str.length()与其他类型比较时，建议先强制转换为该类型，否则会意想之外的错误。
比如：-1 > str.length() 返回 true。

### 插入（insert）

基本情况为以下四种，其余变形函数自行摸索即可

```c++
string str = "hello world";
string str2 = "hard ";
string str3 = "it is so happy wow";

//s.insert(pos,n,ch)        在字符串s的pos位置上面插入n个字符ch
str.insert(6,4,'z');        // str = "hello zzzzworld"

//s.insert(pos,str)         在字符串s的pos位置插入字符串str
str.insert(6,str2);         // str = "hello hard world"

//s.insert(pos,str,a,n)     在字符串s的pos位置插入字符串str中位置a到后面的n个字符
str.insert(6,str3,6,9);     // str = "hello so happy world"

//s.insert(pos,cstr,n)      在字符串s的pos位置插入字符数组cstr从开始到后面的n个字符
//此处不可将"it is so happy wow"替换为str3
str.insert(6,"it is so happy wow",6);       // str = "hello it is world"
```

### 替换（replace）

替换与插入对应，对比理解更为简单

```c++
string str = "hello world";
string str2 = "hard ";
string str3 = "it is so happy wow";

//s.replace(p0,n0,n,ch)           删除p0开始的n0个字符，然后在p0处插入n个字符ch
str.replace(0,6,4,'z');           // str = "zzzzworld"

//s.replace(p0,n0,str)            删除从p0开始的n0个字符，然后在p0处插入字符串str
str.replace(0,6,str2);            // str = "hard world"

//s.replace(p0,n0,str,pos,n)      删除p0开始的n0个字符，然后在p0处插入字符串str中从pos开始的n个字符
str.replace(0,6,str3,6,9);        // str = "so happy world"

//s.replace(p0,n0,cstr,n)         删除p0开始的n0个字符，然后在p0处插入字符数组cstr的前n个字符
//此处不可将"it is so happy wow"替换为str3
str.replace(0,6,"it is so happy wow",6);        // str = "it is world"
```

### 添加（append）

append函数用在字符串的末尾添加字符和字符串。（同样与插入、替换对应理解）

```c++
string str = "hello world";
string str2 = "hard ";
string str3 = "it is so happy wow";

//s.append(n,ch)           在当前字符串结尾添加n个字符c
str.append(4,'z');         // str = "hello worldzzzz"

//s.append(str)            把字符串str连接到当前字符串的结尾
str.append(str2);          // str = "hello worldhard "

//s.append(str,pos,n)      把字符串str中从pos开始的n个字符连接到当前字符串的结尾
str.append(str3,6,9);      // str = "hello worldso happy "

//append(cstr,int n)       把字符数组cstr的前n个字符连接到当前字符串结尾
//此处不可将"it is so happy wow"替换为str3
str.append("it is so happy wow",6);      // str = "hello worldit is "
```

### 赋值（assign）

```c++
string str;
string temp = "welcome to my blog";

//s.assign(n,ch)             将n个ch字符赋值给字符串s
str.assign(10,'h');          // str = "hhhhhhhhhh"

//s.assign(str)              将字符串str赋值给字符串s
str.assign(temp);            // str = "welcome to my blog"

//s.assign(str,pos,n)        将字符串str从pos开始的n个字符赋值给字符串s
str.assign(temp,3,7);        // str = "come to"

//s.assaign(cstr,n)          将字符数组cstr的前n个字符赋值给字符串s
//此处不可将"it is so happy wow"替换为temp
str.assign("welcome to my blog",7);     //welcome
```

### 删除（erase）

```c++
string str = "welcome to my blog";

//s.erase(pos,n)           把字符串s从pos开始的n个字符删除
str.erase(11,3);           // str = "welcome to blog"

```

### 剪切（substr）

```c++
string str = "The apple thinks apple is delicious";

//s.substr(pos,n)                      得到字符串s位置为pos后面的n个字符组成的串
string s1 = str.substr(4,5);           // s1 = "apple"

//s.substr(pos)                        得到字符串s从pos到结尾的串
string s2 = str.substr(17);            // s2 = "apple is delicious"
```

### 比较（compare）

两个字符串自左向右逐个字符相比（按ASCII值大小相比较），直到出现不同的字符或遇’\0’为止。
若是遇到‘\0’结束比较，则长的子串大于短的子串，如：“9856” > “985”。
如果两个字符串相等，那么返回0，调用对象大于参数返回1，小于返回-1。

```c++
string str1 = "small leaf";
string str2 = "big leaf";

//s.compare(str)                     比较当前字符串s和str的大小
cout << str1.compare(str2);                   // 1

//s.compare(pos,n,str)               比较当前字符串s从pos开始的n个字符与str的大小
cout << str1.compare(2,7,str2);               // -1

//s.compare(pos,n0,str,pos2,n)       比较当前字符串s从pos开始的n0个字符与str中pos2开始的n个字符组成的字符串的大小
cout << str1.compare(6,4,str2,4,4);           // 0

//s.compare(pos,n0,cstr,n)           比较当前字符串s从pos开始的n0个字符与字符数组cstr中前n个字符的大小
//此处不可将"big leaf"替换为str2
cout << str1.compare(6,4,"big leaf",4);       // 1
```

### 交换（swap）

```c++
string str1 = "small leaf";
string str2 = "big leaf";

//或者str1.swap(str2)  ,输出结果相同
swap(str1,str2);        // str1 = "big leaf"     str2 = "small leaf"
swap(str1[0],str1[1]);  // str1 = "ibg leaf"
```
### 反转（reverse）

反转字符串。

```c++
string str = "abcdefghijklmn";
reverse(str.begin(),str.end());       // str = "nmlkjihgfedcba"

```

### 数值转化（sto*）

只有将p设置为0或nullptr才运行成功

```c++
to_string(val)	      //把val转换成string
stoi(s,p,b)	          //把字符串s从p开始转换成b进制的int
stol(s,p,b)	          //把字符串s从p开始转换成b进制的long
stoul(s,p,b)	      //把字符串s从p开始转换成b进制的unsigned long
stoll(s,p,b)	      //把字符串s从p开始转换成b进制的long long
stoull(s,p,b)	      //把字符串s从p开始转换成b进制的unsigned long long
stof(s,p)	          //把字符串s从p开始转换成float
stod(s,p)	          //把字符串s从p开始转换成double
stold(s,p)	          //把字符串s从p开始转换成long double

```

### 迭代器（iterator）

```c++
string str = "abcdefghijklmn";

//s.begin()      返回字符串s第一个字符的位置
char a = *(str.begin());           // a

//s.end()        返回字符串s最后一个字符串的后一个位置
char b = *(str.end()-1);           // n

//s.rbegin()     返回字符串s最后一个字符的位置
char c = *(str.rbegin());          // n

//s.rend()       返回字符串s第一个字符的前一个位置
char d = *(str.rend()-1);          // a

```

### 查找（find）

1. find函数

```c++
string str = "The apple thinks apple is delicious";     //长度34
string key = "apple";

//s.find(str)            查找字符串str在当前字符串s中第一次出现的位置
int pos1 = str.find(key);                  // 4

//s.find(str,pos)        查找字符串str在当前字符串s的[pos,end]中第一次出现的位置
int pos2 = str.find(key, 10);              // 17

//s.find(cstr,pos,n)     查找字符数组cstr前n的字符在当前字符串s的[pos,end]中第一次出现的位置
//此处不可将"delete"替换为str2（如果定义str2 = "delete"）
int pos3 = str.find("delete", 0, 2);       // 26

//s.find(ch,pos)         查找字符ch在当前字符串s的[pos,end]中第一次出现的位置
int pos4 = str.find('s', 0);               // 15
```

2. rfind函数

```c++
//s.rfind(str)            查找字符串str在当前字符串s中最后一次出现的位置
int pos5 = str.rfind(key);                 // 17

//s.rfind(str,pos)        查找字符串str在当前字符串s的[0,pos+str.length()-1]中最后一次出现的位置
int pos6 = str.rfind(key, 16);             // 4

//s.rfind(cstr,pos,n)     查找字符数组cstr前n的字符在当前字符串s的[0,pos+n-1]中最后一次出现的位置
//此处不可将"apple"替换为key
int pos7 = str.rfind("apple", 40, 2);      // 17

//s.rfind(ch.pos)         查找字符ch在当前字符串s的[0,pos]中最后一次出现的位置
int pos8 = str.rfind('s', 30);             // 24

```

3. find_xxx_of函数

```c++
string str = "The early birds catch the warm";            //长度30
string key = "aeiou";
```

find_first_of

```c++
// s.find_first_of(str)                查找字符串str中的任意字符在当前字符串s中第一次出现的位置
int pos1 = str.find_first_of(key);                // 2

//s.find_first_of(str,pos)             查找字符串str中的任意字符在当前字符串s的[pos,end]中第一次出现的位置
int pos2 = str.find_first_of(key, 10);            // 11

//s.find_first_of(cstr,pos,n)          查找字符串str前n个任意字符在当前字符串s的[pos,end]中第一次出现的位置
//此处不可将"aeiou"替换为key
int pos3 = str.find_first_of("aeiou", 7, 2);      // 17

//s.find_first_of(ch,pos)              查找字符ch在当前字符串s的[pos,end]中第一次出现的位置
int pos4 = str.find_first_of('r', 0);             // 6
```

find_first_not_of

```c++
//s.find_first_not_of(str)             查找字符串str之外的任意字符在当前字符串s中第一次出现的位置
int pos1 = str.find_first_not_of(key);                 // 0

//s.find_first_not_of(str,pos)         查找字符串str之外的任意字符在当前字符串s的[pos,end]中第一次出现的位置
int pos2 = str.find_first_not_of(key, 10);             // 10

//s.find_first_not_of(cstr,pos,n)      查找字符串str前n个之外任意字符在当前字符串s的[pos,end]中第一次出现的位置
//此处不可将"aeiou"替换为key
int pos3 = str.find_first_not_of("aeiou", 7, 2);       // 7

//s.find_first_not_of(str)             查找字符ch之外任意字符在当前字符串s的[pos,end]中第一次出现的位置
int pos4 = str.find_first_not_of('r', 0);              // 0

```

find_last_of

```c++
//s.find_last_of(str)                 查找字符串str中的任意字符在当前字符串s中最后一次出现的位置
int pos1 = str.find_last_of(key);                      // 27

//s.find_last_of(str,pos)             查找字符串str中的任意字符在当前字符串s的[0,pos]中最后一次出现的位置
int pos2 = str.find_last_of(key, 15);                  // 11

//s.find_last_of(cstr,pos,n)          查找字符串str前n个任意字符在当前字符串s的[0,pos]中最后一次出现的位置
//此处不可将"aeiou"替换为key
int pos3 = str.find_last_of("aeiou", 20, 2);           // 17

//s.find_last_of(str)                 查找字符ch在当前字符串s的[0，pos]中最后一次出现的位置
int pos4 = str.find_last_of('r', 30);                  // 28
```

find_last_not_of

```c++
//s.find_last_not_of(str)             查找字符串str之外的任意字符在当前字符串s中最后一次出现的位置
int pos1 = str.find_last_not_of(key);                  // 29

//s.find_last_not_of(str,pos)         查找字符串str之外的任意字符在当前字符串s的[0,pos]中最后一次出现的位置
int pos2 = str.find_last_not_of(key, 15);              // 15

//s.find_last_not_of(cstr,pos,n)      查找字符串str前n个之外任意字符在当前字符串s的[0,pos]中最后一次出现的位置
//此处不可将"aeiou"替换为key
int pos3 = str.find_last_not_of("aeiou", 20, 2);       // 20

//s.find_last_not_of(str)             查找字符ch之外任意字符在当前字符串s的[0，pos]中最后一次出现的位置
int pos4 = str.find_last_not_of('r', 30);              // 29
```

## 静态数组不能扩容（realloc）

新分配在堆内的内存,数组定义之后不能改变大小，realloc(p,sizeof(p)+sizeof(int))函数不会改变p的值，新的内存地址是函数的返回值:

```c++
//动态分配的内存才可能扩大
int *p = (int *)malloc(4);
int *q = (int *)realloc(p, 8);
if(q==p) 只是扩大内存
if(q!=p) 重新分配内存，并拷贝数据
if(q==NULL) 函数调用失败
```

```c++
char *str = (char*)malloc(12 * sizeof(char));
str = "We Are Happy";
if(!(str = (char*)realloc(str, 13*sizeof(char)))){
	cout << "out of memory" << endl;
};
```

这样将字符串赋值给str， 分配内存仍会失败。


# C/C++ Trick


# Reference
1. [C++_vector操作](https://blog.csdn.net/weixin_41743247/article/details/90635931)
2. [C++ 中vector的嵌套使用](https://blog.csdn.net/Sophia_11/article/details/89328992)
3. [c++中string的用法](https://blog.csdn.net/qq_30534935/article/details/82227364)
4. [静态数组不能扩容（realloc），动态的才可以（如何创建动态数组）](https://blog.csdn.net/WXXGoodJob/article/details/74296420)
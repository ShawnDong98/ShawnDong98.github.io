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
    - Geek
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

> // 这种方式得到的是两个地址之间截到的的变量
>    vector\<int\> test = vector\<int\>(vin.begin(), vin.begin()+1);

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582899219223.png)

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


## C++关于结构体构造函数使用总结

三种结构体初始化方法

- 利用结构体自带的默认构造函数
- 利用带参数的构造函数
- 利用默认无参的构造函数

**Note：** 什么都不写就是使用的结构体自带的默认构造函数，如果自己重写了带参数的构造函数，初始化结构体时如果不传入参数会出现错误。在建立结构体数组时,如果只写了带参数的构造函数将会出现数组无法初始化的错误。


下面是一个比较安全的带构造的结构体示例

```c++
struct node{
    int data;
    string str;
    char x;
    //注意构造函数最后这里没有分号哦！
  node() :x(), str(), data(){} //无参数的构造函数数组初始化时调用
  node(int a, string b, char c) :data(a), str(b), x(c){}//有参构造
}N[10];
```


下面我们分别使用默认构造和有参构造，以及自己手动写的初始化函数进行会结构体赋值, 并观察结果

测试代码如下:

```c++
#include <iostream>
#include <string>
using namespace std;
struct node{
    int data;
    string str;
    char x;
    //自己写的初始化函数
    void init(int a, string b, char c){
        this->data = a;
        this->str = b;
        this->x = c;
    }
    node() :x(), str(), data(){}
    node(int a, string b, char c) :x(c), str(b), data(a){}
}N[10];
int main()
{
      N[0] = { 1,"hello",'c' };  
      N[1] = { 2,"c++",'d' };    //无参默认结构体构造体函数
      N[2].init(3, "java", 'e'); //自定义初始化函数的调用
      N[3] = node(4, "python", 'f'); //有参数结构体构造函数
      N[4] = { 5,"python3",'p' };

    //现在我们开始打印观察是否已经存入
    for (int i = 0; i < 5; i++){
        cout << N[i].data << " " << N[i].str << " " << N[i].x << endl;
    }
    system("pause");
    return 0;
}
```

输出结果：

```c++
1 hello c
2 c++ d
3 java e
4 python f
5 python3 p
```

发现与预设的一样结果证明三种赋值方法都起了作用

## C++ 指针的引用

**Note**：理解指针时，应该将 数据类型* p看作指针变量的类型， 而不应该看成 数据类型 \*p。 我长久以来都是第二种理解方法，这是不对的，也容易陷入误区。


如

```c++
int* p    //应该将 int* 理解为一个整体
int *p   //不应该将 *p 理解为一个整体
```

我们理解时，将p理解为一个 int* 的变量， 这样就不容易陷入误区。


C++中\*\&(指针引用)与\*(指针)的区别

\*指针是一个存放地址的变量，指针引用指的是这个存放地址的变量的引用。

C++中如果参数不是引用的话，会调用参数对象的拷贝构造函数，所以如果有需求想改变指针所指的对象即想要改变指针变量里存放的地址，就要使用指针引用。

下面用一个测试例子和过程图结合进行说明：

```c++
#include <iostream>
using namespace std;
struct Node {
	int data;
};

void ChangeNode1(Node*& pnode) {
	pnode = new Node;
	pnode->data = 5;
}

void ChangeNode2(Node *pnode) {
	pnode = new Node;
	pnode->data = 5;
}


void Test1() {
	Node *node = new Node;
	node->data = 10;
	ChangeNode1(node);
	std::cout << "指针引用" << node->data << endl;
}

void Test2() {
	Node *node = new Node;
	node->data = 10;
	ChangeNode2(node);
	std::cout << "指针" << node->data << endl;
}

int main() {
	Test1();
	Test2();
	return 0;
}
```

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1582718653864.png)

## C/C++产生随机数

C++中没有自带的random函数，要实现随机数的生成就需要使用rand()和srand()。

不过，由于rand()的内部实现是用线性同余法做的，所以生成的并不是真正的随机数，而是在一定范围内可看为随机的伪随机数。

**rand（）**

rand()会返回一随机数值, 范围在0至RAND_MAX 间。RAND_MAX定义在stdlib.h, 其值为2147483647。

**srand（）**

srand()可用来设置rand()产生随机数时的随机数种子。通过设置不同的种子，我们可以获取不同的随机数序列。

可以利用srand((int)(time(NULL))的方法，利用系统时钟，产生不同的随机数种子。不过要调用time()，需要加入头文件< ctime >。

**其他的随机数的范围通式**

产生一定范围随机数的通用表示公式是：

要取得[0,n)  就是rand（）%n     表示 从0到n-1的数

要取得[a,b)的随机整数，使用(rand() % (b-a))+ a; 
要取得[a,b]的随机整数，使用(rand() % (b-a+1))+ a; 
要取得(a,b]的随机整数，使用(rand() % (b-a))+ a + 1; 
通用公式:a + rand() % n；其中的a是起始值，n是整数的范围。 
要取得a到b之间的随机整数，另一种表示：a + (int)b * rand() / (RAND_MAX + 1)。 
要取得0～1之间的浮点数，可以使用rand() / double(RAND_MAX)。

## stack用法



## 格式化输入输出

### scanf

 > int scanf(char *format[,argument,...]);

scanf()函数返回成功赋值的数据项数，出错时则返回EOF。

**格式化说明符**:

格式字符           说明
%a                 读入一个浮点值(仅C99有效)
%A                 同上
%c                 读入一个字符
%d                 读入十进制整数
%i                 读入十进制，八进制，十六进制整数
%o                 读入八进制整数
%x                 读入十六进制整数
%X                 同上
%c                 读入一个字符
%s                 读入一个字符串
%f                 读入一个浮点数
%F                 同上
%e                 同上
%E                 同上
%g                 同上
%G                 同上
%p                 读入一个指针
%u                 读入一个无符号十进制整数
%n                 至此已读入值的等价字符数
%[]                扫描字符集合
%%                 读%符号

附加格式说明字符表
修饰符                       说明
L/l 长度修饰符               输入"长"数据
h 长度修饰符                 输入"短"数据
W 整型常数                   指定输入数据所占宽度
* 星号                       空读一个数据
hh,ll同上h,l但仅对C99有效

在用"%c"输入时，空格和“转义字符”均作为有效字符。
例：
scanf("%c%c%c",&c1,&c2,&c3);
输入：a□b□c↙
结果：a→c1，□→c2，b→c3 (其余被丢弃)

scanf()函数接收输入数据时，遇以下情况结束一个数据的输入：（不是结束该scanf函数，scanf函数仅在每一个数据域均有数据，并按回车后结束）。
        ① 遇空格、“回车”、“跳格”键。
        ② 遇宽度结束。
        ③ 遇非法输入。
**空白字符**

空白字符会使scanf()函数在读操作中略去输入中的一个或多个空白字符，空白符可以是space,tab,newline等等，直到第一个非空白符出现为止。

```c++
#include "stdio.h"
int main(void)
{
	int a,b,c;

	scanf("%d%d%d",&a,&b,&c);
	printf("%d,%d,%d/n",a,b,c);
	return 0;
}  
```

运行时按如下方式输入三个值：
3□4□5　↙（输入a,b,c的值）
3，4，5 （printf输出的a，b，c的值）
（1） &a、&b、&c中的&是地址运算符，分别获得这三个变量的内存地址。
（2） "%d%d%d"是按十进值格式输入三个数值。输入时，在两个数据之间可以用一个或多个空格、tab键、回车键分隔。

以下是合法输入方式：
-  3□□4□□□□5↙
-  3↙
	4□5↙
-  3（tab键）4↙
	 5↙



**非空白字符**

一个非空白字符会使scanf()函数在读入时剔除掉与这个非空白字符相同的字符。


**scanf()函数不能正确接受有空格的字符串？如: I love you!**

```c++
#include <stdio.h>
int main()
{
    char str[80];
    char str1[80];
    char str2[80];
   
    scanf("%s",str);/*此处输入:I love you! */
    printf("%s",str);
    sleep(5);/*这里等待5秒,告诉你程序运行到什么地方*/
    scanf("%s",str1);/*这两句无需你再输入,是对键盘盘缓冲区再扫描   */
    scanf("%s",str2);/*这两句无需你再输入,是对键盘盘缓冲区再扫描    */
    printf("/n%s",str1);
    printf("/n%s",str2);
    return 0;
}
```

输入：I love you! \\
输出：I
      love
      you!
	  
scanf()扫描到"I"后面的空格就认为对str的赋值结束，并忽略后面的"love you!".这里要注意是"love you!"还在键盘缓冲区（关于这个问题，网上我所见的说法都是如此，但是，我经过调试发现，其实这时缓冲区字符串首尾指针已经相等了，也就是说缓冲区清空了，scanf()函数应该只是扫描stdin流，这个残存信息是在stdin中)。


那么scanf()函数能不能完成这个任务？回答是：能！别忘了scanf()函数还有一个 %[] 格式控制符（如果对%[]不了解的请查看本文的上篇）,请看下面的程序：

```c++
#include "stdio.h"
int main()
{
    char string[50];
   
     /*scanf("%s",string);不能接收空格符*/
     scanf("%[^/n]",string);
     printf("%s/n",string);
     return 0;
}
```

**键盘缓冲区残余信息问题**

函数名: fflush

功 能: 清除一个流

用 法:

> int fflush(FILE *stream);

```c++
#include <stdio.h>
int main()
{
    int a;
    char c;
    do
    {
        scanf("%d",&a);
        fflush(stdin);
        scanf("%c",&c);
        fflush(stdin);
        printf("a=%d     c=%c/n",a,c);
    }while(c!='N');
}  
```

**如何处理scanf()函数误输入造成程序死锁或出错？**

scanf()函数执行成功时的返回值是成功读取的变量数,也就是说，你这个scanf()函数有几个变量，如果scanf()函数全部正常读取，它就返回几。但这里还要注意另一个问题，如果输入了非法数据，键盘缓冲区就可能还个有残余信息问题。

### cin

#### cin>>

用法一：最常用、最基本的用法，输入一个数字：

用法二：接受一个字符串，遇“空格”、“Tab”、“回车”都结束

#### cin.get()

用法一：cin.get(字符变量名)可以用来接收字符

用法二：cin.get(字符数组名，接收字符数)用来接收一行字符串，可以接收空格

用法三：cin.get(无参数)没有参数主要是用于舍弃输入流中的不需要的字符,或者舍弃回车,弥补cin.get(字符数组名,接收字符数目)的不足.

#### cin.getline()

cin.getline() // 接受一个字符串，可以接收空格并输出

```c++
#include <iostream>
using namespace std;
main ()
{
	char m[20];
	cin.getline(m,5); 
	cout<<m<<endl;
}

```

输入：jkljkljkl \\
输出：jklj

接受5个字符到m中，其中最后一个为'\0'，所以只看到4个字符输出；

延伸：

cin.getline()实际上有三个参数，cin.getline(接受字符串到m,接受个数5,结束字符)

#### getline()

getline() // 接受一个字符串，可以接收空格并输出，需包含“#include\<string\>”

接受的字符串只能是string类型。

```c++

#include<iostream>
#include<string>
using namespace std;
main ()
{
	string str;
	getline(cin,str);
	cout<<str<<endl;
}
```

输入：jkljkljkl  \\
输出：jkljkljkl

输入：jkl jfksldfj jklsjfl \\
输出：jkl jfksldfj jklsjfl

和cin.getline()类似，但是cin.getline()属于istream流，而getline()属于string流，是不一样的两个函数

#### gets()

gets()// 接受一个字符串，可以接收空格并输出，需包含“#include\<cstdio\>"

接受的字符串只能是char类型。

```c++

#include<iostream>
#include<cstdio>
using namespace std;
main ()
{
	char m[20];
	gets(m); //不能写成m=gets();
	cout<<m<<endl;
}

```

输入：jkljkljkl \\
输出：jkljkljkl

输入：jkl jkl jkl \\
输出：jkl jkl jkl

类似cin.getline()里面的一个例子，gets()同样可以用在多维数组里面：

#### getchar()


getchar()//接受一个字符，需包含“#include\<cstdio\>"

```c++
#include<iostream>
#include <cstdio>
using namespace std;
main ()
{
	char ch;
	ch=getchar(); //不能写成getchar(ch);
	cout<<ch<<endl;
}

```

#### cin的条件状态

使用cin读取键盘输入时，难免发生错误，一旦出错，cin将设置条件状态(condition state)。条件状态标识符号为: \\
goodbit:无错误 \\
eofbit:已到达文件尾 \\
failbit:非致命的输入/输出错误，可挽回 \\
badbit:致命的输入/输出错误,无法挽回 \\
若在输入输出类里.需要加iOS::标识符号。与这些条件状态对应的就是设置、读取和判断条件状态的流对象的成员函数。他们主要有： \\
s.eof()：若流s的eofbit置位，则返回true； \\
s.fail()：若流s的failbit置位，则返回true； \\
s.bad()：若流s的badbit置位，则返回true； \\
s.good()：若流s的goodbit置位，则返回true； \\
s.clear(flags)：清空状态标志位，并将给定的标志位flags置为1，返回void。 \\
s.setstate(flags)：根据给定的flags条件状态标志位，将流s中对应的条件状态位置为1，返回void。 \\
s.rdstate()：返回流s的当前条件状态，返回值类型为strm::iostate。strm::iostate 机器相关的整形名,由各个iostream类定义,用于定义条件状态。 \\

了解以上关于输入流的条件状态与相关操作函数，下面看一个因输入缓冲区未读取完造成的条件状态位failbit被置位，再通过clear()复位的例子。

```c++
#include <iostream>
using namespace std;

int main()
{
	char ch, str[20]; 
    cin.getline(str, 5);
    cout<<"flag1:"<<cin.good()<<endl;    // 查看goodbit状态，即是否有异常
    cin.clear();                         // 清除错误标志
    cout<<"flag1:"<<cin.good()<<endl;    // 清除标志后再查看异常状态
    cin>>ch; 
    cout<<"str:"<<str<<endl;
    cout<<"ch :"<<ch<<endl;

    system("pause");
    return 0;
}
```
输入：12345[回车]，输出结果为：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1583756338621.png)

可以看出，因输入缓冲区未读取完造成输入异常，通过clear()可以清除输入流对象cin的异常状态。，不影响后面的cin>>ch从输入缓冲区读取数据。因为cin.getline读取之后，输入缓冲区中残留的字符串是：5[换行]，所以cin>>ch将5读取并存入ch，打印输入并输出5。

如果将clear()注释，cin>>ch;将读取失败，ch为空。
cin.clear()等同于cin.clear(ios::goodbit);因为cin.clear()的默认参数是ios::goodbit，所以不需显示传递，故而你最常看到的就是:
cin.clear()。

####  cin清空输入缓冲区
从上文中可以看出，上一次的输入操作很有可能是输入缓冲区中残留数据，影响下一次的输入。那么如何解决这个问题呢？自然而然，我们想到了在进行输入时，对输入缓冲区进行清空和状态条件的复位。条件状态的复位使用clear()，清空输入缓冲区应该使用：

> istream &ignore( streamsize num=1, int delim=EOF );

函数作用：跳过输入流中n个字符，或在遇到指定的终止字符时提前结束（此时跳过包括终止字符在内的若干字符）。

```c++
#include <iostream>
using namespace std;

int main()
{
    char str1[20]={NULL},str2[20]={NULL};
    cin.getline(str1,5);
    cin.clear();  // 清除错误标志   
    cin.ignore(numeric_limits<std::streamsize>::max(),'\n'); //清除缓冲区的当前行
    cin.getline(str2,20);
    cout<<"str1:"<<str1<<endl;
    cout<<"str2:"<<str2<<endl;
    system("pause");
    return 0;
}
```

程序输入：12345[回车]success[回车]，程序输出：

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1583757857417.png)

**Note**:
（1）程序中使用cin.ignore清空了输入缓冲区的当前行，使上次的输入残留下的数据没有影响到下一次的输入，这就是ignore()函数的主要作用。其中，numeric_limits::max()不过是头文件定义的流使用的最大值，你也可以用一个足够大的整数代替它。
如果想清空输入缓冲区，去掉换行符，使用：
cin.ignore(numeric_limits< std::streamsize>::max()); 清除cin里所有内容。

（2）cin.ignore()；当输入缓冲区没有数据时，也会阻塞等待数据的到来。

（3）有个疑问，网上很多资料说调用cin.sync()即可清空输入缓冲区，经测试，VC++可以，但是在linux下使用GNU C++却不行，无奈之下，linux下就选择了cin.ignore()。

****
# C/C++ Trick


# Reference

1. [C++_vector操作](https://blog.csdn.net/weixin_41743247/article/details/90635931)
2. [C++ 中vector的嵌套使用](https://blog.csdn.net/Sophia_11/article/details/89328992)
3. [c++中string的用法](https://blog.csdn.net/qq_30534935/article/details/82227364)
4. [静态数组不能扩容（realloc），动态的才可以（如何创建动态数组）](https://blog.csdn.net/WXXGoodJob/article/details/74296420)
5. [C++ - 结构体构造函数使用总结](https://www.cnblogs.com/wlw-x/p/11566191.html)
6. [C++ 结构体（struct）最全详解](https://www.jianshu.com/p/18307f614c5b)
7. [C++中指针*与指针引用*&的区别说明](https://blog.csdn.net/zyb228/article/details/90040262)
8. [C++产生随机数](https://www.cnblogs.com/xiaokang01/p/9786751.html)
9. [C语言scanf函数详细解释](https://blog.csdn.net/21aspnet/article/details/174326)
10. [C++中输入字符串的几种方法](https://blog.csdn.net/u011486738/article/details/82082405)
11. [C++中cin的详细用法](https://blog.csdn.net/bravedence/article/details/77282039)
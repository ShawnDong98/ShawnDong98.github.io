---
layout:     post
title:      "【xdu_ccf】西安电子科技大学机试以及部分CCF题解"
subtitle:   ""
date:       2020-03-08
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 
    - 
---

# 2008年机试

## Problems A

请写一个程序，判断给定整数序列能否构成一个等差数列?

每组数据由两行构成，第一行只有一个整数n（<100），表示序列长度（该序列中整数的个数），第二行为n个整数，每个整数的取值区间都为[-32768~32767]，整数之间以空格或跳格间隔。

思路：

先用前两个最小的数算出公差，然后每次找最小的数，计算与前面的数的差是否等于公差。

代码：

```c++
class SolutionA{
public:
    bool if_arithmetic_progression(vector<int> A){
        if(A.size()==0) return 0;
        if(A.size()<=2) return 1;
        int pre, cur, min;
        pre = find_min(A);
        cur = find_min(A);
        int error = cur - pre;
        for(int i=0; i<A.size(); ++i){
            pre = cur;
            cur = find_min(A);
            if(error == cur - pre) continue;
            return 0;
        }
        return 1;
    }
    int find_min(vector<int> &A){
        int min = A[0];
        int loc = 0;
        for(int i=1; i<A.size(); ++i){
            if(A[i]<min){
                min = A[i];
                loc = i;
            }
        }
        A.erase(A.begin()+loc, A.begin()+loc+1);
        return min;
    }
};
```

## Problems B

判定给定正整数是不是“水仙花数”。“水仙花数”是指一个三位数，其各位数字的立方和等于该数， 例如153 = 1^3 + 5^3 + 3^3

输入说明：有多组数组，每组数据为一个正整数n(0<n<65536，占一行)，为0时表示输入结束。

输入说明：对于每一组数据， 输入一个yes或no（表示该数是否为“水仙花数”）

思路：

将各位求出来， 然后求立方和是否等于原数。

代码：

```c++
class SolutionB{
public:
    bool if_daffodils_number(int n){
        int hundreds, tens, bits;
        hundreds = n / 100;
        tens = (n % 100) / 10;
        bits = n % 10;
        if(n==(cube(hundreds) + cube(tens) + cube(bits))) return 1;
        return 0;
    }
    int cube(int n){
        return n*n*n;
    }
};
```

## Problems C

Arnold变换是一种常见的图像置乱技术， Arnold变换的定义如下：
对于任意N\*N矩阵（所有元素都相同的矩阵除外）， 设i， j为矩阵元素原始下标，经过Arnold变换后新下标为i', j'， 其满足下式：
i' = (i + j) mod N
j' = (i + 2j) mod N
i, j: 0, 1, 2 ... N-1
Arnold变换具有周期性， 即经过若干次变换后，矩阵回到最初状态， 且周期T与N的大小有关。 对于任意N>2, TN<=N^2/2， 编写程序输出给定的N（2<N<=10）对应的周期TN。

输入说明：对输入的每一个N，给出N\*N矩阵的Arnold变换的周期T。

思路：

按照定义进行变换即可，注意变换的时候不要在原矩阵上变换，应该创建副本存储变换后的矩阵。

代码：

```c++
class SolutionC{
public:
    int Arnold_transform_T(vector<vector<int> > matrix){
        int T = 1;
        printMatrix(matrix);
        vector<vector<int> > M1 = matrix, M2 = Arnold_transform(matrix);
        printMatrix(M2);
        while(!if_matrix_same(M1, M2)){
            ++T;
            M2 = Arnold_transform(M2);
            printMatrix(M2);
        }
        return T;
    }
    vector<vector<int> > Arnold_transform(vector<vector<int> > matrix){
        // 这里定义出一个副本存储变换后的矩阵，注意不要在原矩阵上变换
        vector<vector<int> > M = CreateMatrix(matrix.size());
        for(int i=0; i<matrix.size(); ++i){
            for(int j=0; j<matrix.size(); ++j){
                int ii = (i + j) % matrix.size();
                int jj = (i + 2 * j) % matrix.size();
                M[i][j] = matrix[ii][jj];
            }
        }

        return M;
    }

    bool if_matrix_same(vector<vector<int> > M1, vector<vector<int> > M2){
        for(int i=0; i<M1.size(); ++i){
            for(int j=0; j<M1.size(); ++j){
                if(M1[i][j]!=M2[i][j]) return 0;
            }
        }
        return 1;
    }

    vector<vector<int> > CreateMatrix(int n){
        vector<vector<int> > M;
        int c = 1;
        for(int i=0; i<n; ++i){
            vector<int> N;
            for(int j=0; j<n; ++j){
                N.push_back(c);
                c++;
            }
            M.push_back(N);
        }
        return M;
    }
    void printMatrix(vector<vector<int> > M){
        for(int i=0; i<M.size(); ++i){
            for(int j=0; j<M.size(); ++j){
                cout << M[i][j] << ' ';
            }
            cout << endl;
        }
        cout << endl;
    }
};

```

## Problems D

对于一个正整数n，如果它的各位之和等于它的所有质因数的各位之和， 则该数被称为smith数。
例如：
31527 = 3 * 3 * 23 * 151, 31527的各位之和为3+1+2+5+7=18, 它的所有质因数各位之和3+3+2+3+1+5+1=18， 因此，31527是一个smith数。 编写一个程序判断输入的正整数是不是smith数。

输入说明：有多组数据， 每组数据只有一个整数n(<10000, 占一行), 为0时表示输入结束。

输出说明：对于每一组数据，输出一个yes或no

思路：

两个判断条件
- 是不是质数
- 是不是因数

一开始想的是从小往大进行遍历，但是这样会有一个问题，质因数可能会有重复的，比如31527有两个质因数3。

因此改变思路，从大往小找质因数，每次找到一个质因数，除以质因数后，再重新求新得到的数的质因数，这样不会有质因数的丢失。


代码：

```c++
class SolutionD{
public:
    bool is_smith(int n){
        vector<int> factor;
        int n_backup = n;
        while(n!=1){
            int i = 2;
            while(i<=n){
                if((is_prime_number(i))&&is_factor(n, i)){
                    factor.push_back(i);
                    // 如果直接遍历，重复的质因数会丢失
                    // 每次除质因数后的结果，再去找质因数
                    n = n / i;
                    break;
                }
                ++i;
            }
        }
        int sum_factor = 0;
        for(int i=0; i<factor.size();++i){
            cout << "factor " << i << ": " << factor[i] << endl;
            sum_factor += bits_sum(factor[i]);
        };
        cout << "sum_factor: " << sum_factor << endl;
        cout << "n_sum: " << bits_sum(n_backup) << endl;
        if(bits_sum(n_backup)==sum_factor) return 1;
        else return 0;
    }
    bool is_prime_number(int n){
        int c = 2;
        while(n%c!=0){
            c++;
        }
        if(c!=n) return 0;
        else return 1;
    }
    bool is_factor(int n, int factor){
        if(n%factor == 0) return 1;
        return 0;
    }
    int bits_sum(int n){
        int bits, tens, hundreds, thousands, ten_thousand;
        ten_thousand = n / 10000;
        thousands = (n % 10000) / 1000;
        hundreds = (n % 1000) / 100;
        tens = (n % 100) / 10;
        bits = n % 10;
        return ten_thousand + thousands + hundreds + tens + bits;
    }
};
```

## Problems E

请写一个程序， 计算R^n精确结果(0.0<R<99.999, n是整数且0<n<=25)

输入说明：有多组数据，每组数据占一行，用一对数据表示， 第一个数据是R
(含小数点6位)， 第二个数据是n， 两个数据之间有一个空格。

输入说明： 对每个 输入 输出其结果（占一行）

思路：

这题我是没思路的，想到用数组存储，但是感觉又太麻烦没有继续。

看了学长讲解后，有了部分思路，对于整数类型的输入，可以求解。

用字符串存储各位，一位一位地去计算，将个位保留在本数组，然后再处理进位问题即可。

对于浮点数的输入无法计算，因为计算机是二进制存储的，例如当输入12.123时，它的结果其实是12.1299999...，没有好的方法去处理它，放弃。

如果按学长那样直接输入的就是字符串的话，会好处理很多。

代码：

```c++
class SolutionE{
public:
    vector<int> cal_pow(vector<int> R, int n, int x){
        int temp = 0;
        vector<int> t;
        while(--n){
            temp = 0;
            for(int i=R.size()-1; i>=0; --i){
                temp += R[i] * x;
                t.insert(t.begin(), temp%10);
                temp /= 10;
            }
            while(temp!=0){
                t.insert(t.begin(), temp%10);
                temp /= 10;
            }
            R = t;
            t.erase(t.begin(), t.end());
        }
        return R;
    }
    vector<int> int2vec(int n){
        vector<int> t;
        while(n!=0){
            t.insert(t.begin(), n%10);
            n /= 10;
        }
        return t;
    }
    vector<int> float2vec(ld f){
        ld temp = f - (ld)(int)f;
        vector<int> t;
        while(temp==0){
            temp *= 10;
            t.push_back(int(temp));
            temp = temp - (ld)int(temp);
        }
        return t;
    }
};
```

# 2009年机试

## Problems A


请写一个程序， 给出指定整数范围[a, b]内所有的完数，一个数如果恰好等于除它本身以外的所有因子之和，这个数就称为完数，例如6是完数，因为6=1+2+3.

输入说明：共一组数据为两个正整数，分别表示a和b(1<a<b<10^5).

输出说明：指定范围内的所有完数， 每个数占一行。

思路： 
- 在范围内遍历
- 计算数的所有因子
- 判断是否是完数

代码：

```c++
class SolutionA{
public:
    vector<int> find_all_perfect_numbers(int a, int b){
        vector<int> perfect_numbers;
        int c = a;
        while(c!=b){
            if(if_perfect_number(c)) perfect_numbers.push_back(c);
            c++;
        }
        return perfect_numbers;

    }
    bool if_perfect_number(int n){
        int factor_sum = 0;
        vector<int> factors;
        factors = find_factors(n);
        for(int i=0; i<factors.size(); ++i){
            factor_sum += factors[i];
        }
        if(factor_sum == n) return 1;
        return 0;
    }
    vector<int> find_factors(int n){
        int c=1;
        vector<int> factors;
        while(c!=n){
            if(n%c==0) factors.push_back(c);
            c++;
        }
        return factors;
    }

};
```

## Problems B
 
请写-一个程序，对于一个m行m列的(1<m<10)的方阵，求其每一行,每一列及主对角线元素之和，最后按照从大到小的顺序一次输出。

输入说明:共一组数据，输入的一行为一个正整数，表示m, 接下来的m行，每行m个整数表示方阵元素。

输出说明: 从大到小排列的一行整数，每个整数后跟一个空格，最后换行。

思路：
- 计算迹（对角线之和）
- 计算各行之和
- 计算各列之和
- 排序

代码：

```c++
class SolutionB{
public:
    void sum_sort(vector<vector<int> > M){
        int Trace = trace(M);
        vector<int> Sum_row = sum_row(M);
        vector<int> Sum_col = sum_col(M);
        vector<int> sum;
        sum.push_back(Trace);
        for(int i=0; i<Sum_row.size(); ++i){
            sum.push_back(Sum_row[i]);
        }
        for(int i=0; i<Sum_col.size(); ++i){
            sum.push_back(Sum_col[i]);
        }
        sort(sum.begin(), sum.end());
        for(int i=sum.size()-1; i>=0; --i){
            cout << sum[i] << " ";
        }
        cout << endl;
    }
    vector<int> sum_row(vector<vector<int> > M){
        int sum = 0;
        vector<int> Sum_row;
        for(int i=0; i<M.size(); ++i){
            for(int j=0; j<M.size(); ++j){
                    sum += M[i][j];
            }
            Sum_row.push_back(sum);
            sum = 0;
        }
        return Sum_row;
    }
    vector<int> sum_col(vector<vector<int> > M){
        int sum = 0;
        vector<int> Sum_col;
        for(int i=0; i<M.size(); ++i){
            for(int j=0; j<M.size(); ++j){
                    sum += M[j][i];
            }
            Sum_col.push_back(sum);
            sum = 0;
        }
        return Sum_col;
    }
    int trace(vector<vector<int> > M){
        int sum = 0;
        for(int i=0; i<M.size(); ++i){
            for(int j=0; j<M.size(); ++j){
                if(i==j) sum += M[i][j];
            }
        }
        return sum;
    }
    vector<vector<int> > CreateMatrix(int n){
        vector<vector<int> > M;
        vector<int> N;
        srand(time(NULL));
        for(int i=0; i<n; ++i){
            for(int j=0; j<n; ++j){
                N.push_back(rand()%10);
            }
            M.push_back(N);
            N.erase(N.begin(), N.end());
        }
        return M;
    }
    void printMatrix(vector<vector<int> > M){
        for(int i=0; i<M.size(); ++i){
            for(int j=0; j<M.size(); ++j){
                    cout << M[i][j] << " ";
            }
            cout << endl;
        }
    }
};

```

## Problems C

对于给定的字符序列，从左至右将所有的数字字符取出来拼接成个无符号整数(字符序列长度小于100，拼接出整数小于2^31)，计算并输出该整数的一个最大因子(如果是素数，则其最大因子为自身)

输入说明:有多组数据，输入数据的第一行为一个正整数，表示字符序列的数目，每组数据为一行字符序列。

输出说明:对每个字符序列，取出所得整数的最大因子，若字符序列中没有数字或者找出的

输入:
    3
    sdf0ejg3.f?9f
    ?4afd0s&2d79*(g
    abcde

输出：
    13
    857
    0
	
学长的题目输入给错了，在[CSDN](https://blog.csdn.net/coderwait/article/details/92712249)找到了正确的输入。

思路：
- 每次读入一行字符串
- 利用公式$n = 10 \times n + x$计算，这里n用来计数该哪一位了， x为本字符数字变成的所表示真实数字
- 遍历找最大因子

代码：

```c++
class SolutionC{
public:
    ll str2num(string str){
        ll num = 0;
        for(int i=0; i<str.size(); ++i){
            if(str[i]>='0' && str[i] <='9'){
                num = num * 10 + str[i] - '0';
            }
        }
        cout << num << endl;
        if(num == 0) return 0;
        if(if_prime_number(num)) return num;
        ll factor = num - 1;
        while(1){
            if(num%factor==0) return factor;
            factor--;
        }
        return -1;
    }
    bool if_prime_number(ll num){
        ll i = 2;
        while(i!=num){
            if(num%i == 0) return 0;
            ++i;
        }
        return 1;
    }
};
```

这个题在牛客上时间超限了。。。就这样把，以后再优化。

## Problems D

己知某二义树的先序序列和中序序列,编程计算并输出该二义树的后序序列。

入说明:仅一组数据,分为两行输入,第一行表示指定二叉树的先序序列,
第二行表示该 二义树的中序序列,序列元素均为大写英文字符,表示二义树的结点。

输出说明:第一行上输出该二又树的后序序列。

输入样本:
ABDGCEFH
DGBAECHF

输出样本:
GDBEHFCA

思路：

这个题之前在牛客上做过，那次是做出来了的，这次却卡住了。

这次是想直接利用字符串将后序遍历打印出来。

事实上，还是利用前序和中序将二叉树先构造出来，再打印后序遍历，会容易一些。

细心地手动模拟一边应该就可以做得出来。

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1583769195906.png)

代码：

```c++
struct TreeNode{
    char val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll x):
        val(x), left(NULL), right(NULL){
        }
};
// 本题的经验：vector的用法大部分都可以迁移到string上
class SolutionD{
public:
    TreeNode* reconstruct_Tree(string preOrder, string inOrder){
        if(preOrder.size()==0||inOrder.size()==0) return NULL;
        TreeNode *p = (TreeNode*)malloc(sizeof(TreeNode));
        p->val = preOrder[0];
        char root = preOrder[0];
        ll pos = inOrder.find(root);
        if(preOrder.begin()+ pos + 1 < preOrder.begin()+1){
            p->left = NULL;
        }else{
            p->left = reconstruct_Tree(string(preOrder.begin()+1, preOrder.begin()+pos+1),
                                       string(inOrder.begin(), inOrder.begin()+pos));
        }
        if(preOrder.begin()+pos+1>preOrder.end()){
            p->right = NULL;
        }else{
            p->right = reconstruct_Tree(string(preOrder.begin()+pos+1, preOrder.end()),
                                        string(inOrder.begin()+pos+1, inOrder.end()));
        }
        return p;
    }
    void print_Tree_preOrder(TreeNode* T){
        if(T==NULL) return;
        cout << T->val << ' ';
        print_Tree_preOrder(T->left);
        print_Tree_preOrder(T->right);
    }
    void print_Tree_inOrder(TreeNode* T){
        if(T==NULL) return;
        print_Tree_inOrder(T->left);
        cout << T->val << ' ';
        print_Tree_inOrder(T->right);
    }
    void print_Tree_postOrder(TreeNode* T){
        if(T==NULL) return;
        print_Tree_postOrder(T->left);
        print_Tree_postOrder(T->right);
        cout << T->val << ' ';
    }

};
```

## Problems E

请写一个程序，判定给定表达式中的括号是否匹配， 表达式中的合法括号为
"(", ")", "[", "]", "{", "}"， 这三个括号的按照任意顺序嵌套使用。

输入说明：有多个表达式，输入数据的第一行是表达式的数目，每个表达式占
一行。

输出说明：对每个表达式，若其中的括号是匹配的，则输出“yes”， 否则输出
“no”。

输入样本
4
[(d+f)*{}]
[(2+3)]
()}
[4(6]7)9

输出样本:
yes
yes
no
no

思路：

用一个栈来存储左括号，每当遇到一个右括号的时候，判断与栈顶的括号是否匹配

若不匹配，返回0。

若匹配， 栈顶出栈。

循环执行，最后看是否栈空

若栈空，返回1

若栈不空， 返回0

代码：

```c++
class SolutionE{
public:
    bool Parentheses_Matching(string str){
        stack<char> S;
        for(int i=0; i<str.size(); ++i){
            if(str[i]=='('||str[i]=='['||str[i]=='{') S.push(str[i]);
            if(str[i]==')'||str[i]==']'||str[i]=='}'){
                if(S.empty()) return 0;

                if(str[i]==')'){
                    if(S.top()!='('){
                        return 0;
                    }else{
                        S.pop();
                    }
                }
                if(str[i]==']'){
                    if(S.top()!='['){
                        return 0;
                    }else{
                        S.pop();
                    }
                }
                if(str[i]=='}'){
                    if(S.top()!='{'){
                        return 0;
                    }else{
                        S.pop();
                    }
                }
            }

        }

        if(!S.empty()) return 0;

        return 1;
    }
};

```

# 2011年机试

## Problems A

编写一个程序,从键盘输入n个非零整数（0<n<1000）,将这n个数中每个数的各位数字取出来相加, 并按照从小到大的次序一次输出这些数字和。

例如,497的各位数字和为20(4+9+7),1069的各位数字和为16（1+0+6+9)

输入格式说明:输入整数之间以空格分隔,输入0时结束。

输出格式说明:在一行上从小到大输出计算结果,整数之间用1个空格分隔,最后换行。

输入示例: \\
497 1069 68 71 137 0

思路：




# Reference
1. [【机试】ProblemC（整数的最大素因子）](https://blog.csdn.net/coderwait/article/details/92712249)
2. [【Geek之路】《剑指offer》思路及代码合集](https://shawndong98.github.io/2020/02/24/Geek%E4%B9%8B%E8%B7%AF-%E5%89%91%E6%8C%87offer-%E6%80%9D%E8%B7%AF%E5%8F%8A%E4%BB%A3%E7%A0%81%E5%90%88%E9%9B%86/)
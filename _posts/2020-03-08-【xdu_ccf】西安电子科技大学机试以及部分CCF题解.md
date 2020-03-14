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

- 将输入的各数存入vector
- 求 vector中各数 各位数字取出来相加 存入一个vector
- sort排序

代码：

```c++
class SolutionA{
public:
    void sum_sort(vector<ll> numbers){
        vector<ll> sums;
        for(int i=0; i<numbers.size(); ++i){
            sums.push_back(sum_bits(numbers[i]));
        }
        sort(sums.begin(), sums.end());
        for(int i=0; i<numbers.size(); ++i){
            cout << sums[i] << ' ';
        }
    }
    ll sum_bits(ll n){
        vector<ll> cache;
        while(n!=0){
            cache.push_back(n%10);
            n /= 10;
        }
        ll sum = 0;
        for(int i=0; i<cache.size(); ++i){
            sum += cache[i];
        }
        return sum;
    }
};
```

## Problems B

写一个程序,找出给定矩阵的马鞍点， 若一个矩阵中的某元素在其所在行最小而在其所在列最大,则该元素为矩阵的一个马鞍点。

输入说明:输入数据由m+1行构成， 第一行只有两个整数m和n(0<m<100.0<n<100）,分别表示矩阵的行数和列数, 接下来来的m行、每行n个整数表示矩阵元素（矩阵中的元素不同）。整数之间以空格间隔。

输出说明:在一行上输出马鞍点的行号、列号(行号和列号从0开始记数)及元素的值（用一个空格分隔）,之后换行；若不存在马鞍点,则输出一个字符串"no"后换行。

输入示例:(注意:本题裁判机上输入数据的第一行整数不一定是4和3）\\
4 3 \\
11 13 121 \\
407 72 88 \\
25 58 1 \\
134 30 62 \\


输出示例: \\
1 1 72

思路：

三重循环：
- 第一次循环找一行中最小的
- 第二次循环找该行中最小的， 看是否是同一个数
- 循环执行上面两个循环，遍历完所有行

代码：

```c++
class SolutionB{
public:
    void find_Saddle_point(vector<vector<ll> > M){
        ll min = 0, max = 0;
        ll row = 0, col = 0;
        ll flag = 0;
        for(int i=0; i<M.size(); ++i){
            min = M[i][0];
            col = 0;
            for(int j=0; j<M[i].size(); ++j){
                if(M[i][j]<min){
                    min = M[i][j];
                    col = j;
                }
            }
            max = min;
            for(int k=0; k<M.size(); ++k){
                if(M[k][col]>max){
                    max = M[k][col];
                    row = k;
                }
            }
            if(max == min){
                cout << row << ' ' << col << ' ' << M[row][col] << endl;
                flag = 1;
            }
        }
        if(flag==0) cout << "no" << endl;
    }
};
```

## Problems C

有一种简单的字符串压缩算法,对于字符串中连续出现的同一个字符,用该字符串加上连续出现的次数来表示（连续出现次数小于3时不压缩），例如， 字符串aaabbbabaaaaaaaaabbb可压缩为a5b3aba13b4、请设计一个程序,将采用该压缩方法得到的字符串解压缩,还原出原字符串并输出。

输入格式说明:在一行上输入一个字符串。(长多不超过50)

出格式说明:在一行上输出解压缩后的字符串（长度不超过100）,最后换行

输入示例: \\
a5b3aba13b4

输出示例: \\
aaaaabbbabaaaaaaaaaaaabbbb

思路：
- 定位到数字字符
- 将数字字符串转化为数字
- 删除数字部分的字符串
- 插入数字长度的字符

需要有指针pre指向数字前的一个字符，还需要两个指针定位数字字符串的长度

代码：

```c++
class SolutionC{
public:
    void unzip_str(string str){
        ll pre = 0;
        string str_num;
        for(int i=1;i<str.size();++i){
            // 要保证pre指针在i指针前面
            pre = i-1;
            if(str[i]>='0'&&str[i]<='9'){
                ll j = i;
                while(str[j]>='0'&&str[j]<='9'){
                    str_num.append(1, str[j]);
                    ++j;
                }
                ll num = str2num(str_num);
                cout << num << endl;
                str.erase(str.begin()+i, str.begin()+j);
                str.insert(i, num-1, str[pre]);
                str_num.erase(str_num.begin(), str_num.end());
                cout << str << endl;
                i = i + num - 1;
                pre = i;
            }

        }
        cout << str << endl;
    }
    ll str2num(string str_num){
        ll num = 0;
        for(int i=0; i<str_num.size();++i){
            num = 10 * num + (str_num[i] - '0');
        }
        return num;
    }
};
```

注意这里str.erase()的用法是不对的，str.erase(pos, n)删除从pos开始的n个字符，结果正确可能碰巧。

## Problems D
用于通信的电文由n(4<n<30)个字符组成， 字符在电文中出现的频度（权值）为w1，w2,,,,wn,试根据该权值序列构成哈大蔓树,并计算该树的带权路径长度。

输入说明:  \\
仅一组数据,为两行输入:  \\
第一行为n的值,第二行为n 个整数,表示字符出现的频度

输出说明:一个整数,表示所构造哈夫曼树的带权路径长度（输出整数后换行）。

思路：

构造一个数据结构Node，包含weight、lchild、rchild、parent，length。

用一个Node类型的vector Tree来存储哈夫曼树

构造哈夫曼树：
- vector Tree前n个位置存n个叶子节点
- 制造一个Tree的副本A，所有操作在A上进行，只有在添加节点时，才操作Tree
- 每次在A中找最权重最小的叶子节点，返回它的坐标， 将权重赋值为-1（标志它被用来构造过了）。 这样做是为了保证它和Tree的坐标相对应。
- 找到两个最小的节点，生成新节点，权重为两个节点权重之和，两节点parent指向新节点，新节点左右孩子分别指向两节点。
- 循环执行上述步骤，循环n-1次停止

计算带权路径长度：

构造好哈夫曼树后，从前到后计算各节点长度， 通过parent指针，直到根节点parent指针为-1，即可计算各节点长度，长度乘以权重即得到带权路径长度。


```c++
struct Node{
    ll weight;
    ll lchild, rchild, parent, length;
};

class SolutionD{
public:
     void Huffman_Tree_Structor(vector<Node> &Tree){
        vector<Node> A = Tree;
        Node T;
        ll t = Tree.size();
        for(int i=0; i<t-1; ++i){
            ll min = find_min(A);
            ll second_min = find_min(A);
            T.weight = Tree[min].weight + Tree[second_min].weight;
            T.parent = -1;
            T.lchild = min;
            T.rchild = second_min;
            A.push_back(T);
            Tree.push_back(T);
            Tree[min].parent = Tree.size()-1;
            Tree[second_min].parent = Tree.size()-1;
        }
        printTree(Tree);

    }
    void Huffman_Weight_Length(vector<Node> &Tree, ll n){
        for(int i=0; i<n; ++i){
            Node T = Tree[i];
            while(T.parent!=-1){
                T = Tree[T.parent];
                Tree[i].length++;

            }
        }
        ll sum_weight_length = 0;
        for(int i=0; i<n; i++){
            sum_weight_length += Tree[i].length * Tree[i].weight;
        }
        cout << "weight_length: " << sum_weight_length << endl;

    }
    vector<Node> Init_Huffman_Tree(vector<ll> A){
        Node T;
        vector<Node> Tree;
        for(int i=0; i<A.size(); ++i){
            T.weight = A[i];
            T.parent = -1;
            T.length = 0;
            Tree.push_back(T);
        }
        return Tree;
    }
    ll find_min(vector<Node> &A){
        ll min_mark = 0;
        //for(min_mark=0; A[min_mark].weight!=-1; ++min_mark);
        while(A[min_mark].weight==-1){
            min_mark++;
        }

        ll Min = A[min_mark].weight;

        for(int i=0; i<A.size(); ++i){
            if(A[i].weight<Min&&A[i].weight!=-1){
                Min = A[i].weight;
                min_mark = i;
            }
        }
        A[min_mark].weight = -1;
        return min_mark;
    }
    void printTree(vector<Node> Tree){
        for(int i=0; i<Tree.size(); ++i){
            cout << Tree[i].weight << " ";
        }
        cout << endl;
    }
    void printTree_parent(vector<Node> Tree){
        for(int i=0; i<Tree.size(); ++i){
            cout << Tree[i].parent << " ";
        }
        cout << endl;
    }
};

```


# 2013年机试

## Problems A

问题描述: \\
定义一个新的斐波那契数列 \\
F(O)=7: \\
F(1)=11; \\
F(n)=F(n-1)+F(n-2];{n>=2)

输入:
输入有多组:首先输入一个 N（N<=100),代表要输入的测试用例的个数:接下来输入N个数字 ni(ni<=100),数字间用空格隔开。

输出: \\
求F(n)能否被3整除,若能整除输出'yes',否则而出'no'

样例输入: \\
3 \\
0 1 2

样例输出: \\
no \\
no \\
yes

思路：
- 求斐波那契数列
- 看能否被3整除

代码：

```c++
class SolutionA{
public:
    void if_divided(ll n){
        if(n%3 == 0) cout << "yes" << endl;
        else cout << "no" << endl;
    }
    ll Fibonaci(ll n){
        if(n==0) return 7;
        if(n==1) return 11;
        ll pre, pre_pre, cur;
        pre_pre = 7;
        pre = 7;
        for(int i=2; i<=n; ++i){
            cur = pre + pre_pre;
            pre_pre = pre;
            pre = cur;
        }
    }
};
```

## Problems B

题目描述: \\
输入一组数据,统计每个数出现的次数,并按照数字的大小进行排序输出。

输入: \\
输入20个数字,数字之间用空格隔开。

输出: \\
统计每个数字出现的次数,并按数字的大小输出数字及其出现的次数。

样例输入: \\
9 8 5 1 7 2 8 2 9 10 1 7 8 9 5 6 9 0 1 9

样例输出： \\
0:1 \\
1:3 \\
2:2 \\
5:2 \\
6:1 \\
7:2 \\
8:3 \\
9:5 \\
10:1 

思路：

用一个数组存储每个数字出现的次数，数组的索引便是该数字，数组的内容便是该数字出现的次数

代码：

```c++
class SolutionB{
public:
    void number_times(ll a[]){
        for(int i=0; i<100; ++i){
            if(a[i]!=0){
                cout << i << ":" << a[i] << endl;
            }
        }
    }
};
```

## Problems C

题目描述: \\
每个英文字母出现的频率对其进行哈弗曼编码、其中‘#’代表空格,其编码方式如下（此处略去编码方式(因为比较多不易记忆）

输入: \\
从文件（ecode.txt）中读入要输入的测试用例,测试用例总长度不超过 1000。

输出: \\
输出解码后的测试用例,包含其中的空格

思路：
因为没有文件，所以就练习一下文件读写和哈夫曼树

代码：

```c++
struct Node{
    ll weight;
    ll lchild, rchild, parent, length;
};
class SolutionC{
public:
    vector<Node> HuffmanTree_Structor(vector<Node> Tree){
        vector<Node> B = Tree;
        Node T;
        ll Min, Second_Min;
        ll times = Tree.size();
        for(int i=0; i<(times-1); ++i){
            Min = find_min(B);
            Second_Min = find_min(B);
            T.weight = Tree[Min].weight + Tree[Second_Min].weight;
            T.lchild = Min;
            T.rchild = Second_Min;
            T.parent = -1;
            B.push_back(T);
            Tree.push_back(T);
            Tree[Min].parent = B.size()-1;
            Tree[Second_Min].parent = B.size()-1;
        }
        return Tree;

    }

    vector<Node> Init_HuffmanTree(vector<ll> A){
        vector<Node> Tree;
        Node T;
        for(int i=0; i<A.size(); ++i){
            T.weight = A[i];
            T.length = 0;
            T.parent = -1;
            Tree.push_back(T);
        }
        return Tree;
    }
    ll find_min(vector<Node> &Tree){
        ll pos = 0;
        while(Tree[pos].weight == -1) ++pos;
        ll Min = Tree[pos].weight;

        for(int i=0; i<Tree.size(); ++i){
            if(Tree[i].weight<Min && Tree[i].weight != -1){
                Min = Tree[i].weight;
                pos = i;
            }
        }
        Tree[pos].weight = -1;
        return pos;

    }
    void HuffmanCode_length(vector<Node> &Tree, int n){
        for(int i=0; i<n; ++i){
            Node T = Tree[i];
            while(T.parent != -1){
                T = Tree[T.parent];
                Tree[i].length++;
            }
        }
    }
    ll Huffman_weight_length(vector<Node> Tree, int n){
        ll sum = 0;
        for(int i=0; i<n; ++i){
            sum += Tree[i].length * Tree[i].weight;
        }
        return sum;
    }
    void printHuffmanTree(vector<Node> Tree){
        for(int i=0; i<Tree.size(); ++i){
            cout << Tree[i].weight << " ";
        }
        cout << endl;
    }
    string file_read(string filename){
        string str;
        ifstream in(filename);
        while(in >> str){
            cout << str << endl;
        }
        in.close();
        return str;

    }

    void file_write(string str){
        ofstream out("test1.txt");
        out << str;
        out.close();

    }
};
```

## Problems D

问题描述:二进制与十进制的相互转换,输入一组数据,若为十进制,则将其转换为二进制:若为二进制则将其转换为十进制。其中所要转换的十进制与二进制的十进制大于零小于等于255。

输入:测试用例包含多组,每组有两个数n和 m,n为所输入的数值,m为输入数的进制,如 m=2,代表所输入的n是二进制数。当m和n均为零是表示输出结束。

输出：若输入的数是十进制,则将其转换为二进制;若所输入的数为二进制,则将其转换为十进制,并输出。每个结果对应一行,最后输出换行。

样例输入:  \\
10 2 \\
10 10 \\
0 0

样例输出 \\
2 \\
1010

思路：

十进制转二进制：整数部分除基取余， 小数部分乘积取整， 因为输入仅有整数，不考虑小数部分。

二进制转十进制：各位值乘以各位权重之和
- 先将二进制数转成字符串
- 将字符串形式的二进制数转成十进制


代码：

```c++
class SolutionD{
public:
    string to_string(ll n){
        string str;
        while(n!=0){
            str.insert(0,1,(n%10)+'0');
            n /= 10;
        }
        return str;
    }
    ll B2D(ll N){
        string B = to_string(N);
        ll sum = 0;
        ll n = 1;
        for(int i=(B.length()-1); i>=0; --i){
            sum += (B[i] - '0') * n;
            n *= 2;
        }
        return sum;
    }

    void D2B(ll n){
        vector<ll> B;
        while(n!=0){
            B.insert(B.begin(), n%2);
            n /= 2;
        }
        for(int i=0; i<B.size(); ++i){
            cout << B[i];
        }
        cout << endl;
    }

};
```

# 2015年机试

## Problems A

求一串数中大于1的素数之和

输入不超过100个数 不超过10 组 输入0结束

例：

输入 \\
4 1 2 3 4 \\
5 1 2 3 4 5 \\
0

输出 \\
5 \\
10

思路：
- 用字符串一行一行地读入，再将字符串转成整型。
- 依次判断是否是素数，并判断是否重复，若不重复，存入vector。
- 求和输出。


此题收获在于不容易判断换行符时，读入一行数据的处理方式

代码：

```c++
class SolutionA{
public:
    void ProblemsA(){
        string line;
        vector<ll> A;
        while(1){
            getline(cin, line);
            if(line[0]=='0') break;
            cout << prime_num_sum(str2vec(line)) << endl;
        }

    }
    ll prime_num_sum(vector<ll> A){
        vector<ll> prime_nums;
        for(int i=0; i<A.size(); ++i){
            if(if_prime_number(A[i])){
               vector<ll>::iterator pos = find(prime_nums.begin(), prime_nums.end(), A[i]);
               if(pos == prime_nums.end()) prime_nums.push_back(A[i]);
            }
        }
        ll sum = 0;
        for(int i=0; i<prime_nums.size(); ++i){
                sum += prime_nums[i];
        }
        return sum;
    }
    bool if_prime_number(ll n){
        if(n==0 || n==1) return 0;
        ll i = 2;
        while(i!=n){
            if(n%i==0) return 0;
            i++;
        }
        return 1;
    }
    vector<ll> str2vec(string line){
        vector<ll> A;
        for(int i=0; i<line.size(); ++i){
            if(line[i]>'0' && line[i]<='9'){
                A.push_back(line[i] - '0');
            }
        }
        return A;
    }
};
```

## Problems B

压缩字符串

输入只含A-Z的字符串 不超过1000个字母将连续相同字母压缩为重复次数+字母（这个
忘记是多组输入还是单组了）

例：

输入 \\
ABBCCC

输出 \\
A2B3C

思路：

- 通过两个指针pre和i， 计算相同字符地个数
- 如果个数大于1，进行替换

```c++
class SolutionB{
public:
    void ProblemsB(){
        string str;
        getline(cin, str);
        ll pre = 0;
        ll Size = str.size();
        for(int i=1; i<Size; ++i){
            if(str[pre]==str[i]) continue;
            else{
                if(i-pre>1){
                    char c = str[i-1];
                    str.erase(str.begin()+pre, str.begin()+i-1);
                    str.insert(pre, 1, i-pre+'0');
                    str.insert(pre+1, 1, c);
                }
                pre = i;
            }
        }
        if(Size-pre>1){
            char c = str[Size-1];
            str.erase(str.begin()+pre, str.begin()+Size-1);
            str.insert(pre, 1, Size-pre+'0');
            str.insert(pre+1, 1, c);
        }
        cout << str << endl;
    }
};
```

这里string中用erase的方法不对，应该用坐标的


# Reference
1. [【机试】ProblemC（整数的最大素因子）](https://blog.csdn.net/coderwait/article/details/92712249)
2. [【Geek之路】《剑指offer》思路及代码合集](https://shawndong98.github.io/2020/02/24/Geek%E4%B9%8B%E8%B7%AF-%E5%89%91%E6%8C%87offer-%E6%80%9D%E8%B7%AF%E5%8F%8A%E4%BB%A3%E7%A0%81%E5%90%88%E9%9B%86/)
3. [哈夫曼树算法及C++实现](https://www.cnblogs.com/smile233/p/8184492.html)
4. [编程题——机器人走迷宫 （用C语言）](https://ask.csdn.net/questions/682814?sort=id)
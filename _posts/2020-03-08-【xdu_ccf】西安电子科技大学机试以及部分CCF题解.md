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
# Reference
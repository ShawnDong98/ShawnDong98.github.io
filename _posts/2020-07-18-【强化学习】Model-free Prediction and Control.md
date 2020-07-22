---
layout:     post
title:      "【强化学习】Model-free Prediction and Control"
subtitle:   ""
date:       2020-07-18
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 机器学习
    - 强化学习
---


# Model-free Prediction

估计未知MDP的价值函数

什么叫已知的MDP：
- R和P都暴露给智能体
- 因此可以使用policy iteration和value iteration

## Policy iteration

给定一个已知的MDP， 计算最优的策略和最优的价值函数

Policy evaluation：在Bellman expectation backup上迭代：

$$v_i(s) = \sum_{a \in A} \pi(a \mid s) (R(s, a) + \gamma \sum_{s' \in S} P(s' \mid s, a) v_{i-1}(s'))$$

上面在做的事情就是 将所有可能的action得到的价值按概率求和， 也就是求期望。

Policy improvement： 对action-value function q使用贪心算法

$$q_{\pi_i}(s, a) = R(s, a) + \gamma \sum_{s' \in S} P(s' \mid s, a) v_{\pi_i}(s')$$

$$\pi_{i+1}(s) = \mathop{argmax}_a q_{\pi_i}(s, a)$$

上面在座的事情就是： 将policy evaluation中求和的每项找出最大的

## Value iteration

给定一个已知的MDP， 计算最优的价值函数

在Bellman optimality backup上迭代：

$$v_{i+1} \leftarrow \max_{a \in A} R(s, a) + \gamma \sum_{s' \in S} P(s' \mid s, a) v_i(s')$$

在Value Iteration之后检索最优策略

$$\pi^*(s) \leftarrow \mathop{arg max}_a R(s, a) + \gamma \sum_{s' \in S} P(s' \mid s, a) v_{end}(s')$$


## Model-free RL: Learning by interaction

Model-free RL 能够通过和环境交互解决问题

不再直接地获取已知的动态转移和奖励函数

trajectories/episode 由智能体和环境交互收集

每个trajectory/episode 包含 
$$\{S_1, A_1, R_1, S_2, A_2, R_2, ..., S_T, A_T, R_T\}$$


如果我们没有获取MDP模型，估计一个特定策略的期望回报：
- Monte Caolo policy evaluation
- Temporal Difference（TD） learning

### Monte Carlo Policy Evaluation

Return： 在policy$\pi$下， $G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + ...$

$v^\pi(s) = E_{r \thicksim \pi}[G_t \mid s_t = s]$， 因此期望是由$\pi$产生的所有trajectories $\tau$

MC simulation： 我们可以仅仅采样很多的trajectories, 计算所有trajectory的实际回报， 然后平均它们

MC policy evaluation 使用均值回报替代期望回报

MC不需要MDP dynamics/rewards, 没有bootstrapping， 并且没有假设state是马尔科夫

仅应用于episodic MDPs（每个episode终结）


为了评估state $v(s)$
- 每个时间步骤$t$状态$s$在一个episode被访问
- 叠加计数器： $N(s) \leftarrow N(s) + 1$
- 叠加总回报： $S(s) \leftarrow S(s) + G_t$
- Value通过均值回报估计： $v(s) = S(s) / N(s)$

通过大数定律， $v(s) \rightarrow v^\pi(s)$ ， 当$N(s) \rightarrow \infty$

叠加均值(Incremental mean)

均值通过样本平均$x_1, x_2, ...$计算：

$$
\mu_t = \frac{1}{t} \sum_{j=1}^t x_j \\
= \frac{1}{t}(x_t + \sum_{j=1}^{t-1}x_j) \\
= \frac{1}{t}(x_t + (t - 1)\mu_{t-1}) \\
= \mu_{t-1} + \frac{1}{t}(x_t - \mu_{t-1})
$$


Incremental MC Updates

收集一个episode $(S_1, A_1, R_1, ..., S_t)$

对于每个状态 $s_t$ 计算回报 $G_t$

$$N(S_t) \leftarrow N(S_t) + 1$$

$$v(S_t) \leftarrow v(S_t) + \frac{1}{N(S_t)}(G_t - v(S_t))$$

或者使用running mean。 很好地解决非静止的问题：

$$v(S_t) \leftarrow v(S_t) + \alpha (G_t - v(S_t))$$

什么是running mean？

如果在计算之前，你不清楚有多少数据，且数据是一个一个获得， 此时计算的平均值称之为running_mean, 这样的计算场景称之为online。 


### 策略评估中DP和MC的区别

**动态规划（DP）**

动态规划(DP)通过由$v_{i-1}$估计的价值 bootstrapping得到其余的期望回报计算$v_i$

bootstrapping的意思是 估计一个量是根据之前计算的一个量来估计的。

在Bellman expectatiob backup上迭代：

$$v_i(s) \leftarrow \sum_{a \in A} \pi(a \mid s) (R(s, a) + \gamma \sum_{s' \in S} P(s' \mid s, a) v_{i-1}(s'))$$




**蒙特卡罗（MC）**

MC通过**一个采样的episode**更新期望回报

$$v(S_t) \leftarrow v(S_t) + \alpha (G_{i, t} - v(S_t))$$

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1595320632024.png)

**MC相对DP的优势**

MC可以工作在环境未知的情况下

即便完全了解环境的动态时， 使用采样episode工作仍然巨大的优势。 例如， 转移概率复杂到难以计算。

计算单个状态价值的成本独立于状态的总数量。 因此我们可以从感兴趣的状态开始采样episodes， 然后平均回报。

## Temporal-Difference（TD）Learning

TD方法从经历的episodes中直接学习

TD是model-free的： 无 MDP 转移/奖励 的知识

TD从不完整的episodes中通过bootstrapping学习


目标： 在策略$pi$下从经历中在线学习$v_\pi$

最简单的TD算法： TD(0)
- 通过估计回报$R_{t+1} + \gamma v(S_{t+1})$更新$v(S_t)$
- $$v(S_t) \leftarrow v(S_t) + \alpha(R_{t+1} + \gamma v(S_{t+1}) - v(S_t))$$

$R_{t+1} + \gamma v(S_{t+1})$被叫做TD target

$\delta_t = R_{t+1} + \gamma v(S_{t+1}) - v(S_t)$被叫做TD error

比较： 增量式的Monte-Carlo
- 给定一个episode $i$，  通过真实的回报 $G_t$ 更新 $v(S_t)$
- $$v(S_t) \leftarrow v(S_t) + \alpha (G_{i, t} - v(S_t))$$

### TD相对MC的优势

TD更新价值估计 使用$s_{t+1}$的采样 去估计一个期望

TD更新价值估计通过bootstrapping， 使用$V(s_{t+1})$估计

MC更新价值估计 使用一个回报的采样 去估计一个期望

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1595322149696.png)

### TD和MC的比较

TD能够在每一步后在线学习 \\
MC在回报已知前必须等待至episode的结束

TD可以从不完整的序列中学习 \\
MC只能从完成的序列中学习

TD工作在连续的(非终结的)环境 \\
MC仅工作在episodic（终结的）的环境

TD利用了马尔科夫属性， 在马尔科夫环境中更有效 \\
MC没有使用马尔科夫属性， 在非马尔科夫环境中更有效


### n-step TD

n-step TD 方法可以推广位 one-step TD 和 MC

我们可以从1到移动到其他的一个特定任务所需的数

对于$n = 1, 2, \infty$, 考虑下面的 n-step 回报：

$$n=1(TD) \quad G_t^{(1)} = R_{t+1} + \gamma v(S_{t+1})$$

$$n=2 \quad G_t^{(2)} = R_{t+1} + \gamma R_{t+2} + \gamma^2 v(S_{t+2})$$

$$n = \infty(MC) \quad G_t^{\infty} = R_{t+1} + \gamma R_{t+2} + ... + \gamma^{T-t-1} R_T$$

因此 n-step 回报可以定义为：

$$G_t^n = R_{t+1} + \gamma R_{t+2} + ... + \gamma^{n-1} R_{t+n} + \gamma^n v(S_{t+n})$$

n-step TD:

$$v(S_t) \leftarrow v(S_t) + \alpha(G_t^n - v(S_t))$$

## 对于DP、MC和TD的Bootstrapping和Sampling

Bootstrapping： 一次估计一次更新
- MC没有bootstrap
- DP有bootstrap
- TD有bootstrap

Sampling： 采样一次期望更新一次
- MC 采样
- DP不采样
- TD采样


![Dynamic Programming Backup](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1595346873170.png)

![Monte-Carlo Backup](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1595346904246.png)

![Temporal-Difference Backup](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1595346929158.png)

# Model-free Control

最优化未知MDP的价值函数

## Policy Iteration

通过两步迭代：
- 评估策略$\pi$（给定当前$\pi$， 计算$v$）
- 分别对$v_\pi$使用贪心算法提升策略

$$\pi' = greedy(v_\pi)$$

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1595410221707.png)

## 已知MDP的Policy Iteration

这是一个动态规划（DP）方法的Policy Iteration

计算一个策略$\pi$的state-action value：

$$q_{\pi_i}(s, a) = R(s, a) + \gamma \sum_{s' \in S} P(s' \mid s, a) v_{\pi_i}(s')$$

对所有的$s \in S$计算新的策略$\pi_{i+1}$有：

$$\pi_{i+1}(s) = \mathop{argmax}_a q_{\pi_i}(s, a)$$

问题：如果没有$R_{s, a}$和$P(s' \mid s, a)$应该怎么做？

## 使用Action-Value函数的广义Policy Iteration





# Reference
1. [强化学习纲要 第三课 无模型的价值函数估计和控制 上](https://www.bilibili.com/video/BV1N7411Q7aJ)







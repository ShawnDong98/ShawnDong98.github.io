---
layout:     post
title:      "【Geek】绑定 XDU 邮箱到 iOS"
subtitle:   ""
date:       2023-05-10
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - Geek
    -
---

# IMAP 和 POP3

先说结论，建议选择IMAP，因为你在各个客户端的操作可以与服务器（也就是你登陆邮箱网页）同步，详细解释可以往下看。

POP3协议允许邮件客户端下载服务器上的邮件，但是在客户端的操作（如删除、移动邮件、标记已读等），不会反馈到服务器上，比如通过客户端删除了几封不想再看的邮件，服务器上的这些邮件是没有被删除的，这就麻烦还得去网页上删除一遍 。而IMAP提供webmail 与电子邮件客户端之间的双向通信，客户端的操作都会反馈到服务器上，对邮件进行的操作，服务器上也会做出相应的动作。


# 绑定 XDU 邮箱到 iOS

首先输入你的邮件名称， 邮件地址，以及密码

点击下一步，需要填写接收服务器和发送服务器的 主机地址， 用户名和密码。

主机地址为： [edu.icoremail.net](edu.icoremail.net)

用户名和密码与你的邮箱的用户名和密码相同。

# Reference

1. [邮箱应该选择IMAP还是POP3呢？](https://www.zhihu.com/question/312936844/answer/867798586)
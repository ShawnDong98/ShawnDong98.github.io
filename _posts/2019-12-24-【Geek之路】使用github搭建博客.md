---
layout:     post
title:      "【Geek之路】使用github搭建博客"
subtitle:   ""
date:    2019-12-24   
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
tags:
    - Geek
    - Life
---

之前搭的hexo，感觉用起来很麻烦。

换了电脑，要重新配环境，索性重新搭个动态博客，使用docker来做，一次部署就行了。

然后发现好像不太好做，前后端知识差了不少。

最后选择了Hux Blog + 小书匠 + Github图床的解决方案。


## Hux Blog

感谢Hux大佬的开源

## 修改yaml文件

根据[Hux Blog](https://github.com/Huxpro/huxpro.github.io/blob/master/README.zh.md)进行相应个性化配置

### Post文章

注意：Jekyll的文章格式要求前面必须是日期，类似2018-09-17-这样的

## 小书匠markdown编辑器

小书匠支持直接绑定github并支持github图床

在github的settings中

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1585191571848.png)

找到Developer settigns

![](https://raw.githubusercontent.com/ShawnDong98/ShawnDong98.github.io/master/小书匠/1585191612776.png)

在Personal access tokens中生成token， 选好权限，记得保存下来。

在小书匠的绑定中绑定github和githubimg。


配置可以参考reference
[在github上搭建个人博客并在线更新。](https://www.cnblogs.com/wxyww/p/xiaoshujiang.html)

注意： 小书匠绑定github和github图床的时候token得是一样的
github图床的那个url用默认的就好，我自定义试了一下，显示不出来，可能路径不对

建立模版：

我的模版：

```
---
layout:     post
title:      "【】"
subtitle:   ""
date:       
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:     flase
tags:
    - 
    - 
---
```

## 评论功能和网站分析

### 评论功能
Hux说可以用disqus和多说，但是那个markdown可能太久没更新了
disqus被墙不能用
多说已经倒闭了

因此选择使用gitalk

根据Reference [gitalk配置](https://yizibi.github.io/2018/09/26/Mac-%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E6%95%99%E4%BD%A0%E5%9C%A8Jekyll%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F/)即可

## 网站分析

去Google Analytics注册一个ID粘贴到yml文件里就行，很简单。
具体可见[Hux Blog](https://github.com/Huxpro/huxpro.github.io/blob/master/README.zh.md)


### 给Blog加上catalog

- 修改markdown的yaml文件
像这样

```html
layout:     post
title:      "【机器学习】PyTorch学习笔记"
subtitle:   ""
date:       2019-04-03 22:02:36
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:    true
tags:
    - 机器学习
    - 深度学习
    - Pytorch
    - CV
```

- 下载一个js文件
在这里下载[catalog js文件](https://github.com/ghiculescu/jekyll-table-of-contents)

- 在_layout文件夹下的post.html添加代码


```html
<!--//添加catalog-->
<div id="toc"></div>
<script type="text/javascript">
    $(document).ready(function() {
        $('#toc').toc();
    });
    </script>
```


添加在头部就行



###  给博客添加访问量


使用不蒜子
在footer.html中添加以下代码


```html
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js">
                </script>
```


这个是不蒜子的js脚本

```html
<!--本站总访问量<span id="busuanzi_value_site_pv"></span>次，本站访客数<span id="busuanzi_value_site_uv"></span>人次，本文总阅读量<span id="busuanzi_value_page_pv"></span>次-->
                    <span class="site-uv" title="总点击人数">
                    <img src="/img/vendor/octicons/svg/person.svg" width="10" height="16">
                    <span class="busuanzi-value" id="busuanzi_value_site_uv"></span></span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span class="site-pv" title="总点击量">
                    <img src="/img/vendor/octicons/svg/eye.svg" width="16" height="16">
                    <span class="busuanzi-value" id="busuanzi_value_site_pv"></span></span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span class="page-pv"title="本页面点击人数">
                    <img src="/img/vendor/octicons/svg/file-text.svg" width="12" height="16">
                    <span class="busuanzi-value" id="busuanzi_value_page_pv"></span></span>
                    <br>
```
这个是显示的图标

## 使用MathJax显示Latex公式

在_includes/head.html的<head> </head>之间加入下列语句
```html
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        inlineMath: [['$','$']]
      }
    });
  </script>
  <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script> 
```

## 替换域名

免费域名：[https://my.freenom.com/clientarea.php](https://my.freenom.com/clientarea.php)

在github中的settings中的custom domain设置成自己的域名。

在dnspod中添加域名解析。

![](https://raw.githubusercontent.com/ShawnDong98/gitimage/main/小书匠/1601712475761.png)

成功。





## Reference
1. [在github上搭建个人博客并在线更新。](https://www.cnblogs.com/wxyww/p/xiaoshujiang.html)
2. [Jekyll Themes （主题下载）](http://jekyllthemes.org/)
3. [Hux Blog](https://github.com/Huxpro/huxpro.github.io/blob/master/README.zh.md)
4. [gitalk配置](https://yizibi.github.io/2018/09/26/Mac-%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E6%95%99%E4%BD%A0%E5%9C%A8Jekyll%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F/)
5. [PicGo下载](https://github.com/Molunerfinn/PicGo)
6. [catalog js文件](https://github.com/ghiculescu/jekyll-table-of-contents)
7. [不蒜子](http://ibruce.info/2015/04/04/busuanzi/)
8. [[已解决]如何在kramdown中插入数学公式并在这个博客中展现出来](https://www.dazhuanlan.com/2019/11/21/5dd5dcaf771d1/)

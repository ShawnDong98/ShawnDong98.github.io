---
layout:     post
title:      "【机器学习笔录】TensorFlow的数据读取机制以及在服务器上使用TensorBoard"
subtitle:   ""
date:       2018-09-23 19:48:23
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
tags:
    - 机器学习
    - 深度学习
    - Tensorflow
---



### TensorFlow的数据读取机制
> tf.train.string_input_producer(list， shuffle， num_epochs)

这个函数需要传入一个list，系统会自动将它转换为一个文件名队列。
shuffle指在一个epoch内文件的顺序是否被打乱。
epoth：对于一个数据集来讲，运行一个epoch就是将这个数据集中的图片
全部计算一遍。两个epoch就是每张图片都计算了两边。

> tf.train.start_queue_runners

 在使用tf.train.string_input_producer创建文件名队列后，整个系统其实还处于“停滞状态”，也就是说，文件名并没有真正被加入队列中。

而使用tf.train.start_queue_runners之后，才会启动填充队列的线程，这时的系统就不再“停滞”。计算单元可以拿到数据并进行计算，整个程序就运行起来了。

### TensorFlow读取数据的具体步骤
- 第一步， 用tf.train.string_input_producer建立队列。
- 第二步， 通过reader.read读数据。
 tf.WholeFileReader()
tf.FixedLengthReader()
- 第三步，调用tf.train.start_queue_runners。
- 最后通过sess.run()取出图片结果。

### 在数据的读取中线程的同步与停止
>coord = tf.train.Coordinator()
threads = tf.train.start_queue_runners(sess=sess, coord=coord)


tf.train.start_queue_runners函数中有一个参数coord，这个参数叫做线程协调器，用于协调线程之间的关系。

tf.train.start_queue_runners执行之后，会启动一个线程，线程协调器在最后负责对所有线程的接受和处理，即当一个线程结束以后，线程协调器会对所有线程发送通知，协调其完毕。

比如在主线程结束后，加上以下内容
>coord.request_stop()
        coord.join(threads)
             
# TensorBoard: 
本来以为会很复杂，实际过程比我想象的简单，输入命令：
>tensorboard --logdir=你训练数据保存的文件夹路径

打开服务器的6006端口，在浏览器里输入
> 服务器的IP地址:6006

就可以看到TensorBoard了(本人的服务器是Google的deep learning服务器，不知是否因为这个原因使配置变得简单了)。

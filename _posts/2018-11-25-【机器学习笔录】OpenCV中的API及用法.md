---
layout:     post
title:      "【机器学习笔录】OpenCV中的API及用法"
subtitle:   ""
date:       2018-11-25 21:14:14
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
catalog:    true
tags:
    - 机器学习
    - 深度学习
    - OpenCV
---



# C++部分

### 图像的加载显示与保存

**加载图像(cv::imread)**
- imread加载图像文件成为一个Mat对象，第一个参数表示图像名称
- 第二个参数表示加载的图像是什么类型，支持常见的三个参数值
- IMREAD_UNCHANGED(<0)表示加载原图，不做任何改变
- IMREAD_GARYSACLE(0)表示把原图作为灰度图像加载进来
- IMREAD_COLOR(>0)表示把原图作为RGB图像加载进来
ps：OpenCV支持JPG，PNG， TIFF等常见格式图像文件加载

**显示图像(cv::nameWindows与cv::imshow)**
- nameWindows功能是创建一个OpenCV窗口，它是由OpenCV自动创建与释放，你无需去销毁它
- 常见用法nameWindow("Window Title", WINDOW_AUTOSIZE)
- WINDOW_AUTOSIZE会自动根据图像大小，显示窗口大小，不能人为改变窗口大小
- WiINDOW_NORMAL, 跟QT集成的时候会使用，允许修改窗口大小
- imshow根据窗口名称显示图像到指定的窗口上去，第一个参数是窗口名称，第二参数是Mat对象

**保存图像(cv::imwrite)**
- 保存图像文件到指定目录路径
- 只有8位，16位的PNG、JPG、Tiff文件格式而且是单通道或者三通道的BGR的图像才可以通过这种方式保存
- 保存PNG格式的时候可以保存透明通道的图片
- 可以指定压缩参数

### 矩阵的掩膜操作

**获取图像指针**
- CV_Assert(myImage.depth()==CV_8U);
- Mat.ptr<uchar>(int i=0)获取像素矩阵的指针， 索引i表示第几行， 从0开始计行数
- 获得当前行指针const uchar* current = myImage.ptr<uchar>(row);
- 获取当前像素点P(row, col)的像素值p(row, col) = current[col]

**像素范围处理**
- saturate_cast<uchar>(-100), 返回0.
- saturate_cast<uchar>(288), 返回255.
- saturate_cast<ucahr>(100), 返回100.
- 这个函数的功能是确保RGB值的范围在0~255之间

**掩膜操作实现图像对比度调整**
- 红色是中心像素，从上到下，从左到右对每个像素做同样的处理操作，得到最终结果就是对比度提高之后的输出图像Mat对象
- 根据掩膜来重新计算每个像素的像素值，掩膜(mask, 也被称为Kernel)

ps: 感觉和卷积很相似
![](https://upload-images.jianshu.io/upload_images/8332901-e623dcd69f724d5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/8332901-a5e0d3320baccd3e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
代码实现：
```
    int cols = (src.cols - 1) * src.channels();
	int offsetx = src.channels();
	int rows = src.rows;
	dst = Mat::zeros(src.size(), src.type());
	for (int row = 1; row < (rows - 1); row++)
	{
		const uchar* previous = src.ptr<uchar>(row - 1);
		const uchar* current = src.ptr<uchar>(row);
		const uchar* next = src.ptr<uchar>(row + 1);
		uchar* output = dst.ptr<uchar>(row);
		for (int col = offsetx; col < cols; col++)
		{
			output[col] = saturate_cast<uchar>(5 * current[col] - (current[col - offsetx] 
                                               + current[col + offsetx] + previous[col] + next[col]));
		}
	}
```

**函数调用filer2D功能**
1. 定义掩膜：Mat kernel = (Mat_<char>(3, 3)<<0, -1, 0, -1, 5, -1, 0, -1, 0);
2. filter2D(src, dst, src.depth(), kernel);其中src与dst是Mat类型变量，src.depth表示位图深度， 有32， 24， 8等。
代码实现：可以实现和上面代码同样的功能
```
   	double t;
	t = (double)getTickCount();
	filter2D(src, dst, src.depth(), kernel);
	t = ((double)getTickCount() - t) / getTickFrequency();
	cout << "Built in Filter2D time passed in seconds" << t << endl;
```
### Mat对象

**Mat对象与IplImage对象**
- Mat对象OpenCV2.0后引进的图像数据结构、自动分配内存，不存在内存泄漏的问题，是面向对象的数据结构。分了两个部分，头部与数据部分
- IplImage是从2001年OpenCV发布之后就一直存在，是C语言风格的数据结构，需要开发者自己分类和管理内存，对大的程序使用它容易导致内存泄漏问题

**Mat对象构造函数与常用方法**
构造函数：
  - Mat()
  - Mat(int rows, int cols, int type)
  - Mat(Size size, int type)
  - Mat(int rows, int cols, int type, const Scalar &s)
  - Mat(Size size, int type, const Scalar &s)
  - Mat(int ndims, const int *sizes, int type)
  - Mat(int ndims, const int *szie, int type, const Scalar &s)

  常用方法：
   - void copyTo(Mat mat)
   - void convertTo(Mat dst, int type)
   - Mat clone()
   - int channels()
   - int depth()
   - bool empty()
   - uchar* ptr(i=0) 

**Mat对象使用**
- 部分复制：一般情况下只会复制Mat对象的头和指针部分，不会复制数据部分

```
Mat A = imread(imgFilePath);
Mat B(A) //只复制
```

- 完全复制：如果想把Mat对象的头部和数据部分一起复制，可以通过以下两个API实现
```
Mat F = A.clone();
Mat G;
A.copyTo(G)
```

**Mat对象使用的四个要点**
- 输出图像的内存是自动分配的
- 使用OpenCV的C++接口， 不需要考虑内存分配问题
- 赋值操作和拷贝构造函数只会复制头部分
- 使用clone与copyTo两个函数实现数据完全复制

**Mat对象创建**
- cv::Mat::Mat构造函数
  Mat M(2, 2, CV_8UC3, Scalar(0, 0, 255))
  其中前两个参数分别表示行(row)跟列(column)、第三个CV_8UC3中的8表示每个通道占8位、 U表示无符号,     
  C表示char类型，3表示通道数目是3， 第四个参数是向量表示初始化每个像素值是多少，向量长度对应通道
  数目一致
- 创建多维数组cv::Mat::create
  int sz[3] = [2, 2, 2];
  Mat L(3, sz, CV_8UC1, Scalar::all(0));
  cv::Mat::create实现
```
Mat M;
M.create(4, 3, CV_8UC2);
M = Scalar(127, 127);
```

**定义小数组**
```
Mat C = (Mat_<double>(3, 3) <<  0, -1, 0, -1, 5, -1, 0, -1, 0);
cout << "C = " << endl << C << endl << endl;
```

### 图像操作
- 读写图像
- 读写像素
- 修改像素值
  - 灰度图像
 ```
	cvtColor(src, gray_src, CV_BGR2GRAY);
	int height = gray_src.rows;
	int width = gray_src.cols;
	for(int row = 0; row < height; row++)
	{
		for (int col = 0; col < width; col++)
		{
			int gray = gray_src.at<uchar>(row, col);
			gray_src.at<uchar>(row, col) = 255 - gray;
		}
	}
```
  - RGB三通道图像
```
for (int row = 0; row < height; row++)
	{
		for (int col = 0; col < width; col++)
		{
			if (nc == 1)
			{
				int gray = gray_src.at<uchar>(row, col);
				gray_src.at<uchar>(row, col) = 255 - gray;
			}
			else if (nc == 3)
			{
				int b = src.at<Vec3b>(row, col)[0];
				int g = src.at<Vec3b>(row, col)[1];
				int r = src.at<Vec3b>(row, col)[2];
				dst.at<Vec3b>(row, col)[0] = 255 - b;
				dst.at<Vec3b>(row, col)[1] = 255 - g;
				dst.at<Vec3b>(row, col)[2] = 255 - r;
			}
		}
	}
```
其实以上代码和 bitwise_not(src. dst) 这个api效果是一样的
  - 空白图像赋值
  - ROI选择

Vec3b与Vec3F
- Vec3b对应三通道的顺序是blue、green、 red的uchar类型数据
- Vec3f对应三通道的float类型数据
- 把CV_8UC1转换到CV32F1实现如下：
  src.convertTo(dst, CV_32F);

### 图像混合
- 理论-线性混合操作
![](https://upload-images.jianshu.io/upload_images/8332901-11155330865f1a13.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 相关API(addWeighted)
```
void cv::addWeighted(inputArray src1,
                     double alpha,
                     inputArray src2,
                     double beta,
                     double gamma,
                     OutputArray dst,
                     int dtype = -1
                    )
```
参数1： 输入图像Mat - src1
参数2： 输入图像src1的alpha值
参数3： 输入图像Mat - src2
参数4： 输入图像src2的alpha值
参数5： gamma值
参数6： 输出混合图像
**注意：**两张图像的大小和类型必须一致才可以
- 代码演示
```
	double alpha = 0.5;
	if (src1.rows == src2.rows && src1.cols == src2.cols && src1.type() == src2.type())
	{
		addWeighted(src1, alpha, src2, (1.0 - alpha), 0.0, dst);
		//multiply(src1, src2, dst, 1.0);
		namedWindow("blend demo ", CV_WINDOW_AUTOSIZE);
		imshow("blend demo", dst);

	}
```

### 调整图像亮度和对比度

**理论**
图像变换可以看作如下：
 - 像素变换-点操作
 - 邻域操作-区域
调整图像亮度和对比度属于像素变换-点操作
![](https://upload-images.jianshu.io/upload_images/8332901-cc7dd5d2625adcc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**代码演示**
```
for (int row = 0; row < height; row++)
	{
		for (int col = 0; col < width; col++)
		{
			if (nc == 1)
			{
				int v = src.at<uchar>(row, col);
				dst.at<uchar>(row, col) = 255 - v;
			}
			else if (nc == 3)
			{
				int b = src.at<Vec3b>(row, col)[0];
				int g = src.at<Vec3b>(row, col)[1];
				int r = src.at<Vec3b>(row, col)[2];
				dst.at<Vec3b>(row, col)[0] = saturate_cast<uchar>(b*alpha + beta);
				dst.at<Vec3b>(row, col)[1] = saturate_cast<uchar>(g*alpha + beta);
				dst.at<Vec3b>(row, col)[2] = saturate_cast<uchar>(r*alpha + beta);
			}
		}
```
其中alpha控制对比度，beta控制亮度。

**重要的API**
- Mat new_image = Mat::zeros(image.size(), image.type());创建一张跟原图像大小和类型一致的空包图像、像素值初始化为0.
- saturate_cast<uchar>(value)确保值大小范围为0~255之间
- Mat.at<Vec3b>(y, x)[index] = value 给每个像素点每个通道赋值

### 绘制形状和文字
- 使用cv::Point与cv::Scalar
  - Point表示2D平面上一个点x, y
    Point p;
    p.x = 10;
    p.y = 8;
    or
    p = Point(10, 8) 
  - Scalar表示四个元素的向量
  ```
    Scalar(a, b, c); //a = blue, b = green, c = red表示RGB三个通道
  ```
- 绘制线、矩形、圆、椭圆等基本几何形状
  - 画线cv::line(LINE_4\LINE_8\LINE_AA)
  ```
  void myLines()
  {
	Point p1 = Point(20, 30);
	Point p2;
	p2.x = 400;
	p2.y = 400;
	Scalar color = Scalar(0, 0, 255);
	line(src, p1, p2, color, 1, LINE_8);
  }
  ```
  - 画椭圆cv::ellipse
  ```
  void myEllipse()
  {
	Scalar color = Scalar(0, 255, 0);
	ellipse(src, Point(src.cols / 2, src.rows / 2), Size(src.cols / 4, src.rows / 8), 90, 0, 360, color, 2, LINE_8);
  }
  ```
  - 画矩形cv::rectangle
  ```
  void myRectangle()
  {
	Rect rect = Rect(200, 100, 300, 300);
	Scalar color = Scalar(255, 0, 0);
	rectangle(src, rect, color, 1, LINE_8);
  }
  ```
  - 画圆cv::circle
  ```
  void myCircle()
  {
	Scalar color = Scalar(0, 255, 255);
	Point center = Point(src.cols / 2, src.rows / 2);
	circle(src, center, 150, color, 1, LINE_8);
  }
  ```
  - 画填充cv::fillPoly 
  ```
  void myPolygon()
  {
	Point pts[1][5];
	pts[0][0] = Point(100, 100);
	pts[0][1] = Point(100, 200);
	pts[0][2] = Point(200, 200);
	pts[0][3] = Point(200, 100);
	pts[0][4] = Point(100, 100);

	const Point* ppts[] = { pts[0] };
	int npt[] = { 5 };
	Scalar color = Scalar(255, 12, 255);

	fillPoly(src, ppts, npt, 1, color, 8);
  }
  ```
  
- 随机生成(随机数生成cv::RNG)与绘制文本
  - 生成高斯随机数gaussian(double sigma)
  - 生成正态分布随机数uniform(int a, int b)
  ```
  void RandomLineDemo()
  {
	RNG rng(12345);
	Point pt1;
	Point pt2;
	Mat bg = Mat::zeros(src.size(), src.type());
	namedWindow("random line demo", CV_WINDOW_AUTOSIZE);
	for (int i = 0; i < 65535; i++)
	{
		pt1.x = rng.uniform(0, src.cols);
		pt2.x = rng.uniform(0, src.cols);
		pt1.y = rng.uniform(0, src.rows);
		pt2.y = rng.uniform(0, src.rows);
		Scalar color = Scalar(rng.uniform(0, 255), rng.uniform(0, 255), rng.uniform(0, 255));
		if (waitKey(50) > 0)
			break;
		line(bg, pt1, pt2, color, 1, 8);
		imshow("random line demo", bg);
	}

  }
  ```
### 模糊操作一
- 模糊原理
  - Smooth/Blur是图像处理中最简单和常用的操作之一
  - 使用该操作的原因之一就是为了给图像预处理时候减低噪声
  - 使用Smooth/Blur操作背后是数学的卷积计算
![](https://upload-images.jianshu.io/upload_images/8332901-fb9e1ac912d43a61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 通常这些卷积算子计算都是线性操作，所以又叫线性滤波
  - 归一化盒子滤波(均值滤波）
![](https://upload-images.jianshu.io/upload_images/8332901-7708e223e17c0c65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - 高斯滤波
![](https://upload-images.jianshu.io/upload_images/8332901-4e5f39fcb63bed59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/8332901-24a38b82a066faf8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
假设有6x6的图像像素点矩阵
卷积过程：6x6上面是个3x3的窗口，从左到右，从上向下移动，黄色的每个像素点值之和取平均值赋给中心红色像素作为它卷积处理之后新的像素值。每次移动一个像素格。(均值滤波)

- 相关API
  - 均值模糊
    blur(Mat src, Mat dst, Size(xradius, yradius), Point(-1, -1));
    ![](https://upload-images.jianshu.io/upload_images/8332901-76d3284f5c3b0648.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 高斯模糊
    GaussianBlur(Mat src, Mat dst, Size(11, 11), sigmax, sigmay);
    其中Size(x, y), x, y必须为正数而且是奇数

### 模糊操作二
- 中值滤波
  - 统计排序滤波器
  - 中值对椒盐噪声有很好的抑制作用(巡线时可以用到)
- 双边滤波(高斯双边滤波)
  - 均值模糊无法克服边缘像素信息丢失缺陷。原因是均值滤波是基于平均权重。
  - 高斯模糊部分克服了该缺陷，但是无法完全避免， 因为没有考虑像素值的不同
  - 高斯双边模糊-是边缘保留的滤波方法，避免了边缘信息丢失，保留了图像轮廓不变
![](https://upload-images.jianshu.io/upload_images/8332901-cbbe1a3094f42ac3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


相关API
  - 中值模糊medianBlur(Mat src, Mat dst, ksize)
  **中值模糊的ksize大小必须是大于1而且必须是奇数**
  - 双边模糊bilateraFilter(src, dst, d=15, 150, 3);
    - 15计算的半径，半径之内的像素会被纳入计算，如果提供-1则根据sigma space参数取值
    - 150 - sigma color决定多少之内的像素会被计算
    - 3 - sigma space如果d的值大于0则声明无效，否则根据它来计算d值

 
### 膨胀与腐蚀

**形态学操作(morphology operators)**
- 图像形态学操作-基于形状的一系列图像处理操作的合集，主要是基于集合论基础上的形态学数学
- 形态学有四个基本操作：腐蚀、膨胀、开、闭
- 膨胀与腐蚀是图像处理中最常用的形态学操作手段

**形态学操作-膨胀**
- 跟卷积操作类似， 假设有图像A和结构元素B， 结构元素B在A上面移动，其中B定义其中心为锚点，计算B覆盖下A的最大像素值用来替换锚点的像素，其中B作为结构体可以是任意形状

**形态学操作-腐蚀**
- 腐蚀跟膨胀操作的过程类似，唯一不同的是以最小值替换锚点重叠下图像的像素值

**相关API**
  - getStucturingElement(int shape, Size ksize, Point anchor)
    - 形状(MORPH_RECT\MORPH_CROSS\MORPH_ELLIPSE)
    - 大小
    - 锚点 默认是Point(-1, -1)意思就是中心像素
  - dilate(src, dst, kernel)
  ![](https://upload-images.jianshu.io/upload_images/8332901-5c6aca704ec2dcbd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - erode(src, dst, kernel)
![](https://upload-images.jianshu.io/upload_images/8332901-4ba4ff31ab6e29df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

代码演示：
```
void CallBack_Demo(int, void*)
{
	int s = element_size * 2 + 1;
	Mat structureElement = getStructuringElement(MORPH_RECT, Size(s, s), Point(-1, -1));
	//dilate(src, dst, structureElement, Point(-1, -1), 1);
	erode(src, dst, structureElement, Point(-1, -1));
	imshow(OUTPUT_WIN, dst);
}
```

**动态调整结构元素大小**
- TrackBar-createTrackbar(const String &trackbarname, const String winName, int* value, int count, Trackbarcallback func, void* userdata=0)
  其中最重要的是callback函数功能。如果设置为NULL就是说只有值update，但是不会调用callback的函数。

代码演示：
```
createTrackbar("Element Size:", OUTPUT_WIN, &element_size, max_size, CallBack_Demo);
```

### 形态学操作
- 开操作-open
  - 先腐蚀后膨胀
![](https://upload-images.jianshu.io/upload_images/8332901-1a03460f27443056.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - 可以去掉小的对象，假设对象是前景色，背景是黑色
![](https://upload-images.jianshu.io/upload_images/8332901-4912d626c6015e63.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 闭操作-close
  - 先膨胀后腐蚀(bin2) 
![](https://upload-images.jianshu.io/upload_images/8332901-9879c88f505064c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - 可以填充小的洞(fill hole), 假设对象是前景色，背景是黑色
![](https://upload-images.jianshu.io/upload_images/8332901-b7adfe011f3be127.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

总结：闭操作用于去掉小黑点，开操作用于去掉小白点


- 形态学梯度-Morphological Gradient
  - 膨胀减去腐蚀
![](https://upload-images.jianshu.io/upload_images/8332901-3c3a67f5f066cddf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - 又称为基本梯度(其他还包括内部梯度(原图减去腐蚀)、方向梯度(在x和y方向进行一个梯度的计算))
- 顶帽-top hat
  - 顶帽是原图像与开操作(先腐蚀后膨胀)之间的差值图像
![](https://upload-images.jianshu.io/upload_images/8332901-05d5c3499efb37c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 黑帽-black hat
  - 黑帽是闭操作(先膨胀后腐蚀)与原图像之间的差值图像
![](https://upload-images.jianshu.io/upload_images/8332901-c99cf1e28214243e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**相关API**
- morphologyEx(src, dst, CV_MOP_BLACKHAT,kernel);
  - Mat src - 输入图像
  - Mat dst - 输出结果
  - int OPT-CV_MOP_OPEN/CV_MOP_CLOSE/CV_MOP_GRADIENT/CV_MOP_TOPHAT/CV_MOP_BLACKHAT形态学操作类型
  - Mat kernel 结构元素
  - int Iteration 迭代次数， 默认是1

代码示例：
```
	namedWindow(OUTPUT_WIN, CV_WINDOW_AUTOSIZE);
	Mat kernel = getStructuringElement(MORPH_RECT, Size(11, 11), Point(-1, -1));
	morphologyEx(src, dst,CV_MOP_CLOSE, kernel, Point(-1, -1));
	imshow(OUTPUT_WIN, dst);
```

### 形态学操作应用-提取水平和垂直直线

**原理方法**
> 图像形态学操作时候，可以通过自定义的结构元素实现结构元素对输入图像一些对象敏感、另外一些对象不敏感，这样就会让敏感的对象改变而不敏感的对象保留输出。通过使用两个最基本的形态学操作-膨胀与腐蚀，使用不同的结构元素实现对输入图像的操作，得到想要的结果。

- 膨胀，输出的像素值是结构元素覆盖下图像的最大像素值
- 腐蚀，输出的像素值是结构元素覆盖下图像的最小像素值

**结构元素**
- 上述膨胀与腐蚀过程可以使用任意的结构元素
- 常见的形状：矩形、圆、直线、磁盘形状、砖石形状等各种自定义形状

**提取步骤**
- 输入图像彩色图像imread
- 转换为灰度图像-cvtColor
- 转换为二值图像-adaptiveThreshold
- 定义结构元素
- 开操作(腐蚀+膨胀)提取水平与垂直线

**转换为二值图像-adaptiveThreshold**
```
adativeThreshold(
Mat src, //输入的灰度图像
Mat dst, //二值图像
double maxValue, //二值图像最大值
int adaptiveMethod, //自适应方法，只能其中之一
                   //ADAPTIVE_THRESH_MEAN_C, ADAPTIVE_THRESH_GAUSSIAN_C
int thresholdType, //阈值类型
int blocksize, //块大小
double C //常量C 可以是正数， 0， 负数
)
```
![](https://upload-images.jianshu.io/upload_images/8332901-386c9912a090157e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


注意：自适应阈值二值化的方式通过计算每个像素周围bxb大小像素块的加权均值并减去常量C得到，如果图片像素比较高，像素块又比较小，有可能会出现二值不好的情况，比如这样，黑色的部分被二值成了白色。
![](https://upload-images.jianshu.io/upload_images/8332901-45db5f48f6a623a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


代码实现：
```
void Binarry_Line()
{
	Mat gray_src;
	cvtColor(src, gray_src, CV_BGR2GRAY);
	namedWindow("gray_image", CV_WINDOW_NORMAL);
	cvResizeWindow("gray_image", 500, 500);
	imshow("gray_image", gray_src);

	Mat binImg;
	threshold(gray_src, binImg, 80, 255, THRESH_BINARY_INV);
	//adaptiveThreshold(gray_src, binImg, 255, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY, 101, -2);
	namedWindow("binarry image", CV_WINDOW_NORMAL);
	cvResizeWindow("binarry image", 500, 500);
	imshow("binarry image", binImg);

	Mat hline = getStructuringElement(MORPH_RECT, Size(src.cols / 16, 1), Point(-1, -1));
	Mat vline = getStructuringElement(MORPH_RECT, Size(1, src.rows / 16), Point(-1, -1));

	Mat temp;
	erode(binImg, temp, hline);
	dilate(temp, dst, hline);
	namedWindow("final image", CV_WINDOW_NORMAL);
	cvResizeWindow("final image", 500, 500);
	imshow("final image", dst);
	//createTrackbar("Element Size:", OUTPUT_WIN, &element_size, max_size, CallBack_Demo);
	//CallBack_Demo(0, 0);
}
```
### 图像上采样和降采样

- **图像金字塔概念**
![](https://upload-images.jianshu.io/upload_images/8332901-980892cea0292987.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 我们在图像处理中常常会调整图像大小，最常见的就是放大(zoom in)和缩小(zoom out)。
2. 一个图像金子塔是一系列的图像组成，最底下一张是图像尺寸最大，最上方的图像尺寸最小，从空间上向下看就像一个古代的金字塔。
  - **高斯金字塔**
    - 高斯金字塔是从底向下，逐层采样得到。
    - 降采样之后图像大小是原图像MxN的M/2 x N/2， 就是对原图像删除偶数行与列，即得到降采样之后上一层的图片。
    - 高斯金字塔的生成过程分两步
      1. 对当前层进行高斯模糊
      2. 删除当前层的偶数行与列
      即可得到上一层的图像，这样上一层跟下一层相比，就只有它的1/4大小
  - **拉普拉斯金字塔**

- **高斯不同(Difference of Gaussian-DOG)**
  - 定义：就是把同一张图像在不同的参数下做高斯模糊之后的结果相减，得到的输出图像，称为高斯不同(DOG)
  - 高斯不同是图像的内在特征， 在灰度图像增强、角点检测中经常用到。
- 采样相关API
  - 上采样(cv::pyrUp) - zoom in 放大
  - 降采样(cv::pyrDown) - zoom out 缩小
  pyrUp(Mat src, Mat dst, Size(src.cols*2, src.rows*2))
  生成的图像是原图在宽与高各放大两倍
  pyrDown(Mat src, Mat dst, Size(src.col/2, src.rows/2))
  生成的图像是原图在宽与高各缩小1/2

- 代码演示
```
void Sample()
{
	//上采样
	Mat s_up;
	pyrUp(src, s_up, Size(src.cols * 2, src.rows * 2));
	namedWindow("sample up ", CV_WINDOW_AUTOSIZE);
	imshow("sample up ", s_up);

	//降采样
	Mat s_down;
	pyrDown(src, s_down, Size(src.cols / 2, src.rows / 2));
	namedWindow("sample down ", CV_WINDOW_AUTOSIZE);
	imshow("sample down ", s_down);

	Mat gray_src, g1, g2, dogImg;
	cvtColor(src, gray_src, CV_BGR2GRAY);
	GaussianBlur(gray_src, g1, Size(3, 3), 0, 0);
	GaussianBlur(g1, g2, Size(3, 3), 0, 0);
	subtract(g1, g2, dogImg, Mat());
	normalize(dogImg, dogImg, 255, 0, NORM_MINMAX);
	imshow("DOG Image", dogImg);
}
```
### 基本阈值操作（二值化）

- **图像阈值(threshold)**
  - 阈值类型-阈值二值化(threshold binary)
  > 左下方的图表示图像像素点Src(x, y)值分布情况， 蓝色水平线表示阈值
![](https://upload-images.jianshu.io/upload_images/8332901-1c643b26920772ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 阈值类型-阈值反二值化(threshold binary Inverted)
  >  左下方的图表示图像像素点Src(x, y)值分布情况， 蓝色水平线表示阈值
![](https://upload-images.jianshu.io/upload_images/8332901-e519e5b205178cac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 阈值类型-阈值取零(threshold to zero)
  >  左下方的图表示图像像素点Src(x, y)值分布情况， 蓝色水平线表示阈值
![](https://upload-images.jianshu.io/upload_images/8332901-7519c02aa5a28fa3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 阈值类型-阈值反取零(threshold to zero inverted)
  > 左下方的图表示图像像素点Src(x, y)值分布情况， 蓝色水平线表示阈值
  ![](https://upload-images.jianshu.io/upload_images/8332901-0d396a4d2d996fe1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 阈值类型
  ![](https://upload-images.jianshu.io/upload_images/8332901-77d12a2912f15559.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
THRESH_OTSU和THRESH_TRIANGLE处理的图像只能是8位的，一般来说是灰度图像

代码演示
```
void Threshold_Demo(int, void*)
{

	cvtColor(src, gray_src, CV_BGR2GRAY);
	threshold(gray_src, dst, threshold_value, threshold_max, type_value);
	imshow(output_title, dst);
}
```
### 自定义线性滤波

**卷积概念**
 - 卷积是图像处理中的一个操作，是kernel在图像的每个像素上的操作。
 - kernel本质上一个固定大小的矩阵数组，其中心点称为锚点(anchor point)

**卷积如何工作**
  - 把kernel放到像素数组之上，求锚点周围覆盖的像素乘积之和(包括锚点), 用来替换锚点覆盖下像素点值称为卷积处理。数学表达式如下：
![](https://upload-images.jianshu.io/upload_images/8332901-fd7533d15e3948ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/8332901-ddb6a82b4a1d6abd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


卷积核又被称为算子
**常见算子**：
- Robert算子：
![](https://upload-images.jianshu.io/upload_images/8332901-9cf7c51b31e50cab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Robert算子也叫梯度算子，分别提取x方向的梯度和y方向的梯度
```
void Robert()
{
	//Robert_X方向
	Mat kernel_x = (Mat_<int>(2, 2) << 1, 0, 0, -1);
	filter2D(src, dst, -1, kernel_x, Point(-1, -1), 0.0);
	namedWindow("Robert_X", WINDOW_AUTOSIZE);
	imshow("Robert_X", dst);

	//Robert_Y方向
	Mat ying;
	Mat kernel_y = (Mat_<int>(2, 2) << 0, 1, -1, 0);
	filter2D(src, ying, -1, kernel_y, Point(-1, -1), 0.0);
	namedWindow(output_title, WINDOW_AUTOSIZE);
	imshow(output_title, ying);
}

```
- Sobel算子：表现方向上的差异
![](https://upload-images.jianshu.io/upload_images/8332901-9e99aca151ed219b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
void Sobel()
{
	//Sobel_X方向的差异
	//Mat kernel_x = (Mat_<int>(3, 3) << -1, 0, 1, -2, 0, 2, -1, 0, 1);
	//Sobel_Y方向的差异
	Mat kernel_y= (Mat_<int>(3, 3) << -1, -2, -1, 0, 0, 0, 1, 2, 1);
	filter2D(src, dst, -1, kernel_y, Point(-1, -1), 0.0);
	namedWindow("Sobel", WINDOW_AUTOSIZE);
	imshow("Sobel", dst);
}
```
- 拉普拉斯算子：提取边缘体征
![](https://upload-images.jianshu.io/upload_images/8332901-a4f306a773e873da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
void Laplasian()
{
	Mat kernel = (Mat_<int>(3, 3) << 0, -1, 0, -1, 4, -1, 0, -1, 0);
	filter2D(src, dst, -1, kernel, Point(-1, -1), 0.0);
	namedWindow("Laplasian", WINDOW_AUTOSIZE);
	imshow("Laplasian", dst);
}
```

**自定义卷积模糊**
API:
```
filter2D(Mat src, //输入图像
         Mat  dst, //输出图像
         Mat  depth, //图像深度 32/8
         Mat  kernel, //卷积核/模板
         Point anchor, //锚点位置
         double delta //计算出来的像素+delta
         )
```
代码演示：
```
void Customer_Filter()
{
	while (true)
	{
		char c = waitKey(500);
		if (c == 27)
		{
			break;
		}
		int ksize = 4 + (index % 5) * 2 + 1;
		Mat kernel = Mat::ones(Size(ksize, ksize), CV_32F) / (float)(ksize * ksize);
		filter2D(src, dst, -1, kernel, Point(-1, -1));
		index++;
		namedWindow("customer_filter", WINDOW_AUTOSIZE);
		imshow("customer_filter", dst);

	}
}
```

### 处理卷积边缘

**卷积边界问题**
  - 图像卷积的时候边界像素，不能被卷积操作，原因在于边界像素没有完全跟kernel重叠，所以当3x3滤波时候有1个像素的边缘没有被处理，5x5滤波的时候有2个像素的边缘没有被处理。

**处理边缘**
  - 在卷积开始之前增加边缘像素，填充的像素值为0或者RGB黑色，比如3x3在四周各填充1个像素的边缘，这样就确保图像的边缘被处理，在卷积处理之后再去掉这些边缘。opencv中默认的处理方法是：BORDER_DEFAULT, 此外常用的还有如下几种：
    - BODER_CONSTANT - 填充边缘用指定像素值
    - BODER_REPLICATE - 填充边缘像素用已知的边缘像素值。
    - BODER_WRAP - 用另外一边的像素来补偿填充 

**API说明**
```
copyMakeBorder(
    Mat src， //输入图像
    Mat dst， //添加边缘图像
    int top，  //边缘长度， 一般上下左右都取相同值
    int bottom，
    int left，
    int right，
    int boderType，
    Scalar value
    )
```

### Sobel算子
**卷积应用-图像边缘提取**
- 边缘是什么 - 是像素值发生跃迁的地方，是图像的显著特征之一，在图像特征提取、对象检测、模式识别等方面都有重要的作用
- 如何捕捉/提取边缘-对图像求它的一阶导数
  delta = f(x) - f(x-1), delta越大，说明像素在x方向变化越大，边缘信号越强

**Sobel算子**
- 是离散微分算子(discrete differentiation operator)，用来计算图像灰度的近似梯度
- Sobel算子功能集合高斯平滑和微分求导
- 又被称为一阶微分算子， 求导算子， 在水平和垂直两个方向上求导，得到图像x方法与y方向梯度图像
![](https://upload-images.jianshu.io/upload_images/8332901-808804db37b66fbd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 求取导数的近似值，kennel=3时不是很准确，OpenCV使用改进版本Scharr函数，算子如下：
![](https://upload-images.jianshu.io/upload_images/8332901-5fcc9737e22c0365.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



**API说明cv::Sobel**
```
cv::Sobel(
    InputArray Src, //输入图像
    OutputArray dst, //输出图像，大小与输入图像一致
    int depth, //输出图像深度
    int dx, //x方向， 几阶导数
    int dy, //y方向， 几阶导数
    int ksize, //Sobel算子kernel大小， 必须是1、 3、5、 7、（单数)
    double scale = 1,
    double delta = 0,
    int borderType = BORDER_DEFAULT
    )
```

![](https://upload-images.jianshu.io/upload_images/8332901-31ff2bbc74697cdd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Laplacian算子

**理论**
> 在二阶微分的时候， 最大变化处的值为零即边缘是零值。通过二阶导数计算，依据此理论我们可以计算图像二阶导数，提取边缘。

![image.png](https://upload-images.jianshu.io/upload_images/8332901-09b3c297d0f447c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**Laplacian算子**
- 拉普拉斯算子(Laplacian operator)
![](https://upload-images.jianshu.io/upload_images/8332901-b140af8897223b7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 相关API：cv::Laplance

**处理流程**
- 高斯模糊-去噪声GaussianBlur()
- 转换为灰度图像cvtColor()
- 拉普拉斯-二阶导数计算Laplacian()
- 取绝对值convertScaleAbs()
- 显示结果


### Canny边缘检测

图像的边缘检测的原理是检测出图像中所有灰度值变化较大的点，而且这些点连接起来就构成了若干线条，这些线条就可以称为图像的边缘

**Canny算法介绍**
- Canny是边缘检测算法，在1986年提出。
- 是一个很好的边缘检测器
- 很常用也很实用的图像处理方法

**Canny算法过程-五步**
1. 高斯模糊-GaussianBlur
2. 灰度转换-cvtColor
3. 计算梯度-Sobel/Scharr
4. 非最大信号抑制
5. 高低阈值输出二值图像

**Canny算法介绍-非最大信号抑制**
![](https://upload-images.jianshu.io/upload_images/8332901-7ea55e85fbfb7985.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这里不是很明白

**Canny算法介绍-高低阈值输出二值图像**
- T1， T2为阈值， 凡是高于T2的都保留， 凡是小于T1都丢弃， 从高于T2的像素出发， 凡是大于T1而且相互连接的，都保留。最终得到一个输出二值图像。
- 推荐的高低阈值比值为T2：T1 = 3：1 / 2：1其中T2为高阈值， T1为低阈值。

**相关API-cv::Canny**
```
  Canny(
    inputArray src, //8-bit的输入图像
    OutputArray edges, //输出边缘图像， 一般都是二值图像
    double threshold1, //低阈值， 常取高阈值的1/2， 或者1/3
    double threshold2, //高阈值
    int aptertureSize, //Sobel算子的size， 通常3x3， 取值3
    boot L2gradient //选择true表示是L2来归一化， 否则用L1归一化
    ）
```

### 寻找轮廓

**相关API**
```
void cv::findContours   (   InputOutputArray    image,
                            OutputArrayOfArrays     contours,
                            OutputArray     hierarchy,
                            int     mode,
                            int     method,
                            Point   offset = Point() 
                        )   
```
参数介绍：
**image**:输入图像，图像必须为8-bit单通道图像，图像中的非零像素将被视为1，0像素保留其像素值，故加载图像后会自动转换为二值图像。我们同样可以使用cv::compare,cv::inRange,cv::threshold,cv::adaptiveThreshold,cv::Canny等函数来创建二值图像，，如果第四个参数为cv::RETR_CCOMP或cv::RETR_FLOODFILL，输入图像可以是32-bit整型图像(CV_32SC1) 

**contours**:检测到的轮廓，每个轮廓都是以点向量的形式进行存储即使用point类型的vector表示 

**hierarchy**:可选的输出向量(std::vector)，包含了图像的拓扑信息，作为轮廓数量的表示hierarchy包含了很多元素，每个轮廓contours[i]对应hierarchy中hierarchy[i][0]~hierarchy[i][3],分别表示后一个轮廓，前一个轮廓，父轮廓，内嵌轮廓的索引，如果没有对应项，则相应的hierarchy[i]设置为负数。 


**mode**：轮廓检索模式，可以通过cv::RetrievalModes()查看详细信息，如下
RETR_EXTERNAL:表示只检测最外层轮廓，对所有轮廓设置hierarchy[i][2]=hierarchy[i][3]=-1 
RETR_LIST:提取所有轮廓，并放置在list中，检测的轮廓不建立等级关系 
RETR_CCOMP:提取所有轮廓，并将轮廓组织成双层结构(two-level hierarchy),顶层为连通域的外围边界，次层位内层边界 
RETR_TREE:提取所有轮廓并重新建立网状轮廓结构 
RETR_FLOODFILL：官网没有介绍，应该是洪水填充法

**method**：轮廓近似方法可以通过cv::ContourApproximationModes()查看详细信息
CHAIN_APPROX_NONE：获取每个轮廓的每个像素，相邻的两个点的像素位置差不超过1 
CHAIN_APPROX_SIMPLE：压缩水平方向，垂直方向，对角线方向的元素值，保留该方向的中点坐标，如果一个矩形轮廓只需4个点来保存轮廓信息 
CHAIN_APPROX_TC89_L1和CHAIN_APPROX_TC89_KCOS使用Teh-Chinl链逼近算法中的一种

```
Rect boundingRect(InputArray points)
```
参数介绍：
**points**：输入信息，可以为包含点的容器(vector)或是Mat。
返回包覆输入信息的最小正矩形。

```
RotatedRect minAreaRect(InputArray points)
```
参数介绍：
**points**：输入信息，可以为包含点的容器(vector)或是Mat。
返回包覆输入信息的最小斜矩形。

boundingRect和minAreaRect的区别如下图
 ![](https://upload-images.jianshu.io/upload_images/8332901-d08c04d756b381ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
void minEnclosingCircle(InputArray points, Point2f& center, float& radius)
```
参数介绍：
**points**：输入信息，可以为包含点的容器(vector)或是Mat。
**center**：包覆圆形的圆心。
**radius**：包覆圆形的半径。

### 霍夫变换-直线
- Hough Line Transform用来做直线检测
- 前提条件-边缘检测已经完成
- 平面空间到极坐标空间转换

![](https://upload-images.jianshu.io/upload_images/8332901-bb43fd24c83c0dd9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/8332901-dc39fae45b0dede8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
公式由下往上倒推

**霍夫直线变换介绍**
- 对于任意一条直线上的所有点来说，变换到极坐标中，从[0~360]空间， 可以得到r的大小
- 属于同一条直线上点在极坐标空间(r, theta)必然在一个点上有最强的信号出现，根据此反算到平面坐标中就可以得到直线上各点的像素坐标。从而得到直线。

ps：不是很明白

**相关API学习**
- 标准的霍夫变换cv::HoughLines从平面坐标转换到霍夫空间，最终输出是(theta, r)表示极坐标空间
```
  cv::HoughLines（
      InputArray src, //输出图像，必须8bit的灰度图像
      OutputArray lines, //输出的极坐标来表示直线
      double rho,   //生成极坐标时候的像素扫描步长
      double theta, //生成极坐标时候的角度步长， 一般取值CV_PI/180
      int threshold, //阈值， 只有获得足够交点的极坐标点才被看作直线
      double srn=0, //是否应用多尺度的霍夫变换，如果不是设置0表示经典霍夫变换(就是进行金字塔的操作)
      double stn=0, //是否应用多尺度的霍夫变换，不过不是设置0表示经典霍夫变换
      double min_theta=0, //表示角度扫描范围0~180之间， 默认即可
      double max_theta=CV_PI
      )
```

- 霍夫变换直线概率cv::HoughLinesP最终输出是直线的两个点（x0，y0，x1， y1）
```
  cv::HoughLineP(
      InputArray src,  //输入图像，必须8-bit的灰度图像 
      OutputArray lines,  //输出的坐标来表示直线
      double rho,  //生成极坐标时候的像素扫描步长
      double theta,  //生成极坐标的时候的角度步长，一般取值CV_PI/180
      int threshold,  //阈值，只有获得足够交点的极坐标才被看作是直线
      double minLineLength=0, //最小直线长度
      double maxLineGap=0 //最大间隔
```

### 霍夫圆检测

**霍夫圆检测原理**
![](https://upload-images.jianshu.io/upload_images/8332901-e87ec42650f15033.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 因为霍夫圆检测对噪声比较敏感，所以首先要对图像做中值滤波。
- 基于效率考虑，OpenCV中实现的霍夫变换圆检测是基于图像梯度的实现，分为两步：
  1. 检测边缘，发现可能的圆心
  2. 基于第一步的基础上从候选的圆心开始计算最佳半径大小


**相关API cv::HoughCircles**
```
  HoughCircles(
    InputArray image, //输入图像，必须是8位的单通道灰度图像
    OutputArray circles， //输出结果，发现的圆信息
    int method， //方法 - HOUGH_GRADIENT
    double mindist, //10 最短距离 - 可以分辨是两个圆的，否则认为是同心圆
    double param1, //canny edge detection high threshold
    double param2, //中心点累加器阈值 - 候选圆心
    int minradius, //最小半径
    int maxradius //最大半径
    )
```

### 像素重映射

**什么是像素重映射**
> 简单点说就是把输入图像中各个像素按照一定的规则映射到另外一张图像的对应位置上去，形成一张新的图像

![](https://upload-images.jianshu.io/upload_images/8332901-f6a985c16d50dad1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/8332901-f08a498627ed55f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



**API介绍cv::remap**
```
    Remap(
        InputArray src, //输入图像
        OutputArray dst, //输出图像
        InputArray map1, //x映射表 CV_32FC1 / CV_32FC2
        InputArray map2, //y映射表
        int interpolation, //选择的插值方法， 常见线性插值， 可选择立方等
        int boderMode, //BODER_CONSTANT
        const Scalar boderValue //color
        )
```

















***
# python部分
```
import cv2 as cv
```



###  色彩空间转换
**cv.cvtColor()** 
参数：
> imgae： 图片
  
```
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    cv.imshow("gray", gray)
    hsv = cv.cvtColor(image, cv.COLOR_BGR2HSV)
    cv.imshow("hsv", hsv)
    yuv = cv.cvtColor(image, cv.COLOR_BGR2YUV)
    cv.imshow("yuv", yuv)
```
**cv.inRange()**
### 通道的分离与合并
**cv.split()**: 通道的分离
**cv.merge()**: 通道的合并

### 像素运算
**加**: cv.add(m1, m2)
**减**: cv.subtract(m1, m2)
**乘**: cv.multiply(m1, m2)
**除**: cv.divide(m1,m2)
**均值&方差**: cv.meanStdDev(m1)

**与**: cv.bitwise_and(m1,m2)
**或**: cv.bitwise_or(m1, m2)
**非**: cv.bitwise_not(m1)

**cv.addWeighted**: 调整对比度与两度


### ROI(Range Of Interest)

### 泛洪填充
- FLOODFILL_FIXED_RANGE：改变图像，泛洪填充
- FLOODFILL_MASK_ONLY: 不改变图像， 只填充遮罩层本身、忽略新的颜色值参数
- floodFill(Mat image, Mat mask， Point seedPoint, Scalar newVal)
- floodFill(image, mask, seedPoint, newVal, rect, loDiff, upDiff, flags)
src(seed.x, seed.y) - loDiff <= src(x, y) <= src(seed.x, seed.y) + upDiff
```
def fill_color_demo(image):
    copyImg = image.copy()
    h, w = image.shape[:2]
    mask = np.zeros([h+2, w+2], np.uint8)
    cv.floodFill(copyImg, mask, (30, 30), (0, 0, 255), (100, 100, 100), (50, 50, 50), cv.FLOODFILL_FIXED_RANGE)
    cv.imshow("fill_color_demo", copyImg)
```
各个参数的作用
**从seedPoint这个点取出的像素值BGR， 然后这个BGR减去loDiff是最小的阈值，加上upDiff是最大的阈值。然后所有在这个阈值范围内的像素填充newVal**


### 模糊操作
- **均值模糊**
 高斯模糊
- **中值模糊**: 椒盐模糊
- **自定义模糊**:锐化
```
def custom_blur_demo(image):
    kernel = np.ones([5, 5], np.float32)/25
    dst = cv.filter2D(image, -1, kernel=kernel)
    cv.imshow("custom_blur_demo", dst)
```

### 边缘保留滤波(EPF)
- **高斯双边**
```
def bi_demo(image):
    dst = cv.bilateralFilter(image, 0, 100, 15)
    cv.imshow("bi_demo", dst)
```
- **均值迁移**
```
def shift_demo(image):
    dst = cv.pyrMeanShiftFiltering(image, 10, 50)
    cv.imshow("shift_demo", dst)
```
### 直方图的绘制
```
def plot_demo(image):
    plt.hist(image.ravel(), 256, [0, 256])
    plt.show()
```
![](https://upload-images.jianshu.io/upload_images/8332901-172dea198ad4eb87.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
def image_hist(image):
    color = ('blue', 'green', 'red')
    for i, color in enumerate(color):
        hist = cv.calcHist([image], [i], None, [256], [0, 256])
        plt.plot(hist, color=color)
        plt.xlim([0, 256])
    plt.show()
```
![](https://upload-images.jianshu.io/upload_images/8332901-d788e76f86487815.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **直方图均衡化**：对比度增强
全部直方图均衡化
```
def equalHist_demo(image):
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    dst = cv.equalizeHist(gray)
    cv.imshow("equalHist_demo", dst)
```
局部直方图均衡化
```
def clahe_demo(image):
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    clahe = cv.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    dst = clahe.apply(gray)
    cv.imshow("clahe_demo", dst) 
```
直方图均衡化公式

巴氏距离
相关性
卡方

直方图的降维计算不明白是怎么算出来的
（这里不明白公式的推导）

- **back_projection**
```
def back_projection_demo():
    sample = cv.imread('sample.png')
    target = cv.imread('universe2.png')
    roi_hsv = cv.cvtColor(sample, cv.COLOR_BGR2HSV)
    target_hsv = cv.cvtColor(target, cv.COLOR_BGR2HSV)

    cv.imshow("roi_hsv", roi_hsv)
    cv.imshow("target_hsv", target_hsv)

    roiHist = cv.calcHist([roi_hsv], [0, 1], None, [32, 32], [0, 100, 0, 256])
    cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX)
    dst = cv.calcBackProject([target_hsv], [0, 1], roiHist, [0, 180, 0, 256], 1)
    cv.imshow("bacProjectionDemo", dst)
```
备注：以后查阅各API的参数及使用方法


### 模板匹配
简单来说就是，在源图像中寻找目标图像的位置
- **标准平方差匹配**：cv.TM_SQDIFF_NORMED
- **标准相关匹配**：cv.TM_CCORR_NORMED
- **标准相关系数匹配**： cv.TM_CCOEFF_NORMED


### 图像二值化

OpenCV中图像二值化的方法：
- OTSU
- Triange
- 手动与自动



 **全局阈值**
```
def treshold_demo(image):
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    ret, binarry = cv.threshold(gray, 127, 255, cv.THRESH_BINARY)
    print("threshold value %s" % ret)
    cv.imshow("binarry", binarry)
```

**局部阈值**
自适应阈值
```
def local_threshold(image):
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    binarry = cv.adaptiveThreshold(gray, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 25, 10)
    cv.imshow("binarry", binarry)
```





**超大图像二值化**: 如果图像过大，一些噪声或者光线就会影响二值化效果，所以通过分块后进行阈值化效果更好。
- 分块
- 全局阈值&局部阈值
- 图像大小获取
- 图像ROI与空白图像过滤
- 图像二值化

### 图像金字塔原理
reduce = 高斯模糊 + 降采样
expand = 扩大 + 卷积
降采样： PryDown
还原： PryUp
高斯金字塔与拉普拉斯金字塔
**在使用拉普拉斯金字塔时注意，我们选用的图片大小必须是2^n大小，或者是一个宽高相等的图片** 

如何计算图像边缘？
1、对图像求一阶导数，导数最大的时候，图像的变化率最大，也就是图像的边缘。
2、对图像求二阶导数，二阶导数为0的时候，一阶导数最大，源图像变化率最大，也就是图像的边缘。
一阶导数与sobel算子(scharr算子效果更明显，但同时也会引入更多噪声)
二阶导数与拉普拉斯算子

### Canny边缘提取
1、高斯模糊 - GaussianBlur
2、灰度转换 - cvtColor
3、计算梯度 - Sobel/Scharr
4、非最大信号抑制
5、高低阈值输出二值图像

### 直线检测
霍夫直线变换（Hough Line Transform）
cv.HoughLines
前提条件： 边缘检测已经完成
平面空间到极坐标空间转换

### 霍夫圆检测
霍夫圆变换原理
- 从平面坐标到极坐标转换三个参数C(x0, y0, r)其中x0, y0是圆心
- 假设平面坐标的任意一个圆上的点，转换到极坐标中：C(x0, y0, r)处有最大值， 霍夫变换正是利用这个原理实现圆的检测（？）

现实考量：
- 因为霍夫圆检测对噪声比较敏感，所以要首先对图像做中值滤波。
- 基于效率考虑， OpenCV中实现的霍夫变换圆检测是基于图像梯度的实现，分为两步：
  1. 检测边缘， 发现可能的圆心
  2. 基于第一步的基础上从候选圆心开始计算最佳半径大小。


### 轮廓发现

**轮廓发现：**
是基于图像边缘提取的基础寻找对象的轮廓的方法。
所以边缘提取的阈值选定会影响最终轮廓发现结果。

**API介绍：**
- findContours发现轮廓
- drawContours绘制轮廓

**如何利用梯度来避免阈值烦恼**

### 对象检测
- 弧长和面积
  - 轮廓发现
  - 计算每个轮廓的弧长与面积， 像素单位 
- 多边形拟合
  - 获取轮廓的多边形拟合结果
  - approxPolyDP参数：
    1. contour
    2. epsilon越小越折线越逼近真实形状
    3. close - 是否为闭合区域
- 几何矩计算

# 图像形态学

- 是图像处理学科的一个单独分支学科
- 灰度与二值图像处理中重要手段
- 是由数学的集合论等相关理论发展起来的

### 膨胀与腐蚀

- **膨胀的作用**
  - 对象大小增加一个像素(3x3)
  - 平滑对象边缘
  - 减少或者填充对象之间的距离

- **腐蚀(erode)的作用**
  - 对象大小减小一个像素(3x3)
  - 平滑对象边缘
  - 弱化或者分割图像之间的半岛型连接

### 开闭操作
- **开操作**
  - 图像形态学的重要操作之一， 基于膨胀与腐蚀操作组合形成的。
  - 主要是应用在二值图像分析中，灰度图像亦可。
  - 开操作 = 腐蚀 + 膨胀， 输入图像 + 结构元素


- **闭操作**
  - 图像形态学的重要操作之一， 基于膨胀与腐蚀操作组合形成的。
  - 主要是应用在二值图像分析中，灰度图像亦可。
  - 闭操作 = 膨胀 + 腐蚀， 输入图像 + 结构元素

- **开闭操作作用**
  - 去除小的干扰块 - 开操作
  - 填充闭合区域 - 闭操作
  - 水平或者垂直线提取

### 其他形态学操作
- **顶帽**：原图像与开操作之间的差值图像  
- **黑帽**：闭操作与原图像之间的差值图像
- **形态学梯度**
  - 基本梯度：用膨胀后的图像减去腐蚀后的图像得到差值图像。
  - 内部梯度：用原图像减去腐蚀之后的图像得到的差值图像。
  - 外部梯度：图像膨胀之后再减去原来的图像得到的差值图像。


### 分水岭算法
- 距离变换
- 分水岭变换介绍










`
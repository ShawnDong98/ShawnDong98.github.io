---
title: 【机器视觉笔录】OpenCV特征提取与检测
date: 2018-12-15 21:19:55
tags:
---
##### --------------------------------
##### Author ： ShawnDong
##### updateDate ：2018.11.28
##### Blog ： ShawnDong98.github.io
##### --------------------------------

### 概述
**什么是图像特征**
> 可以表达图像中对象的主要信息，并且以此为依据可以从其他未知图像中检测出相似或者相同对象

**常见的图像特征**
- 边缘
- 角点
- 纹理

**提取方法**
描述子生成

**特征提取与描述
- SIFT
- SURF
- HOG
- Haar
- LBP
- KAZE
- AKAZE
- BRISK


**对特征检测的描述可以简单总结为DDM**
- Detection：检测对象
- Description：描述对象
- Matching：匹配对象

### Haaris角点检测

**Harris角点检测理论(1998提出)**
![](https://upload-images.jianshu.io/upload_images/8332901-a04c1da138d696d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 
![](https://upload-images.jianshu.io/upload_images/8332901-1cabb77a1b32c431.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/8332901-004239745679c85f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最核心的部分：
![](https://upload-images.jianshu.io/upload_images/8332901-4a60d234b43d70ba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**参数说明**
```
  void cv::cornerHarris(
      InputArray src,
      OutputArray dst, 
      int blockSize,
      int ksize,
      double k,
      int borderType = BORDER_DEFAULT
      )
```
blockSize：计算lambda1和lambda2乘积时的矩阵大小
Kszie： 窗口大小
K: 表示计算角度相应时候的参数大小，默认在0.04~0.06
阈值t， 用来过滤角度响应

**代码演示**
```
void Harris_Demo(int, void*)
{
	Mat norm_dst, normScaleDst;
	dst = Mat::zeros(gray_src.size(), CV_32FC1);

	int blockSize = 2;
	int ksize = 3;
	double k = 0.04;
	cornerHarris(gray_src, dst, blockSize, ksize, k, BORDER_DEFAULT);
	normalize(dst, norm_dst, 0, 255, NORM_MINMAX, CV_32FC1, Mat());
	convertScaleAbs(norm_dst, normScaleDst);

	Mat resultImg = src.clone();
	for (int row = 0; row < resultImg.rows; row++)
	{
		uchar* currentRow = normScaleDst.ptr(row);
		for (int col = 0; col < resultImg.cols; col++)
		{
			int value = (int)* currentRow;
			if (value > thresh)
			{
				circle(resultImg, Point(col, row), 2, Scalar(0, 0, 255), 2, 8, 0);
			}
			currentRow++;
		}
	}
	imshow(output_title, resultImg);
}
```
突发奇想：RGB图片是如何转化为灰度图像的？
> 总的来说RGB图像是有3个通道，也就是一个3维的矩阵，而灰度图，大家都知道只有一个通道，那么如何将一个3通道的事物转为1通道的事物呢？ 
其实这其中是有一个转换公式的，简单来说，就是把RGB3个通道的分量按照一定的比例计算到灰度图像中。即 公式所阐述的那样，Gray = R*0.299 + G*0.587 + B*0.114 


### Shi-Tomasi角点检测

**Shi-Tomasi角点检测理论(94)**
![](https://upload-images.jianshu.io/upload_images/8332901-a0fd896827ae4d50.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
和Harris角点检测大致相似，取lambda1和lambda2中的最小值，计算量小。


**参数说明**
```
void cv::goodFeatureToTrack(
          InputArray image,
          OutputArray corners,
          int maxCorners,
          double qualityLevel,
          InputArray mask = noArray(),
          int blockSize,
          bool useHarrisDectector = false,
          double k = 0.04
          )
```
maxCorners：表示返回角点的数目，如果检测出来角点数目大于最大数目，则返回最大数目
qualityLevel： 表示最小可接受的向量值1500， 0.01， 15
minDistance： 两个角点之间的最小距离（欧几里得距离）
blocksize： 计算导数微分不同的窗口大小
useHarrisDetector：是否使用Harris角点检测

**代码演示**
```
void ShiTomasi_Demo(int, void*)
{
	if (num_corners < 5)
	{
		num_corners = 5;
	}
	vector<Point2f>corners;
	double qualityLevel = 0.01;
	double minDistance = 10;
	int blockSize = 3;
	bool useHarris = false;
	double k = 0.04;
	Mat resultImg = src.clone();
	goodFeaturesToTrack(gray_src, corners, num_corners, qualityLevel, minDistance, Mat(), blockSize, useHarris, k);
	printf("Number of Detected Corners: %d\n", corners.size());

	for (size_t t = 0; t < corners.size(); t++)
	{
		circle(resultImg, corners[t], 2, Scalar(rng.uniform(0, 255), rng.uniform(0, 255), rng.uniform(0, 255)), 2, 8, 0);
	}
	imshow(output_title, resultImg);

}
```
### 自定义角点检测器

**自定义角点检测器**
- 基于Harris与Shi-Tomasi角点检测
- 首先通过计算矩阵M得到lambda1和lambda2两个特征值根据他们得到角点响应值
- 然后自己设置阈值实现计算出阈值得到有效响应值的角点位置

**相关API说明**
```
  void cv::cornerEigenValsAndVecs(
      InputArray src,
      OutputArray dst,
      int blockSize,
      int ksize,
      int boderType=BODER_DEFAULT
      )
```
```
  void cv::cornerMinEigenVal(
      InputArray src,
      OutputArray dst,
      int blockSize,
      int ksize = 3,
      int boderType=BODER_DEFAULT
      )
```

**自定义harris特征检测**
```
	//自定义Harris角点检测
	cvtColor(src1, gray_src, COLOR_BGR2GRAY);
	//计算特征值
	int blockSize = 3;
	double k = 0.04;
	int ksize = 3;
	harris_dst = Mat::zeros(src1.size(), CV_32FC(6));
	harrisRspImg = Mat::zeros(src1.size(), CV_32FC1);
	cornerEigenValsAndVecs(gray_src, harris_dst, blockSize, ksize, 4);

	//计算响应
	for (int row = 0; row < harris_dst.rows; row++)
	{
		for (int col = 0; col < harris_dst.cols; col++)
		{
			double lambda1 = harris_dst.at<Vec6f>(row, col)[0];
			double lambda2 = harris_dst.at<Vec6f>(row, col)[1];
			harrisRspImg.at<float>(row, col) = lambda1 * lambda2 - k * pow((lambda1 + lambda2), 2);
		}
	}

	minMaxLoc(harrisRspImg, &harris_min_rsp, &harris_max_rsp, 0, 0, Mat());
	cout << harris_min_rsp << endl;
	cout << harris_max_rsp << endl;
	namedWindow(harris_win, CV_WINDOW_AUTOSIZE);
	createTrackbar("Quality Value:", harris_win, &qualityLevel, max_count, CustomHarris_Demo);
	CustomHarris_Demo(0, 0);

void CustomHarris_Demo(int, void*)
{
	if (qualityLevel < 10)
	{
		qualityLevel = 10;
	}
	Mat resultImg = src1.clone();
	float t = harris_min_rsp + (((double)qualityLevel) / max_count)*(harris_max_rsp - harris_min_rsp);
	for (int row = 0; row < src1.rows; row++)
	{
		for (int col = 0; col < src1.cols; col++)
		{
			float v = harrisRspImg.at<float>(row, col);
			if (v > t)
			{
				circle(resultImg, Point(col, row), 2, Scalar(0, 0, 255), 2, 8, 0);
			}
		}
	}
	imshow(harris_win, resultImg);
}
```

**自定义ShiTomasi特征检测**
```
	//计算最小特征值
	int blockSize = 3;
	double k = 0.04;
	int ksize = 3;
	cvtColor(src1, gray_src, COLOR_BGR2GRAY);
	shiTomasiRsp = Mat::zeros(src1.size(), CV_32FC1);
	cornerMinEigenVal(gray_src, shiTomasiRsp, blockSize, ksize, 4);
	minMaxLoc(shiTomasiRsp, &shitomasi_min_rsp, &shitomasi_max_rsp, 0, 0, Mat());
	namedWindow(shiTomasi_win, CV_WINDOW_AUTOSIZE);
	createTrackbar("Quality:", shiTomasi_win, &sm_qualityLevel, max_count, CustomShiTomasi_Demo);
	CustomShiTomasi_Demo(0, 0);

void CustomShiTomasi_Demo(int, void*)
{
	if (sm_qualityLevel < 20)
	{
		sm_qualityLevel = 20;
	}
	Mat resultImg = src1.clone();
	float t = shitomasi_min_rsp + (((double)sm_qualityLevel) / max_count)*(shitomasi_max_rsp - shitomasi_min_rsp);
	for (int row = 0; row < src1.rows; row++)
	{
		for (int col = 0; col < src1.cols; col++)
		{
			float v = shiTomasiRsp.at<float>(row, col);
			if (v > t)
			{
				circle(resultImg, Point(col, row), 2, Scalar(0, 0, 255), 2, 8, 0);
			}
		}
	}
	imshow(shiTomasi_win, resultImg);
}
```
### 亚像素级别角点检测

**提高检测精准度**
理论与现实总是不一致的，实际情况下几乎所有的角点都不会是一个真正的准确像素点。（100， 5）实际上（100.234， 5.789）

**亚像素定位**
- 插值方法
- 基于图像矩计算
- 曲线拟合方法-（高斯曲面、多项式、椭圆曲面）

**代码演示**
```
void SubPixel_Demo(int, void*)
{
	if (max_corners < 5)
	{
		max_corners = 5;
	}
	vector<Point2f> corners;
	double qualityLevel = 0.01;
	double minDistance = 10;
	int blockSize = 3;
	double k = 0.04;
	cvtColor(src, gray_src, CV_BGR2GRAY);
	goodFeaturesToTrack(gray_src, corners, max_corners, qualityLevel, minDistance, Mat(), blockSize, false, k);
	cout << "number of corners: " << corners.size() << endl;
	Mat resultImg = src.clone();
	for (size_t t = 0; t < corners.size(); t++)
	{
		circle(resultImg, corners[t], 2, Scalar(0, 0, 255), 2, 8, 0);
	}

	imshow(output_title, resultImg);
	Size winSize = Size(5, 5);
	Size zerozone = Size(-1, -1);
	TermCriteria tc = TermCriteria(TermCriteria::EPS + TermCriteria::MAX_ITER, 40, 0.001);
	cornerSubPix(gray_src, corners, winSize, zerozone, tc);

	for (size_t t = 0; t < corners.size(); t++)
	{
		cout << (t + 1) << "point[x, y]: " << corners[t].x << "," << corners[t].y << endl;
	}
}
```

### SURF特征检测

**SURF(Speeded Up Rpbust Features)特征关键特性：**
- 特征检测
- 尺度空间
- 选择不变性
- 特征向量

**工作原理**
1. 选择图像中的POI(Point of Interest) Hessian Matrix
2. 在不同的尺度空间发现关键点，非最大信号抑制
3. 发现特征点方法、旋转不变性要求
4. 生成特征向量

Hessian矩阵
积分向量

**相关API**
```
    cv::xfeatures2d::SURF::create(
      double hessian Threshold = 100,
      int nOctaves = 4,
      int cOctaveLayers = 3,
      bool extended = false,
      bool upright = false
      )
```
- upright：0表示计算选择不变性， 1表示不计算， 速度更快
- HessianThreshold 默认值在300~500之间
- Octave： 4表示在四个尺度空间
- OctaveLayers： 表示每个尺度的层数

**代码演示**
```
	//SURF特征检测
	int minHessian = 100;
	Ptr<SURF> detector = SURF::create(minHessian);
	vector<KeyPoint> keypoints;
	detector->detect(src, keypoints, Mat());

	//绘制关键点
	Mat keypoint_img;
	drawKeypoints(src, keypoints, keypoint_img, Scalar::all(-1), DrawMatchesFlags::DEFAULT);
	imshow(output_title, keypoint_img);

```

### SIFT特征检测

**SIFT(Scale-Invariant Feature Transform)特征检测关键特性：**
- 建立尺度空间，寻找最大值
> 工作原理：
1.构建图像高斯金字塔， 求取DOG， 发现每一级的最大与最小值。
2.构建的高斯金字塔，每一层根据sigma的值不同，可以分为多个等级，最少有四个

- 关键点定位(寻找关键点准确位置与删除弱边缘)
> 1.我们在像素级别获得了极值点的位置，但是更准确的点应该在亚像素位置，如何得到这个过程称为关键点(准确/精确)定位。
2.删除弱边缘，通过Hessian矩阵特征值实现，小于阈值自动舍弃

- 关键点方向指定
> 1.根据给定的窗口大小，求得每一层对应的图像的梯度
2.计算每个高斯权重，sigma=scale*1.5， 0~360之间建立36个直方图Bins
3.找最高峰对应的Bin， 大于max*80%的都保留
4.实现了旋转不变性，提高了匹配时候的稳定性
5.大约有15%的关键点会有多个方向

- 关键点描述子
> 1.拟合多项式插值寻找最大Peak
2.得到描述子 = 4*4*8 = 128

**相关API**
```
cv::xfeature2d::SIFT::create(
      int nfeatures = 0,
      int nOctaveLayers = 3,
      double contrastThreshold = 0.04,
      double 
```

**代码演示**
```
        
	//SIFT特征检测
	int numFeatures = 100;
	Ptr<SIFT> detector = SIFT::create(numFeatures);
	vector<KeyPoint> keypoints;
	detector->detect(src, keypoints, Mat());
	printf("Total KeyPoints: %d", keypoints.size());

	//绘制特征点
	Mat keypoint_img;
	drawKeypoints(src, keypoints, keypoint_img, Scalar::all(-1), DrawMatchesFlags::DEFAULT);
	namedWindow(output_title, CV_WINDOW_AUTOSIZE);
	imshow(output_title, keypoint_img);
```


### HOG特征检测

**HOG特征描述子提取**
- 灰度图像转换
>1.cvtColor
2.gray = R * 0.3 + 0.59 * G + 0.11 * B
- 梯度计算
1. 垂直方向
![](https://upload-images.jianshu.io/upload_images/8332901-7da43d5e5091eae7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 水平方向
![](https://upload-images.jianshu.io/upload_images/8332901-06d564cd27bbb07f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 梯度
![](https://upload-images.jianshu.io/upload_images/8332901-36930c233406efd1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 分网格的梯度方向直方图
> 1.分割为8*8=64像素的Cell网格
2.对每个Cell求取方向直方图(Orientation Hist)
每个Cell分为9个Bin，角度取值范围为-180 ~ 180之间， 对-180 ~ 0之间的加上180取正数，对应的值为梯度值。方向为Bin数组0~9的Index

- 块描述子
> 块描述子R(Rectange)-HOG
将2x2的网格单元组合成为一个大的块(Block)
对每个块之间有1/2部分是重叠区域
主要是将每个Cell的直方图合并成为一个大的直方图(Bin索引不变[0~9]之间)
![](https://upload-images.jianshu.io/upload_images/8332901-c8ae254b4ff05feb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 块描述子归一化
> 基于L2实现块描述子归一化，归一化因子计算
![](https://upload-images.jianshu.io/upload_images/8332901-1402467fbb47caba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 特征数据与检测窗口
> 1.最终获得HOG描述算子(特征数据)
2.需要正向训练200个左右的特征样本
3.反向训练600 ~ 800个左右的特征样本
4.初步测试、开窗检测
举例：
对于64x128的像素块，可以分为8x16个Cell分为7x15个块(R-HOG)，总计的直方图向量数为：7x15x2x2x9 = 12
- 匹配方法


**相关API**
```
cv::HOGDescriptor::HOGDescriptor(
      Size winSize,
      Size blockSize,
      Size blockStride,
      Size cellSize,
      int nbins,
      ...//不常用的参数
      )
      
```


**代码演示**
```
	Mat dst, dst_gray;
	resize(src, dst, Size(64, 128));
	cvtColor(dst, dst_gray, COLOR_BGR2GRAY);
	HOGDescriptor detector(Size(64, 128), Size(16, 16), Size(8, 8), Size(8, 8), 9);

	vector<float> descriptors;
	vector<Point> locations;
	detector.compute(dst_gray, descriptors, Size(0, 0), Size(0, 0), locations);
	printf("numbers of HOG descriptors: %d", descriptors.size());
```

```
	HOGDescriptor hog = HOGDescriptor();
	hog.setSVMDetector(hog.getDefaultPeopleDetector());

	vector<Rect> foundLocations;
	hog.detectMultiScale(src, foundLocations, 0, Size(8, 8), Size(32, 32), 1.05, 2);
	Mat result = src.clone();
	for (size_t t = 0; t < foundLocations.size(); t++)
	{
		rectangle(result, foundLocations[t], Scalar(0, 0, 255), 2, 8, 0);
	}
	namedWindow(output_title, CV_WINDOW_AUTOSIZE);
	imshow(output_title, result);
```

### LBP(Local Binary Patterns)特征检测
**LBP特征介绍**
> LBP顾名思义，局部二值化，也就是通过中心像素作为阈值，进行图片的二值化。如图所示，中心像素值为5，比5小的全都赋为0，比5大的全都赋为1。
![](https://upload-images.jianshu.io/upload_images/8332901-e24b40d74a1fbcc5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
由于直接利用的灰度比较，所以其具有灰度不变性；但是，有两个很明显的缺点：
1、产生的二进制模式多。
2、不具有旋转不变性。

**LBP表达**
> Pattern(模式):1001 1110 
LBP: 1 + 2 + 4 + 8 + 16 + 32 +64 + 128 = 241， 不同位置像素权重之和
C(中心对比度): (6 + 7 + 8 + 9 + 7) / 5 - (5 + 2 + 1) / 3 = 4.7
![](https://upload-images.jianshu.io/upload_images/8332901-b92e2452ebd248d2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**LBP扩展与多尺度表达**
> ![](https://upload-images.jianshu.io/upload_images/8332901-0c9f36edce5f60ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**LBP统一模式**
>0->1或1->0的总跳数小于等于2则为统一模式
 ![](https://upload-images.jianshu.io/upload_images/8332901-0bb6d3e803d23a45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**代码演示**
```
	cvtColor(src, gray_src, COLOR_BGR2GRAY);
	int width = gray_src.cols;
	int height = gray_src.rows;

	Mat lbpImage = Mat::zeros(gray_src.rows - 2, gray_src.cols - 2, CV_8UC1);
	for (int row = 1; row < height - 1; row++)
	{
		for (int col = 1; col < width - 1; col++)
		{
			uchar c = gray_src.at<uchar>(row, col);
			uchar code = 0;
			code |= (gray_src.at<uchar>(row - 1, col - 1) > c) << 7;
			code |= (gray_src.at<uchar>(row - 1, col) > c) << 6;
			code |= (gray_src.at<uchar>(row - 1, col + 1) > c) << 5;
			code |= (gray_src.at<uchar>(row, col + 1) > c) << 4;
			code |= (gray_src.at<uchar>(row + 1, col + 1) > c) << 3;
			code |= (gray_src.at<uchar>(row + 1, col) > c) << 2;
			code |= (gray_src.at<uchar>(row + 1, col - 1) > c) << 1;
			code |= (gray_src.at<uchar>(row, col - 1) > c) << 0;
			lbpImage.at<uchar>(row - 1, col - 1) = code;
		}
	}
```

```
void ELBP_Demo(int, void*)
{
	int offset = current_radius * 2;
	Mat elbpImage = Mat::zeros(gray_src.rows - offset, gray_src.cols - offset, CV_8UC1);
	int width = gray_src.cols;
	int height = gray_src.rows;

	int numNeighbors = 8;
	for (int n = 0; n < numNeighbors; n++)
	{
		float x = static_cast<float>(current_radius) * cos(2.0 * CV_PI * n / static_cast<float>(numNeighbors));
		float y = static_cast<float>(current_radius) * -sin(2.0 * CV_PI * n / static_cast<float>(numNeighbors));

		int fx = static_cast<int>(floor(x));
		int fy = static_cast<int>(floor(y));
		int cx = static_cast<int>(ceil(x));
		int cy = static_cast<int>(ceil(y));

		float ty = y - fy;
		float tx = x - fx;

		float w1 = (1 - tx) * (1 - ty);
		float w2 = tx * (1 - ty);
		float w3 = (1 - tx) * ty;
		float w4 = tx * ty;

		for (int row = current_radius; row < (height - current_radius); row++)
		{
			for (int col = current_radius; col < (width - current_radius); col++)
			{
				float t = w1 * gray_src.at<uchar>(row + fy, col + fx) + w2 * gray_src.at<uchar>(row + fy, col + cx) + 
					w3 * gray_src.at<uchar>(row + cy, col + fx) + w2 * gray_src.at<uchar>(row + cy, col + cx);
				elbpImage.at<uchar>(row - current_radius, col - current_radius) +=
					((t > gray_src.at<uchar>(row, col)) &&
                     ((abs(t - gray_src.at<uchar>(row, col))) > std::numeric_limits<float>::epsilon())) << n;
			}
		}

	}
	imshow("ELBP Result", elbpImage);
}
```

### 积分图计算

**积分图像计算介绍**
> ![](https://upload-images.jianshu.io/upload_images/8332901-adfe8f0a26adcb7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
积分图上任意一点像素点的大小都是其左上方向像素点的值之和。
![](https://upload-images.jianshu.io/upload_images/8332901-3207c2855965f1c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
通过这一公式可以通过积分图计算出任意一点的像素值

**API说明**
```
void cv::integral(
      InputArray src,
      OutputArray sum,
      OutputArray sqsum,
      OutputArray tilted,
      int sdepth = -1,
      int sqdepth = -1
      )
```
![](https://upload-images.jianshu.io/upload_images/8332901-1b99d929a42c340d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**代码演示**
```
	Mat sumii = Mat::zeros(src.rows + 1, src.cols + 1, CV_32FC1);
	Mat sqsumii = Mat::zeros(src.rows + 1, src.cols + 1, CV_64FC1);
	integral(src, sumii, sqsumii);

	Mat iiResult;
	normalize(sumii, iiResult, 0, 255, NORM_MINMAX, CV_8UC1, Mat());
	imshow("Integral Image", iiResult);
```

### Haar特征

**Haar特征介绍(Haar Like Features)**
- 高类间变异性
- 低类内变异性
- 局部强度差(可以理解成对比度)
- 不同尺度
- 计算效率高

### 特征描述子

**特征描述子与匹配**
1. 什么是图像特征描述子
> 通过detector提取keypoint，然后对keypoint根据不同的算法获取周围窗口的采样点，再归一化，就形成了描述子。
2. 描述子与匹配
> 通过匹配算法在图像中找到描述子，如下图所示暴力匹配Broute-Froce匹配
![](https://upload-images.jianshu.io/upload_images/8332901-210f915dec541983.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**代码演示**
```
	int minHessian = 400;
	Ptr<SURF> detector = SURF::create(minHessian);
	vector<KeyPoint> keypoint_1;
	vector<KeyPoint> keypoint_2;

	Mat descriptor_1, descriptor_2;
	detector->detectAndCompute(src1, Mat(), keypoint_1, descriptor_1);
	detector->detectAndCompute(src2, Mat(), keypoint_2, descriptor_2);

	BFMatcher matcher;
	vector<DMatch> matches;
	matcher.match(descriptor_1, descriptor_2, matches);

	Mat matchesImg;
	drawMatches(src1, keypoint_1, src2, keypoint_2, matches, matchesImg);
	imshow("Descriptor Demo", matchesImg);
```



### FLANN特征匹配

**FLANN特征匹配介绍**
这是一种快速匹配的算法，快速最近邻逼近搜索函数库(Fast Approximate Nearest Neighbor Seach Library)


**代码展示**
```
	//FLAAN快速匹配
	int minHessian = 400;
	Ptr<SURF> detector = SURF::create(minHessian);
	vector<KeyPoint> keypoint_obj;
	vector<KeyPoint> keypoint_scene;

	Mat descriptor_obj, descriptor_scene;
	detector->detectAndCompute(src1, Mat(), keypoint_obj, descriptor_obj);
	detector->detectAndCompute(src2, Mat(), keypoint_scene, descriptor_scene);

	FlannBasedMatcher matcher;
	vector<DMatch> matches;
	matcher.match(descriptor_obj, descriptor_scene, matches);

	double minDist = 1000;
	double maxDist = 0;
	for (int i = 0; i < descriptor_obj.rows; i++)
	{
		double dist = matches[i].distance;
		if (dist > maxDist)
		{
			maxDist = dist;
		}
		if (dist < minDist)
		{
			minDist = dist;
		}
	}
	printf("max distance : %f\n", maxDist);
	printf("min distance : %f\n", minDist);

	vector<DMatch> goodMatches;
	for (int i = 0; i < descriptor_obj.rows; i++)
	{
		double dist = matches[i].distance;
		if (dist < max(50 * minDist, 0.02))
		{
			goodMatches.push_back(matches[i]);
		}

	}

	Mat matchesImg;
	drawMatches(src1, keypoint_obj, src2, keypoint_scene, goodMatches, matchesImg, Scalar::all(-1), 
		Scalar::all(-1), vector<char>(), DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);
	imshow("Flann Matching Result", matchesImg);
```

### 平面对象识别

**对象形变与位置变换**
1. findHomography：发现两个平面的透视变换， 生成变换矩阵
2. perspectiveTransform：透视变换

**代码示例**
```
	//透视变换
	vector<Point2f> obj;
	vector<Point2f> objInScene;
	for (size_t t = 0; t < goodMatches.size(); t++)
	{
		obj.push_back(keypoint_obj[goodMatches[t].queryIdx].pt);
		objInScene.push_back(keypoint_scene[goodMatches[t].trainIdx].pt);
	}
	Mat H = findHomography(obj, objInScene, RANSAC);

	vector<Point2f> obj_corners(4);
	vector<Point2f> scene_corners(4);
	obj_corners[0] = Point(0, 0);
	obj_corners[1] = Point(src1.cols, 0);
	obj_corners[2] = Point(src1.cols, src1.rows);
	obj_corners[3] = Point(0, src1.rows);

	perspectiveTransform(obj_corners, scene_corners, H);

	line(matchesImg, scene_corners[0] + Point2f(src1.cols, 0), 
		scene_corners[1] + Point2f(src1.cols, 0), Scalar(0, 0, 255), 2, 8, 0);
	line(matchesImg, scene_corners[1] + Point2f(src1.cols, 0),
		scene_corners[2] + Point2f(src1.cols, 0), Scalar(0, 0, 255), 2, 8, 0);
	line(matchesImg, scene_corners[2] + Point2f(src1.cols, 0), 
		scene_corners[3] + Point2f(src1.cols, 0), Scalar(0, 0, 255), 2, 8, 0);
	line(matchesImg, scene_corners[3] + Point2f(src1.cols, 0),
		scene_corners[0] + Point2f(src1.cols, 0), Scalar(0, 0, 255), 2, 8, 0);

	line(src2, scene_corners[0], scene_corners[1], Scalar(0, 0, 255), 2, 8, 0);
	line(src2, scene_corners[1], scene_corners[2], Scalar(0, 0, 255), 2, 8, 0);
	line(src2, scene_corners[2], scene_corners[3], Scalar(0, 0, 255), 2, 8, 0);
	line(src2, scene_corners[3], scene_corners[0], Scalar(0, 0, 255), 2, 8, 0);

	imshow("Find Known Object Demo", matchesImg);
	imshow("Draw Object", src2);
```

### AKAZE局部匹配

**AKAZE局部匹配介绍**
- AOS构造尺度空间
- Hessian矩阵特征点检测
- 方向指定基于一阶微分图像
- 描述子生成

**与SIFT、SURF比较**
- 更加稳定
- 非线性尺度空间
- AKAZE速度更加快
- 比较新的算法，只有OpenCV新版本才可以用

这里要注意，在使用AKAZE检测下面这张图的时候，我发现找不到KeyPoint，而其他KAZE,SURF,SIFT相比之下都有更好的效果，但是AKAZE速度确实要比其他算法快很多，在没有研究源码的前提下，我猜测AKAZE可能是牺牲了检测的准确性，提高了计算速度
![](https://upload-images.jianshu.io/upload_images/8332901-0dc239c325fd8a37.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**代码演示**
```
	//AKAZE Detection
	Ptr<AKAZE> detector = AKAZE::create();
	vector<KeyPoint> keypoints;
	double t1 = getTickCount();
	detector->detect(src, keypoints, Mat());
	double t2 = getTickCount();
	double tkaze = 1000 * (t2 - t1) / getTickFrequency();
	printf("KAZE Time Consume(ms): %f", tkaze);

	Mat keypointImg;
	drawKeypoints(src, keypoints, keypointImg, Scalar::all(-1), DrawMatchesFlags::DEFAULT);
	imshow("kaze key points", keypointImg);
```
```
	//AKAZE Detection
	Ptr<AKAZE> detector = AKAZE::create();
	vector<KeyPoint> keypoint_obj;
	vector<KeyPoint> keypoint_scene;
	Mat descriptor_obj, descriptor_scene;
	double t1 = getTickCount();
	detector->detectAndCompute(src1, Mat(), keypoint_obj, descriptor_obj);
	detector->detectAndCompute(src2, Mat(), keypoint_scene, descriptor_scene);
	double t2 = getTickCount();
	double tkaze = 1000 * (t2 - t1) / getTickFrequency();
	printf("KAZE Time Consume(ms): %f", tkaze);

	//Matching
	//BFMatcher matcher(NORM_L2);
	FlannBasedMatcher matcher(new flann::LshIndexParams(20, 10, 2));
	vector<DMatch> matches;
	matcher.match(descriptor_obj, descriptor_scene, matches);

	//Draw KeyPoints
	Mat akazeMatchesImg;
	drawKeypoints(src1, keypoint_obj, src1, Scalar::all(-1), DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);
	drawMatches(src1, keypoint_obj, src2, keypoint_scene, matches, akazeMatchesImg,
		Scalar::all(-1), Scalar::all(-1), vector<char>(), DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);
	imshow("src1", src1);
	imshow("Akaze Match Results", akazeMatchesImg);
```
AKAZE描述子生成图像是基于汉明距离的，Flann对CV_8UC1这种类型不支持，所以当适应AKAZE+Flann，要以以下方式使用Flann
```
FlannBasedMatcher matcher(new flann::LshIndexParams(20, 10, 2));
```


### BRISK特征检测与匹配

**BRISK(Binary Robust Invariant Scalable KeyPoints)特征介绍**
- 构建尺度空间
- 特征点检测
- FAST9-16寻找特征点
- 特征点定位
- 关键点描述子


**代码演示**
```
	//BRISKDetection
	Ptr<Feature2D> detector = BRISK::create();
	vector<KeyPoint> keypoints;
	double t1 = getTickCount();
	detector->detect(src, keypoints, Mat());
	double t2 = getTickCount();
	double tkaze = 1000 * (t2 - t1) / getTickFrequency();
	printf("KAZE Time Consume(ms): %f", tkaze);

	Mat keypointImg;
	drawKeypoints(src, keypoints, keypointImg, Scalar::all(-1), DrawMatchesFlags::DEFAULT);
	imshow("kaze key points", keypointImg);
```
```
	//BRISK Detection
	Ptr<Feature2D> detector = BRISK::create();
	vector<KeyPoint> keypoint_obj;
	vector<KeyPoint> keypoint_scene;
	Mat descriptor_obj, descriptor_scene;
	double t1 = getTickCount();
	detector->detectAndCompute(src1, Mat(), keypoint_obj, descriptor_obj);
	detector->detectAndCompute(src2, Mat(), keypoint_scene, descriptor_scene);
	double t2 = getTickCount();
	double tkaze = 1000 * (t2 - t1) / getTickFrequency();
	printf("KAZE Time Consume(ms): %f", tkaze);

	//Matching
	//BFMatcher matcher(NORM_L2);
	//FlannBasedMatcher matcher(new flann::LshIndexParams(20, 10, 2));
	FlannBasedMatcher matcher;
	vector<DMatch> matches;
	matcher.match(descriptor_obj, descriptor_scene, matches);

	//Draw KeyPoints
	Mat briskMatchesImg;
	drawKeypoints(src1, keypoint_obj, src1, Scalar::all(-1), DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);
	drawMatches(src1, keypoint_obj, src2, keypoint_scene, matches, briskMatchesImg,
		Scalar::all(-1), Scalar::all(-1), vector<char>(), DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);
	imshow("src1", src1);
	imshow("BRISK Match Results", briskMatchesImg);
```
BRISK和AKAZE存在着相似的问题，在检测下面这张图时，检测不到KeyPoints。
![](https://upload-images.jianshu.io/upload_images/8332901-5625c40fe1f5d8fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)










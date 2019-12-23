---
title: 【Hacker之梦】MongoDB数据库的基本概念及操作
date: 2018-10-13 18:37:16
tags:
---
##### --------------------------------
##### Author ： ShawnDong
##### updateDate ：2018.10.13
##### Blog ： ShawnDong98.github.io
##### --------------------------------

### MongoDB基本概念

**MongoDB概念**|**说明**
:-:|:-:
database|数据库
collection|集合
document|文档
field|域
index|索引
primary key|主键， MongoDB自动将_id字段设置为主键

- **文档**

> 文档是MongoDB中数据的基本单元，文档有唯一标识"_id"。文档以key/value的方式存储，如{"name": "Shawn", "age": 20}。

- **集合**

> 集合在MongoDB中是一组文档。

- **数据库**

> 一个MongoDB可以创建多个数据库，默认数据库为“db", 该数据库存储在data目录。MongoDB的单个实例可以容纳在多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也可以放在不同的文件夹中。

### MongoDB的基本操作

1. 创建/删除数据库

> 创建数据库： use DATABASE_NAME

如果存在该数据库，则切换到该数据库，如果不存在，则创建该数据库并切换至该数据库

删除数据库：db.dropDatabase()

此语句可以删除当前数据库，你可以用db命令来查看当前数据库名

2. 集合中文档的增删改查

> 插入文档：MongoDB使用insert()或save()方法向集合中插入文档

db.COLLECTION_NAME.insert(document)

>查询文档： db.COLLECTION_NAME.find()

以易读的方式来读取数据： db.COLLECTION_NAME.find().pretty()

MongoDB的find()方法可以传入多个键(key)，每个键以逗号隔开，实现AND功能：

db.COLLECTION_NAME.find({key1: value1, key2: value2}).pretty()

**查找python集合中likes大于100且title等于python的文档：**

db.python.find({"likes": {\$gte: 100}, "title": "python"}).pretty()

MongoDB OR条件语句使用了关键字"\$or"， 查找python集合中likes大于等于100或者titile等于python的文档：

```

db.python.find(

  {

    $or: [

          {"likes": {$get: 100}}, {"title": "python"}

          ]

  }

)

```

> 更新文档： MongoDB使用updata()和save()方法来更新集合中的文档：

1. 通过update()方法更新集合中的文档

```

db.collection.update(

    query,

    update,

    {

        upsert: boolean,

        multi: boolean,

        writeConcern: document

    }

```

参数分析：

query: update的查询条件

update: update的对象和一些更新的操作符等

upsert: 可选， 这个参数的意思是如果不存在update的记录， 是否插入新的文档， true为插入， 默认是false

multi: 可选， mongodb默认是false， 只更新找到的第一条记录， 如果这个参数为false， 就把符合条件的记录全部更新

writeConcern: 可选， 抛出异常的级别

2. 通过save()方法通过传入的文档来替换已有的文档。

```

db.python.save(

    document,

    {

        writeConcern: document

    }

)

```

ducument: 文档数据
writeConcern: 可选，抛出异常级别

> 删除文档： MongoDB提供了remove()方法来删除文档
```
db.collection.remove(
    query,
    {
         justOne: boolean,
         writeConcern: document
    }
)
```
参数说明:
 query: 可选， 删除的文档的条件
  justOne: 可选， 如果设为true或1， 则只删除一个文档
  writeConcern: 可选， 抛出异常的级别

### Python操作MongoDB
- 导入pymongo数据库模块
```
import pymongo
```

- 建立连接
```
#第一种形式
client = pymongo.MongoClient()
#第二种形式
client = pymongo.MongoClient('localhost', 27017)
#第三种形式
client = pymongo.MongoClient('mongodb://localhost:27017/')
```
- 获取数据库
```
#第一种方式
db = client.papers
#第二种方式
db = client['papers']
```

- 获取一个集合
```
#第一种方式
collection = db.books、
#第二种方式
collection = db['books']
```
- 插入文档
```
book_id = collection.insert(books)
```
- 查询文档
```
#返回第一个
collection.find_one()
#返回全部
colleciton.find()
```
- 修改文档
```
collection.update()
```
- 删除文档
```
collection.remove()
```

**其实对于一个文档的操作无非就是在collection上插查改删，操作就是：
db['collection'].insert(),  db['collection'].find(), db['collection'].update(),  db['collection'].remove()**
---
order: 1
title: PO
date: 2024-08-06
category:
  - SAP
tags:
  - PO
permalink: /sap/po.html
---
## 集成技术
SAP PO（SAP Process Orchestration）是一个集成平台，用于处理企业内部和外部系统之间的通信和数据交换。

<!-- more -->
# SAP PO中间件学习

## 注意
更改映射字段的时候，注意不要更改原有的functions转换

## 问题
__1. 金额,字符串替代__
JCO_ERROR_CONVERSION:数字10780000.00不能在PREIS字段编码为长度为11、小数点后两位的BCD


![](/img/po1.png)

字符串转换为11位然后有两位小数的金额
当10,100.00只有一个逗号可以成功，当有10,780,000.00 两个逗号时映射会失败
需要使用replaceString函数就行转换将,转换为空。

## 参考资料
[waline 挂载域名二级地址](https://comment.yesuifeng.cc/)
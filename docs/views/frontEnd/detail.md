---
title: 踩坑记录（持续更新）
date: 2019-12-07
tags: 
    - vue
    - js
    - html
    - css
categories:
    - frontEnd
---

本文用来记录平常工作学习过程中踩的坑或者一些疑难杂症

<!-- more -->

## js

### 对象属性是按什么顺序输出的

在刷`LeetCode`的过程中遇到一个奇怪的问题，key自定义为数值从大到小，但是遍历的时候发现是从小到大遍历的，遂想到是不是因为key是数字的原因，但是转换成字符串之后发现仍然没有解决。

经查找资料发现

根据`ECMA-262（ECMAScript`第三版中描述，`for-in`语句的属性遍历的顺序是由对象定义时属性的书写顺序决定的。

关于`ECMA-262（ECMAScript）`第三版中`for-in`语句的更多信息，请参考 [ECMA-262 3rd Edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf) 中 12.6.4 The for-in Statement。

在现有最新的`ECMA-262（ECMAScript）`第五版规范中，对`for-in`语句的遍历机制又做了调整，属性遍历的顺序是没有被规定的。

关于 ECMA-262（ECMAScript）第五版中`for-in`语句的更多信息，请参考 [ECMA-262 5rd Edition](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf) 中 12.6.4 The for-in Statement。

新版本中的属性遍历顺序说明与早期版本不同，这将导致遵循`ECMA-262`第三版规范内容实现的`JavaScript`解析引擎在处理`for-in`语句时，与遵循第五版规范实现的解析引擎，对属性的遍历顺序存在不一致的问题。

#### 结论

Chrome Opera 中使用 for-in 语句遍历对象属性时会遵循一个规律：

它们会先提取所有 key 的 parseFloat 值为非负整数的属性，然后根据数字顺序对属性排序首先遍历出来，然后按照对象定义的顺序遍历余下的所有属性。

#### 解决方案

for-in 语句无法保证遍历顺序，应尽量避免编写依赖对象属性顺序的代码。如果想顺序遍历一组数据，请使用数组并使用 for 语句遍历。如果想按照定义的次序遍历对象属性，请参考本文针对各浏览器编写特殊代码。

## CSS

### AdBlock引发的问题

在项目开发的过程中遇到一个奇怪的问题，同事开发的页面，在他电脑上显示正常，在我电脑上一片空白，查看样式发现，被注入了一大堆`ad-`开头的类名，并设置了`display: none`。其他几个开发同事也没这个问题，绞尽脑汁不得其因，只能先放过。

后来项目提测后，在一个产品的电脑上发现了跟我一模一样的问题，对比发现，正如标题所示，我俩都装了`AdBlock`屏蔽广告插件。

原来`AdBlock`会将`ad-`开头的类名当做广告给屏蔽掉，修改了类名前缀，问题迎刃而解~

思考：

那我要投放广告，标签的类名不写`ad-`开头的不就屏蔽不掉了吗？`AdBlock`插件的屏蔽机制是否过于简单了？当然是否还有其他的检测机制，我就不得而知了，暂时就发现这一个问题

---
title: 开发技巧（持续更新中）
date: 2019-10-24
tags: 
    - skill
    - html
    - css
    - js
    - vue
    - update
categories:
    - frontEnd
keys:
    - 'WADZQ0116@qq'
    - 'yangzehong'
---

本篇文章记录工作开发过程中遇到的一些技巧性的知识点，方便以后的使用，持续更新中

<!-- more -->

## Vue

### 刷新当前路由

在项目中碰到了需要刷新当前页面的需求，用`this.$route.go(0)` 和
`location.reload()`虽然也可以实现需求，但是效果就像`f5`刷新一样，页面会重载，用户体验太不友好。

在网上找到了两种解决方案，挺有技巧的，拿过来记录一下。

#### 空白页的方式

此方法是基于进入空白页再在空白页跳转回到上一个页面的原理实现的，

首先空白页中代码这样写，即在`beforeRouteEnter`中获取到上一个路由，直接跳转回去

```html
// refresh.vue
<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace(from.path)
    })
  }
}
</script>
```

在需要刷新的页面中通过`this.$router.replace`跳转到空白页

```js
// 使用页面
refresh () {
  this.$router.replace({
    path: '/refresh',
    query: {
      t: Date.now()
    }
  })
}
```

注意，`refresh.vue`中必须使用`this.$router.replace`而非`this.$router.push`

因为，如果使用的是`this.$router.push`会导致，进入过空白页之后，通过浏览器的后退键，无法实现页面后退的bug现象

#### 用provide /inject组合实现

> 原理：允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，在其上下游关系成立的时间里始终生效

在`App.vue`,声明`reload`方法，控制`router-view`的显示或隐藏，从而控制页面的再次加载

```html
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
```

在需要用到刷新的页面。在页面注入`App.vue`组件提供（provide）的 `reload` 依赖，在逻辑完成之后（删除或添加...）,直接`this.reload()`调用，即可刷新当前页面。

在组件内注入`reload`方法

```html
<script>
export default {
  inject:['reload'],
  data(){
    return {
       ...
    }
  }
}
</script>
```

之后就是在需要刷新的时候调用`this.reload()`方法了


## js

### 获取当前元素到文档顶部的位置（left, top）

```js
offset (element) {
    let pos = { left: 0, top: 0 }
    let parents = element.offsetParent
    pos.left += element.offsetLeft
    pos.top += element.offsetTop
    while (parents && !/html|body/i.test(parents.tagName)) {
        pos.left += parents.offsetLeft
        pos.top += parents.offsetTop
        parents = parents.offsetParent
    }
    return pos
}
```

### 点击元素外部触发

#### 代码

```js
const eventNames = ['click', 'touchend'];
export default function (el, callback) {
    let isTouch = false;
    function handler(ev) {
        // touchend
        if (eventNames[1] === ev.type) isTouch = true;
        // 禁止移动端touchend触发后还触发click
        if (eventNames[0] === ev.type && isTouch) return;
        // 判断点击元素是否在el外
        // 由于ev.target的类型是EventTarget,
        // 而contains方法标注的参数类型是Node, 
        // 实际上EventTarget也是dom元素,
        // 所以此处使用需要类型断言, 标注为Node类型
        if (!el.contains(ev.target)) callback(ev);
    }

    eventNames.forEach(name => {
        document.addEventListener(name, handler);
    });

    return () => {
        eventNames.forEach(name => {
            document.removeEventListener(name, handler);
        });
    }
}

```

#### 使用

```js
// 开始监听
const cancel = clickOutside(el, e=>{
    // 点击el外部触发
});
// 取消监听
cancel();
```

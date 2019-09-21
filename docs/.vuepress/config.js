/* 
// 打算自定义一个sidebar，奈何以失败告终，以后有时间看吧
const fs = require("fs");


function sideBar (foldPath, title) {
  let obj = {
    title: title,
    collapsable: false,
    sidebarDepth: 2,
    children:[]
  }
  let files = fs.readdirSync(foldPath)
  files.forEach((file) => {
    let stats = fs.statSync(foldPath + '/' + file)
      if (stats.isFile()) {
        obj.children.push(file)
      }
      if (stats.isDirectory()) {
        obj.children.push(sideBar(foldPath +　'/' + file, file))
      }
  })
  return [obj]
}
// let bar = sideBar('./docs/records', 'records')

// console.log(bar) 
*/

let config = {
  "title": "Demon",
  "description": "Simple Love, Simple Life",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeLine/",
        "icon": "reco-date"
      },
      {
        "text": "AboutMe",
        "link": "/about/",
        "icon": "reco-account"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          // {
          //   "text": "NPM",
          //   "link": "https://www.npmjs.com/~reco_luan",
          //   "icon": "reco-npm"
          // },
          {
            "text": "GitHub",
            "link": "https://github.com/demonze",
            "icon": "reco-github"
          },
          // {
          //   "text": "简书",
          //   "link": "https://www.jianshu.com/u/cd674a19515e",
          //   "icon": "reco-jianshu"
          // },
          {
            "text": "CSDN",
            "link": "https://blog.csdn.net/qq_35656123",
            "icon": "reco-csdn"
          },
          // {
          //   "text": "博客圆",
          //   "link": "https://www.cnblogs.com/luanhewei/",
          //   "icon": "reco-bokeyuan"
          // },
          // {
          //   "text": "WeChat",
          //   "link": "https://mp.weixin.qq.com/s/mXFqeUTegdvPliXknAAG_A",
          //   "icon": "reco-wechat"
          // }
        ]
      }
    ],
    // "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "logo": "/head.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "sidebar": "auto",
    "lastUpdated": "Last Updated",
    "author": "demonze",
    // "record": "xxxx",
    "startYear": "2019",
    "valineConfig": {
      "appId": 'MMLLsac9MdB8h34jL9uqnLV0-gzGzoHsz',// your appId
      "appKey": 'VurGC81Abcl5jIV1tuEI07zg', // your appKey
      "recordIP": true,
      "notify": true,
      "verify": false
    },
    // 加密
    // "keyPage": {
    //   "keys": ['123456'],
    //   "color": '#42b983', // 登录页动画球的颜色
    //   "lineColor": '#42b983' // 登录页动画线的颜色
    // },
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    "@vuepress/medium-zoom",
    "flowchart"
  ]
}

module.exports = config

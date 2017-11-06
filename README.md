# vue2.5.2-element-ui2.0.1-adminDemo

> A Vue.js project

> 本demo是一个后台admin框架，并没有封装很多组件，重点都在交互上面

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8082
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 技术栈 
> vue 2.5.2 + element-ui 2.0.1 + vuex + vue-router + axios + mock

> element-ui2.0.1 要求vue最低2.5.2

## 一些说明
* 默认端口8082，可以在dev-server中修改
* 主视图路径在Home.vue文件中配置
* 请求均用axios-mock-adapter拦截并返回mock数据

## 实现的特性
* 路由懒加载
* 路由根据用户角色信息动态加载
* 动态生成无限层级菜单栏
* 菜单、tab、视图进行联动
* 文件自定义上传
* 表格增删改查、页内查找
* 输入框自动完成（不是element自带的自动完成）
* ...


# vue-element

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

``` notation
# 主要dependencies
* "vue": "^2.5.2"  --> element-ui 2.0.1最低要求vue 2.5.2
* "element-ui": "^2.0.1"

# 一些说明
1. 默认端口8082，可以在dev-server中修改
2. 主视图路径在Home.vue文件中配置
3. 请求均用axios-mock-adapter拦截并返回mock数据

# 实现的特性
1. 路由懒加载
2. 路由根据用户角色信息动态加载
3. 动态生成无限层级菜单栏
4. 菜单、tab、视图进行联动
5. 文件自定义上传
6. 表格增删改查、页内查找
7. 输入框自动完成（不是element自带的自动完成）
8. ...

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

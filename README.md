# vue-blog

### 环境准备

- vue-cli v4.5.10
- Node.js v14.15.4
- MongoDB v4.4.3

### 本地启动项目

#### 1. cd server 进入 server 文件夹

运行前, 请确认是否已启动本地 mongoDB 数据库服务，默认地址：mongodb://127.0.0.1:27017/

```
yarn 
yarn serve
```

#### 2. cd web 进入 web 文件夹

```
yarn
yarn serve
```

#### 3. cd admin 进入 admin 文件夹

```
yarn
yarn serve
```

### 后台管理系统

- 分类管理
- 文章管理(支持markdown)
- 留言管理
- 用户管理
- 友链管理
- 邮件推送
- 账号登陆注册

### 博客系统

- 博客首页
- 博客归档页面
- 博客标签页面
- 博客文章页面
- 博客友链页面
- 博客留言页面
- 后台数据接口

### 欢迎 Star，Issues

- 预览 ➡️ [前端](https://blog.lastwhisper.net) [后台管理](https://blog.lastwhisper.net/admin)
- 您的 Star，是我不断更新维护的动力！！！
- 若在使用过程中，存在某些问题，欢迎 Issues

### To Do List

- 性能优化(已开启gzip与cdn加速)，图片需要压缩处理，预加载处理
- 给博文页面加上搜索功能
- 浏览器兼容问题，移动端适配。只用了自己电脑的谷歌 chrome 浏览器开发和手机适配效果，其他种种都没试，不过不建议移动端使用，电脑登陆效果更佳
- 解决 vue 的 seo 问题及刷新渲染页面抖动问题。先暂时做 vue 预渲染，不排除以后会做 vue 服务端渲染或 nuxt.js 服务端渲染
- 整理代码，拆分出组件。让结构更清晰，代码量更少
- 利用 typescript 重构整个项目
- 想到有意思的功能也会慢慢加上，持续开发中...

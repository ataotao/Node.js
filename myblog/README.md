对应文件及文件夹的用处：
===================================

- models: 存放操作数据库的文件
- public: 存放静态文件，如样式、图片等
- routes: 存放路由文件
- views: 存放模板文件
- config: 配置文件
- middlewares: 中间件处理
- lib: 库
- logs: 日志
- index.js: 程序主文件
- package.json: 存储项目名、描述、作者、依赖等等信息

对应模块的用处：

- express: web 框架
- express-session: session 中间件
- connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
- connect-flash: 页面通知提示的中间件，基于 session 实现
- ejs: 模板
- express-formidable: 接收表单及文件的上传中间件
- config-lite: 读取配置文件
- marked: markdown 解析
- moment: 时间格式化
- mongolass: mongodb 驱动
- objectid-to-timestamp: 根据 ObjectId 生成时间戳
- sha1: sha1 加密，用于密码加密
- winston: 日志
- express-winston: 基于 winston 的用于 express 的日志中间件


config-lite
=========================
`config-lite` 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。`如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置`，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 `NODE_ENV=test node app` 启动，则通过 require('config-lite') 会依次降级查找 config/test.js、config/test.json、config/test.node、config/test.yml、config/test.yaml 并合并 default 配置; 如果程序以 NODE_ENV=production node app 启动，则通过 require('config-lite') 会依次降级查找 config/production.js、config/production.json、config/production.node、config/production.yml、config/production.yaml 并合并 default 配置。


需要注意的是，通过设置：
================
    config/*
    !config/default.*
    
这样只有 config/default.js 会加入 git 的版本控制，而 config 目录下的其他配置文件则会被忽略，因为把线上配置加入到 git 是一个不太安全的行为，通常你需要去线上环境手动创建 config/production.js，然后添加一些线上的配置（如：mongodb url）即可覆盖相应的 default 配置。
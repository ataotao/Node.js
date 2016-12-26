// config-lite 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

// 如果程序以 NODE_ENV=test node app 启动，则通过 require('config-lite') 会依次降级查找 config/test.js、config/test.json、config/test.node、config/test.yml、config/test.yaml 并合并 default 配置; 如果程序以 NODE_ENV=production node app 启动，则通过 require('config-lite') 会依次降级查找 config/production.js、config/production.json、config/production.node、config/production.yml、config/production.yaml 并合并 default 配置。
var config = require('config-lite');

// 配置Mongolass
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
console.log(mongolass);
//连接数据库
mongolass.connect(config.mongodb);

// 我们定义了用户表的 schema，生成并导出了 User 这个 model，同时设置了 name 的唯一索引，保证用户名是不重复的。
// 小提示：关于 Mongolass 的 schema 的用法，请查阅 another-json-schema。 https://github.com/nswbmw/another-json-schema
// 小提示：Mongolass 中的 model 你可以认为相当于 mongodb 中的 collection，只不过添加了插件的功能。
exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});

//根据用户名找到用户，用户名全局唯一
exports.User.index({ name: 1 }, { unique: true }).exec();
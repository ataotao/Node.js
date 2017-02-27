var hello1 = require('./module');
hello1.setName('BYVoid');

var hello2 = require('./module');
hello2.setName('BYVoid 2');
hello1.sayHello();

// node loadmodule.js
//运行后发现输出结果是 Hello BYVoid 2，这是因为变量 hello1 和 hello2 指向的是同一个实例，
//因此 hello1.setName 的结果被 hello2.setName 覆盖，最终输出结果是由后者决定的。
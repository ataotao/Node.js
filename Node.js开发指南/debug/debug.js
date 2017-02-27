// 在命令行下执行 node debug debug.js，将会启动调试工具：
//详细的调试命令需要查看文档

var a = 1;
var b = 'world';

var c = function (x) {
    console.log('hello ' + x + a);
};
c(b);
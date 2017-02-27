/**
 * 
 * process
 * process 是一个全局变量，即 global 对象的属性。它用于描述当前 Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。
 * 
 * process.argv是命令行参数数组，第一个元素是 node，第二个元素是脚本文件名，从第三个元素开始每个元素是一个运行参数。
 * 执行node process.js 1991 name=byvoid --v "Carbo Kuo" 可以查看到参数
 * 
 * process.stdout是标准输出流，通常我们使用的 console.log() 向标准输出打印字符，而 process.stdout.write() 函数提供了更底层的接口。
 * 
 * process.stdin是标准输入流，初始时它是被暂停的，要想从标准输入读取数据，你必须恢复流，并手动编写流的事件响应函数。
 * 
 * process.nextTick(callback)的功能是为事件循环设置一项任务，Node.js 会在下次事件循环调响应时调用 callback。
 */

//process.argv
// console.log(process.argv, 'process.argv');


//process.stdout ， process.stdout
//执行 node process.js 随便输入内容试试看
// process.stdin.resume();
// process.stdin.on('data', function (data) {
//     process.stdout.write('read from console: ' + data.toString());
// });


/**
 * 我们假设 compute() 和 somethingComplicated() 是两个较为耗时的函数，以上的程序在调用 doSomething() 时会先执行 somethingComplicated()，然后立即调用回调函数，在 onEnd() 中又会执行 compute()。
 * 改写后的程序会把上面耗时的操作拆分为两个事件，减少每个事件的执行时间，提高事件响应速度。
 * 不要使用setTimeout(fn,0)代替process.nextTick(callback)，前者比后者效率要低得多。
 */

function somethingComplicated(args) {
    console.log(args);
}

function compute() {
    console.log('compute');
    console.timeEnd('start');
}

// function doSomething(args, callback) {
//     somethingComplicated(args);
//     callback();
// }

// process.nextTick(callback)改写上面的函数
function doSomething(args, callback) {
    somethingComplicated(args);
    process.nextTick(callback);
}

console.time('start');
doSomething([1, 2, 3], function onEnd() {
    compute();
});

/**
 * 我们探讨了process对象常用的几个成员，
 * 除此之外process还展示了process.platform、process.pid、process.execPath、process.memoryUsage() 等方法，以及 POSIX进程信号响应机制。
 * 有兴趣的读者可以访问 http://nodejs.org/api/process.html 了解详细内容。
 */
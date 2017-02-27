/**
 * Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。
 * 在开发者看来，事件由 EventEmitter 对象提供。
 * 前面提到的 fs.readFile 和 http.createServer 的回调函数都是通过 EventEmitter 来实现的
 */
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function () {
    console.log('some_event occured.');
});

event.on('some_event_one', function () {
    console.log('some_event_one occured.');
});

setTimeout(function () {
    event.emit('some_event');
}, 1000);

setTimeout(function () {
    event.emit('some_event_one');
}, 2000);
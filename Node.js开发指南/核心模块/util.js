
// 常用工具 util

/**
 * util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数
 * 注意，Sub 仅仅继承了 Base 在原型prototype中定义的函数，而构造函数内部创造的 base 属性和 sayHello 函数都没有被 Sub 继承。
 */

var util = require('util');

function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function () {
        console.log('Hello ' + this.name);
    };
}

Base.prototype.showName = function () {
    console.log(this.name);
};

function Sub() {
    this.name = 'sub';
}

util.inherits(Sub, Base);
var objBase = new Base();

objBase.showName();
objBase.sayHello();

console.log(objBase);
var objSub = new Sub();

objSub.showName();
// objSub.sayHello();
console.log(objSub);

/**
 * util.inspect
 * util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
 * 
 * showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
 * depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。
 * 如果color 值为 true，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮的效果。
 * 特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对象定义了 toString 方法也不会调用。
 */

function Person() {
    this.name = 'byvoid';
    this.toString = function () {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true, 2, true));

//util还提供了util.isArray()、util.isRegExp()、util.isDate()、util.isError() 四个类型测试工具，
//以及 util.format()、util.debug() 等工具。有兴趣的读者可以访问 http://nodejs.org/api/util.html 了解详细内容。
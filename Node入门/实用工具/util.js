var util = require('util');

/**********************
 * inspect函数的基本用法
 **********************/
// util.inspect(object[, options])是一个将任意对象转换为字符串的函数，通常用于调试和错误输出。它至少接受一个参数object，即要转换的对象,我们来学习它的简单用法。使用语法如下：

console.log('-------------------- inspect函数的基本用法 ----------------------');

var result = util.inspect({a:1, b:2});
console.log(result);
result = util.inspect({a:1, b:2}, { colors : true});
console.log(result);

/**********************
 * format函数的基本用法
 **********************/
// format函数根据第一个参数，返回一个格式化字符串，第一个参数是一个可包含零个或多个占位符的字符串。每一个占位符被替换为与其对应的转换后的值，支持的占位符有："%s(字符串)"、"%d(数字<整型和浮点型>)"、"%j(JSON)"、"%(单独一个百分号则不作为一个参数)"。

console.log('-------------------- format函数的基本用法 ----------------------');

//如果占位符没有相对应的参数，占位符将不会被替换.如示例
var result = util.format('%s:%s', 'foo', 'aab');
console.log(result);

// 如果有多个参数占位符，额外的参数将会调用util.inspect()转换为字符串。这些字符串被连接在一起，并且以空格分隔。如示例：
var result = util.format('%s:%s', 'foo', 'bar', 'baz');
console.log(result);

// 如果第一个参数是一个非格式化字符串，则会把所有的参数转成字符串并以空格隔开拼接在一块，而且返回该字符串。如示例：
var result = util.format(1, 2, 3);
console.log(result);


/**********************
 * isArray函数的基本用法
 **********************/
// isArray函数可以判断对象是否为数组类型，是则返回ture,否则为false。语法如下：

console.log('-------------------- isArray函数的基本用法 ----------------------');

var result = util.isArray({a:1, b:2});
console.log('isArray ' + result);
var result = util.isArray([1,2,3]);
console.log('isArray ' + result);

/**********************
 * isDate函数的基本用法
 **********************/
// isDate函数可以判断对象是否为日期类型，是则返回ture,否则返回false。语法如下：

console.log('-------------------- isDate函数的基本用法 ----------------------');
var result = util.isDate(new Date());
console.log(result);

var result = util.isDate(new Date('2016-10-10'));
console.log(result);

/**********************
 * isRegExp函数的基本用法
 **********************/
// isRegExp函数可以判断对象是否为正则类型，是则返回ture,否则返回false。语法如下：

console.log('-------------------- isRegExp函数的基本用法 ----------------------');
var result = util.isRegExp(/a-z0-9/);
console.log(result);


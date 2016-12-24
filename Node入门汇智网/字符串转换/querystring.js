var querystring = require('querystring'); 

/**********************
 * stringify函数的基本用法
 **********************/
// stringify函数的作用就是序列化对象，也就是说将对象类型转换成一个字符串类型（默认的分割符（"&"）和分配符（"="））

console.log('-------------------- stringify函数的基本用法 ----------------------');

var result = querystring.stringify({foo:'bar',cool:['xux', 'yys']});
console.log(result);

/**********************
 * stringify函数的多参数用法
 **********************/
// 这节我们来学习stringify函数的多参数用法，上节我们知道了对象被序列化为字符串之后默认是通过分割符（"&"）和分配符（"="）组成的，那可不可以改变呢，这节我们就来了解一下，是否可以自己去定义组合结果，看下面的小例子
// 例1：querystring.stringify("对象"，"分隔符"，"分配符")
console.log('-------------------- stringify函数的多参数用法 ----------------------');
var result = querystring.stringify({foo:'bar',cool:['xux', 'yys']},' | ','>');
console.log(result);


/**********************
 * parse函数的基本用法
 **********************/
// 反序列化函数——parse函数，parse函数的作用就是反序列化字符串（默认是由"="、"&"拼接而成），转换得到一个对象类型。如下示例：
console.log('-------------------- parse函数的基本用法 ----------------------');
var result = querystring.parse('foo=bar&cool=xux&cool=yys');
console.log(result);

/**********************
 * parse函数的多参数用法
 **********************/
// parse函数可以根据用户所自定义的分割符、分配符来反序列化字符串，从而得到相应的对象结果.如下示例：
console.log('-------------------- parse函数的多参数用法 ----------------------');
var result = querystring.parse('foo@bar$cool@xux$cool@yys','@','$');
console.log(result);
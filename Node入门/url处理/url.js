
/**********************
 * parse函数的基础用法
 **********************/
// parse函数的作用是解析url，返回一个json格式的数组，请看如下示例：

var url = require('url');

console.log('-------------------- parse函数的基础用法 ----------------------');
var parse;
parse = url.parse('http://www.baidu.com')
console.log(parse);

/**
 * parse函数 —— 条件解析
 */

//parse函数的第二个参数是布尔类型，当参数为true时，会将查询条件也解析成json格式的对象。
//返回数据中的query字段内容有所不同。
parse = url.parse('http://www.baidu.com?page=1', false);
console.log(parse);
parse = url.parse('http://www.baidu.com?page=1', true);
console.log(parse);

/**
 * parse函数 —— 解析主机
 */

//parse函数的第三个参数也是布尔类型的，当参数为true，解析时会将url的"//"和第一个"/"之间的部分解析为主机名，示例如下：
//较之前面的示例，host的内容不再是null了。(没看出区别)
parse = url.parse('http://www.baidu.com?page=1', false, true);
console.log(parse);

/**********************
 * format函数的基础用法
 **********************/
console.log('-------------------- format函数的基础用法 ----------------------');
//format函数的作用与parse相反，它的参数是一个JSON对象，返回一个组装好的url地址，请看如下示例：
var format;
format = url.format({
    protocol: 'http:',
    hostname: 'www.baidu.com',
    port: '80',
    pathname: '/news',
    query: { page: 1 }
});
console.log(format);


/**********************
 * resolve函数的基础用法
 **********************/
console.log('-------------------- resolve函数的基础用法 ----------------------');
// resolve函数的参数是两个路径，第一个路径是开始的路径或者说当前路径，第二个则是想要去往的路径，返回值是一个组装好的url，示例如下：
var resolve;
resolve = url.resolve('http://example.com/', '/one');
console.log(resolve); // 'http://example.com/one'
resolve = url.resolve('/one/two/three', 'four');
console.log(resolve) // '/one/two/four'

var fs = require("fs");

//文件写入 fs模块提供writeFile函数，可以异步的将数据写入一个文件, 如果文件已经存在则会被替换。用法如下：
// 数据参数可以是string或者是Buffer,编码格式参数可选，默认为"utf8"，回调函数只有一个参数err。
//fs.writeFile(file, data[, options], callback)
fs.writeFile('test.txt', 'Hello Node', function (err) {
    if (err) throw err;
    console.log('writeFile 写入文件 完成'); //文件被保存
});

//appendFile函数的基本用法
//writeFile函数虽然可以写入文件，但是如果文件已经存在，我们只是想添加一部分内容，它就不能满足我们的需求了，很幸运，fs模块中还有appendFile函数，它可以将新的内容追加到已有的文件中，如果文件不存在，则会创建一个新的文件。使用方法如下：
fs.appendFile('test1.txt', 'data to append读取到文件转字符串咯\n', function (err) {
    if (err) throw err;
    //数据被添加到文件的尾部
    console.log('appendFile 添加文件内容 完成');
});

// exists函数的基本用法
// 如何检查一个文件是否存在呢？我想exists函数可以帮助你，用法如下：
// 例：fs.exists(文件，回调函数(exists));
// exists的回调函数只有一个参数，类型为布尔型，通过它来表示文件是否存在。
fs.exists('/etc/passwd', function (exists) {
    console.log(exists ? "/etc/passwd存在" : "/etc/passwd不存在!");
});

fs.exists('test1.txt', function (exists) {
    console.log(exists ? "test1.txt存在" : "test1.txt不存在!");
});

// rename函数的基本用法
// 修改文件名称是我们经常会遇见的事情，rename函数提供修改名称服务：
// fs.rename(旧文件，新文件，回调函数(err))
fs.rename('test1.txt', 'test2.txt', function (err) {
    if (err) throw err;
    console.log('renam 更改文件名 完成');
});

// rename函数的基本用法
// 移动文件也是我们经常会遇见的，可是fs没有专门移动文件的函数，但是我们可以通过rename函数来达到移动文件的目的，示例如下。
var oldPath = 'test.txt';
var newPath = 'move/test.txt';
fs.rename(oldPath,newPath,function (err) {
   if (err) throw err;
   console.log('renam 移动文件 完成');
});


// 读取文件 readFile函数的基本用法
// 读取文件是最常用到的功能之一，使用fs模块读取文件语法如下：
// 例：fs.readFile(文件,编码,回调函数);
// 回调函数里面的data,就是读取的文件内容。
fs.readFile('test2.txt', function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});

//unlink函数 删除文件
// fs.unlink(文件,回调函数(err));
fs.unlink('ttt.txt', function(err) {
  if (err) throw err;
  console.log('unlink 删除文件 完成');
});

// mkdir函数的基本用法
// 除了针对文件的操作，目录的创建、删除也经常遇到的，下面我们来看看node.js中如何创建目录：
// 参数
// 路径：新创建的目录。
// 权限：可选参数，只在linux下有效，表示目录的权限，默认为0777，表示文件所有者、文件所有者所在的组的用户、所有用户，都有权限进行读、写、执行的操作。
// 回调函数：当发生错误时，错误信息会传递给回调函数的err参数。
// fs.mkdir(路径，权限，回调函数(err));
fs.mkdir('mkdir', function(err){
    console.log('mkdir 创建文件夹 完成');
});

// rmdir函数的基本用法
// 删除目录也是必不可少的功能，rmdir函数可以删除指定的目录：
// 例：fs.rmdir(路径，回调函数(err));
fs.rmdir('mkdir', function(err) {
    if (err) throw err;
    console.log('ok');
});

// readdir函数的基本用法
// 如果要读取目录下所有的文件应该怎么办呢？readdir函数可以读取到指定目录下所有的文件，示例如下：
// fs.readdir(目录,回调函数(err,files));
// 回调函数 (callback) 接受两个参数 (err, files) 其中 files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'。
fs.readdir('move',function(err,files){
    if (err) throw err;
    console.log(files); //[ 'test.txt' ]
})

//获取文件信息 fs.stat(path, [callback(err, stats)])
fs.stat('move' ,function(err, stats){
    if (err) throw err;
    console.log(stats); //stats
})
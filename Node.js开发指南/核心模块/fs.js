
// 文件系统 fs

/**
 * fs.readFile
 * fs.readFile(filename,[encoding],[callback(err,data)])是最简单的读取文件的函数
 * 
 * 它接受一个必选参数 filename，表示要读取的文件名。
 * 第二个参数 encoding是可选的，表示文件的字符编码。
 * 第三个参数callback 是回调函数，用于接收文件的内容。
 * 如果不指定 encoding，则 callback 就是第二个参数。
 * 回调函数提供两个参数 err 和 data，err 表示有没有错误发生，data 是文件内容。
 * 如果指定了 encoding，data 是一个解析后的字符串，否则 data 将会是以 Buffer 形式表示的二进制数据。
 */

var fs = require('fs');

// 未指定encoding参数
fs.readFile('fs.txt', function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data, '未指定encoding参数');
    }
});
// 指定encoding参数
fs.readFile('fs.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data, '指定encoding参数');
    }
});

/**
 * fs.readFileSync
 * fs.readFileSync(filename, [encoding])是 fs.readFile 同步的版本。
 * 它接受的参数和 fs.readFile 相同，而读取到的文件内容会以函数返回值的形式返回。
 * 如果有错误发生，fs 将会抛出异常，你需要使用 try 和 catch 捕捉并处理异常。
 * 与同步 I/O 函数不同，Node.js 中异步函数大多没有返回值。
 */
var rfs = fs.readFileSync('fs.txt', 'utf-8');
console.log(rfs, '同步方法读取文件');

/**
 * fs.open
 * fs.open(path, flags, [mode], [callback(err, fd)])是 POSIX open 函数的封装，与 C 语言标准库中的 fopen 函数类似。
 * 它接受两个必选参数，path 为文件的路径，flags 可以是以下值。
 * r ：以读取模式打开文件。
 * r+ ：以读写模式打开文件。
 * w ：以写入模式打开文件，如果文件不存在则创建。
 * w+ ：以读写模式打开文件，如果文件不存在则创建。
 * a ：以追加模式打开文件，如果文件不存在则创建。
 * a+ ：以读取追加模式打开文件，如果文件不存在则创建。
 * mode 参数用于创建文件时给文件指定权限，默认是 0666①。回调函数将会传递一个文件描述符 fd②。
 * ① 文件权限指的是 POSIX 操作系统中对文件读取和访问权限的规范，通常用一个八进制数来表示。
 * 例如 0754 表示文件所有者的权限是 7 （读、写、执行），同组的用户权限是 5 （读、执行），其他用户的权限是 4 （读），写成字符表示就是 -rwxr-xr--。
 * ② 文件描述符是一个非负整数，表示操作系统内核为当前进程所维护的打开文件的记录表索引。
 */

fs.open('fs.txt', 'r', function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data, 'fs.open');
    }
});


/**
 * fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead,buffer)])是 POSIX read 函数的封装，
 * 相比 fs.readFile 提供了更底层的接口。fs.read的功能是从指定的文件描述符 fd 中读取数据并写入 buffer 指向的缓冲区对象。
 * offset 是buffer 的写入偏移量。
 * length 是要从文件中读取的字节数。
 * position 是文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
 * 回调函数传递bytesRead 和 buffer，分别表示读取的字节数和缓冲区对象。
 * 以下是一个使用 fs.open 和 fs.read 的示例。
 */

fs.open('fs.txt', 'r', function (err, fd) {
    if (err) {
        console.error(err);
        return;
    }
    var buf = new Buffer(8);
    fs.read(fd, buf, 0, 8, null, function (err, bytesRead, buffer) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('bytesRead: ' + bytesRead);
        console.log(buffer);
    });
});


//一般来说，除非必要，否则不要使用这种方式读取文件，因为它要求你手动管理缓冲区和文件指针，尤其是在你不知道文件大小的时候，这将会是一件很麻烦的事情。


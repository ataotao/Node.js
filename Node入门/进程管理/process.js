/*
 * process是一个全局内置对象，可以在代码中的任何位置访问此对象，这个对象代表我们的node.js代码宿主的操作系统进程对象。
 * 使用process对象可以截获进程的异常、退出等事件，也可以获取进程的当前目录、环境变量、内存占用等信息，还可以执行进程退出、工作目录切换等操作。
 */

// cwd 查看应用程序当前目录
var cwd = process.cwd(); //f:\github\Node.js\Node入门
console.log(cwd);

// chdir 改变应用程序目录
console.log(`Starting directory: ${process.cwd()}`);
try {
    process.chdir('/github/Node.js');
    console.log(`New directory: ${process.cwd()}`);
}
catch (err) {
    console.log(`chdir: ${err}`);
}

//stdout 标准输出流，它的作用就是将内容打印到输出设备上，console.log就是封装了它。
console.log = (msg) => {
  process.stdout.write(`${msg}${'***测试***'}\n`);
};

console.log('hello world stdout');

//stderr是标准错误流，和stdout的作用差不多，不同的是它是用来打印错误信息的，我们可以通过它来捕获错误信息
process.stderr.write('erroy stderr \n');

//node是使用process.stdin和process.stdout来实现标准输入和输出的
//stdin是进程的输入流,我们可以通过注册事件的方式来获取输入的内容，如下：
//执行 node process.js, 在终端输入123试试，chunk就是输入流中的内容。
//当没有输入的时候，退出 end

process.stdin.setEncoding('utf8');  //设置stdin编码格式为"utf8"
process.stdout.setEncoding('utf8'); //设置stdout编码格式为"utf8"
process.stderr.setEncoding('utf8'); //设置stderr编码格式为"utf8"


process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if(typeof chunk === 'string'){
    //你还记得你每次输入结束之后都要敲的回车键吗？回车键的字符就是’\n’
    //知道问题的原因就好解决了，既然加了回车字符，那么我们就将回车字符去掉，最简单的方法当然是切片。
    chunk = chunk.slice(0,-2);
    process.stdout.write(`stringLength:${chunk.length}\n`);
  }
  if(chunk === ''){
    process.stdin.emit('end');
    return;
  }

  //如果你需要在程序内杀死进程，退出程序，可以使用exit函数，示例如下：
  if(chunk === 'exit'){
    process.exit(100);
    // process.exit(code) , 参数code为退出后返回的代码，如果省略则默认返回0；
  }

  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}\n`);
  }
});
 
process.stdin.on('end', () => {
  process.stdout.write('end');
});


// process.on()方法可以监听进程事件。

//参数code表示退出码
process.on("exit",function(code){
  //进行一些清理工作
  tick = Date.now();
  console.log(tick + '第二次时间戳');
  console.log(code);
});
var tick = Date.now();
console.log(tick + '第一次时间戳');


//uncaughtException事件
//如果进程发生了未捕捉的异常，会触发uncaughtException事件。通过监听这个事件，你可以 让进程优雅的退出：
//参数err表示发生的异常
process.on("uncaughtException",function(err){
  console.log(err);
});
//故意抛出一个异常
throw new Error("我故意的...");

//小文件拷贝

// var fs = require('fs');
// function copy(src, dst) {
//     fs.writeFileSync(dst, fs.readFileSync(src));
// }
// function main(argv) {
//     copy('./img/test.json', './json/test.json');
// }
// main();


//大文件拷贝
var fs = require('fs');

function copy(src, dst) {
    var stream = fs.createReadStream(src);
    stream.pipe(fs.createWriteStream(dst))

    stream.on("open", function (fd) {
        console.log("开始读取文件：");
    });
    stream.on("data", function (data) {
        console.log("读取到数据：");
        console.log(data);
    });
    stream.on("end", function () {
        console.log("文件已全部读取完毕。");
    });
    stream.on("close", function () {
        console.log("文件被关闭。");
    });
    stream.on("error", function () {
        console.log("读取文件失败。");
    });
}

function main(argv) {
    copy('./img/test.json', './json/test.json');
}

main();



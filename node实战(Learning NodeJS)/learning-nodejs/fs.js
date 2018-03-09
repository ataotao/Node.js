// var fs = require('fs');

// fs.open('./learning-nodejs/info.txt', 'r', function (err, handle) {
//     // console.log(arguments);

//     if (err) {
//         console.log(err.message);
//         return;
//     }

//     var buf = Buffer(100000);

//     fs.read(handle, buf, 0, 100000, null, function (err, length) {
//         if (err) {
//             console.log(err.message);
//             return;
//         }
//         console.log(buf.toString('utf8', 0, length));

//         fs.close(handle, function () {

//             console.log('close');

//         });

//     });


// });


// 写一个小小的类来处理一些普通文件操作

var fs = require('fs');

function FileObject() {
    this.filename = '';

    this.file_exists = function (callback) {
        console.log('About to open:' + this.filename);
        // var _self = this;

        (function (_self) {
            fs.open(_self.filename, 'r', function (err, handle) {
                if (err) {
                    console.log('Cant open:' + _self.filename);
                    callback(err);
                    return;
                }

                fs.close(handle, function () { });
                callback(null, handle);
            });
        }(this));

    };
}


var fo = new FileObject();
fo.filename = './learning-nodejs/inf.txt';

fo.file_exists(function (err, results) {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log(results);
});


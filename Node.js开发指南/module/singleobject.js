
/**
 * 有时候我们只是想把一个对象封装到模块中，例如：
 * 此时我们在其他文件中
 * 此时我们在其他文件中需要通过 require('./singleobject').Hello 来获取Hello 对象，这略显冗余，可以用下面方法稍微简化：
 */

// function Hello() {
//     var name;
//     this.setName = function (thyName) {
//         name = thyName;
//     };
//     this.sayHello = function () {
//         console.log('Hello ' + name);
//     };
// }
// exports.Hello = Hello;


function Hello() {
    var name;
    this.setName = function (thyName) {
        name = thyName;
    };
    this.sayHello = function () {
        console.log('Hello ' + name);
    };
}
module.exports = Hello;

/**
 * 重点：
 * 注意，模块接口的唯一变化是使用    module.exports = Hello    代替了    exports.Hello=Hello   。
 * 在外部引用该模块时，其接口对象就是要输出的 Hello 对象本身，而不是原先的exports。
 * 事实上，exports 本身仅仅是一个普通的空对象，即 {}，它专门用来声明接口，本质上是通过它为模块闭包的内部建立了一个有限的访问接口。
 * 因为它没有任何特殊的地方，所以可以用其他东西来代替，譬如我们上面例子中的 Hello 对象。
 * 
 * 
 * 不可以通过对 exports 直接赋值代替对 module.exports 赋值。
 * exports 实际上只是一个和 module.exports 指向同一个对象的变量，它本身会在模块执行结束后释放，但 module 不会，因此只能通过指定module.exports 来改变访问接口。
 * 
 */

/**
 * 执行代码
 * var Hello = require('./singleobject.js');
 * var hello = new Hello();
 * hello.setName('BYVoid');
 * hello.sayHello();
 */

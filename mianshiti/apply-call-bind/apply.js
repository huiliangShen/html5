Function.prototype.myApply = function (context) {
    context = context || window
    context.fn = this
    var result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

function test1 (name) {
    this.name = name
    this.fn = function(){
        console.log(this.name)
    }
    return this.fn
}

var t = new test1('1');
console.log(t.name)

var k = test1.apply({}, [1])
console.log(1)

function create() {
    // 创建一个空的对象
    let obj = new Object()
    // 获得构造函数
    let Con = [].shift.call(arguments)
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执行构造函数
    let result = Con.myApply(obj, arguments)
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj
}

var t1 = create(test1,1)
console.log(t1)
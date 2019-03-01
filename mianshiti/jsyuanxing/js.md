![](../../images/js.png '描述')
```javascript
// 创建对象的三种方式
var a = {m1:'1'};
var b = new Object({m:1});
var c = function(){};
var d = new c();
var e = {m:1};
var f = Object.create(e);
```
> js运行机制：event loop 同步任务放在运行栈 浏览器引擎 发现有setTime/setInternal/Dom操作/promise会将拿到timer模块中，等到运行时间到了，放到异步任务队列 等到 运行栈执行完后，向异步任务队列里取任务，执行完后再向异步任务队列里拿
```javascript
// 第一种
// 问题原型链上新增的方法属性都不能在实例里拿到
function Father(){
    this.name = 'name'
};
function Child(){
    Father.call(this);
    this.eat = function(){}
};
// 2
// 覆盖了child的原型对象
var father = function(){
    this.name = 'name'
};
var child = function(){
    this.eat = function(){}
};
child.prototype = new father()
// 3
function Father() {
    this.name = '1'
}
function Child() {
    Father.call(this)
    this.type = '2'
}
Child.prototype = new Father()
// 4 
function Father() {
    this.name = '1'
}
function Child() {
    Father.call(this)
    this.type = '2'
}
Child.prototype = Father.prototype
// 5
function Father(){
    this.name = 'name'
};
function Child(){
    Father.call(this);
    this.eat = function(){}
};
Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Father;
// 6
class Father{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    talk() {
        console.log(`我的名字：${this.name},我的年龄：${this.age}`);
    }
}
class Child extends Father{
    constructor(name, age){
        super(name, age)
    }
}
var c = new Child('张三', '22');
c.talk()
```
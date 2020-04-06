/**
 * 正则表达式
 * g 表示全局匹配
 * i 表示不区分大小写
 * m 表示多行模式 （到达一行文本末位时还会继续向下查找下一行中是否存在与模式匹配的项）
 * 元字符 ([{\ ^ $ | ? * + .}])
 * . 代表以.后的结果
 */
var p1 = /at/g

var r = new RegExp(p1)
console.log(r.test('adqe2a1tacasa a1tfa'))

/**
 * 匹配第一个bat、cat
 */
p1 = /[bc]at/i
// p1 = new RegExp('[bc]at', 'i')

r = new RegExp(p1)
console.log(r.test('BBcat ddqw'))

/**
 * 匹配所有以‘at’结尾的三个字符组合 不区分大小写
 */
p1 = /.at/gi

r = new RegExp(p1)
console.log(r.exec('XASAT1'))

/**
 * 匹配第一个[bc]at
 */
p1 = /\[bc\]at/i
r = new RegExp(p1)
console.log(r.exec('111[bc1]at'))

/**
 * 匹配所有.at,不区分大小写
 */
p1 = /\.at/gi

console.log(`--------------------`)
var re = null,
    i;

for(let i = 0;i<10;i++) {
    re = /cat/g;
    console.log(re.test('cat adqwscwq'))
}

// regexp的实例
var p2 = /\[bc\]at/i
console.log(p2.flags)
console.log(p2.global)
console.log(p2.ignoreCase)
console.log(p2.lastIndex)
console.log(p2.multiline)
console.log(p2.sticky)
console.log(p2.unicode)

console.log('---------------------')

var p3 = /\d{3}-\d{2}-\d{4}/
console.log(p3.exec('000-01-00001'))

console.log(p3.valueOf())

var p4 = /(..)or(.)/g
console.log(p4.exec('this has been a shortf summer'))

var p5 = /^12 3$/g
console.log(p5.exec('123 ded'))
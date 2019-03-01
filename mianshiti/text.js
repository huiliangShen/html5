// var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// var myReduce = numbers.reduce(function(previous,current,index){
//     console.log(previous, current, index)
//     return previous + "" + current;
//   });
// console.log(myReduce);

// console.log(k);
// let k = 1;

// if(true){
//   // tmz start
//   k = 2;
//   // ReferenceError
//   console.log(k);
//   let k;
// }

// typeof abc
// let abc;

function convert (obj) {

  // 迭代对象的所有属性
  // 并使用Object.defineProperty()转换成getter/setters
  Object.keys(obj).forEach(key => {
  
    // 保存原始值
    let internalValue = obj[key]
    
    Object.defineProperty(obj, key, {
      get () {
        console.log(`getting key "${key}": ${internalValue}`)
        return internalValue
      },
      set (newValue) {
        console.log(`setting key "${key}" to: ${newValue}`)
        internalValue = newValue * 10
      }
    })
  })
}

const obj = { foo: 123 }
convert(obj)
console.log(obj.foo)
obj.foo = 100
console.log(obj.foo)

console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

Function.prototype.myCall = function (context) {
    var context = context || window
    // 给 context 添加一个属性
    // getValue.call(a, 'yck', '24') => a.fn = getValue
    context.fn = this
    // 将 context 后面的参数取出来
    var args = [...arguments].slice(1)
    // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
    context.fn(...args)
    // 删除 fn
    delete context.fn
  }
  var a = {age: '1yyyyy'};
  function getValue(name, value) {
      console.log(name);
      console.log(value);
      console.log(this.age);
  }
  getValue.myCall(a, '1aaa', '2bbb');

  var M = function() {this.name = 1}
  var new2 = function(func) {
      var o = Object.create(M.prototype)
      var k = func.call(o)
      if (typeof k === 'object') {
          return k
      } else {
          return o
      }
  }

  var c = new2(M)
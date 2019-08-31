Function.prototype.myCall = function(context) {
    context = context || window
    context.fn = this
    var args = [...arguments].slice(1)
    var result = context.fn(...args)
    delete context.fn
    return result
}

/**
 * 
 */
function talk (x,y) {
    return x+y;
}
console.log(talk.myCall({name: 1}, 1, 2))

var obj = {
    name: 1,
    // call 之后
    talk:function(x,y){
        return x+y
    }
}
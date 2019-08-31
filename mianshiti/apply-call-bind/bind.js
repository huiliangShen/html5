Function.prototype.myBind = function(context) {
    var self = this
    var args = [...arguments].slice(1)

    var fn = function(){
        var bindArgs = [...arguments].slice(0)
        var _self = this instanceof fn ? this : context
        self.apply(_self, args.concat(bindArgs))
    }
    fn.prototype = Object.create(this.prototype)
    return fn
}
function test1 (name) {
    this.name = name
    this.fn = function(){
        console.log(this.name)
    }
    return this.fn
}

var t = new test1('1');
console.log(t.name)
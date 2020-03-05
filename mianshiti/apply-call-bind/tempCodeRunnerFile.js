function test1 (name) {
    this.name = name
    this.fn = function(){
        console.log(this.name)
    }
    return this.fn
}
// var name = 11111
var t = new test1('1');
t.name = 111
console.log(t())
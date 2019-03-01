function fib(n) {
    let array = new Array(n).fill(null)
    array[0] = 0
    array[1] = 1
    for (let i = 2; i < n; i++) {
      array[i] = array[i - 1] + array[i - 2]
    }
    console.log(array)
    return array[n]
}
fib(10)
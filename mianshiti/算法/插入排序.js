var test = [9,6,5,4,3,2,1]
const insertion = (arr) => {
    let _a = null;
    if (Array.isArray(arr)) {
        for(let i = 1;i < arr.length; i++) {
            for(let j = i - 1;j >= 0 ;j--) {
                if(arr[j] > arr[j + 1]) {
                    _a = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j+1] = _a;
                }
                console.log(arr.toString(), ` i=${i}`)
            }
        }
    } else {
        console.log(`not array`);
    }
}
insertion(test);
// 斐波那契数列
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
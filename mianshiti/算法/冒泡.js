var test = [9,6,5,4,3,2,1]
const bubble = (arr) => {
    let _a = null;
    if (Array.isArray(arr)) {
        for(let i = arr.length - 1;i > 0; i--) {
            for(let j = 0;j < i;j++) {
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
bubble(test);
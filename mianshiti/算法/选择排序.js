var test = [9, 6, 5, 4, 3, 2, 1]
const select = (arr) => {
    let _a = null;
    if (Array.isArray(arr)) {
        let _min = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            _min = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[_min] > arr[j]) {
                    _min = j;
                }
            }
            if (_min !== i) {
                _a = arr[_min];
                arr[_min] = arr[i];
                arr[i] = _a;
            }
            console.log(arr.toString(), ` i=${i}`)
        }
    } else {
        console.log(`not array`);
    }
}
select(test);
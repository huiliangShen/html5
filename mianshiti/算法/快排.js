function quick(arr) {
    if (!Array.isArray(arr)) {
        return;
    }
    if(arr.length <= 1){
        return arr;
    }
    let centerIndex = arr.length >> 1;
    let centerValue = arr[centerIndex];
    arr.splice(centerIndex, 1);
    let rigth = [];let left = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < centerValue) {
            left.push(arr[i]);
        } else {
            rigth.push(arr[i]);
        }
    } 
    let fLeft = quick(left);
    let fRigth = quick(rigth);
    return fLeft.concat([centerValue], fRigth);
}


var arr = [1,5,3,2,7,4,9,0]

console.log(quick(arr))

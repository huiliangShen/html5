var p = new Promise(function(resolve, reject){
    foo.bar()
    resolve(42)
})

p.then(() => {})
.catch((err) => {
    // console.log(1, err)
})

function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

delay(100)
.then(() => {
    console.log(`100ms`)
    // return delay(200)
})
.then(() => {
    console.log(`200`)
})
.then(() => {
    console.log('???')
})
.then(() => {
    console.log(`acscscs`)
})
const LIST = ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1410872754,1106622497&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2536037772,1598587955&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2105965757,474058492&fm=26&gp=0.jpg']
window.onload = function() {
    wallfull()
}

/* window.addEventListener('resize', () => {
    console.log('resuze')
    wallfull()
}) */

document.addEventListener('scroll', () => {
    let parent = document.getElementById('main')   
    if (isScroll()) {
        for (let i = 0; i < 10; i++) {
            let boxDom = document.createElement('div')
            boxDom.className = 'box'
            let pic = document.createElement('div')
            pic.className = 'picture'
            let img = document.createElement('img')
            img.src = LIST[Math.floor(Math.random() * 3)]
            pic.appendChild(img)
            boxDom.appendChild(pic)
            parent.appendChild(boxDom)    
        }
        wallfull()
    }
})

function wallfull () {
    let parent = document.getElementById('main')
    let boxs = [...document.getElementsByClassName('box')].slice(0)
    let boxsWidth = boxs[0].offsetWidth
    let cols = Math.floor(document.documentElement.clientWidth / boxsWidth)
    parent.style.width = cols*boxsWidth + 'px'

    let hList = []
    for(let i in boxs) {
        if (i < cols) {
            hList.push(boxs[i].offsetHeight)
        } else {
            let min = Math.min.apply(null, hList)
            let minIndex = hList.indexOf(min)

            boxs[i].style.position = 'absolute'
            boxs[i].style.top = min + 'px'
            boxs[i].style.left = boxsWidth * minIndex + 'px'

            let newH = boxs[i].offsetHeight + min
            hList.splice(minIndex, 1, newH)
        }
    }
}

function isScroll() {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    let boxs = [...document.getElementsByClassName('box')]
    let last = boxs[boxs.length - 1]
    console.log(Math.floor(last.offsetTop + last.offsetHeight / 2) < scrollTop + document.body.clientHeight)
    return Math.floor(last.offsetTop + last.offsetHeight / 2) < scrollTop + document.body.clientHeight
}
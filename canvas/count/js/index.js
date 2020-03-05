var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 368;
var RADIUS = 8;
var TOP = 60, LEFT = 30;
// var endTime = new Date(2020, 1, 19, 23, 59, 59)
var endTimeTotal = 0
var balls = [] // [{x: 0, y: 100, vx: 1, vy: 0, g: 2}]
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]
window.onload = function () {
    var canvas = document.querySelector('canvas')
    var ctx = canvas.getContext('2d')

    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight

    LEFT = Math.round(WINDOW_WIDTH / 10)
    TOP = Math.round(WINDOW_HEIGHT / 5)

    // 108 所有小球横向给的距离
    RADIUS = Math.round((WINDOW_WIDTH * 4 / 5) / 108) - 1

    canvas.width = WINDOW_WIDTH
    canvas.height = WINDOW_HEIGHT

    endTimeTotal = getRet()
    setInterval(() => {
        render(ctx)
        update()
    }, 50)
}

function getRet() {
    // 倒计时 计算时间搓差
    /* var now = new Date().getTime()
    var ret = endTime.getTime() - now
    ret = Math.round(ret / 1000)
    return ret > 0 ? ret : 0 */
    var now = new Date()
    var result = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
    return Math.round(result)
}

function update() {
    var nextTimeSeconds = getRet()

    var nextHour = parseInt(nextTimeSeconds / 3600)
    var nextMin = parseInt((nextTimeSeconds - nextHour * 3600) / 60)
    var nextSeconds = nextTimeSeconds % 60

    var hour = parseInt(endTimeTotal / 3600)
    var min = parseInt((endTimeTotal - hour * 3600) / 60)
    var second = endTimeTotal % 60

    console.log(nextHour, nextMin, nextSeconds)
    console.log(hour, min, second)

    if (nextSeconds != second) {
        endTimeTotal = nextTimeSeconds
        if (parseInt(nextHour / 10) != parseInt(hour / 10))
            addBall(LEFT, TOP, parseInt(hour / 10))

        if (parseInt(nextHour % 10) != parseInt(hour % 10))
            addBall(LEFT + 15 * (RADIUS + 1), TOP, parseInt(hour % 10))

        if (parseInt(nextMin / 10) != parseInt(min / 10))
            addBall(LEFT + 39 * (RADIUS + 1), TOP, parseInt(min / 10))

        if (parseInt(nextMin % 10) != parseInt(min % 10))
            addBall(LEFT + 54 * (RADIUS + 1), TOP, parseInt(min % 10))

        if (parseInt(nextSeconds / 10) != parseInt(second / 10))
            addBall(LEFT + 78 * (RADIUS + 1), TOP, parseInt(second / 10))

        if (parseInt(nextSeconds % 10) != parseInt(second % 10))
            addBall(LEFT + 93 * (RADIUS + 1), TOP, parseInt(second % 10))
    }

    updateBalls()
}

function addBall(x, y, num) {
    var d = digit[num]

    for (let i = 0; i < d.length; i++) {
        for (let j = 0; j < d[i].length; j++) {
            var element = d[i][j]
            if (element === 1) {
                balls.push({
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 5,
                    vy: -5,
                    g: 1.5 + Math.random(),
                    color: colors[Math.floor(Math.random() * colors.length)]
                })
            }
        }

    }
}

function updateBalls() {
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ball.y += ball.vy;
        ball.x += ball.vx;
        ball.vy += ball.g;

        if (ball.y > WINDOW_HEIGHT - RADIUS) {
            ball.y = WINDOW_HEIGHT - RADIUS
            // console.log(ball.vy, 1)
            ball.vy = Math.abs(ball.vy * 0.75) < (RADIUS) * 4 / 3 ? 0 : -ball.vy * 0.75
            // console.log(ball.vy, 2)
        }
    }
    let index = 0
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        if (ball.x + RADIUS > 0 && ball.x - RADIUS < WINDOW_WIDTH) {
            balls[index++] = ball
        }
    }
    while (balls.length > index) {
        balls.pop()
    }
    console.log(balls.length)
    // console.log(balls[0].y - 100, balls[0].vy)
}

function render(ctx, cb) {

    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    var hour = parseInt(endTimeTotal / 3600)
    var min = parseInt((endTimeTotal - hour * 3600) / 60)
    var second = endTimeTotal % 60

    renderDigit(LEFT, TOP, parseInt(hour / 10), ctx)
    renderDigit(LEFT + 15 * (RADIUS + 1), TOP, parseInt(hour % 10), ctx)
    renderDigit(LEFT + 30 * (RADIUS + 1), TOP, 10, ctx)
    renderDigit(LEFT + 39 * (RADIUS + 1), TOP, parseInt(min / 10), ctx)
    renderDigit(LEFT + 54 * (RADIUS + 1), TOP, parseInt(min % 10), ctx)
    renderDigit(LEFT + 69 * (RADIUS + 1), TOP, 10, ctx)
    renderDigit(LEFT + 78 * (RADIUS + 1), TOP, parseInt(second / 10), ctx)
    renderDigit(LEFT + 93 * (RADIUS + 1), TOP, parseInt(second % 10), ctx)

    for (let i = 0; i < balls.length; i++) {
        const element = balls[i];
        ctx.beginPath()
        ctx.fillStyle = element.color
        ctx.arc(element.x, element.y, RADIUS, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
    }
    cb && cb()
}

function renderDigit(x, y, num, ctx) {
    var d = digit[num]
    ctx.fillStyle = 'rgb(0, 102, 153)'

    for (let i = 0; i < d.length; i++) {
        for (let j = 0; j < d[i].length; j++) {
            var element = d[i][j]
            if (element === 1) {
                ctx.beginPath()
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                ctx.closePath()

                ctx.fill()
            }
        }

    }
}
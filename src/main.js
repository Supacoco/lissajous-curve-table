import P5 from 'p5'

const root = document.createElement('div')
root.id = 'root'

document.querySelector('body')
  .appendChild(root)


const WIDTH = 600
const HEIGHT = 400

const D = 100
const R = D / 2

const COEF_1 = 0.01
const COEF_2 = COEF_1 * 2
const COEF_3 = COEF_1 * 3

let angleX
let angleY
let angle

const curve = []

new P5(p5 => {
  p5.setup = () => {
    angle = -p5.HALF_PI
    angleX = -p5.HALF_PI
    angleY = -p5.HALF_PI

    p5.createCanvas(WIDTH, HEIGHT)
    p5.background('#444')
    p5.stroke('white')
    p5.strokeWeight(1)
    p5.noFill()
  },

  p5.draw = () => {
    p5.background('#444')

    const offset = R / 2 + D / 2
    const x1 = R * p5.cos(angleX)
    const y1 = R * p5.sin(angleX)

    const x2 = R * p5.cos(angleY)
    const y2 = R * p5.sin(angleY)

    p5.stroke('white')

    p5.ellipse(R / 2 + D / 2, HEIGHT / 2, D, D)
    p5.ellipse(WIDTH / 2, R / 2 + D / 2, D, D)
    
    p5.line(-WIDTH, y1 + HEIGHT / 2, WIDTH, y1 + HEIGHT / 2)
    p5.line(x2 + WIDTH / 2, -HEIGHT, x2 + WIDTH / 2, HEIGHT)

    p5.ellipse(x1 + offset, y1 + HEIGHT / 2, 10, 10)
    p5.ellipse(x2 + WIDTH / 2, y2 + offset, 10, 10)
    
    p5.stroke('magenta')
    
    p5.ellipse(x2 + WIDTH / 2, y1 + HEIGHT / 2, 1, 1)

    curve.push({
      x: x2 + WIDTH / 2,
      y: y1 + HEIGHT / 2
    })

    curve.forEach(coord => {
      p5.ellipse(coord.x, coord.y, 1, 1)
    })

    angle -= COEF_1
    angleX -= COEF_3
    angleY -= COEF_2
    
    
    if (angle < -p5.TWO_PI - p5.HALF_PI) {
      p5.noLoop()
    }
  }
}, root)
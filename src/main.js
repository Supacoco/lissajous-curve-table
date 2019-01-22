import P5 from 'p5'

const root = document.createElement('div')
root.id = 'root'

document.querySelector('body')
  .appendChild(root)

new P5(p5 => {
  const WIDTH = 600
  const HEIGHT = 600

  const D = 200
  const R = D / 2
  const OFFSET = R / 2 + D / 2

  const COEF_1 = 0.01
  const COEF_2 = COEF_1 * 2
  const COEF_3 = COEF_1 * 3
  const COEF_4 = COEF_1 * 4
  const COEF_5 = COEF_1 * 5
  const COEF_6 = COEF_1 * 6
  const COEF_7 = COEF_1 * 7
  const COEF_8 = COEF_1 * 8
  const COEF_9 = COEF_1 * 9
  const COEF_10 = COEF_1 * 10

  const INITIAL_ANGLE = -p5.HALF_PI

  let angle
  let angleX
  let angleY

  const curve = []

  const strokeWhite = () => {
    p5.stroke('rgba(255, 255, 255, 1)')
    p5.strokeWeight(1)
  }

  const strokeWhiteAlpha = () => {
    p5.stroke('rgba(255, 255, 255, 0.1)')
    p5.strokeWeight(1)
  }

  const strokeMagenta = () => {
    p5.stroke('rgba(232, 10, 124, 1)')
    p5.strokeWeight(4)
  }

  const drawCurve = (curve) => {
    strokeMagenta()

    p5.beginShape()
    curve.forEach(dot => {
      p5.vertex(dot.x, dot.y)
    })
    p5.endShape()
  }

  p5.setup = () => {
    angle = INITIAL_ANGLE
    angleX = INITIAL_ANGLE
    angleY = INITIAL_ANGLE

    p5.createCanvas(WIDTH, HEIGHT)
    p5.background('#444')
    p5.noFill()
  }

  p5.draw = () => {
    p5.background('#444')

    const x1 = R * p5.cos(angleX)
    const y1 = R * p5.sin(angleX)

    const x2 = R * p5.cos(angleY)
    const y2 = R * p5.sin(angleY)

    strokeWhite()

    p5.ellipse(OFFSET, HEIGHT / 2, D, D)
    p5.ellipse(WIDTH / 2, OFFSET, D, D)

    strokeWhiteAlpha()

    p5.line(-WIDTH, y1 + HEIGHT / 2, WIDTH, y1 + HEIGHT / 2)
    p5.line(x2 + WIDTH / 2, -HEIGHT, x2 + WIDTH / 2, HEIGHT)

    strokeWhite()

    p5.ellipse(x1 + OFFSET, y1 + HEIGHT / 2, 10, 10)
    p5.ellipse(x2 + WIDTH / 2, y2 + OFFSET, 10, 10)

    curve.push({
      x: x2 + WIDTH / 2,
      y: y1 + HEIGHT / 2
    })

    drawCurve(curve)

    angle -= COEF_1
    angleX -= COEF_9
    angleY -= COEF_10

    if (angle < -p5.TWO_PI + INITIAL_ANGLE) {
      p5.noLoop()
    }
  }
}, root)
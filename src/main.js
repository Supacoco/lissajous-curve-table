import P5 from 'p5'

const root = document.createElement('div')
root.id = 'root'

document.querySelector('body')
  .appendChild(root)

new P5(p5 => {
  const WIDTH = 700
  const HEIGHT = 700
  const D = 50
  const R = D / 2
  const OFFSET = R / 2 + D / 2
  const ITERATION = Math.floor(WIDTH / (D + OFFSET)) - 1
  const COEF = 0.01
  const INITIAL_ANGLE = -p5.HALF_PI

  const angles = new Array(ITERATION + 1).fill(INITIAL_ANGLE)
  const curves = []

  // init 2 dimensions array
  for (let i = 1; i <= ITERATION; i++) {
    for (let j = 1; j <= ITERATION; j++) {
      if (!curves[i]) {
        curves[i] = []
      }
      if (!curves[i][j]) {
        curves[i][j] = []
      }
      curves[i][j].push([])
    }
  }

  const strokeWhite = () => {
    p5.stroke('rgba(255, 255, 255, 1)')
    p5.strokeWeight(1)
  }

  const strokeWhiteAlpha = () => {
    p5.stroke('rgba(255, 255, 255, 0.1)')
    p5.strokeWeight(1)
  }

  const strokeCurve = () => {
    p5.stroke('rgba(0, 124, 222, 1)')
    p5.strokeWeight(1)
  }

  const drawCurve = (curve) => {
    strokeCurve()

    p5.beginShape()
    curve.forEach(dot => {
      p5.vertex(dot.x, dot.y)
    })
    p5.endShape()
  }

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT)
    p5.background('#444')
    p5.noFill()
  }

  p5.draw = () => {
    p5.background('#444')

    for (let i = 1; i <= ITERATION; i++) {
      const x = R * p5.cos(angles[i])
      const y = R * p5.sin(angles[i])
      const indiceOffset = OFFSET + i * (D + OFFSET)

      strokeWhite()

      p5.ellipse(indiceOffset, OFFSET, D, D)
      p5.ellipse(OFFSET, indiceOffset, D, D)

      strokeWhiteAlpha()

      p5.line(-WIDTH, y + indiceOffset, WIDTH, y + indiceOffset)
      p5.line(x + indiceOffset, -HEIGHT, x + indiceOffset, HEIGHT)

      strokeWhite()

      p5.ellipse(x + indiceOffset, y + OFFSET, 10, 10)
      p5.ellipse(x + OFFSET, y + indiceOffset, 10, 10)

      for (let j = 1; j <= ITERATION; j++) {
        curves[i][j].push({
          x: R * p5.cos(angles[j]) + OFFSET + j * (D + OFFSET),
          y: y + indiceOffset
        })

        drawCurve(curves[i][j])
      }

      angles[i] -= COEF * i
    }

    if (angles[1] < -p5.TWO_PI + INITIAL_ANGLE) {
      p5.noLoop()
    }
  }
}, root)

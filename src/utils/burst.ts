declare const mojs: any

export const burst = (id: string) => {
  const burst1 = new mojs.Burst({
    parent: id,
    count: 8,
    radius: { 50: 70 },
    children: {
      shape: 'line',
      stroke: ['white', '#FFE217', '#FC46AD', '#D0D202', '#B8E986', '#D0D202'],
      scale: 1,
      scaleX: { 1: 0 },
      // pathScale:    'rand(.5, 1.25)',
      degreeShift: 'rand(-90, 90)',
      radius: 'rand(20, 40)',
      // duration:     200,
      delay: 'rand(0, 150)',
      isForce3d: true
    }
  })

  const largeBurst = new mojs.Burst({
    parent: id,
    count: 4,
    angle: 45,
    radius: { 0: 150 },
    children: {
      shape: 'line',
      stroke: '#4ACAD9',
      scale: 1,
      scaleX: { 1: 0 },
      radius: 100,
      duration: 450,
      isForce3d: true,
      easing: 'cubic.inout'
    }
  })

  const CIRCLE_OPTS = {
    scale: { 0: 1 }
  }

  const largeCircle = new mojs.Shape({
    parent: id,
    ...CIRCLE_OPTS,
    fill: 'none',
    stroke: 'white',
    strokeWidth: 8,
    opacity: { 0.25: 0 },
    radius: 250,
    duration: 600
  })

  const smallCircle = new mojs.Shape({
    parent: id,
    ...CIRCLE_OPTS,
    fill: 'white',
    opacity: { 0.5: 0 },
    radius: 30
  })

  burst1.play()
  largeBurst.play()
  largeCircle.play()
  smallCircle.play()
}

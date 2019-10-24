import confetti from 'canvas-confetti'

export const showWin = () => {
  var end = Date.now() + 15 * 1000

  // go Buckeyes!
  var colors = ['#16a085', '#fc5c65']
  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: {
        x: 0
      },
      colors
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: {
        x: 1
      },
      colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}

export const launchFireworks = () => {
  const end = Date.now() + 2 * 1000

  // @ts-ignore
  const interval = setInterval(function() {
    if (Date.now() > end) {
      return clearInterval(interval)
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2
      }
    })
  }, 150)
}

export const showSnow = () => {
  const end = Date.now() + 3 * 1000
  ;(function frame() {
    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: 300,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2
      },
      colors: ['#000000']
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}

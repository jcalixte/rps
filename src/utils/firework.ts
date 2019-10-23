import confetti from 'canvas-confetti'

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

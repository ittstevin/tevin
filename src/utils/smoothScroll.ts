// Smooth scroll utility with inertia effect
export const smoothScrollTo = (elementId: string) => {
  const element = document.querySelector(elementId)
  if (!element) return

  const startPosition = window.pageYOffset
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = Math.min(Math.abs(distance) * 0.5, 1500) // Max 1.5s
  let start: number | null = null

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime
    const timeElapsed = currentTime - start
    const progress = Math.min(timeElapsed / duration, 1)

    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}


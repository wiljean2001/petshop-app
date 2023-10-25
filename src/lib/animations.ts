export const staggerChildren = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
}

export const wordAnimation = {
  initial: {
    y: 100,
  },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
}

export const riseWithFade = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 0.7,
    },
  },
}

export const videoAnimation = {
  initial: {
    y: 100,
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
}
// animate transition for containers
export const container = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// animate transition for item for container
export const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
}

// Slide animation to Left position
export const slideInFromLeft = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: '0%', opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
}

// Slide animation to Right position
export const slideInFromRight = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: '0%', opacity: 1 },
  exit: { x: '100%', opacity: 0 },
}

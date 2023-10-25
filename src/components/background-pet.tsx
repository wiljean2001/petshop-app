import styles from '@/styles/background-pet.module.css'
// import header_illustration_light from '@/img/header-illustration-light.svg'
// import header_illustration_dark from '@/img/header-illustration-dark.svg'

import hero_mediaillustration_light from '@/img/hero-media-illustration-light.svg'
import hero_mediaillustration_dark from '@/img/hero-media-illustration-dark.svg'

// import hero_media_illustration_light from '@/img/hero-media-light.svg'
// import hero_media_illustration_dark from '@/img/hero-media-dark.svg'
// import dog_image from '@/img/pets/dog-vet-fashion.png'
import dog_image from '@/img/dog.webp'
import * as motion from '@/components/motion'

export const BackgroundPet = () => {
  const initial = { opacity: 0, scale: 0.5 }

  const animate = { opacity: 1, scale: 1 }
  const transition = {
    duration: 0.8,
    delay: 0.85,
    ease: [0, 0.71, 0.2, 1.01],
  }

  return (
    <div className='w-full md:w-1/3 lg:w-1/2 order-first md:order-last xl:order-last'>
      <div className={styles.heroMedia}>
        {/* <div className={styles.headerIllustration}>
          <motion.img
            fetchPriority='high'
            className={`dark:hidden ${styles.headerIllustrationImage} ${styles.img}`}
            src={header_illustration_light.src}
            alt='Header illustration'
            initial={initial}
            animate={animate}
            transition={transition}
            loading='lazy'
          />
          <motion.img
            fetchPriority='high'
            className={`hidden dark:block ${styles.headerIllustrationImage} ${styles.img}`}
            src={header_illustration_dark.src}
            alt='Header illustration'
            initial={initial}
            animate={animate}
            transition={transition}
            loading='lazy'
          />
        </div> */}
        <div className={styles.heroMediaIllustration}>
          <motion.img
            fetchPriority='high'
            className={`dark:hidden hero-media-illustration-image`}
            src={hero_mediaillustration_light.src}
            alt='Hero media illustration'
            initial={initial}
            animate={animate}
            transition={transition}
            loading='lazy'
          />
          <motion.img
            fetchPriority='high'
            className={`hidden dark:block hero-media-illustration-image`}
            src={hero_mediaillustration_dark.src}
            alt='Hero media illustration'
            initial={initial}
            animate={animate}
            transition={transition}
            loading='lazy'
          />
        </div>
        <div className={styles.heroMediaContainer}>
          <div
            className={`${styles.heroMediaImage} w-44 md:w-80 h-auto shadow`}
          >
            <motion.img
              fetchPriority='high'
              src={dog_image.src}
              className='bg-cover '
              alt='Hero media'
              initial={initial}
              animate={animate}
              transition={transition}
              loading='lazy'
            />
          </div>
          {/* block dark:hidden */}
          {/* <img
            className='hero-media-image '
            src={hero_media_illustration_dark.src}
            alt='Hero media'
          /> */}
        </div>
      </div>
    </div>
  )
}

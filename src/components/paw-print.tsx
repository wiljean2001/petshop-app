'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo_image from '@/img/paw.webp'

const pawPrint = logo_image.src // Reemplaza esto con la ruta a tu imagen de huella

const floatVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: -100,
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}

const PawPrint = ({ delay }: { delay: number }) => {
  const [topPosition, setTopPosition] = useState(0)
  const [leftPosition, setLeftPosition] = useState(0)

  useEffect(() => {
    // Genera posiciones aleatorias cuando el componente se monta
    setTopPosition(Math.random() * document.documentElement.scrollHeight)
    setLeftPosition(Math.random() * (window.innerWidth - 200))
  }, []) // El arreglo de dependencias vacío asegura que esto se ejecute solo al montar el componente

  return (
    <motion.img
      src={pawPrint}
      // initial='hidden'
      animate='visible'
      variants={{
        hidden: { opacity: 1, rotate: 0 },
        visible: {
          opacity: 1,
          rotate: [1, 15, -15, 1], // Lista de valores de rotación a los cuales la imagen se moverá en secuencia
          transition: {
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          },
        },
      }}
      style={{
        position: 'absolute',
        top: topPosition,
        left: leftPosition,
        width: 50,
      }}
      transition={{ delay }}
    />
  )
}

export default PawPrint

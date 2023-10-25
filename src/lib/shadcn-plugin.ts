import plugin from 'tailwindcss/plugin'
import { fontFamily } from 'tailwindcss/defaultTheme'

export const shadcnPlugin = plugin(
  // 1. Add css variable definittions to the base layer
  function ({ addBase }) {
    addBase({
      ':root': {
        '--background': '0 0% 100%',
        '--foreground': '240 50% 3.9%',
        // '--foreground': '240 10% 3.9%',

        // '--card': '183, 100%, 96%', // spray - 50
        '--card': '0 0% 100%',
        '--card-foreground': '240 10% 3.9%',

        '--popover': '0 0% 100%',
        '--popover-foreground': '240 10% 3.9%',

        // '--primary': '142.1 76.2% 36.3%',
        '--primary': '188 98% 43%', // spray - 500
        // '--primary-foreground': '187 89% 53%', // spray - 200
        // '--primary-foreground': '355.7, 100%, 97.3%',
        '--primary-foreground': '0 0% 100%', // spray - 200

        '--secondary': '21 60% 79%',
        // '--secondary': '240 4.8% 95.9%',
        '--secondary-foreground': '240 5.9% 10%',

        '--muted': '240 4.8% 95.9%',
        '--muted-foreground': '240 10.8% 46.1%',

        // '--accent': '240, 4.8%, 95.9%',
        '--accent': '186 98% 82%', // spray - 200
        '--accent-foreground': '240 5.9% 10%',

        '--success': '162 48% 49%',
        '--success-foreground': '210 40% 98%',

        '--warning': '47.9 95.8% 53.1%',
        '--warning-foreground': '26 83.3% 14.1%',

        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',

        '--radius': '0.5rem',

        '--border': '187 89% 53%',
        // '--border': '240 5.9% 90%'
        // '--input': '183 100% 96%' // spray - 50
        '--input': '240 5.9% 90%',
        '--ring': '192 86% 31%', // spray - 800
        // '--ring': '142.1 76.2% 36.3%',
        // '--pet-texture': 'url("../img/wallpapers/wallpaper_pet.webp")'
      },
      '.dark': {
        // '--background': '0 0% 0%'
        '--background': '195 82% 6%',
        // '--background': '20 14.3% 4.1%'
        '--foreground': '0 0% 95%',

        '--card': '195 82% 8%', // spray - 950
        // '--card': '24 9.8% 10%'
        '--card-foreground': '0 0% 95%',

        '--popover': '222.2 84% 4.9%',
        '--popover-foreground': '0 0% 95%',

        '--primary': '188 98% 43%', // spray - 600
        // '--primary': '142.1 70.6% 45.3%'
        '--primary-foreground': '144.9 80.4% 10%',

        '--secondary': '240 3.7% 15.9%',
        '--secondary-foreground': '0 0% 98%',

        '--muted': '0 0% 15%',
        '--muted-foreground': '240 5% 64.9%',

        '--accent': '12 6.5% 15.1%',
        '--accent-foreground': '0 0% 98%',

        '--success': '162 48% 49%',
        '--success-foreground': '210 40% 98%',

        '--warning': '47.9 95.8% 53.1%',
        '--warning-foreground': '26 83.3% 14.1%',

        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '0 85.7% 97.3%',

        '--border': '240 3.7% 15.9%',
        // '--input': '183 100% 96%' // spray - 50
        '--input': '240 3.7% 15.9%',
        '--ring': '192 86% 31%',
        // '--ring': '142.4 71.8% 29.2%',
        // '--pet-texture': 'url("../img/wallpapers/wallpaper_pet_dark.webp")',
      },
    })
    addBase({
      '*': {
        '@apply border-border': {},
      },
      body: {
        '@apply bg-background text-foreground': {},
      },
    })
  },
  //   2. Extend the tailwind theme with "themable" utilities
  {
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))',
          },
          success: {
            DEFAULT: 'hsl(var(--success))',
            foreground: 'hsl(var(--success-foreground))',
          },
          warning: {
            DEFAULT: 'hsl(var(--warning))',
            foreground: 'hsl(var(--warning-foreground))',
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
          spray: {
            '50': 'hsl(183, 100%, 96%)',
            '100': 'hsl(184, 100%, 90%)',
            '200': 'hsl(186, 98%, 82%)',
            '300': 'hsl(186, 96%, 69%)',
            '400': 'hsl(187, 89%, 53%)',
            '500': 'hsl(188, 98%, 43%)',
            '600': 'hsl(191, 96%, 36%)',
            '700': 'hsl(192, 86%, 31%)',
            '800': 'hsl(194, 72%, 27%)',
            '900': 'hsl(196, 67%, 24%)',
            '950': 'hsl(195, 82%, 15%)',
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        fontFamily: {
          sans: ['var(--font-sans)', ...fontFamily.sans],
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },

        // backgroundImage: {
        //   'pet-texture': 'var(--pet-texture)',
        // },
      },
    },
  }
)

import type { Config } from 'tailwindcss'
import { shadcnPlugin } from './shadcn-plugin'

export const shadcnPreset = {
  darkMode: ['class'],
  content: [],
  plugins: [require('animated-tailwindcss'), shadcnPlugin],
} satisfies Config

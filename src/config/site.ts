export const siteConfig = {
  name: 'Petshop',
  url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  // url: 'https://l64j5pl9-3000.brs.devtunnels.ms',
  // urlDB: 'http://localhost:4321',
  // ogImage: 'https://ui.shadcn.com/og.jpg',
  description:
    'Nos dedicamos a cuidar de tus mascotas con amor y profesionalismo, ' +
    'brindando una atención excepcional. ¡Visítanos en nuestro centro ' +
    'veterinario!',
  links: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
}

export type SiteConfig = typeof siteConfig

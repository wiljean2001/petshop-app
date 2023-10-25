import { Button } from '@/components/ui/button'
import { CardSection } from '@/components/cards/card-section'
import { SERVICES } from '@/config/const'
import { CardService } from '@/components/cards/card-service'
import { CardTestimonies } from '@/components/cards/card-testimonies'
import { FirstSection } from '@/components/layout/first-section'

import { Locale } from '@/config/i18n.config'
import { getDictionary } from '@/lib/i18n/dictionary'
// import PawPrint from '@/components/paw-print'
// import { getClient } from '@/lib/apollo/client'
// import { GET_CLINICS } from '@/lib/apollo/queries/auth'

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const {
    title_landing,
    description_landing,
    title_our_service,
    title_testimonies,
    testimonies,
    our_hours,
    title_our_hours,
    description_our_hours,
    title_our_promotions,
    description_our_promotion,
    button_our_promotion,
    title_find_us,
    description_find_us_at,
    title_contact_us,
    description_contact_up,
    button_contact_up,
  } = await getDictionary(lang)

  // !TODO:  Only get data when Service and Clinics is possible for the user without authenticated
  // ? TODO: Get services
  // const { data, loading, error } = await getClient().query({ query: GET_SERVICES })
  // ? TODO: Get clinics
  // const { data, loading, error } = await getClient().query({ query: GET_CLINICS })
  return (
    <>
      <FirstSection
        description={description_landing}
        title_landing={title_landing}
      />
      {/* TITLE_OUR_SERVICE */}
      <CardSection title={title_our_service} isLight={false} id='services'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {SERVICES.map(({ description, src, title }, index) => (
            <CardService
              title={title}
              description={description}
              src={src}
              key={index}
            />
          ))}
        </div>
      </CardSection>
      {/* Fin */}

      {/* Sección 3: Testimonios */}
      <CardSection title={title_testimonies} isLight={true}>
        <div className='flex flex-col md:flex-row justify-center items-center'>
          {testimonies.map(({ comment, person }, index) => (
            <CardTestimonies comment={comment} person={person} key={index} />
          ))}
        </div>
      </CardSection>
      {/* Fin */}

      {/* Sección 4: Equipo */}
      {/* <CardSection title="Nuestro Equipo" isLight={false}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-md col-start-2">
            <Image
              src={team1}
              alt="Equipo 1"
              width={300}
              height={400}
              className="h-auto w-full"
            />
            <h3 className="text-xl font-semibold mt-4">Dr. Omar Pingo</h3>
            <p className="">Veterinario especializado en cirugías.</p>
          </div>
        </div>
      </CardSection> */}
      {/* Fin */}
      {/* Sección 5: Horarios */}
      <CardSection title={title_our_hours} isLight={false}>
        <p className='text-lg'>{description_our_hours}</p>
        <div className='flex justify-center mt-6'>
          {our_hours.map(({ day, hour }, index) => (
            <div
              className='bg-secondary p-6 rounded-lg shadow-md m-2'
              key={index}
            >
              <h3 className='text-xl font-semibold mb-4'>{day}</h3>
              <p className=''>{hour}</p>
            </div>
          ))}
        </div>
      </CardSection>
      {/* Fin */}

      {/* Sección 6: Promoción */}
      <CardSection title={title_our_promotions} isLight={true}>
        <p className='text-lg'>{description_our_promotion}</p>
        <Button className='px-6 py-3 mt-6 font-semibold'>
          {button_our_promotion}
        </Button>
      </CardSection>
      {/* Fin */}

      {/* Sección 7: Ubicación */}
      <CardSection title={title_find_us} isLight={false}>
        <p className='text-lg'>{description_find_us_at}</p>
        <p className='text-xl mt-6'>Calle Piura sn., La Unión, Piura</p>
        <div className='mt-6'>
          <iframe
            title='petshop-map'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0921961370045!2d-80.74486798890403!3d-5.402924353960841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a21bb77c09933%3A0x91b40b2fa97eda1!2sFarmacia%20Veterinaria%20Pet%20Shop!5e0!3m2!1ses-419!2spe!4v1689873300993!5m2!1ses-419!2spe'
            width='100%'
            height='450'
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </CardSection>
      {/* Fin */}

      {/* Sección 7: Contacto */}
      <CardSection title={title_contact_us} isLight={true} id="contact">
        <p className='text-lg'>{description_contact_up}</p>
        <Button className='px-6 py-3 mt-6 font-semibold'>
          {button_contact_up}
        </Button>
      </CardSection>
      {/* Fin */}
    </>
  )
}

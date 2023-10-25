interface Props {
  comment: string
  person: string
}

export const CardTestimonies = ({ comment, person }: Props) => {
  return (
    <div className='bg-secondary p-6 rounded-lg shadow-md mt-4 md:mt-0 md:ml-4'>
      <p className='text-xl'>{comment}</p>
      <p className='mt-4 font-semibold'>- {person}</p>
    </div>
  )
}

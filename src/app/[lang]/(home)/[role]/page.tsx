interface Props {
  params: { params: { role: string } }
}
export default async function WelcomePage({ params }: Props) {
  return (
    <div>
      <h1>Pagina inicial</h1>
    </div>
  )
}

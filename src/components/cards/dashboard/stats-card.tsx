interface Props {
  title: string
  value: number
}

export const StatsCard: React.FC<Props> = ({ title, value }) => (
  <div className='bg-card shadow rounded-lg p-4'>
    <h3 className='text-lg font-semibold text-card-foreground'>{title}</h3>
    <p className='text-2xl font-bold text-card-foreground'>{value}</p>
  </div>
)

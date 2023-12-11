'use client'
// BarChart.jsx
import { Bar } from 'react-chartjs-2'
interface Props {
  data: Array<{ label: string; value: any }>
  title: string
}
export const BarChart: React.FC<Props> = ({ data, title }) => {
  // Setup chart data and options here
  const chartData = {
    labels: data.map((item) => item.label), // Replace with your actual label data
    datasets: [
      {
        label: title,
        data: data.map((item) => item.value), // Replace with your actual value data
        // ... other dataset properties ...
      },
    ],
  }
  return (
    <div className='shadow rounded-lg p-4 w-full md:w-1/3'>
      <Bar data={chartData} />
    </div>
  )
}

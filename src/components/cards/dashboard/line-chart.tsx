'use client'
// import { ChartData } from 'chart.js/auto'
// LineChart.jsx
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

interface Props {
  data: Array<{ label: string; value: any }>
  title: string
}
// : ChartData<'line', any, unknown>
export const LineChart: React.FC<Props> = ({ data, title }) => {
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
  // Setup chart data and options here
  return (
    <div className='shadow rounded-lg p-4 w-full md:w-1/3'>
      <Line data={chartData} options={{}} />
    </div>
  )
}

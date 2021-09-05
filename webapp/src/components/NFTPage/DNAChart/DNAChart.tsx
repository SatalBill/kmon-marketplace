import React from 'react'
import { getNFTName } from '../../../modules/nft/utils'
import { Props } from './DNAChart.types'
import './DNAChart.css'
import { Bar } from 'react-chartjs-2'

const data = {
  labels: [
    'Constitution',
    'Affection',
    'Crazyness',
    'Instinct',
    'Hunger',
    'Lazyness',
    'Braveness',
    'Smart',
    'Ego'
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3, 100, 20, 13],
      backgroundColor: [
        '#33D669',
        '#F3BA2F',
        '#FF7C44',
        '#D84F3E',
        '#3898FF',
        '#F231AF',
        '#00D6DD',
        '#FFFFFF',
        '#676370'
      ],
      borderSkipped: false,
      borderRadius: 5,
      width: 678,
      // backgroundColor: '#323132'
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)'
      // ],
      // borderWidth: 1
      barPercentage: 0.7,
      categoryPercentage: 0.7
    }
  ]
}

const options = {
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        autoSkip: true,
        maxRotation: 90,
        minRotation: 90,
        padding: -70,
        labelOffset: -40,
        color: '#676370',
        font: {
          size: 12,
          family: 'PT-Mono'
        }
      },
      legend: {
        position: 'chartArea'
      }
    },
    y: {
      grid: {
        display: false,
        drawBorder: false
      }
    }
  }
}

const DNAChart = (props: Props) => {
  const { nft, order } = props

  return (
    // <div className="container">
    // <p>lolololololo</p>
    <Bar width={678} height={270} data={data} options={options} />
    // </div>
  )
}

export default React.memo(DNAChart)

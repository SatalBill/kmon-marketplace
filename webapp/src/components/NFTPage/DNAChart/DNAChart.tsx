import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Props } from './DNAChart.types'
import './DNAChart.css'
import { DNA_CONSTANTS, DNA_COLORS } from '../../../modules/nft/constants'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import Star from '../../../images/egg/star.svg'
import { isMobile } from '@kmon/dapps/dist/lib/utils'

const DNAChart = (props: Props) => {
  const { nft } = props

  const DNAParams = nft.metadata.attributes?.filter(elem =>
    DNA_CONSTANTS.includes(elem.trait_type)
  )
  const sortedDNAParams = DNA_CONSTANTS.map(title => {
    return DNAParams?.find(elem => {
      return elem.trait_type === title
    })
  })
  const DNALabels = sortedDNAParams?.map(elem => {
    return elem?.trait_type
  })
  const DNAValues = sortedDNAParams?.map(elem => {
    return elem?.value
  })

  const DNAGeneration = nft.data.kryptomon?.genes.generation
  const isDNAUnfreezable = nft.data.kryptomon?.extraData.unfreezable

  const data = {
    labels: DNALabels,
    datasets: [
      {
        data: DNAValues,
        backgroundColor: DNA_COLORS,
        borderSkipped: false,
        borderRadius: 5,
        width: 678,
        barPercentage: 0.65,
        categoryPercentage: 0.65,
        fill: 10
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: {
          weight: 'bold',
          family: 'PT Mono'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          autoSkip: true,
          maxRotation: -90,
          minRotation: -90,
          padding: -10,
          labelOffset: 43,
          color: '#676370',
          align: 'start',
          font: {
            size: isMobile() ? 0 : 13,
            family: 'PT Mono'
          }
        },
        legend: {
          display: false
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          autoSkip: true,
          beginAtZero: true,
          min: 0,
          max: 100,
          precision: 0,
          stepSize: 25,
          callback: (value: number) => {
            return value + '%'
          },
          color: '#676370',
          font: {
            size: 10,
            family: 'PT-Mono'
          }
        }
      }
    }
  }

  return (
    <div className="dna-container">
      <div className="dna-info">
        <div className="dna-info-generation">Generation: {DNAGeneration}</div>
        {isDNAUnfreezable && (
          <img src={Star} alt="star-icon" className="dna-info-start" />
        )}
      </div>
      <Bar
        width={678}
        height={isMobile() ? 400 : 210}
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  )
}

export default React.memo(DNAChart)

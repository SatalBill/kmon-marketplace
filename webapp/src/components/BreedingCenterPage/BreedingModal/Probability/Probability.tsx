import React from 'react'
import { Radar } from 'react-chartjs-2'

import { Props } from './Probability.types'
import './Probability.css'
import { DNA_CONSTANTS } from '../../../../modules/nft/constants'

const Probability = (props: Props) => {
  const { myNFT, selectedNFT, simulatedGenes } = props

  const DNAParams = myNFT.metadata.attributes?.filter(elem =>
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

  const data = {
    labels: DNALabels,
    datasets: [
      {
        label: myNFT.metadata.name,
        data: [
          myNFT.genesV2?.constitution,
          myNFT.genesV2?.affections,
          myNFT.genesV2?.crazyness,
          myNFT.genesV2?.instinct,
          myNFT.genesV2?.hunger,
          myNFT.genesV2?.laziness,
          myNFT.genesV2?.brave,
          myNFT.genesV2?.smart
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
      {
        label: selectedNFT.metadata.name,
        data: [
          selectedNFT.genesV2?.constitution,
          selectedNFT.genesV2?.affections,
          selectedNFT.genesV2?.crazyness,
          selectedNFT.genesV2?.instinct,
          selectedNFT.genesV2?.hunger,
          selectedNFT.genesV2?.laziness,
          selectedNFT.genesV2?.brave,
          selectedNFT.genesV2?.smart
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
      {
        label: 'Simulated',
        data: simulatedGenes,
        backgroundColor: 'rgba(217, 225, 160, 0.2)',
        borderColor: 'rgb(217, 225, 160)',
        pointBackgroundColor: 'rgb(217, 225, 160)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(217, 225, 160)'
      }
    ]
  }

  const options = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 20
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }

  const classes = ['kryptomon', 'breeding-modal-probability']
  return (
    <div className={classes.join(" ")}>
      <div className="value">
        Probabilty factor 56%
      </div>
      <div className="probability-chart-box">
        <div className="probability-chart">
          <Radar data={data} options={options}/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Probability)

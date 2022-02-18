import React from 'react'
import { Button } from '@kmon/ui'
import { Radar } from 'react-chartjs-2'

import { Props } from './Fee.types'
import './Fee.css'
import { DNA_CONSTANTS } from '../../../../modules/nft/constants'

const Fee = (props: Props) => {
  const { myNFT, selectedNFT, onBreed, onCancel } = props

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

  const myNFTData = {
    labels: DNALabels,
    datasets: [
      {
        label: '',
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
      }
    ]
  }

  const myNFTOptions = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 25
    },
    plugins: {
      legend: {
        display: false,
        position: 'top'
      }
    }
  }

  const selectedNFTData = {
    labels: DNALabels,
    datasets: [
      {
        label: '',
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
      }
    ]
  }

  const selectedNFTOptions = {
    scale: {
      beginAtZero: true,
      max: 100,
      min: 0,
      stepSize: 25
    },
    plugins: {
      legend: {
        display: false,
        position: 'top'
      }
    }
  }

  const classes = ['kryptomon', 'breeding-modal-fee']
  return (
    <div className={classes.join(" ")}>
      <div className="my-kryptomon">
        <Radar data={myNFTData} options={myNFTOptions}/>
      </div>
      <div className="fee-detail">
        <div className="fee-detail-info">
          Breeding Fee: 1234 KMON<br />
          Total Cost: 2345 KMON
        </div>
        <Button primary className="breed-button" onClick={onBreed}>BREED</Button>
        <Button onClick={onCancel}>CANCEL</Button>
      </div>
      <div className="selected-kryptomon">
        <Radar data={selectedNFTData} options={selectedNFTOptions}/>
      </div>
    </div>
  )
}

export default React.memo(Fee)

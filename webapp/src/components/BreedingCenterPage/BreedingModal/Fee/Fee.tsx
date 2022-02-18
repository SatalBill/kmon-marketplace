import React from 'react'
import { Button } from '@kmon/ui'
import { Radar } from 'react-chartjs-2'

import { Props } from './Fee.types'
import './Fee.css'
import { DNA_CONSTANTS } from '../../../../modules/nft/constants'

const Fee = (props: Props) => {
  const { myNFT, selectedNFT, isBreeding, onBreed, onCancel } = props

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
          myNFT.data.kryptomon?.genes.constitution,
          myNFT.data.kryptomon?.genes.affections,
          myNFT.data.kryptomon?.genes.crazyness,
          myNFT.data.kryptomon?.genes.instinct,
          myNFT.data.kryptomon?.genes.hunger,
          myNFT.data.kryptomon?.genes.laziness,
          myNFT.data.kryptomon?.genes.brave,
          myNFT.data.kryptomon?.genes.smart
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
          selectedNFT.data.kryptomon?.genes.constitution,
          selectedNFT.data.kryptomon?.genes.affections,
          selectedNFT.data.kryptomon?.genes.crazyness,
          selectedNFT.data.kryptomon?.genes.instinct,
          selectedNFT.data.kryptomon?.genes.hunger,
          selectedNFT.data.kryptomon?.genes.laziness,
          selectedNFT.data.kryptomon?.genes.brave,
          selectedNFT.data.kryptomon?.genes.smart
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
        <Button primary className="breed-button" onClick={onBreed} loading={isBreeding} disabled={isBreeding}>BREED</Button>
        <Button onClick={onCancel}>CANCEL</Button>
      </div>
      <div className="selected-kryptomon">
        <Radar data={selectedNFTData} options={selectedNFTOptions}/>
      </div>
    </div>
  )
}

export default React.memo(Fee)

import React from 'react'

import { Props } from './ChoosePair.types'
import './ChoosePair.css'
import { EmptyCard } from '@kmon/ui'
import { NFTCard } from '../../NFTCard'

const ChoosePair = (props: Props) => {
  const { nft } = props

  const classes = ['kryptomon', 'choose-pair']

  const handleClickCard = () => {
    console.log('Clicked card')
  }

  return (
    <div className={classes.join(' ')}>
      <div className='empty-card-box'>
        <span className='card-title'>MY KRYPTOMON</span>
        <div className='card-content'>
        {!nft && <EmptyCard text='Select one of your kryptomon' isPlus />}
        {nft && <NFTCard nft={nft} isPreventClick onClickCard={handleClickCard} />}
        </div>
      </div>
      <div className='empty-card-box border-left'>
        <span className='card-title'>SELECTED</span>
        <div className='card-content'>
          <EmptyCard text='Search a kryptomon in the marketplace' />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ChoosePair)

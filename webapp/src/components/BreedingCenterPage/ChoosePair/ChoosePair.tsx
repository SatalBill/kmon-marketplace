import React from 'react'

import { Props } from './ChoosePair.types'
import './ChoosePair.css'
import { EmptyCard, Icon, Button } from '@kmon/ui'
import { NFTCard } from '../../NFTCard'

const ChoosePair = (props: Props) => {
  const { myNFT, selectedNFT } = props

  const classes = ['kryptomon', 'choose-pair']

  return (
    <div className={classes.join(' ')}>
      <div className='empty-card-box'>
        <span className='card-title'>MY KRYPTOMON</span>
        <div className='card-content'>
          {!myNFT && <EmptyCard text='Select one of your kryptomon' isPlus />}
          {myNFT && <NFTCard nft={myNFT} isPreventClick />}
        </div>
      </div>
      <div className='empty-card-box border-left'>
        <span className='card-title'>SELECTED</span>
        <div className='card-content'>
          {!selectedNFT && <EmptyCard text='Search a kryptomon in the marketplace' isPlus />}
          {selectedNFT && <NFTCard nft={selectedNFT} isPreventClick />}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ChoosePair)

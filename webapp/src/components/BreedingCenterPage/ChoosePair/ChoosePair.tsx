import React from 'react'

import { Props } from './ChoosePair.types'
import './ChoosePair.css'
import { EmptyCard } from '@kmon/ui'
import { NFTCard } from '../../NFTCard'

const ChoosePair = (props: Props) => {
  const { nft } = props

  const classes = ['kryptomon', 'choose-pair']

  return (
    <div className={classes.join(' ')}>
      <div className='empty-card-box'>
        {!nft && <EmptyCard title='MY KRYPTOMON' text='Select one of your kryptomon' isPlus />}
        {nft && (
          <NFTCard nft={nft} />
        )}
      </div>
      <div className='empty-card-box border-left'>
        <EmptyCard title='SELECTED' text='Search a kryptomon in the marketplace' />
      </div>
    </div>
  )
}

export default React.memo(ChoosePair)

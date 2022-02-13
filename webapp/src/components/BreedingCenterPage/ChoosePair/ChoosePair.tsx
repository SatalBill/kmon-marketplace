import React from 'react'

import { Props } from './ChoosePair.types'
import './ChoosePair.css'
import { EmptyCard, Button, KIcon } from '@kmon/ui'
import { NFTCard } from '../../NFTCard'
import { locations } from '../../../modules/routing/locations'

const ChoosePair = (props: Props) => {
  const { myNFT, selectedNFT, onNavigate, onResetMyNFT, onResetSelectedNFT } = props

  const classes = ['kryptomon', 'choose-pair']

  return (
    <div className={classes.join(' ')}>
      <div className='empty-card-box'>
        <span className='card-title'>MY KRYPTOMON</span>
        <div className='card-content'>
          {!myNFT && <EmptyCard text='Select one of your kryptomon' isPlus onClickCard={() => onNavigate(locations.currentAccount())} />}
          {myNFT && <NFTCard nft={myNFT} isPreventClick />}
        </div>
        {myNFT && (
          <Button className="remove-button" onClick={() => onResetMyNFT()}>
            <KIcon size="small" icon="close-small-gray">Remove</KIcon>
          </Button>
        )}
      </div>
      <div className='empty-card-box border-left'>
        <span className='card-title'>SELECTED</span>
        <div className='card-content'>
          {!selectedNFT && <EmptyCard text='Search a kryptomon in the marketplace' />}
          {selectedNFT && <NFTCard nft={selectedNFT} isPreventClick />}
        </div>
        {selectedNFT && (
          <Button className="remove-button" onClick={() => onResetSelectedNFT()}>
            <KIcon size="small" icon="close-small-gray">Remove</KIcon>
          </Button>
        )}
      </div>
    </div>
  )
}

export default React.memo(ChoosePair)

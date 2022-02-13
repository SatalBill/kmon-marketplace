import React from 'react'

import { Props } from './ChoosePair.types'
import { EmptyCard, Button, KIcon } from '@kmon/ui'
import { NFTCard } from '../../NFTCard'
import { locations } from '../../../modules/routing/locations'
import { Probability } from './Probability'
import './ChoosePair.css'

const ChoosePair = (props: Props) => {
  const { myNFT, selectedNFT, onNavigate, onResetMyNFT, onResetSelectedNFT } = props

  const classes = ['kryptomon', 'choose-pair']
  const isMatch = myNFT && selectedNFT

  const probabilityFactor = 56

  return (
    <div className={classes.join(' ')}>
      <div className="card-area">
        <div className='empty-card-box'>
          <span className='card-title'>MY KRYPTOMON</span>
          <div className='card-content'>
            {!myNFT && (
              <EmptyCard
                text='Select one of your kryptomon'
                isPlus
                onClickCard={() => onNavigate(locations.currentAccount())}
              />
            )}
            {myNFT && <NFTCard nft={myNFT} isPreventClick />}
          </div>
          {myNFT && (
            <Button className="remove-button" onClick={() => onResetMyNFT()}>
              <KIcon size="small" icon="close-small-gray">Remove</KIcon>
            </Button>
          )}
        </div>
        {isMatch && <Probability value={probabilityFactor} />}
        <div className={`empty-card-box ${isMatch ? '' : 'vertical-line'}`}>
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
      {isMatch && <Button primary className="compare-button">Compare</Button>}
    </div>
  )
}

export default React.memo(ChoosePair)

import React from 'react'
import { NFTImage } from '../NFTImage'
import { Props } from './NFTDetailCard.types'
import './NFTDetailCard.css'
import { Row } from '../Layout/Row'
import { Radio } from '@kmon/ui'

const NFTDetailCard = (props: Props) => {
  const { nft, elementType, isV2, toogleV2 } = props
  const laidTimestamp = nft.data.kryptomon!.timeBorn * 1000
  var options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const laid = new Date(laidTimestamp).toLocaleDateString(undefined, options)

  return (
    <div className="card">
      <div className="card-image-container">
        <div className="card-image">
          <NFTImage nft={nft} showMonospace />
        </div>
        <div className="card-image-text-details">
          <Radio
            toggle
            checked={isV2}
            onChange={toogleV2}
            label={isV2 ? 'V2' : 'V1'}
          />
          <img
            className="product-type-icon-details"
            src={elementType.icon}
            alt="icon"
          />
        </div>
      </div>
      <div className="product-description">
        <div className="product-description-left">
          <Row>
            <p className="product-info-number">No. {nft.name}</p>
            <div className="product-verified" />
          </Row>
          <p className="product-description-left-item">
            Gen: {nft.data.kryptomon?.genes.generation}
          </p>
          <p className="product-description-left-item">Laid: {laid}</p>
        </div>
        <div className="product-description-right">ERC-721</div>
      </div>
    </div>
  )
}

export default React.memo(NFTDetailCard)

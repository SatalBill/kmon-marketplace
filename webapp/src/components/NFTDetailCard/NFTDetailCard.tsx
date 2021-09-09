import React from 'react'
import { NFTImage } from '../NFTImage'
import { Props } from './NFTDetailCard.types'
import './NFTDetailCard.css'
import { Row } from '../Layout/Row'

const NFTDetailCard = (props: Props) => {
  const { nft, maxElementType, order } = props
  const date = nft.metadata.attributes?.find(
    elem => elem.trait_type === 'Birthday'
  )?.value
  const dateArr = date ? date.toString().split('-') : []
  const formattedDate = new Date(+dateArr[2], +dateArr[1], +dateArr[0])
  const month = formattedDate.toLocaleString('default', { month: 'short' })
  const day = dateArr[0]
  const year = dateArr[2]
  const laid = `${month} ${day} ${year}`

  return (
    <div className="card">
      <div className="card-image-container">
        <div className="card-image">
          <NFTImage nft={nft} showMonospace />
        </div>
        <div className="card-image-text">
          <img
            className="product-type-icon"
            src={maxElementType.icon}
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

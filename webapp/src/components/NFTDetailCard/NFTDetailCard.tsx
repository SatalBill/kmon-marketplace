import React from 'react'
import { NFTImage } from '../NFTImage'
import { Props } from './NFTDetailCard.types'
import './NFTDetailCard.css'
import { Row } from '../Layout/Row'

const NFTDetailCard = (props: Props) => {
  const { nft, maxElementType, order } = props
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
          <div className="product-info">
            {/* <p className="product-info-value">
              INDEX VALUE {order?.price && formatMANA(order.price)} BNB
            </p> */}
            {/* <p className="product-info-number">
              {'No. 2533'} <div className="product-verified" />
            </p> */}
          </div>
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
          <p className="product-description-left-item">
            Element: {maxElementType.title}
          </p>
        </div>
        <div className="product-description-right">ERC-721</div>
      </div>
    </div>
  )
}

export default React.memo(NFTDetailCard)

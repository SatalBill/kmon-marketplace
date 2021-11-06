import React from 'react'

import { toStringLootboxType } from '../../../modules/lootbox/utils'
import { Props } from './LootboxDetailCard.types'
import { Image } from '../../Image'
import './LootboxDetailCard.css'
import { Row } from '@kmon/ui'

const LootboxDetailCard = (props: Props) => {
  const { boxType, image, price } = props
  const boxTypeStr = toStringLootboxType(boxType)
  return (
    <div className="card">
      <div className="card-image-container">
        <div className="card-image">
          <Image src={image} />
        </div>
        <div className="card-image-text">
          <div className="product-type-price-container">
            <div className="product-type-price">{price} KMON</div>
          </div>
        </div>
      </div>
      <div className="product-description">
        <div className="product-description-left">
          <Row>
            <p className="product-info-number">{boxTypeStr}</p>
          </Row>
          <p className="product-description-left-item">
            {price} KMON
          </p>
        </div>
        <div className="product-description-right">ERC-721</div>
      </div>
    </div>
  )
}

export default React.memo(LootboxDetailCard)

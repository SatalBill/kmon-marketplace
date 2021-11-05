import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { locations } from '../../../modules/routing/locations'
import { toStringLootboxType } from '../../../modules/lootbox/utils'
import { Props } from './LootboxCard.types'
import { Image } from '../../Image'
import './LootboxCard.css'

const ImageCard = (props: Props) => {
  const { boxType, image, price } = props
  const boxTypeStr = toStringLootboxType(boxType)
  return (
    <Card
      className="ImageCard"
      link
      as={Link}
      to={locations.lootbox(boxType.toString())}
    >
      <div className="card-image-container">
        <div className="card-image">
          <Image src={image} />
        </div>
        <div className="card-image-text">
          <div className="product-type-price-container">
            <div className="product-type-price">{price} KMON</div>
          </div>
          <div className="product-info">
            <p className="product-info-value">
              VALUE {price}{' '}
              KMON
            </p>
          </div>
        </div>
      </div>
      <div className="product-description">
        <div className="product-description-left">
          <p className="product-description-left-item">
            Lootbox type: {boxTypeStr}
          </p>
        </div>
        <div className="product-description-right">{price} KMON</div>
      </div>
    </Card>
  )
}

export default React.memo(ImageCard)

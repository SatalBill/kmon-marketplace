import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { locations } from '../../../modules/routing/locations'
import { Props } from './LootboxCard.types'
import { Image } from '../../Image'
import './LootboxCard.css'

const LootboxCard = (props: Props) => {
  const { itemId, name, price, image } = props

  return (
    <Card
      className="LootboxCard"
      link
      as={Link}
      to={locations.item(itemId)}
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
            Lootbox type: {name}
          </p>
        </div>
        <div className="product-description-right">{price} KMON</div>
      </div>
    </Card>
  )
}

export default React.memo(LootboxCard)

import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@kmon/ui'

import { formatKMON } from '../../lib/kmon'
import { locations } from '../../modules/routing/locations'
import { NFTImage } from '../NFTImage'
import { Props } from './NFTCard.types'
import './NFTCard.css'
import Ice from '../../images/egg/elem-ice.svg'
import Air from '../../images/egg/elem-air.svg'
import Electro from '../../images/egg/elem-electro.svg'
import Ghost from '../../images/egg/elem-ghost.svg'
import Grass from '../../images/egg/elem-grass.svg'
import Ground from '../../images/egg/elem-ground.svg'
import Water from '../../images/egg/elem-water.svg'
import Fire from '../../images/egg/elem-fire.svg'
import { Row } from '../Layout/Row'

const NFTCard = (props: Props) => {
  const { nft, order, status } = props
  const genes = nft.data.kryptomon?.genes

  const elementTypes = [
    {
      title: 'Water',
      value: genes?.water,
      icon: Water
    },
    {
      title: 'Grass',
      value: genes?.grass,
      icon: Grass
    },
    {
      title: 'Fire',
      value: genes?.fire,
      icon: Fire
    },
    {
      title: 'Electro',
      value: genes?.electro,
      icon: Electro
    },
    {
      title: 'Ground',
      value: genes?.ground,
      icon: Ground
    },
    {
      title: 'Ghost',
      value: genes?.ghost,
      icon: Ghost
    },
    {
      title: 'Ice',
      value: genes?.ice,
      icon: Ice
    },
    {
      title: 'Air',
      value: genes?.air,
      icon: Air
    }
  ]

  const maxElementType = elementTypes.reduce((prev, current) => {
    return ((prev &&
      typeof prev.value === 'string' &&
      Number.parseInt(prev.value)) ||
      0) >
      ((current &&
        typeof current.value === 'string' &&
        Number.parseInt(current.value)) ||
        0)
      ? prev
      : current
  })

  return (
    <Card
      className="NFTCard"
      link
      as={Link}
      to={locations.nft(nft.contractAddress, nft.tokenId)}
    >
      <div className="card-image-container">
        <div className="card-image">
          <NFTImage nft={nft} showMonospace />
        </div>
        <div className="card-image-text">
          {status ? (
            <div className="product-type-price-container">
              <div className="product-type-price">{status.title}</div>
            </div>
          ) : (
            <img
              className="product-type-icon"
              src={maxElementType.icon}
              alt="icon"
            />
          )}
          <div className="product-info">
            <p className="product-info-value">
              INDEX VALUE {(order?.price && formatKMON(order.price)) || '0000'}{' '}
              BNB
            </p>
            <Row>
              <p className="product-info-number-card">No. {nft.name}</p>
              <div className="product-verified" />
            </Row>
          </div>
        </div>
      </div>
      {/* <Card.Content> */}
      {/* <Card.Header> */}
      <div className="product-description">
        <div className="product-description-left">
          <p className="product-description-left-item">
            Gen: {nft.data.kryptomon?.genes.generation}
          </p>
          <p className="product-description-left-item">
            Element: {maxElementType.title}
          </p>
        </div>
        <div className="product-description-right">ERC-721</div>
      </div>
      {/* {order ? (
            <Mana network={nft.network} inline>
              {formatKMON(order.price)}
            </Mana>
          ) : null} */}
      {/* </Card.Header> */}
      {/* <Card.Meta>{t(`networks.${nft.network.toLowerCase()}`)}</Card.Meta>
        {parcel ? <ParcelTags className="tags" nft={nft} /> : null}
        {estate ? <EstateTags nft={nft} /> : null}
        {wearable ? <WearableTags nft={nft} /> : null}
        {ens ? <ENSTags nft={nft} /> : null} */}
      {/* </Card.Content> */}

      {/* ) : null}
        </Card.Header>
        <Card.Meta>{t(`networks.${nft.network.toLowerCase()}`)}</Card.Meta>
        {kryptomon ? <KryptomonTags nft={nft} /> : null}
      </Card.Content> */}
    </Card>
  )
}

export default React.memo(NFTCard)

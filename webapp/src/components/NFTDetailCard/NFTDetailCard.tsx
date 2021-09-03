import React from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import { Card } from '@kmon/ui'

import { formatMANA } from '../../lib/mana'
import { locations } from '../../modules/routing/locations'
import { getNFTName } from '../../modules/nft/utils'
import { NFTImage } from '../NFTImage'
import { Props } from './NFTDetailCard.types'
import './NFTDetailCard.css'
import { Row } from '../Layout/Row'
//webapp/src/modules/nft/utils.ts
const NFTDetailCard = (props: Props) => {
  const { nft, maxElementType, order } = props
  return (
    // <Card
    //   className="NFTCard"
    //   link
    //   as={Link}
    //   to={locations.nft(nft.contractAddress, nft.tokenId)}
    // >
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
      {/* <Card.Content> */}
      {/* <Card.Header> */}
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
      {/* {order ? (
            <Mana network={nft.network} inline>
              {formatMANA(order.price)}
            </Mana>
          ) : null} */}
      {/* </Card.Header> */}
      {/* <Card.Meta>{t(`networks.${nft.network.toLowerCase()}`)}</Card.Meta>
        {parcel ? <ParcelTags className="tags" nft={nft} /> : null}
        {estate ? <EstateTags nft={nft} /> : null}
        {wearable ? <WearableTags nft={nft} /> : null}
        {ens ? <ENSTags nft={nft} /> : null} */}
      {/* </Card.Content> */}
    </div>
    // </Card>
  )
}

export default React.memo(NFTDetailCard)

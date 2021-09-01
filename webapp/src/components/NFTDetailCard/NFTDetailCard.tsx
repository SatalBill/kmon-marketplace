import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import { Card } from 'decentraland-ui'

import { formatMANA } from '../../lib/mana'
import { locations } from '../../modules/routing/locations'
import { getNFTName } from '../../modules/nft/utils'
import { NFTImage } from '../NFTImage'
import { Props } from './NFTDetailCard.types'
import './NFTDetailCard.css'

const NFTDetailCard = (props: Props) => {
  const { nft, order } = props

  const title = getNFTName(nft)
  const { parcel, estate, wearable, ens } = nft.data
  console.log({ nft, order })

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
          <div className="product-type-icon" />
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
          <p className="product-info-number">
            {'No. 2533'} <div className="product-verified" />
          </p>
          <p className="product-description-left-item">GEN: 001</p>
          <p className="product-description-left-item">ELEMENT: AIR</p>
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

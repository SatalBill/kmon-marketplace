import React from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import { Card } from '@kmon/ui'

import { formatMANA } from '../../lib/mana'
import { locations } from '../../modules/routing/locations'
import { getNFTName } from '../../modules/nft/utils'
import { NFTImage } from '../NFTImage'
import { Mana } from '../Mana'
import { Props } from './NFTCard.types'
import './NFTCard.css'
import { KryptomonTags } from './KryptomonTags'

const NFTCard = (props: Props) => {
  const { nft, order } = props

  const title = getNFTName(nft)
  const { kryptomon } = nft.data

  return (
    <Card
      className="NFTCard"
      link
      as={Link}
      to={locations.nft(nft.contractAddress, nft.tokenId)}
    >
      <NFTImage nft={nft} showMonospace />
      <Card.Content>
        <Card.Header>
          <div className="title">{title}</div>{' '}
          {order ? (
            <Mana network={nft.network} inline>
              {formatMANA(order.price)}
            </Mana>
          ) : null}
        </Card.Header>
        <Card.Meta>{t(`networks.${nft.network.toLowerCase()}`)}</Card.Meta>
        {kryptomon ? <KryptomonTags nft={nft} /> : null}
      </Card.Content>
    </Card>
  )
}

export default React.memo(NFTCard)

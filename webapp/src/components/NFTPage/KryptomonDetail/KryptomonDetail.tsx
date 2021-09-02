import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NFTCategory } from '@kmon/schemas'
import { Container, Header } from '@kmon/ui'
import { T } from '@kmon/dapps/dist/modules/translation/utils'

import { getNFTName } from '../../../modules/nft/utils'
import { locations } from '../../../modules/routing/locations'
import { PageHeader } from '../../PageHeader'
import { NFTImage } from '../../NFTImage'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Coordinate } from '../../Coordinate'
import { Title } from '../Title'
import { Owner } from '../Owner'
import { Description } from '../Description'
import { OrderDetails } from '../OrderDetails'
import { Actions } from '../Actions'
import { ProximityHighlights } from '../ProximityHighlights'
import { TransactionHistory } from '../TransactionHistory'
import { Bids } from '../Bids'
import { JumpIn } from '../JumpIn'
import { Props } from './KryptomonDetail.types'
import './KryptomonDetail.css'
import { KryptomonMetadataResponse } from '../../../modules/vendor/decentraland'

const KryptomonDetail = (props: Props) => {
  const { nft } = props
  const kryptomon = nft.data.kryptomon!

  return (
    <>
      <PageHeader>
        <NFTImage
          nft={nft}
          isDraggable={true}
          withNavigation={true}
          hasPopup={true}
        />
      </PageHeader>
      <Container className="ParcelDetail">
        <Title
          leftClassName="left-title"
          left={
            <>
              <Header className="parcel-title-name" size="large">
                {getNFTName(nft)}
              </Header>
            </>
          }
          rightClassName="right-title"
          right={
            <Owner nft={nft} />
          }
        />
        <Description text={kryptomon.description} />
        <Row>
          <Column align="left" grow={true}>
            <OrderDetails nft={nft} />
          </Column>
          <Column align="right">
            <Actions nft={nft} />
          </Column>
        </Row>
        <ProximityHighlights nft={nft} />
        <Bids nft={nft} />
        <TransactionHistory nft={nft} />
      </Container>
    </>
  )
}

export default React.memo(KryptomonDetail)

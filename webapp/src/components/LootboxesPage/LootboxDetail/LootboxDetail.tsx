import React, { useEffect } from 'react'
import { Container, Page } from '@kmon/ui'
import { Loader } from 'semantic-ui-react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { fromWei } from 'web3x-es/utils'
import { Address } from 'web3x-es/address'

import { Props } from './LootboxDetail.types'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { TitleBlock } from '../../NFTPage/TitleBlock'
import { Navbar } from '../../Navbar'
import { Navigation } from '../../Navigation'
import { Footer } from '../../Footer'
import { Details } from '../Details'
import { LootboxDetailCard } from '../LootboxDetailCard'
import { LootboxType } from '../../../modules/lootbox/types'
import basicLootbox from '../../../images/lootbox/basic.png'
import mediumLootbox from '../../../images/lootbox/medium.png'
import premiumLootbox from '../../../images/lootbox/premium.png'

const LootboxDetail = (props: Props) => {
  const {
    isConnecting,
    boxType,
    boxPrice,
    pendingTransaction,
    onFetchLootboxPrices,
    onBuyLootbox
  } = props
  const isTxPending =
    pendingTransaction !== undefined && pendingTransaction.status !== 'confirmed'
  const txStatus =
    pendingTransaction !== undefined ? pendingTransaction.status : null
  const boxPriceStr = boxPrice !== undefined ? fromWei(boxPrice, 'ether') : ''

  const lootboxImage = boxType === LootboxType.Basic
    ? basicLootbox
    : boxType === LootboxType.Medium
    ? mediumLootbox
    : boxType === LootboxType.Premium
    ? premiumLootbox
    : ''

  useEffect(() => {
    onFetchLootboxPrices(boxType)
  }, [])

  const handleClickBuy = () => {
    if (boxPrice === undefined) return
    onBuyLootbox(boxType, boxPrice, Address.ZERO)
  }

  const LootboxDetail = () => {
    return (
      <Container className="product-container">
        <Row className="Row-space-between">
          <LootboxDetailCard
            boxType={boxType}
            image={lootboxImage}
            price={boxPriceStr}
          />
          <Column>
            <Details
              boxType={boxType}
              boxPrice={boxPriceStr}
              isTxPending={isTxPending}
              onBuy={handleClickBuy}
            />
            <TitleBlock title="Transaction History">
              <div className="dna-container">
                <canvas height="210" width="678" data-testid="canvas" role="img"></canvas>
              </div>
            </TitleBlock>
            {isTxPending && (
              <>
                <div className="overlay" />
                <Loader active size="massive" />
              </>
            )}
          </Column>
        </Row>
      </Container>
    )
  }

  const Loading = () => (
    <div className="nft-center">
      <Loader active size="huge" />
    </div>
  )
  
  const NotFound = () => (
    <div className="nft-center">
      <p className="secondary-text">{t('global.not_found')}&hellip;</p>
    </div>
  )

  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation isFullscreen />
      </div>
      <Page className="NFTPage" isFullscreen>
        {isConnecting ? <Loading /> : null}
        {!isConnecting && boxPrice === undefined ? <NotFound /> : null}
        {!isConnecting && boxPrice !== undefined ? <LootboxDetail /> : null}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(LootboxDetail)

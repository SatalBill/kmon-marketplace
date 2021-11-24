import React, { useEffect, useState } from 'react'
import { Container, Page } from '@kmon/ui'
import { Loader } from 'semantic-ui-react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { fromWei } from 'web3x-es/utils'
import { Address } from 'web3x-es/address'
import {
  Authorization,
  AuthorizationType
} from '@kmon/dapps/dist/modules/authorization/types'
import { ContractName } from '@kmon/transactions'
import { hasAuthorization } from '@kmon/dapps/dist/modules/authorization/utils'

import { getContractNames } from '../../../modules/vendor'
import { getContract } from '../../../modules/contract/utils'
import { AuthorizationModal } from '../../AuthorizationModal'
import { Props } from './LootboxDetail.types'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Navbar } from '../../Navbar'
import { Navigation } from '../../Navigation'
import { Footer } from '../../Footer'
import { Details } from '../Details'
import { LootboxDetailCard } from '../LootboxDetailCard'
import { LootboxType } from '../../../modules/lootbox/types'
import basicLootbox from '../../../images/lootbox/basic.png'
import mediumLootbox from '../../../images/lootbox/medium.png'
import premiumLootbox from '../../../images/lootbox/premium.png'
import './LootboxDetail.css'

const LootboxDetail = (props: Props) => {
  const {
    wallet,
    authorizations,
    isConnecting,
    isLoading,
    isBuyingLootbox,
    boxType,
    lootboxPrices,
    onFetchLootboxPrice,
    onBuyLootbox
  } = props
  const isTxPending = isLoading && isBuyingLootbox
  const boxPrice = boxType === undefined ?
    undefined :
    lootboxPrices === undefined ?
    undefined : lootboxPrices[boxType]
  const boxPriceStr = boxPrice !== undefined ? fromWei(boxPrice, 'ether') : ''

  const lootboxImage = boxType === LootboxType.Basic
    ? basicLootbox
    : boxType === LootboxType.Medium
    ? mediumLootbox
    : boxType === LootboxType.Premium
    ? premiumLootbox
    : ''

  useEffect(() => {
    if (boxType !== undefined) {
      onFetchLootboxPrice(boxType)
    }
  }, [boxType])
  
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)

  const contractNames = getContractNames()

  const kmon = getContract({
    name: contractNames.KMONToken
  })

  const lootbox = getContract({
    name: contractNames.Lootbox,
  })

  if (!wallet) {
    return null
  }

  const authorization: Authorization = {
    address: wallet.address,
    authorizedAddress: lootbox.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  }

  const handleSubmit = () => {
    if (hasAuthorization(authorizations, authorization)) {
      handleBuyLootbox()
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const handleBuyLootbox = () => {
    if (boxType === undefined || boxPrice === undefined) return
    onBuyLootbox(boxType, boxPrice, Address.ZERO)
  }

  const LootboxDetail = () => {
    return (
      <Container className="lootbox-detail product-container">
        <Row className="Row">
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
              onBuy={handleSubmit}
            />
            {isTxPending && (
              <>
                <div className="overlay" />
                <Loader active size="massive" />
              </>
            )}
          </Column>
        </Row>
        <AuthorizationModal
          open={showAuthorizationModal}
          authorization={authorization}
          onProceed={handleBuyLootbox}
          onCancel={handleClose}
        />
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

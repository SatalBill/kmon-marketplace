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
import basicLootbox from '../../../images/lootbox/basic.png'
import mediumLootbox from '../../../images/lootbox/medium.png'
import premiumLootbox from '../../../images/lootbox/premium.png'
import './LootboxDetail.css'
import { DescriptionBlock } from '../DescriptionBlock'
import { TitleBlock } from '../../NFTPage/TitleBlock'
import { ItemVersion } from '../../../modules/item/constants'

const images: Record<string, string> = {
  '0': basicLootbox,
  '1': mediumLootbox,
  '2': premiumLootbox,
}

const LootboxDetail = (props: Props) => {
  const {
    wallet,
    authorizations,
    isConnecting,
    isLoading,
    isBuyingItem,
    itemId,
    currentItem,
    onFetchItem,
    onBuyItem,
  } = props
  const isTxPending = isLoading && isBuyingItem
  const price = currentItem === null ? undefined : currentItem.price
  const priceStr = price !== undefined ? fromWei(price, 'ether') : ''
  const itemImage = itemId !== undefined ? images[itemId] : ''
  const [currentItemVersion, setCurrentItemVersion] = useState(ItemVersion.V2)

  useEffect(() => {
    if (itemId !== undefined) {
      onFetchItem(itemId)
    }
  }, [itemId])
  
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)

  const contractNames = getContractNames()

  const kmon = getContract({
    name: contractNames.KMONToken
  })

  const item = getContract({
    name: contractNames.Item,
  })

  if (!wallet) {
    return null
  }

  const authorization: Authorization = {
    address: wallet.address,
    authorizedAddress: item.address,
    contractAddress: kmon.address,
    contractName: ContractName.KMONToken,
    chainId: kmon.chainId,
    type: AuthorizationType.ALLOWANCE
  }

  const handleSubmit = (version: ItemVersion) => {
    setCurrentItemVersion(version)
    if (hasAuthorization(authorizations, authorization)) {
      handleBuyItem(version)
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const handleBuyItem = (version: ItemVersion) => {
    if (currentItem === null || price === undefined) return
    onBuyItem(version, currentItem, 1, Address.ZERO)
  }

  const LootboxDetail = () => {
    return (
      <Container className="lootbox-detail product-container">
        <Row className="Row">
          {currentItem && (
            <LootboxDetailCard
              name={currentItem.name}
              image={itemImage}
              price={priceStr}
            />
          )}
          <Column>
            {currentItem && (
              <Details
                name={currentItem.name}
                price={priceStr}
                isTxPending={isTxPending}
                onBuyItem={handleSubmit}
              />
            )}
            {isTxPending && (
              <>
                <div className="overlay" />
                <Loader active size="massive" />
              </>
            )}
          </Column>
        </Row>
        <Row className="Row-space-between">
          <TitleBlock title={t('lootbox_page.description_block.title')}>
            <DescriptionBlock
              description={t(`lootbox_page.description_block.description.${currentItem?.itemId}`)}
            />
          </TitleBlock>
        </Row>
        <AuthorizationModal
          open={showAuthorizationModal}
          authorization={authorization}
          onProceed={() => handleBuyItem(currentItemVersion)}
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
        {!isConnecting && price === undefined ? <NotFound /> : null}
        {!isConnecting && price !== undefined ? <LootboxDetail /> : null}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(LootboxDetail)

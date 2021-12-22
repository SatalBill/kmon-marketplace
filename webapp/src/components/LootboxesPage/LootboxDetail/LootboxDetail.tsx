import React, { useEffect, useState } from 'react'
import { Button, Container, Field, Form, Modal, Page } from '@kmon/ui'
import { Loader } from 'semantic-ui-react'
import { T, t } from '@kmon/dapps/dist/modules/translation/utils'
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
import './LootboxDetail.css'
import { DescriptionBlock } from '../DescriptionBlock'
import { TitleBlock } from '../../NFTPage/TitleBlock'
import { Item, ItemVersion } from '../../../modules/item/types'
import { images } from '../LootboxesPage'
import { fromItemCount, toItemCount } from '../../../lib/number'

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
  const price = currentItem === undefined ? undefined : currentItem.price
  const priceStr = price !== undefined ? fromWei(price, 'ether') : ''
  const itemImage = currentItem === undefined ? '' : images[currentItem.name.toLocaleLowerCase()]
  const [currentItemVersion, setCurrentItemVersion] = useState(ItemVersion.V2)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmItemCount, setConfirmItemCount] = useState(1)

  useEffect(() => {
    if (itemId !== undefined) {
      onFetchItem()
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
    setShowConfirmModal(true)
  }

  const handleProceed = () => {
    if (hasAuthorization(authorizations, authorization)) {
      handleBuyItem(currentItemVersion)
    } else {
      setShowAuthorizationModal(true)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const handleBuyItem = (version: ItemVersion) => {
    if (currentItem === undefined || price === undefined) return
    if (version === ItemVersion.V1) {
      onBuyItem(version, getLootboxFromItem(currentItem), confirmItemCount, Address.fromString(wallet.address))
      return
    }
    onBuyItem(version, currentItem, confirmItemCount, Address.fromString(wallet.address))
  }

  const getLootboxFromItem = (item: Item) => {
    let lootbox = item
    if (item.name.toLowerCase() === 'basic') {
      ;(lootbox = { ...lootbox, itemId: '0' })
    }
    if (item.name.toLowerCase() === 'medium') {
      ;(lootbox = { ...lootbox, itemId: '1' })
    }
    if (item.name.toLowerCase() === 'premium') {
      ;(lootbox = { ...lootbox, itemId: '2' })
    }
    return lootbox
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
                name={currentItem.name.replace(/_/g, ' ')}
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
              description={t(`lootbox_page.description_block.description.${currentItem?.name.toLowerCase()}`)}
            />
          </TitleBlock>
        </Row>
        <Modal size="small" open={showConfirmModal} className="ConfirmNumberOfItemsModal">
          <Modal.Header>{t('lootbox_page.confirm.title')}</Modal.Header>
          <Form onSubmit={handleProceed}>
            <Modal.Content>
              <T
                id="lootbox_page.confirm.line_one"
                values={{
                  item: <b>{currentItem?.name.replace(/_/g, ' ')}</b>
                }}
              />
              <br />
              <T id="lootbox_page.confirm.line_two" />
              <Field
                label={t('lootbox_page.confirm.field_label')}
                placeholder="1"
                type="number"
                min="1"
                value={confirmItemCount}
                onChange={(_event, props) => {
                  const newItemCount = fromItemCount(props.value)
                  setConfirmItemCount(toItemCount(newItemCount))
                }}
              />
            </Modal.Content>
            <Modal.Actions>
              <div
                className="ui button"
                onClick={() => {
                  setConfirmItemCount(1)
                  setShowConfirmModal(false)
                }}
              >
                {t('global.cancel')}
              </div>
              <Button
                type="submit"
                primary
                disabled={isBuyingItem}
                loading={isBuyingItem}
              >
                {t('global.proceed')}
              </Button>
            </Modal.Actions>
          </Form>
        </Modal>
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

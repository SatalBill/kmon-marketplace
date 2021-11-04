import React, { useEffect } from 'react'
import { Card, Page } from '@kmon/ui'
import { fromWei } from 'web3x-es/utils'

import { NavigationTab } from '../Navigation/Navigation.types'
import { locations } from '../../modules/routing/locations'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { Props } from './LootboxesPage.types'
import { BuyLootboxes } from '../BuyLootboxes'
import { LootboxType } from '../../modules/lootbox/types'

import { LootboxCard } from '../LootboxCard'

const LootboxesPage = (props: Props) => {
  const {
    address,
    vendor,
    wallet,
    isConnecting,
    isFullscreen,
    basicPrice,
    mediumPrice,
    premiumPrice,
    txHash,
    txData,
    txLoadingData,
    onRedirect,
    onFetchLootboxPrices,
    onBuyLootbox
  } = props

  const isCurrentAccount =
    address === undefined || (wallet && wallet.address === address)

  const isTxPending = txHash !== null && txLoadingData.find(action => action.payload.hash === txHash) !== undefined
  const tx = txData.find(tx => tx.hash === txHash)
  const txStatus = tx === undefined ? null : tx.status

  // Redirect to signIn if trying to access current account without a wallet
  useEffect(() => {
    if (isCurrentAccount && !isConnecting && !wallet) {
      onRedirect(locations.signIn())
    } else {
      onFetchLootboxPrices(LootboxType.Basic)
      onFetchLootboxPrices(LootboxType.Medium)
      onFetchLootboxPrices(LootboxType.Premium)
    }
  }, [isCurrentAccount, isConnecting, wallet, onRedirect])

  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation
          activeTab={isCurrentAccount ? NavigationTab.LOOTBOXES : undefined}
          isFullscreen={isFullscreen}
        />
      </div>
      <BuyLootboxes
        basicPrice={basicPrice}
        mediumPrice={mediumPrice}
        premiumPrice={premiumPrice}
        isTxPending={isTxPending}
        txStatus={txStatus}
        onBuyLootbox={onBuyLootbox}
      />
      <Page className="NFTBrowse">
        <Card.Group>
          <LootboxCard
            boxType={LootboxType.Basic}
            image={'https://kryptomon-images.ams3.digitaloceanspaces.com/images/kryptomons/gif/kmon_11_gif.gif'}
            price={fromWei(basicPrice, 'ether')}
          />
          <LootboxCard
            boxType={LootboxType.Medium}
            image={'https://kryptomon-images.ams3.digitaloceanspaces.com/images/kryptomons/gif/kmon_11_gif.gif'}
            price={fromWei(mediumPrice, 'ether')}
          />
          <LootboxCard
            boxType={LootboxType.Premium}
            image={'https://kryptomon-images.ams3.digitaloceanspaces.com/images/kryptomons/gif/kmon_11_gif.gif'}
            price={fromWei(premiumPrice, 'ether')}
          />
        </Card.Group>
      </Page>
      <Footer isFullscreen={isFullscreen} />
    </>
  )
}

export default React.memo(LootboxesPage)

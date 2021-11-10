import React, { useEffect } from 'react'
import { Card, Page } from '@kmon/ui'
import { fromWei } from 'web3x-es/utils'

import { NavigationTab } from '../Navigation/Navigation.types'
import { locations } from '../../modules/routing/locations'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { Props } from './LootboxesPage.types'
import { LootboxType } from '../../modules/lootbox/types'

import { LootboxCard } from './LootboxCard'

const LootboxesPage = (props: Props) => {
  const {
    address,
    wallet,
    isConnecting,
    isFullscreen,
    basicPrice,
    mediumPrice,
    premiumPrice,
    pendingTransaction,
    onRedirect,
    onFetchLootboxPrices
  } = props

  const isCurrentAccount =
    address === undefined || (wallet && wallet.address === address)

  const isTxPending = pendingTransaction !== undefined && pendingTransaction.status !== 'confirmed'
  const txStatus = pendingTransaction !== undefined ? pendingTransaction.status : null

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
      <Page className="NFTBrowse">
        <Card.Group>
          <LootboxCard
            boxType={LootboxType.Basic}
            image={'https://kryptomon-images.ams3.digitaloceanspaces.com/images/kryptomons/gif/kmon_11_gif.gif'}
            price={basicPrice === undefined ? '' : fromWei(basicPrice, 'ether')}
          />
          <LootboxCard
            boxType={LootboxType.Medium}
            image={'https://kryptomon-images.ams3.digitaloceanspaces.com/images/kryptomons/gif/kmon_11_gif.gif'}
            price={mediumPrice === undefined ? '' : fromWei(mediumPrice, 'ether')}
          />
          <LootboxCard
            boxType={LootboxType.Premium}
            image={'https://kryptomon-images.ams3.digitaloceanspaces.com/images/kryptomons/gif/kmon_11_gif.gif'}
            price={premiumPrice === undefined ? '' : fromWei(premiumPrice, 'ether')}
          />
        </Card.Group>
      </Page>
      <Footer isFullscreen={isFullscreen} />
    </>
  )
}

export default React.memo(LootboxesPage)

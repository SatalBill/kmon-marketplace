import React, { useEffect } from 'react'
import { Card, Page } from '@kmon/ui'
import { fromWei } from 'web3x-es/utils'

import { NavigationTab } from '../Navigation/Navigation.types'
import { locations } from '../../modules/routing/locations'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { Props } from './LootboxesPage.types'
import { LootboxCard } from './LootboxCard'
import basicLootbox from '../../images/lootbox/basic.png'
import mediumLootbox from '../../images/lootbox/medium.png'
import premiumLootbox from '../../images/lootbox/premium.png'

const images: Record<string, string> = {
  '0': basicLootbox,
  '1': mediumLootbox,
  '2': premiumLootbox,
}

const LootboxesPage = (props: Props) => {
  const {
    address,
    wallet,
    isConnecting,
    isFullscreen,
    items,
    onRedirect,
    onFetchItems
  } = props

  const isCurrentAccount =
    address === undefined || (wallet && wallet.address === address)

    console.log(items, Object.values(items))

  // Redirect to signIn if trying to access current account without a wallet
  useEffect(() => {
    if (isCurrentAccount && !isConnecting && !wallet) {
      onRedirect(locations.signIn())
    } else {
      onFetchItems()
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
          {Object.values(items).map((item) => (
            <LootboxCard
              key={item.itemId}
              itemId={item.itemId}
              name={item.name}
              image={images[item.itemId]}
              price={fromWei(item.price, 'ether')}
            />
          ))}
        </Card.Group>
      </Page>
      <Footer isFullscreen={isFullscreen} />
    </>
  )
}

export default React.memo(LootboxesPage)

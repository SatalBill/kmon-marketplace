import React from 'react'

import { isVendor } from '../../modules/vendor/utils'
import { VendorName } from '../../modules/vendor/types'
import { View } from '../../modules/ui/types'
import { NavigationTab } from '../Navigation/Navigation.types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { NFTBrowse } from '../NFTBrowse'
import { Props } from './LootboxesPage.types'
import { BuyLootboxes } from '../BuyLootboxes'

const LootboxesPage = (props: Props) => {
  const { isFullscreen } = props
  const vendor = isVendor(props.vendor) ? props.vendor : VendorName.DECENTRALAND

  const activeTab = NavigationTab.LOOTBOXES

  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation activeTab={activeTab} isFullscreen={isFullscreen} />
      </div>
      <BuyLootboxes />
      <NFTBrowse vendor={vendor} view={View.MARKET} />
      <Footer isFullscreen={isFullscreen} />
    </>
  )
}

export default React.memo(LootboxesPage)

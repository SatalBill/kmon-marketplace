import React from 'react'

import { isVendor, isPartner } from '../../modules/vendor/utils'
import { VendorName } from '../../modules/vendor/types'
import { View } from '../../modules/ui/types'
import { NavigationTab } from '../Navigation/Navigation.types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { NFTBrowse } from '../NFTBrowse'
import { Props } from './BrowsePage.types'
import { FooterImage } from '../FooterImage'

const BrowsePage = (props: Props) => {
  const { isFullscreen, pathname } = props
  const isBrowseEggs = pathname === '/browse'
  const vendor = isVendor(props.vendor) ? props.vendor : VendorName.KRYPTOMON

  const activeTab = isPartner(vendor)
    ? NavigationTab.PARTNER
    : isBrowseEggs
      ? NavigationTab.BROWSE
      : NavigationTab.KRYPTOMONS
  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation activeTab={activeTab} isFullscreen={isFullscreen} />
      </div>
      <NFTBrowse vendor={vendor} view={View.MARKET} />
      <FooterImage />
      <Footer isFullscreen={isFullscreen} />
    </>
  )
}

export default React.memo(BrowsePage)

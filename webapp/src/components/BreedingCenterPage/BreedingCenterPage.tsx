import React from 'react'

import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Props } from './BreedingCenterPage.types'
import { NavigationTab } from '../Navigation/Navigation.types'
import { Navigation } from '../Navigation'
import { NFTBrowse } from '../NFTBrowse'
import { VendorName } from '../../modules/vendor'
import { View } from '../../modules/ui/types'
import { ChoosePair } from './ChoosePair'

const BreedingCenterPage = (props: Props) => {
  const {} = props
  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation activeTab={NavigationTab.BREEDING_CENTER} />
      </div>
      <ChoosePair />
      <NFTBrowse vendor={VendorName.KRYPTOMON} view={View.MARKET} />
      <Footer />
    </>
  )
}

export default React.memo(BreedingCenterPage)

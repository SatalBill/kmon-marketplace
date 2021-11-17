import React, { useCallback } from 'react'

import { Section } from '../../../modules/vendor/routing/types'
import { Section as DecentralandSection } from '../../../modules/vendor/decentraland/routing/types'
import { VendorName } from '../../../modules/vendor/types'
import { NFTSidebar as DecentralandNFTSidebar } from '../decentraland/NFTSidebar'
import { PartnerSidebar } from '../PartnerSidebar'
import { Props } from './NFTSidebar.types'

const NFTSidebar = (props: Props) => {
  const { vendor, section, onBrowse, pathname } = props
  const kryptomonStatus = pathname === '/kryptomons' ? '1' : '0'
  const handleOnBrowse = useCallback(
    (section: Section) => {
      onBrowse({ section, kryptomonStatus })
    },
    [onBrowse]
  )

  switch (vendor) {
    case VendorName.SUPER_RARE:
    case VendorName.MAKERS_PLACE:
    case VendorName.KNOWN_ORIGIN:
      return (
        <PartnerSidebar
          section={section}
          vendor={vendor}
          onMenuItemClick={handleOnBrowse}
        />
      )
    case VendorName.DECENTRALAND:
    default:
      return (
        <DecentralandNFTSidebar
          section={section as DecentralandSection}
          onMenuItemClick={handleOnBrowse}
        />
      )
  }
}

export default React.memo(NFTSidebar)

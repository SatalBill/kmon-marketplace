import React, { useCallback } from 'react'

import { VendorName } from '../../modules/vendor/types'
import { Section } from '../../modules/routing/types'
import { getPartners } from '../../modules/vendor/utils'
import { VendorMenu } from '../Vendor/VendorMenu'
import { Props } from './AccountSidebar.types'
import { MultipleFilters } from '../Vendor/NFTSidebar/NFTSidebar'

const AccountSidebar = (props: Props) => {
  const { address, section, onBrowse } = props

  const handleOnBrowse = useCallback(
    (vendor: VendorName, section: Section) => {
      onBrowse({ vendor, section, address })
    },
    [address, onBrowse]
  )
  const handleOnBrowseMultiple = useCallback(
    (vendor: VendorName, data: MultipleFilters) => {
      onBrowse({ vendor, ...data, address })
    },
    [address, onBrowse]
  )
  const decentraland = VendorName.DECENTRALAND

  return (
    <div className="NFTSidebar">
      <VendorMenu
        key={decentraland}
        address={address}
        vendor={decentraland}
        section={section}
        onClick={section => handleOnBrowse(decentraland, section)}
        onMultiItemClick={data => handleOnBrowseMultiple(decentraland, data)}
      />
      {getPartners().map(partner => (
        <VendorMenu
          key={partner}
          address={address}
          vendor={partner}
          section={section}
          onClick={section => handleOnBrowse(partner, section)}
          onMultiItemClick={data => handleOnBrowseMultiple(decentraland, data)}
        />
      ))}
    </div>
  )
}

export default React.memo(AccountSidebar)

import React, { useCallback } from 'react'

import { Section } from '../../../modules/vendor/routing/types'
import { Section as DecentralandSection } from '../../../modules/vendor/decentraland/routing/types'
import { VendorName } from '../../../modules/vendor/types'
import { NFTSidebar as DecentralandNFTSidebar } from '../decentraland/NFTSidebar'
import { PartnerSidebar } from '../PartnerSidebar'
import { Props } from './NFTSidebar.types'

export type MultipleFilters = {
  elemTypes?: string[]
  specialties?: string[]
  supers?: string[]
  affection?: string[]
  braveness?: string[]
  constitution?: string[]
  craziness?: string[]
  hunger?: string[]
  instinct?: string[]
  smart?: string[]
  elementStartingTalent?: string[]
  laziness?: string[]
}

const NFTSidebar = (props: Props) => {
  const {
    vendor,
    section,
    onBrowse,
    pathname,
    elemTypes,
    affection,
    specialties,
    supers,
    braveness,
    constitution,
    craziness,
    hunger,
    instinct,
    smart,
    elementStartingTalent,
    laziness
  } = props

  const kryptomonStatus = pathname === '/kryptomons' ? '1' : '0'
  const handleOnBrowse = useCallback(
    (section: Section) => {
      onBrowse({ section, kryptomonStatus })
    },
    [onBrowse]
  )

  const handleOnBrowseMultiple = useCallback(
    (data: MultipleFilters) => {
      onBrowse({
        // elemTypes,
        // affection,
        ...data,
        kryptomonStatus
      })
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
          onMultiItemClick={handleOnBrowseMultiple}
        />
      )
    case VendorName.DECENTRALAND:
    default:
      return (
        <DecentralandNFTSidebar
          section={section as DecentralandSection}
          onMenuItemClick={handleOnBrowse}
          onMultiItemClick={handleOnBrowseMultiple}
          elemTypes={elemTypes}
          affection={affection}
          specialties={specialties}
          supers={supers}
          braveness={braveness}
          constitution={constitution}
          craziness={craziness}
          hunger={hunger}
          instinct={instinct}
          smart={smart}
          elementStartingTalent={elementStartingTalent}
          laziness={laziness}
        />
      )
  }
}

export default React.memo(NFTSidebar)

import React from 'react'

import { VendorName } from '../../../modules/vendor/types'
import { NFTFilters as DecentralandNFTFilters } from '../decentraland/NFTFilters'
import { NFTFilters as SuperRareNFTFilters } from '../super_rare/NFTFilters'
import { NFTFilters as MakersPlaceNFTFilters } from '../makers_place/NFTFilters'
import { NFTFilters as KnownOriginNFTFilters } from '../known_origin/NFTFilters'
import { Props } from './NFTFilters.types'
import './NFTFilters.css'

// TODO: Code on each NFTFilters can be extracted
const NFTFilters = (props: Props) => {
  const { vendor, onBrowse, isNavBar } = props

  switch (vendor) {
    case VendorName.SUPER_RARE:
      return <SuperRareNFTFilters onBrowse={onBrowse} />
    case VendorName.MAKERS_PLACE:
      return <MakersPlaceNFTFilters onBrowse={onBrowse} />
    case VendorName.KNOWN_ORIGIN:
      return <KnownOriginNFTFilters onBrowse={onBrowse} />
    case VendorName.DECENTRALAND:
    case VendorName.KRYPTOMON:
    default:
      return <DecentralandNFTFilters onBrowse={onBrowse} isNavBar={isNavBar}/>
  }
}

export default React.memo(NFTFilters)

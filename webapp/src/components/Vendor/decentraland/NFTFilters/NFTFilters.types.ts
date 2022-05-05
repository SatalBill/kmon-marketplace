import { Network, Rarity } from '@kmon/schemas'
import { Section, SortBy } from '../../../../modules/routing/types'
import { browseNFTs } from '../../../../modules/routing/actions'
import { NFT } from '../../../../modules/nft/types'
export type Props = {
  count?: number
  section: Section
  sortBy?: SortBy
  priceToken?: string[]
  search: string
  onlyOnSale?: boolean
  isMap?: boolean
  wearableRarities: Rarity[]
  contracts: string[]
  network?: Network
  onBrowse: typeof browseNFTs
  isNavBar: boolean
  myNFT?: NFT | null
}

export type MapStateProps = Pick<
  Props,
  | 'count'
  | 'section'
  | 'sortBy'
  | 'search'
  | 'onlyOnSale'
  | 'isMap'
  | 'wearableRarities'
  | 'contracts'
  | 'network'
  | 'priceToken'
  | 'myNFT'
>
export type OwnProps = Pick<Props, 'onBrowse'>

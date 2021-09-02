import { Network, Rarity, WearableCategory, NFT as BaseNFT } from '@kmon/schemas'
import { NFT } from '../../../nft/types'
import { Order } from '../../../order/types'
import { VendorName } from '../../types'

export type NFTsFetchFilters = {
  isLand?: boolean
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableRarities?: Rarity[]
  contracts?: string[]
  network?: Network
}

export type NFTResult = {
  nft: Omit<NFT<VendorName.DECENTRALAND>, 'vendor'>
  order: Order | null
}

export type NFTResponse = {
  data: NFTResult[]
  total: number
}

export type KryptomonMetadataResponse = {
  description: string
  image: string
  name: string
}

export type NFTData = BaseNFT['data']

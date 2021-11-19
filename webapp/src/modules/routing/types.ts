import { Network, Rarity } from '@kmon/schemas'
import { VendorName } from '../vendor/types'
import { Section } from '../vendor/routing/types'
import { View } from '../ui/types'

export { Section } from '../vendor/routing/types'

export enum SortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_LISTED = 'recently_listed',
  CHEAPEST = 'cheapest'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export type SearchOptions = {
  view?: View
  vendor?: VendorName
  page?: number
  section?: Section
  sortBy?: SortBy
  onlyOnSale?: boolean
  isMap?: boolean
  isFullscreen?: boolean
  wearableRarities?: Rarity[]
  search?: string
  contracts?: string[]
  address?: string
  network?: Network
  kryptomonStatus?: string

  elemTypes?: string[]
  specialties?: string[]
  supers?: string[]
  unfreezable?: string[]

  affection?: string[]
  braveness?: string[]
  constitution?: string[]
  craziness?: string[]
  hunger?: string[]
  instinct?: string[]
  smart?: string[]
  elementStartingTalent?: string[]
  laziness?: string[]

  sex?: string[]
  skinType?: string[]
  bodySize?: string[]
  ego?: string[]
  healthPoints?: string[]
  speed?: string[]
}

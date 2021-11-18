import { Dispatch } from 'redux'

import { Section } from '../../../modules/vendor/routing/types'
import { browseNFTs, BrowseNFTsAction } from '../../../modules/routing/actions'

export type Props = {
  vendor?: string
  section: Section
  onBrowse: typeof browseNFTs
  pathname: string
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

export type MapStateProps = Pick<
  Props,
  | 'vendor'
  | 'section'
  | 'pathname'
  | 'elemTypes'
  | 'specialties'
  | 'supers'
  | 'affection'
  | 'braveness'
  | 'constitution'
  | 'craziness'
  | 'hunger'
  | 'instinct'
  | 'smart'
  | 'elementStartingTalent'
  | 'laziness'
>
export type MapDispatchProps = Pick<Props, 'onBrowse'>
export type MapDispatch = Dispatch<BrowseNFTsAction>

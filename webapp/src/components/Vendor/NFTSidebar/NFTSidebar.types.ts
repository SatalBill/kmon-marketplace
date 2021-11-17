import { Dispatch } from 'redux'

import { Section } from '../../../modules/vendor/routing/types'
import { browseNFTs, BrowseNFTsAction } from '../../../modules/routing/actions'

export type Props = {
  vendor?: string
  section: Section
  onBrowse: typeof browseNFTs
  pathname: string
}

export type MapStateProps = Pick<Props, 'vendor' | 'section' | 'pathname'>
export type MapDispatchProps = Pick<Props, 'onBrowse'>
export type MapDispatch = Dispatch<BrowseNFTsAction>

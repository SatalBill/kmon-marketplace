import { Dispatch } from 'redux'
import { Wallet } from '@kmon/dapps/dist/modules//wallet/types'
import { CallHistoryMethodAction } from 'connected-react-router'
import { NFT } from '../../../modules/nft/types'
import { Order } from '../../../modules/order/types'
import { Bid } from '../../../modules/bid/types'
import {
  addToBreedigCentreRequest,
  AddToBreedingCentreRequestAction
} from '../../../modules/breed/actions'

export type Props = {
  wallet: Wallet | null
  nft: NFT
  order: Order | null
  bids: Bid[]
  isAddingToBreedingCentre: boolean
  onAddToBreedingCentre: typeof addToBreedigCentreRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'wallet' | 'order' | 'bids' | 'isAddingToBreedingCentre'>
export type MapDispatchProps = Pick<Props, 'onAddToBreedingCentre' | 'onNavigate'>
export type MapDispatch = Dispatch<AddToBreedingCentreRequestAction | CallHistoryMethodAction>
export type OwnProps = Pick<Props, 'nft'>

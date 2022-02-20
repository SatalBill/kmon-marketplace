import { Dispatch } from 'redux'
import { Wallet } from '@kmon/dapps/dist/modules//wallet/types'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'

import { NFT } from '../../../modules/nft/types'
import { Order } from '../../../modules/order/types'
import { Bid } from '../../../modules/bid/types'
import {
  addToBreedigCentreRequest,
  AddToBreedingCentreRequestAction
} from '../../../modules/breedingOrder/actions'

export type Props = {
  wallet: Wallet | null
  authorizations: Authorization[]
  nft: NFT
  order: Order | null
  bids: Bid[]
  isAddingToBreedingCentre: boolean
  onAddToBreedingCentre: typeof addToBreedigCentreRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'wallet' | 'authorizations' | 'order' | 'bids' | 'isAddingToBreedingCentre'>
export type MapDispatchProps = Pick<Props, 'onAddToBreedingCentre' | 'onNavigate'>
export type MapDispatch = Dispatch<AddToBreedingCentreRequestAction | CallHistoryMethodAction>
export type OwnProps = Pick<Props, 'nft'>

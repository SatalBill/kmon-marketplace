import { Dispatch } from 'redux'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Order } from '../../../modules/order/types'
import { NFT } from '../../../modules/nft/types'
import { showBreedPriceModal, ShowBreedPriceModalAction } from '../../../modules/ui/actions'
import { Bid } from '../../../modules/bid/types'
import {
  addToBreedigCentreRequest,
  AddToBreedingCentreRequestAction,
} from '../../../modules/breedingOrder/actions'
import { cancelBreedRequest, CancelBreedRequestAction, resetNFTForBreedingRequest, ResetNFTForBreedingRequestAction } from '../../../modules/breed/actions'
import { BreedingOrder } from '../../../modules/breedingOrder/types'


export type Props = {
  nft: NFT
  showCooldownTime: boolean
  cooldownTimePercent: number
  cooldownTimeDay: number
  breedAmountStartValue: number
  breedAmountEndValue: number
  breedPrice: string
  account: string
  authorizations: Authorization[]
  wallet: Wallet | null
  onShowBreedPriceModal: typeof showBreedPriceModal
  order: Order | null
  bids: Bid[]
  isAddingToBreedingCentre: boolean
  currentNFTBreedingOrder: BreedingOrder | null
  isCancelingBreed: boolean
  showBreedPriceModal: boolean
  onAddToBreedingCentre: typeof addToBreedigCentreRequest
  onResetMyNFT: typeof resetNFTForBreedingRequest
  onNavigate: (path: string) => void
  onCancelListing: typeof cancelBreedRequest
}

export type MapStateProps = Pick<Props,
  'wallet' |
  'authorizations' |
  'order' |
  'bids' |
  'isAddingToBreedingCentre' |
  'currentNFTBreedingOrder' |
  'isCancelingBreed' |
  'showBreedPriceModal'
>
export type MapDispatchProps = Pick<Props, 'onAddToBreedingCentre' | 'onNavigate' | 'onResetMyNFT' | 'onCancelListing' | 'onShowBreedPriceModal'>
export type MapDispatch = Dispatch<
  AddToBreedingCentreRequestAction |
  CallHistoryMethodAction |
  ResetNFTForBreedingRequestAction |
  CancelBreedRequestAction |
  ShowBreedPriceModalAction
>
export type OwnProps = Pick<Props, 'nft' | 'order'>

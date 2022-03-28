import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { NFT } from '../../../modules/nft/types'
import { BreedingOrder } from '../../../modules/breedingOrder/types'
import { VendorName } from '../../../modules/vendor/types'
import { Order } from '../../../modules/order/types'

export type Props = {
  nft: NFT<VendorName.KRYPTOMON>
  order: Order | null
  breedingOrder?: BreedingOrder
  onNavigate: (path: string) => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onNavigate'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
export type OwnProps = Pick<Props, 'nft' | 'order' | 'breedingOrder'>

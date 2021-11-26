import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'
import { Coin, Network } from '@kmon/schemas'
import {
  placeBidRequest,
  PlaceBidRequestAction
} from '../../modules/bid/actions'

export type Props = {
  authorizations: Authorization[]
  isPlacingBid: boolean
  coin: Coin
  network: Network
  onPlaceBid: typeof placeBidRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'authorizations' | 'isPlacingBid' | 'coin' | 'network'>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onPlaceBid'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | PlaceBidRequestAction
>

import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'
import { Coin } from '@kmon/schemas'
import {
  createOrderRequest,
  CreateOrderRequestAction
} from '../../modules/order/actions'

export type Props = {
  authorizations: Authorization[]
  isLoading: boolean
  isCreatingOrder: boolean
  coin: Coin
  onCreateOrder: typeof createOrderRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<
  Props,
  'authorizations' | 'isLoading' | 'isCreatingOrder' | 'coin'
>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onCreateOrder'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | CreateOrderRequestAction
>

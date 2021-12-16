import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'

import {
  buyItemRequest,
  BuyItemRequestAction,
  fetchItemRequest,
  FetchItemRequestAction,
} from '../../../modules/item/actions'
import { Item } from '../../../modules/item/types'

export type Params = {
  address?: string
  id?: string
}

export type Props = {
  address?: string
  wallet: Wallet | null
  authorizations: Authorization[]
  isConnecting: boolean
  isLoading: boolean
  isBuyingItem: boolean
  itemId?: string
  currentItem: Item | null
  onRedirect: (path: string) => void
  onFetchItem: typeof fetchItemRequest
  onBuyItem: typeof buyItemRequest
}

export type MapStateProps = Pick<
  Props,
  'address' | 'wallet' | 'authorizations' | 'isConnecting' | 'isLoading' | 'isBuyingItem' | 'itemId' | 'currentItem'
>
export type MapDispatchProps = Pick<
  Props,
  'onRedirect' | 'onFetchItem' | 'onBuyItem'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction
    | FetchItemRequestAction
    | BuyItemRequestAction
>

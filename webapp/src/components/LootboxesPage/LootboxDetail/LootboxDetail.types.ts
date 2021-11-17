import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Transaction } from '@kmon/dapps/dist/modules/transaction/types'

import { LootboxType } from '../../../modules/lootbox/types'
import {
  buyLootboxSendApproveRequest,
  BuyLootboxSendApproveRequestAction,
  fetchLootboxPricesRequest,
  FetchLootboxPricesRequestAction
} from '../../../modules/lootbox/actions'

export type Params = {
  address?: string
  boxType?: string
}

export type Props = {
  address?: string
  isConnecting: boolean
  boxPrice: string | undefined
  boxType: LootboxType
  pendingTransaction: Transaction | undefined
  onRedirect: (path: string) => void
  onFetchLootboxPrices: typeof fetchLootboxPricesRequest
  onBuyLootbox: typeof buyLootboxSendApproveRequest
}

export type MapStateProps = Pick<
  Props,
  'address' | 'isConnecting' | 'boxType' | 'boxPrice' | 'pendingTransaction'
>
export type MapDispatchProps = Pick<
  Props,
  'onRedirect' | 'onFetchLootboxPrices' | 'onBuyLootbox'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction
    | FetchLootboxPricesRequestAction
    | BuyLootboxSendApproveRequestAction
>

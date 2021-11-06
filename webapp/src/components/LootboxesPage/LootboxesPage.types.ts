import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { Transaction } from '@kmon/dapps/dist/modules/transaction/types'

import {
  fetchLootboxPricesRequest,
  FetchLootboxPricesRequestAction
} from '../../modules/lootbox/actions'

export type Params = {
  address?: string
}

export type Props = {
  address?: string
  wallet: Wallet | null
  isConnecting: boolean
  isFullscreen?: boolean
  basicPrice?: string
  mediumPrice?: string
  premiumPrice?: string
  pendingTransaction: Transaction | undefined
  onRedirect: (path: string) => void
  onFetchLootboxPrices: typeof fetchLootboxPricesRequest
}

export type MapStateProps = Pick<
  Props,
  'address' | 'wallet' | 'isConnecting' | 'isFullscreen' | 'basicPrice' | 'mediumPrice' | 'premiumPrice' | 'pendingTransaction'
>
export type MapDispatchProps = Pick<
  Props,
  'onRedirect' | 'onFetchLootboxPrices'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction
    | FetchLootboxPricesRequestAction
>

import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { Transaction } from '@kmon/dapps/dist/modules/transaction/types'
import { LoadingState } from '@kmon/dapps/dist/modules/loading/reducer'

import { VendorName } from '../../modules/vendor/types'
import {
  buyLootboxRequest,
  BuyLootboxRequestAction,
  fetchLootboxPricesRequest,
  FetchLootboxPricesRequestAction
} from '../../modules/lootbox/actions'

export type Params = {
  address?: string
}

export type Props = {
  address?: string
  vendor: VendorName
  wallet: Wallet | null
  isConnecting: boolean
  isFullscreen?: boolean,
  basicPrice?: string,
  mediumPrice?: string,
  premiumPrice?: string,
  txHash: string | null,
  txData: Transaction[],
  txLoadingData: LoadingState,
  onRedirect: (path: string) => void
  onFetchLootboxPrices: typeof fetchLootboxPricesRequest
  onBuyLootbox: typeof buyLootboxRequest
}

export type MapStateProps = Pick<
  Props,
  'address' | 'vendor' | 'wallet' | 'isConnecting' | 'isFullscreen' | 'basicPrice' | 'mediumPrice' | 'premiumPrice' | 'txHash' | 'txData' | 'txLoadingData'
>
export type MapDispatchProps = Pick<
  Props,
  'onRedirect' | 'onFetchLootboxPrices' | 'onBuyLootbox'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction
    | FetchLootboxPricesRequestAction
    | BuyLootboxRequestAction
>

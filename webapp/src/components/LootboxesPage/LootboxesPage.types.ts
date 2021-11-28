import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'

import {
  fetchLootboxPriceRequest,
  FetchLootboxPriceRequestAction
} from '../../modules/lootbox_price/actions'
import { LootboxPrices } from '../../modules/lootbox_price/types'

export type Params = {
  address?: string
}

export type Props = {
  address?: string
  wallet: Wallet | null
  isConnecting: boolean
  isFullscreen?: boolean
  lootboxPrices: LootboxPrices
  onRedirect: (path: string) => void
  onFetchLootboxPrice: typeof fetchLootboxPriceRequest
}

export type MapStateProps = Pick<
  Props,
  'address' | 'wallet' | 'isConnecting' | 'isFullscreen' | 'lootboxPrices'
>
export type MapDispatchProps = Pick<
  Props,
  'onRedirect' | 'onFetchLootboxPrice'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction
    | FetchLootboxPriceRequestAction
>

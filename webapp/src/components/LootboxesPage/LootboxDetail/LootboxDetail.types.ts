import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'

import { LootboxType } from '../../../modules/lootbox/types'
import {
  buyLootboxRequest,
  BuyLootboxRequestAction,
} from '../../../modules/lootbox/actions'
import {
  fetchLootboxPriceRequest,
  FetchLootboxPriceRequestAction
} from '../../../modules/lootbox_price/actions'
import { LootboxPrices } from '../../../modules/lootbox_price/types'

export type Params = {
  address?: string
  boxType?: string
}

export type Props = {
  address?: string
  wallet: Wallet | null
  authorizations: Authorization[]
  isConnecting: boolean
  isLoading: boolean
  isBuyingLootbox: boolean
  boxType?: LootboxType
  lootboxPrices?: LootboxPrices
  onRedirect: (path: string) => void
  onFetchLootboxPrice: typeof fetchLootboxPriceRequest
  onBuyLootbox: typeof buyLootboxRequest
}

export type MapStateProps = Pick<
  Props,
  'address' | 'wallet' | 'authorizations' | 'isConnecting' | 'isLoading' | 'isBuyingLootbox' | 'boxType' | 'lootboxPrices'
>
export type MapDispatchProps = Pick<
  Props,
  'onRedirect' | 'onFetchLootboxPrice' | 'onBuyLootbox'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction
    | FetchLootboxPriceRequestAction
    | BuyLootboxRequestAction
>

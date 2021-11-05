import { Dispatch } from 'redux'
import {
  buyLootboxRequest,
  BuyLootboxRequestAction
} from '../../../modules/lootbox/actions'

export type Props = {
  basicPrice?: string,
  mediumPrice?: string,
  premiumPrice?: string,
  isTxPending: boolean,
  txStatus: string | null
  onBuyLootbox: typeof buyLootboxRequest
}

export type MapStateProps = Pick<
  Props,
  'basicPrice' | 'mediumPrice' | 'premiumPrice' | 'isTxPending' | 'txStatus'
>
export type MapDispatchProps = Pick<Props, 'onBuyLootbox'>
export type MapDispatch = Dispatch<BuyLootboxRequestAction>

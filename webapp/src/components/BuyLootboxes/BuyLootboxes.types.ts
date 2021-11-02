import { Dispatch } from 'redux'
import { buyLootboxRequest, BuyLootboxRequestAction } from '../../modules/lootbox/actions'

export type Props = {
  basicPrice: number,
  mediumPrice: number,
  premiumPrice: number,
  onBuyLootbox: typeof buyLootboxRequest
}

export type MapStateProps = Pick<
  Props,
  'basicPrice' | 'mediumPrice' | 'premiumPrice'
>
export type MapDispatchProps = Pick<Props, 'onBuyLootbox'>
export type MapDispatch = Dispatch<BuyLootboxRequestAction>

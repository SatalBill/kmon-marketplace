import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { RouteComponentProps } from 'react-router'
import { Address } from 'web3x-es/address'

import { RootState } from '../../../modules/reducer'
import {
  getPendingTransaction,
  getPrice
} from '../../../modules/lootbox/selectors'
import { isConnecting } from '../../../modules/wallet/selectors'
import {
  Params,
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './LootboxDetail.types'
import LootboxDetail from './LootboxDetail'
import { LootboxType } from '../../../modules/lootbox/types'
import {
  buyLootboxSendApproveRequest,
  fetchLootboxPricesRequest
} from '../../../modules/lootbox/actions'

const mapState = (
  state: RootState,
  ownProps: RouteComponentProps<Params>
): MapStateProps => {
  const { address, boxType } = ownProps.match.params

  return ({
    address: address?.toLowerCase(),
    isConnecting: isConnecting(state),
    boxType: Number(boxType),
    boxPrice: getPrice(state, Number(boxType)),
    pendingTransaction: getPendingTransaction(state)
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onRedirect: path => dispatch(replace(path)),
  onFetchLootboxPrices: boxType => dispatch(fetchLootboxPricesRequest(boxType)),
  onBuyLootbox: (boxType: LootboxType, boxPrice: string, to: Address) =>
    dispatch(buyLootboxSendApproveRequest(boxType, boxPrice, to))
})

export default connect(mapState, mapDispatch)(LootboxDetail)

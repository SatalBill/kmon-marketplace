import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { RouteComponentProps } from 'react-router'
import {
  getData as getTransactionData,
  getLoading as getTransactionLoading
} from '@kmon/dapps/dist/modules/transaction/selectors'

import { RootState } from '../../modules/reducer'
import { getIsFullscreen, getVendor } from '../../modules/routing/selectors'
import { getWallet, isConnecting } from '../../modules/wallet/selectors'
import {
  getBasicPrice,
  getMediumPrice,
  getPremiumPrice,
  getTxHash
} from '../../modules/lootbox/selectors'
import {
  Params,
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './LootboxesPage.types'
import LootboxesPage from './LootboxesPage'
import { buyLootboxRequest, fetchLootboxPricesRequest } from '../../modules/lootbox/actions'

const mapState = (
  state: RootState,
  ownProps: RouteComponentProps<Params>
): MapStateProps => {
  const { address } = ownProps.match.params

  return ({
    address: address?.toLowerCase(),
    vendor: getVendor(state),
    wallet: getWallet(state),
    isConnecting: isConnecting(state),
    isFullscreen: getIsFullscreen(state),
    basicPrice: getBasicPrice(state),
    mediumPrice: getMediumPrice(state),
    premiumPrice: getPremiumPrice(state),
    txHash: getTxHash(state),
    txData: getTransactionData(state),
    txLoadingData: getTransactionLoading(state)
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onRedirect: path => dispatch(replace(path)),
  onFetchLootboxPrices: boxType => dispatch(fetchLootboxPricesRequest(boxType)),
  onBuyLootbox: params => dispatch(buyLootboxRequest(params))
})

export default connect(mapState, mapDispatch)(LootboxesPage)

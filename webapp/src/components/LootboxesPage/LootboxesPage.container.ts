import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { RouteComponentProps } from 'react-router'
import { Address } from 'web3x-es/address'

import { RootState } from '../../modules/reducer'
import { getIsFullscreen } from '../../modules/routing/selectors'
import {
  getWallet,
  isConnecting
} from '../../modules/wallet/selectors'
import {
  getBasicPrice,
  getMediumPrice,
  getPendingTransaction,
  getPremiumPrice
} from '../../modules/lootbox/selectors'
import {
  Params,
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './LootboxesPage.types'
import LootboxesPage from './LootboxesPage'
import { fetchLootboxPricesRequest } from '../../modules/lootbox/actions'

const mapState = (
  state: RootState,
  ownProps: RouteComponentProps<Params>
): MapStateProps => {
  const { address } = ownProps.match.params

  return ({
    address: address?.toLowerCase(),
    wallet: getWallet(state),
    isConnecting: isConnecting(state),
    isFullscreen: getIsFullscreen(state),
    basicPrice: getBasicPrice(state),
    mediumPrice: getMediumPrice(state),
    premiumPrice: getPremiumPrice(state),
    pendingTransaction: getPendingTransaction(state)
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onRedirect: path => dispatch(replace(path)),
  onFetchLootboxPrices: boxType => dispatch(fetchLootboxPricesRequest(boxType))
})

export default connect(mapState, mapDispatch)(LootboxesPage)

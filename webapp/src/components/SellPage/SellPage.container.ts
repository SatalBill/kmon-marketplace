import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { FETCH_AUTHORIZATIONS_REQUEST } from '@kmon/dapps/dist/modules/authorization/actions'
import {
  getData as getAuthorizations,
  getLoading as getLoadingAuthorizations
} from '@kmon/dapps/dist/modules/authorization/selectors'
import { Coin, Network } from '@kmon/schemas'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'
import { isConnected, getNetworks } from '../../modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { createOrderRequest, CREATE_ORDER_REQUEST } from '../../modules/order/actions'
import { getLoading as getLoadingOrders } from '../../modules/order/selectors'
import { MapStateProps, MapDispatchProps, MapDispatch } from './SellPage.types'
import SellPage from './SellPage'

const mapState = (state: RootState): MapStateProps => {
  let coin = Coin.KMON
  const isSignedIn = isConnected(state)
  const networks = getNetworks(state)
  if (isSignedIn) {
    const networkList = Object.values(Network) as Network[]
    for (const network of networkList) {
      const networkData = networks![network]
      if (networkData) {
        coin = networks![network].coin
      }
    }
  }

  return {
    authorizations: getAuthorizations(state),
    isLoading: isLoadingType(getLoadingAuthorizations(state), FETCH_AUTHORIZATIONS_REQUEST),
    isCreatingOrder: isLoadingType(getLoadingOrders(state), CREATE_ORDER_REQUEST),
    coin
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path)),
  onCreateOrder: (nft, price, coinAddress, expiresAt) =>
    dispatch(createOrderRequest(nft, price, coinAddress, expiresAt))
})

export default connect(mapState, mapDispatch)(SellPage)

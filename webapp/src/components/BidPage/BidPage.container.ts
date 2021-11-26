import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../../modules/reducer'
import { getData as getAuthorizations } from '@kmon/dapps/dist/modules/authorization/selectors'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'
import { Coin, Network } from '@kmon/schemas'
import { placeBidRequest, PLACE_BID_REQUEST } from '../../modules/bid/actions'
import { getLoading } from '../../modules/bid/selectors'
import { getNetworks, isConnected } from '../../modules/wallet/selectors'
import { MapStateProps, MapDispatchProps, MapDispatch } from './BidPage.types'
import BidPage from './BidPage'

const mapState = (state: RootState): MapStateProps => {
  let coin = Coin.KMON
  let network = Network.BSC
  const isSignedIn = isConnected(state)
  const networks = getNetworks(state)
  if (isSignedIn) {
    const networkList = Object.values(Network) as Network[]
    for (const net of networkList) {
      const networkData = networks![net]
      network = net
      if (networkData) {
        coin = networks![network].coin
      }
    }
  }

  return {
    authorizations: getAuthorizations(state),
    isPlacingBid: isLoadingType(getLoading(state), PLACE_BID_REQUEST),
    coin,
    network
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path)),
  onPlaceBid: (nft, price, expiresAt, fingerprint) =>
    dispatch(placeBidRequest(nft, price, expiresAt, fingerprint))
})

export default connect(mapState, mapDispatch)(BidPage)

import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { RouteComponentProps } from 'react-router'

import { RootState } from '../../modules/reducer'
import { getIsFullscreen } from '../../modules/routing/selectors'
import {
  getWallet,
  isConnecting
} from '../../modules/wallet/selectors'
import { getData as getLootboxPrices } from '../../modules/lootbox_price/selectors'
import {
  Params,
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './LootboxesPage.types'
import LootboxesPage from './LootboxesPage'
import { fetchLootboxPriceRequest } from '../../modules/lootbox_price/actions'

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
    lootboxPrices: getLootboxPrices(state),
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onRedirect: path => dispatch(replace(path)),
  onFetchLootboxPrice: boxType => dispatch(fetchLootboxPriceRequest(boxType))
})

export default connect(mapState, mapDispatch)(LootboxesPage)

import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { RouteComponentProps } from 'react-router'
import { Address } from 'web3x-es/address'
import {
  getData as getAuthorizations,
  getLoading as getLoadingAuthorizations
} from '@kmon/dapps/dist/modules/authorization/selectors'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'
import { FETCH_AUTHORIZATIONS_REQUEST } from '@kmon/dapps/dist/modules/authorization/actions'

import { RootState } from '../../../modules/reducer'
import {
  getWallet,
  isConnecting
} from '../../../modules/wallet/selectors'
import {
  Params,
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './LootboxDetail.types'
import LootboxDetail from './LootboxDetail'
import { LootboxType } from '../../../modules/lootbox/types'
import { buyLootboxRequest } from '../../../modules/lootbox/actions'
import { fetchLootboxPriceRequest } from '../../../modules/lootbox_price/actions'
import { BUY_LOOTBOX_REQUEST } from '../../../modules/lootbox/actions'
import { getLoading as getLoadingLootbox } from '../../../modules/lootbox/selectors'
import { getData as getLootboxPrices } from '../../../modules/lootbox_price/selectors'

const mapState = (
  state: RootState,
  ownProps: RouteComponentProps<Params>
): MapStateProps => {
  const { address, boxType } = ownProps.match.params

  return ({
    address: address?.toLowerCase(),
    wallet: getWallet(state),
    authorizations: getAuthorizations(state),
    isConnecting: isConnecting(state),
    isLoading: isLoadingType(getLoadingAuthorizations(state), FETCH_AUTHORIZATIONS_REQUEST),
    isBuyingLootbox: isLoadingType(getLoadingLootbox(state), BUY_LOOTBOX_REQUEST),
    boxType: boxType === undefined ? undefined : Number(boxType),
    lootboxPrices: getLootboxPrices(state)
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onRedirect: path => dispatch(replace(path)),
  onFetchLootboxPrice: boxType => dispatch(fetchLootboxPriceRequest(boxType)),
  onBuyLootbox: (boxType: LootboxType, boxPrice: string, to: Address) =>
    dispatch(buyLootboxRequest(boxType, boxPrice, to))
})

export default connect(mapState, mapDispatch)(LootboxDetail)

import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { RouteComponentProps } from 'react-router'

import { RootState } from '../../../modules/reducer'
import { getPrice } from '../../../modules/lootbox/selectors'
import { isConnecting } from '../../../modules/wallet/selectors'
import {
  Params,
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './LootboxDetail.types'
import LootboxDetail from './LootboxDetail'

const mapState = (
  state: RootState,
  ownProps: RouteComponentProps<Params>
): MapStateProps => {
  const { address, boxType } = ownProps.match.params

  return ({
    address: address?.toLowerCase(),
    isConnecting: isConnecting(state),
    boxType: Number(boxType),
    boxPrice: getPrice(state, Number(boxType))
  })
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onRedirect: path => dispatch(replace(path)),
})

export default connect(mapState, mapDispatch)(LootboxDetail)

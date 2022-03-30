import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../../../modules/reducer'
import { getBreedingData } from '../../../modules/order/selectors'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch,
  OwnProps
} from './KryptomonDetail.types'
import KryptomonDetail from './KryptomonDetail'

const mapState = (_state: RootState, ownProps: OwnProps): MapStateProps => {
  let { nft } = ownProps
  const att: any = nft.activeBreedingOrderId
  const breedingOrders = getBreedingData(_state)
  const breedingOrder = breedingOrders[att]
  if (nft.activeBreedingOrderId) {
    return {
      breedingOrder
    }
  }
  else {
    return {

    }
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path))
})

export default connect(mapState, mapDispatch)(KryptomonDetail)

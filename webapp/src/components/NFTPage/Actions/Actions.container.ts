import { connect } from 'react-redux'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'
import {
  getData as getAuthorizations
} from '@kmon/dapps/dist/modules/authorization/selectors'

import { RootState } from '../../../modules/reducer'
import { getWallet } from '../../../modules/wallet/selectors'
import { getCurrentOrder } from '../../../modules/order/selectors'
import { getNFTBids } from '../../../modules/ui/nft/bid/selectors'
import { MapStateProps, MapDispatch, MapDispatchProps } from './Actions.types'
import Actions from './Actions'
import {
  addToBreedigCentreRequest,
  ADD_TO_BREEDING_CENTRE_REQUEST
} from '../../../modules/breedingOrder/actions'
import { getLoading } from '../../../modules/breed/selectors'
import { replace } from 'connected-react-router'

const mapState = (state: RootState): MapStateProps => ({
  wallet: getWallet(state),
  authorizations: getAuthorizations(state),
  order: getCurrentOrder(state),
  bids: getNFTBids(state),
  isAddingToBreedingCentre: isLoadingType(getLoading(state), ADD_TO_BREEDING_CENTRE_REQUEST)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onAddToBreedingCentre: (contractAddress: string, tokenId: string, price: string) =>
    dispatch(addToBreedigCentreRequest(contractAddress, tokenId, price)),
  onNavigate: (path) => dispatch(replace(path))
})

export default connect(mapState, mapDispatch)(Actions)

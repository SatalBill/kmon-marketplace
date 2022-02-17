import { connect } from 'react-redux'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'

import { RootState } from '../../../modules/reducer'
import { getWallet } from '../../../modules/wallet/selectors'
import { getCurrentOrder } from '../../../modules/order/selectors'
import { getNFTBids } from '../../../modules/ui/nft/bid/selectors'
import { MapStateProps, MapDispatch, MapDispatchProps } from './Actions.types'
import Actions from './Actions'
import {
  addToBreedigCentreRequest,
  ADD_TO_BREEDING_CENTRE_REQUEST
} from '../../../modules/breed/actions'
import { getLoading } from '../../../modules/breed/selectors'

const mapState = (state: RootState): MapStateProps => ({
  wallet: getWallet(state),
  order: getCurrentOrder(state),
  bids: getNFTBids(state),
  isAddingToBreedingCentre: isLoadingType(getLoading(state), ADD_TO_BREEDING_CENTRE_REQUEST)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onAddToBreedingCentre: (contractAddress: string, tokenId: string, price: string) =>
    dispatch(addToBreedigCentreRequest(contractAddress, tokenId, price))
})

export default connect(mapState, mapDispatch)(Actions)

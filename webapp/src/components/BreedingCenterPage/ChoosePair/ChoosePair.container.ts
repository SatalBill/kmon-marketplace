import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './ChoosePair.types'
import ChoosePair from './ChoosePair'
import { push } from 'connected-react-router'
import { resetNFTForBreedingRequest, resetSelectedNFTForBreedingRequest } from '../../../modules/breed/actions'

const mapState = (): MapStateProps => {}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: (path: string) => dispatch(push(path)),
  onResetMyNFT: () => dispatch(resetNFTForBreedingRequest()),
  onResetSelectedNFT: () => dispatch(resetSelectedNFTForBreedingRequest())
})

export default connect(mapState, mapDispatch)(ChoosePair)

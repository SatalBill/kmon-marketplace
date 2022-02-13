import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './ChoosePair.types'
import ChoosePair from './ChoosePair'
import { push } from 'connected-react-router'
import { resetNFTForBreedingRequest, resetSelectedNFTForBreedingRequest } from '../../../modules/breed/actions'
import { RootState } from '../../../modules/reducer'
import { getMyNFT, getSelectedNFT } from '../../../modules/breed/selectors'

const mapState = (state: RootState): MapStateProps => {
  const myNFT = getMyNFT(state)
  const selectedNFT = getSelectedNFT(state)

  return {
    myNFT,
    selectedNFT
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: (path: string) => dispatch(push(path)),
  onResetMyNFT: () => dispatch(resetNFTForBreedingRequest()),
  onResetSelectedNFT: () => dispatch(resetSelectedNFTForBreedingRequest())
})

export default connect(mapState, mapDispatch)(ChoosePair)

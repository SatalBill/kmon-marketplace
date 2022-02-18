import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps, MapDispatch } from './BreedingModal.types'
import BreedingModal from './BreedingModal'
import { simulateBreedingRequest } from '../../../modules/breed/actions'
import { getSimulatedGenes } from '../../../modules/breed/selectors'
import { RootState } from '../../../modules/reducer'

const mapState = (state: RootState): MapStateProps => {
  const simulatedGenes = getSimulatedGenes(state)

  return {
    simulatedGenes
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSimulateBreeding: (femaleTokenId: string, maleTokenId: string) =>
    dispatch(simulateBreedingRequest(femaleTokenId, maleTokenId))
})

export default connect(mapState, mapDispatch)(BreedingModal)

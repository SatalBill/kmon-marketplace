import { connect } from 'react-redux'
import { isLoadingType } from '@kmon/dapps/dist/modules/loading/selectors'

import { MapStateProps, MapDispatchProps, MapDispatch } from './BreedingModal.types'
import BreedingModal from './BreedingModal'
import {
  breedRequest,
  BREED_REQUEST,
  simulateBreedingRequest
} from '../../../modules/breed/actions'
import { getSimulatedGenes, getLoading } from '../../../modules/breed/selectors'
import { RootState } from '../../../modules/reducer'

const mapState = (state: RootState): MapStateProps => {
  const simulatedGenes = getSimulatedGenes(state)
  const isBreeding = isLoadingType(getLoading(state), BREED_REQUEST)

  return {
    simulatedGenes,
    isBreeding
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSimulateBreeding: (femaleTokenId: string, maleTokenId: string) =>
    dispatch(simulateBreedingRequest(femaleTokenId, maleTokenId)),
  onBreed: (femaleTokenId: string, maleTokenId: string) =>
    dispatch(breedRequest(femaleTokenId, maleTokenId))
})

export default connect(mapState, mapDispatch)(BreedingModal)

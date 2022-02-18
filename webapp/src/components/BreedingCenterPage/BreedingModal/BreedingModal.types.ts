import { Dispatch } from 'redux'
import {
  breedRequest,
  BreedRequestAction,
  simulateBreedingRequest,
  SimulateBreedingRequestAction
} from '../../../modules/breed/actions'
import { GenesV2 } from '../../../modules/breed/types'
import { NFT } from '../../../modules/nft/types'

export type Props = {
  myNFT: NFT,
  selectedNFT: NFT
  open: boolean
  simulatedGenes: GenesV2 | null
  isBreeding: boolean
  onClose: () => void
  onSimulateBreeding: typeof simulateBreedingRequest
  onBreed: typeof breedRequest
}

export type MapStateProps = Pick<Props, 'simulatedGenes' | 'isBreeding'>
export type MapDispatchProps = Pick<Props, 'onSimulateBreeding' | 'onBreed'>
export type MapDispatch = Dispatch<
  SimulateBreedingRequestAction |
  BreedRequestAction
>

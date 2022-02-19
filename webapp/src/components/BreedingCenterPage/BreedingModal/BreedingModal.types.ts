import { Dispatch } from 'redux'
import {
  breedRequest,
  BreedRequestAction,
  simulateBreedingRequest,
  SimulateBreedingRequestAction
} from '../../../modules/breed/actions'
import { GenesV2 } from '../../../modules/breed/types'
import { BreedingOrder } from '../../../modules/breedingOrder/types'
import { NFT } from '../../../modules/nft/types'

export type Props = {
  myNFT: NFT | null,
  selectedNFT: NFT | null,
  myBreedingOrder: BreedingOrder | null,
  selectedBreedingOrder: BreedingOrder | null,
  open: boolean
  simulatedGenes: GenesV2 | null
  isBreeding: boolean
  mutationFactor: number | null
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

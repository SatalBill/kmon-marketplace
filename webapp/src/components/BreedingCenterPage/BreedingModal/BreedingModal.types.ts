import { Dispatch } from 'redux'
import {
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
  onClose: () => void
  onSimulateBreeding: typeof simulateBreedingRequest
}

export type MapStateProps = Pick<Props, 'simulatedGenes'>
export type MapDispatchProps = Pick<Props, 'onSimulateBreeding'>
export type MapDispatch = Dispatch<SimulateBreedingRequestAction>

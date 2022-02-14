import { CallHistoryMethodAction } from 'connected-react-router'
import { Dispatch } from 'redux'
import {
  resetNFTForBreedingRequest,
  ResetNFTForBreedingRequestAction,
  resetSelectedNFTForBreedingRequest,
  ResetSelectedNFTForBreedingRequestAction
} from '../../../modules/breed/actions'
import { NFT } from '../../../modules/nft/types'

export type Props = {
  myNFT: NFT | null,
  selectedNFT: NFT | null,
  onNavigate: (path: string) => void
  onResetMyNFT: typeof resetNFTForBreedingRequest
  onResetSelectedNFT: typeof resetSelectedNFTForBreedingRequest
  onCompare: () => void
}

export type MapStateProps = void
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onResetMyNFT' | 'onResetSelectedNFT'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | 
  ResetNFTForBreedingRequestAction |
  ResetSelectedNFTForBreedingRequestAction
>

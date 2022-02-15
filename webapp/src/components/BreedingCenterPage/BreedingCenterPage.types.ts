import { Dispatch } from "redux"
import {
  fetchNFTForBreedingRequest,
  FetchNFTForBreedingRequestAction,
  fetchSelectedNFTForBreedingRequest,
  FetchSelectedNFTForBreedingRequestAction,
  selectNFTForBreedingRequest,
  SelectNFTForBreedingRequestAction
} from "../../modules/breed/actions"
import { NFT } from '../../modules/nft/types'

export type Props = {
  contractAddress: string | null
  tokenId: string | null
  myNFT: NFT | null
  selectedNFT: NFT | null
  onFetchNFTForBreeding: typeof fetchNFTForBreedingRequest
  onSelectNFTForBreeding: typeof selectNFTForBreedingRequest
  onFetchSelectedNFTForBreedig: typeof fetchSelectedNFTForBreedingRequest
}

export type MapStateProps = Pick<Props, 'contractAddress' | 'tokenId' | 'myNFT' | 'selectedNFT'>
export type MapDispatchProps = Pick<Props,
  'onFetchNFTForBreeding' |
  'onSelectNFTForBreeding' |
  'onFetchSelectedNFTForBreedig'
>
export type MapDispatch = Dispatch<
  FetchNFTForBreedingRequestAction |
  SelectNFTForBreedingRequestAction |
  FetchSelectedNFTForBreedingRequestAction
>
export type OwnProps = Partial<Pick<Props, 'contractAddress' | 'tokenId'>>

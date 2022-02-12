import { Dispatch } from "redux"
import {
  fetchNFTForBreedingRequest,
  FetchNFTForBreedingRequestAction,
  selectNFTForBreedingRequest,
  SelectNFTForBreedingRequestAction
} from "../../modules/breed/actions"
import { NFT } from "../../modules/nft/types"

export type Props = {
  contractAddress: string | null
  tokenId: string | null
  myNFT: NFT | null,
  selectedNFT: NFT | null,
  onFetchNFTForBreeding: typeof fetchNFTForBreedingRequest
  onSelectNFTForBreeding: typeof selectNFTForBreedingRequest
}

export type MapStateProps = Pick<Props, 'contractAddress' | 'tokenId' | 'myNFT' | 'selectedNFT'>
export type MapDispatchProps = Pick<Props, 'onFetchNFTForBreeding' | 'onSelectNFTForBreeding'>
export type MapDispatch = Dispatch<FetchNFTForBreedingRequestAction | SelectNFTForBreedingRequestAction>
export type OwnProps = Partial<Pick<Props, 'contractAddress' | 'tokenId'>>

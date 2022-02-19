import { Dispatch } from "redux"
import {
  selectNFTForBreedingRequest,
  SelectNFTForBreedingRequestAction
} from "../../modules/breed/actions"
import { BreedingOrder } from "../../modules/breedingOrder/types"
import { fetchNFTRequest, FetchNFTRequestAction } from "../../modules/nft/actions"
import { NFT } from '../../modules/nft/types'

export type Props = {
  contractAddress: string | null
  tokenId: string | null
  myNFT: NFT | null
  selectedNFT: NFT | null
  myBreedingOrder: BreedingOrder | null
  selectedBreedingOrder: BreedingOrder | null
  onFetchRequest: typeof fetchNFTRequest
  onSelectNFTForBreeding: typeof selectNFTForBreedingRequest
}

export type MapStateProps = Pick<Props,
  'contractAddress' | 'tokenId' | 'myNFT' | 'selectedNFT' | 'myBreedingOrder' | 'selectedBreedingOrder'
>
export type MapDispatchProps = Pick<Props,
  'onFetchRequest' |
  'onSelectNFTForBreeding'
>
export type MapDispatch = Dispatch<
  FetchNFTRequestAction |
  SelectNFTForBreedingRequestAction
>
export type OwnProps = Partial<Pick<Props, 'contractAddress' | 'tokenId'>>

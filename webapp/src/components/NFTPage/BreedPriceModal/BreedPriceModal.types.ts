import { NFT } from "../../../modules/nft/types";

export type Props = {
  show: boolean
  nft: NFT
  isLoading: boolean
  onSubmitBreedPrice: (price: string) => void
  onCancel: () => void
}

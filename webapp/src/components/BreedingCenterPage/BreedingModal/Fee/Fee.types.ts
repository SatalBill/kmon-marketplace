import { NFT } from '../../../../modules/nft/types'

export type Props = {
  myNFT: NFT,
  selectedNFT: NFT
  onBreed: () => void
  onCancel: () => void
}
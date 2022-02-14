import { NFT } from '../../../modules/nft/types'

export type Props = {
  myNFT: NFT,
  selectedNFT: NFT
  open: boolean
  onClose: () => void
}

export type MapStateProps = void
export type MapDispatchProps = void

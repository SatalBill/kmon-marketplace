import { BreedingOrder } from '../../../../modules/breedingOrder/types'
import { NFT } from '../../../../modules/nft/types'

export type Props = {
  nft: NFT,
  breedingOrder: BreedingOrder,
  view?: string
}
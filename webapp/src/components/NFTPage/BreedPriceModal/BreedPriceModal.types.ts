import { Authorization } from "@kmon/dapps/dist/modules/authorization/types";
import { Wallet } from "@kmon/dapps/dist/modules/wallet/types";
import { NFT } from "../../../modules/nft/types";

export type Props = {
  wallet: Wallet | null
  authorizations: Authorization[]
  show: boolean
  nft: NFT
  isOwner: boolean
  isLoading: boolean
  onSubmitBreedPrice: (price: string) => void
  onCancel: () => void
}

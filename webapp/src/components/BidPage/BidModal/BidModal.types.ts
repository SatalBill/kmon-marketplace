import { Authorization } from '@kmon/dapps/dist/modules/authorization/types'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { Coin, Network } from '@kmon/schemas'
import { NFT } from '../../../modules/nft/types'
import { placeBidRequest } from '../../../modules/bid/actions'

export type Props = {
  nft: NFT
  wallet: Wallet | null
  authorizations: Authorization[]
  coin: Coin
  network: Network
  onNavigate: (path: string) => void
  onPlaceBid: typeof placeBidRequest
  isPlacingBid: boolean
}

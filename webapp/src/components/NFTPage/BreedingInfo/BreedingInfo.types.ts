import { Order } from '../../../modules/order/types'
import { NFT } from '../../../modules/nft/types'

export type Props = {
  nft: NFT
  cooldownTimePercent: number
  cooldownTimeDay: number
  breedAmountStartValue: number
  breedAmountEndValue: number
  breedPrice: string
  account: string
  order?: Order
}

export type MapStateProps = Pick<Props, 'order'>
export type MapDispatchProps = {}
export type OwnProps = Pick<Props, 'nft' | 'order'>

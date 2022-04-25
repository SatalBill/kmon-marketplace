import { NFT } from '../../../../modules/nft/types'

export type Props = {
  nfts: NFT[]
  name?: string
  placeholder?: string
  value: string
  onChange: (newValue: string) => void,
  onFocus?: () => void
}

export type MapStateProps = Pick<
  Props,
  'nfts'
>

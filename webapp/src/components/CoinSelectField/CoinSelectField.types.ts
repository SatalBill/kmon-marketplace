import { Coin, Network } from '@kmon/schemas'
import { FieldProps } from '@kmon/ui'

export type Props = FieldProps & {
  network: Network,
  coin: Coin,
  onChangeCoin: (v?: string) => void
}

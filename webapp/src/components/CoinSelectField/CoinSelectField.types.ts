import { Coin, Network } from '@kmon/schemas'
import { FieldProps } from '@kmon/ui'

export type Props = FieldProps & {
  coin: Coin,
  onChangeCoin: (v: Coin) => void
}

import { LootboxType } from '../../../modules/lootbox/types'

export type Props = {
  boxType: LootboxType
  image: string
  price: string | undefined
}

import { LootboxType } from '../lootbox/types'

export type LootboxPrices = {
  [x in LootboxType]: string | undefined
}

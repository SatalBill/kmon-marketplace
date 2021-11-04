import { Address } from 'web3x-es/address'

export enum LootboxType {
  Basic,
  Medium,
  Premium
}

export type BuyLootboxParams = {
  to: Address
  boxType: LootboxType
  boxPrice: string
}

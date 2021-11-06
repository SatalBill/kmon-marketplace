import { Address } from 'web3x-es/address'

export enum LootboxType {
  Basic,
  Medium,
  Premium
}

export type LootboxPrices = {
  [x in LootboxType]: string | undefined
}

export enum TransactionType {
  Approve = 'approve',
  Transfer = 'transfer'
}

import { Address } from 'web3x-es/address'
import { getContract, ContractName as CN } from '@kmon/transactions'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { getConnectedProviderChainId } from '@kmon/dapps/dist/lib/eth'
import { LootboxType } from './types'
import { ContractFactory } from '../contract/ContractFactory'
import { Lootbox } from '../../contracts/Lootbox'
import { sendTransaction } from '../wallet/utils'

export async function buyLootbox(wallet: Wallet | null, to: Address, boxType: LootboxType) {
  const lootboxData = getContract(CN.Lootbox, Number(getConnectedProviderChainId()))
  const lootbox = await ContractFactory.build(Lootbox, lootboxData.address)

  if (!wallet) {
    throw new Error('Invalid address. Wallet must be connected.')
  }

  const from = Address.fromString(wallet.address)

  const buyLootbox = lootbox.methods.buyLootbox(to, boxType)
  return sendTransaction(buyLootbox, lootboxData, from)
}

export function toStringLootboxType(boxType: LootboxType | undefined): string {
  let boxTypeStr: string = ''
  switch (boxType) {
    case LootboxType.Basic:
      boxTypeStr = 'basic'
      break
    case LootboxType.Medium:
      boxTypeStr = 'medium'
      break
    case LootboxType.Premium:
      boxTypeStr = 'premium'
      break
    default:
      boxTypeStr = ''
      break
  }
  return boxTypeStr
}

import { getContract, ContractName as CN } from '@kmon/transactions'
import { getConnectedProviderChainId } from '@kmon/dapps/dist/lib/eth'
import { LootboxType } from '../lootbox/types'
import { ContractFactory } from '../contract/ContractFactory'
import { Lootbox } from '../../contracts/Lootbox'

export async function getLootboxPrice(boxType: LootboxType) {
  const lootboxData = getContract(CN.Lootbox, Number(getConnectedProviderChainId()))
  const lootbox = await ContractFactory.build(Lootbox, lootboxData.address)
  return lootbox.methods.lootboxPrices(boxType).call()
}
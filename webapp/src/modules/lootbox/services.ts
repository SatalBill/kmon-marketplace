import { Address } from 'web3x-es/address'
import { getContract, ContractName as CN } from '@kmon/transactions'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { getConnectedProviderChainId } from '@kmon/dapps/dist/lib/eth'
import { LootboxType } from './types'
import { ContractFactory } from '../contract/ContractFactory'
import { Lootbox } from '../../contracts/Lootbox'
import { sendTransaction } from '../wallet/utils'
import { TestERC20 } from '../../contracts/TestERC20'

export interface LootboxServiceInterface {
  getLootboxPrices(boxType: LootboxType): Promise<string>
  buyLootboxApprove(wallet: Wallet | null, boxPrice: string): Promise<string>
  buyLootboxTransfer(wallet: Wallet | null, to: Address, boxType: LootboxType): Promise<string>
}

export class LootboxServices
implements LootboxServiceInterface {

  async getLootboxPrices(boxType: LootboxType) {
    const lootboxData = getContract(CN.Lootbox, Number(getConnectedProviderChainId()))
    const lootbox = await ContractFactory.build(Lootbox, lootboxData.address)
    return lootbox.methods.lootboxPrices(boxType).call()
  }

  async buyLootboxApprove(wallet: Wallet | null, boxPrice: string) {
    const lootboxData = getContract(CN.Lootbox, Number(getConnectedProviderChainId()))
    const testERC20Data = getContract(CN.TestERC20, Number(getConnectedProviderChainId()))
    const testERC20 = await ContractFactory.build(TestERC20, testERC20Data.address)

    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }

    const from = Address.fromString(wallet.address)

    const approve = testERC20.methods.approve(Address.fromString(lootboxData.address), boxPrice.toString())
    return sendTransaction(approve, testERC20Data, from)
  }

  async buyLootboxTransfer(wallet: Wallet | null, to: Address, boxType: LootboxType) {
    const lootboxData = getContract(CN.Lootbox, Number(getConnectedProviderChainId()))
    const lootbox = await ContractFactory.build(Lootbox, lootboxData.address)

    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }

    const from = Address.fromString(wallet.address)

    const buyLootbox = lootbox.methods.buyLootbox(to, boxType)
    return sendTransaction(buyLootbox, lootboxData, from)
  }
}

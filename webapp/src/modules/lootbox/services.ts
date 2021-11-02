import { Address } from 'web3x-es/address'
import { getContract, ContractName as CN } from '@kmon/transactions'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { getConnectedProviderChainId } from '@kmon/dapps/dist/lib/eth'
import { toBN } from 'web3x-es/utils'
import { BuyLootboxParams, LootboxType } from './types'
import { ContractFactory } from '../contract/ContractFactory'
import { Lootbox } from '../../contracts/Lootbox'
import { sendTransaction } from '../wallet/utils'
import { KmonToken } from '../../contracts/KmonToken'

export interface LootboxServiceInterface {
  buyLootbox(wallet: Wallet | null, params: BuyLootboxParams): Promise<string>
}

export class LootboxServices
implements LootboxServiceInterface {

  static getInstance(): LootboxServices {
    return new LootboxServices()
  }

  async getLootboxPrices(boxType: LootboxType) {
    const lootboxData = getContract(CN.Lootbox, Number(getConnectedProviderChainId()))
    const lootbox = await ContractFactory.build(Lootbox, lootboxData.address)
    return lootbox.methods.lootboxPrices(boxType).call()
  }

  async buyLootbox(wallet: Wallet | null, params: BuyLootboxParams) {
    const lootboxData = getContract(CN.Lootbox, Number(getConnectedProviderChainId()))
    const lootbox = await ContractFactory.build(Lootbox, lootboxData.address)
    const kmonTokenData = getContract(CN.KmonToken, Number(getConnectedProviderChainId()))
    const kmonToken = await ContractFactory.build(KmonToken, kmonTokenData.address)

    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }

    const from = Address.fromString(wallet.address)
    const { to, boxType, boxPrice } = params

    const approve = kmonToken.methods.approve(Address.fromString(lootboxData.address), toBN(boxPrice))
    await sendTransaction(approve, kmonTokenData, from)
    
    const buyLootbox = lootbox.methods.buyLootbox(to, boxType)
    return sendTransaction(buyLootbox, lootboxData, from)
  }
}

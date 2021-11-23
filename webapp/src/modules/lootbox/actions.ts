import { action } from 'typesafe-actions'
import { ChainId } from '@kmon/schemas'
import { buildTransactionPayload } from '@kmon/dapps/dist/modules/transaction/utils'

import { LootboxType, TransactionType } from './types'
import { Address } from 'web3x-es/address'

export const BUY_LOOTBOX_REQUEST = '[Request] Buy Lootbox'
export const BUY_LOOTBOX_SUCCESS = '[Success] Buy Lootbox'
export const BUY_LOOTBOX_FAILURE = '[Failure] Buy Lootbox'

export const buyLootboxRequest = (boxType: LootboxType, boxPrice: string, to: Address) =>
  action(BUY_LOOTBOX_REQUEST, { boxType, boxPrice, to })
export const buyLootboxSuccess = (
  chainId: ChainId,
  txHash: string,
  boxType: LootboxType,
  boxPrice: string,
  to: Address,
  txType: TransactionType
) => action(BUY_LOOTBOX_SUCCESS, {
  ...buildTransactionPayload(chainId, txHash, {
    chainId,
    txHash,
    boxType,
    boxPrice,
    to,
    txType
  })
})
export const buyLootboxFailure = (
  boxType: LootboxType,
  error: string
) => action(BUY_LOOTBOX_FAILURE, {
  boxType,
  error
})

export type BuyLootboxRequestAction = ReturnType<typeof buyLootboxRequest>
export type BuyLootboxSuccessAction = ReturnType<typeof buyLootboxSuccess>
export type BuyLootboxFailureAction = ReturnType<typeof buyLootboxFailure>

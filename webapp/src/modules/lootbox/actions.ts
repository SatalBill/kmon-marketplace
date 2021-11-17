import { action } from 'typesafe-actions'
import { ChainId } from '@kmon/schemas'
import { buildTransactionPayload } from '@kmon/dapps/dist/modules/transaction/utils'

import { LootboxType, TransactionType } from './types'
import { Address } from 'web3x-es/address'

export const FETCH_LOOTBOX_PRICES_REQUEST = '[Request] Get Lootbox Prices'
export const FETCH_LOOTBOX_PRICES_SUCCESS = '[Success] Get Lootbox Prices'
export const FETCH_LOOTBOX_PRICES_FAILURE = '[Failure] Get Lootbox Prices'

export const fetchLootboxPricesRequest = (boxType: LootboxType) =>
  action(FETCH_LOOTBOX_PRICES_REQUEST, { boxType })
export const fetchLootboxPricesSuccess = (boxType: LootboxType, price: string) =>
  action(FETCH_LOOTBOX_PRICES_SUCCESS, {
    boxType,
    price
  })
export const fetchLootboxPricesFailure = (
  boxType: LootboxType,
  error: string
) => action(FETCH_LOOTBOX_PRICES_FAILURE, {
  boxType,
  error
})

export type FetchLootboxPricesRequestAction = ReturnType<typeof fetchLootboxPricesRequest>
export type FetchLootboxPricesSuccessAction = ReturnType<typeof fetchLootboxPricesSuccess>
export type FetchLootboxPricesFailureAction = ReturnType<typeof fetchLootboxPricesFailure>

export const BUY_LOOTBOX_SEND_APPROVE_REQUEST = '[Request] Buy Lootbox send approve'
export const BUY_LOOTBOX_SEND_APPROVE_SUCCESS = '[Success] Buy Lootbox send approve'
export const BUY_LOOTBOX_SEND_APPROVE_FAILURE = '[Failure] Buy Lootbox send approve'

export const buyLootboxSendApproveRequest = (boxType: LootboxType, boxPrice: string, to: Address) =>
  action(BUY_LOOTBOX_SEND_APPROVE_REQUEST, { boxType, boxPrice, to })
export const buyLootboxSendApproveSuccess = (
  chainId: ChainId,
  txHash: string,
  boxType: LootboxType,
  boxPrice: string,
  to: Address,
  txType: TransactionType
) => action(BUY_LOOTBOX_SEND_APPROVE_SUCCESS, {
  ...buildTransactionPayload(chainId, txHash, {
    chainId,
    txHash,
    boxType,
    boxPrice,
    to,
    txType
  })
})
export const buyLootboxSendApproveFailure = (
  boxType: LootboxType,
  error: string
) => action(BUY_LOOTBOX_SEND_APPROVE_FAILURE, {
  boxType,
  error
})

export type BuyLootboxSendApproveRequestAction = ReturnType<typeof buyLootboxSendApproveRequest>
export type BuyLootboxSendApproveSuccessAction = ReturnType<typeof buyLootboxSendApproveSuccess>
export type BuyLootboxSendApproveFailureAction = ReturnType<typeof buyLootboxSendApproveFailure>


export const BUY_LOOTBOX_SEND_TRANSFER_REQUEST = '[Request] Buy Lootbox send transfer'
export const BUY_LOOTBOX_SEND_TRANSFER_SUCCESS = '[Success] Buy Lootbox send transfer'
export const BUY_LOOTBOX_SEND_TRANSFER_FAILURE = '[Failure] Buy Lootbox send transfer'

export const buyLootboxSendTransferRequest = (boxType: LootboxType, boxPrice: string, to: Address) =>
  action(BUY_LOOTBOX_SEND_TRANSFER_REQUEST, { boxType, boxPrice, to })
export const buyLootboxSendTransferSuccess = (
  chainId: ChainId,
  txHash: string,
  boxType: LootboxType,
  boxPrice: string,
  to: Address,
  txType: TransactionType
) => action(BUY_LOOTBOX_SEND_TRANSFER_SUCCESS, {
  ...buildTransactionPayload(chainId, txHash, {
    chainId,
    txHash,
    boxType,
    boxPrice,
    to,
    txType
  })
})
export const buyLootboxSendTransferFailure = (
  boxType: LootboxType,
  error: string
) => action(BUY_LOOTBOX_SEND_TRANSFER_FAILURE, {
  boxType,
  error
})

export type BuyLootboxSendTransferRequestAction = ReturnType<typeof buyLootboxSendTransferRequest>
export type BuyLootboxSendTransferSuccessAction = ReturnType<typeof buyLootboxSendTransferSuccess>
export type BuyLootboxSendTransferFailureAction = ReturnType<typeof buyLootboxSendTransferFailure>

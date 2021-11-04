import { action } from 'typesafe-actions'
import { ChainId } from '@kmon/schemas'
import { buildTransactionPayload } from '@kmon/dapps/dist/modules/transaction/utils'

import { BuyLootboxParams, LootboxType } from './types'

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

export const BUY_LOOTBOX_REQUEST = '[Request] Buy Lootbox'
export const BUY_LOOTBOX_SUCCESS = '[Success] Buy Lootbox'
export const BUY_LOOTBOX_FAILURE = '[Failure] Buy Lootbox'

export const buyLootboxRequest = (params: BuyLootboxParams) =>
  action(BUY_LOOTBOX_REQUEST, { params })
export const buyLootboxSuccess = (
  boxType: LootboxType,
  txHash: string,
  chainId: ChainId
) => action(BUY_LOOTBOX_SUCCESS, {
  boxType,
  txHash,
  ...buildTransactionPayload(chainId, txHash, {
    boxType
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

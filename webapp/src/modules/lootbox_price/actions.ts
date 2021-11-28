import { action } from 'typesafe-actions'

import { LootboxType } from '../lootbox/types'

export const FETCH_LOOTBOX_PRICE_REQUEST = '[Request] Get Lootbox Prices'
export const FETCH_LOOTBOX_PRICE_SUCCESS = '[Success] Get Lootbox Prices'
export const FETCH_LOOTBOX_PRICE_FAILURE = '[Failure] Get Lootbox Prices'

export const fetchLootboxPriceRequest = (boxType: LootboxType) =>
  action(FETCH_LOOTBOX_PRICE_REQUEST, { boxType })
export const fetchLootboxPriceSuccess = (boxType: LootboxType, price: string) =>
  action(FETCH_LOOTBOX_PRICE_SUCCESS, {
    boxType,
    price
  })
export const fetchLootboxPriceFailure = (
  boxType: LootboxType,
  error: string
) => action(FETCH_LOOTBOX_PRICE_FAILURE, {
  boxType,
  error
})

export type FetchLootboxPriceRequestAction = ReturnType<typeof fetchLootboxPriceRequest>
export type FetchLootboxPriceSuccessAction = ReturnType<typeof fetchLootboxPriceSuccess>
export type FetchLootboxPriceFailureAction = ReturnType<typeof fetchLootboxPriceFailure>

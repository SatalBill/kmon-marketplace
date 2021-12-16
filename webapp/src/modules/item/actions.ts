import { action } from 'typesafe-actions'
import { ChainId } from '@kmon/schemas'
import { buildTransactionPayload } from '@kmon/dapps/dist/modules/transaction/utils'

import { Address } from 'web3x-es/address'
import { Item } from './types'
import { ItemVersion } from './constants'

export const FETCH_ITEMS_REQUEST = '[Request] Fetch Items'
export const FETCH_ITEMS_SUCCESS = '[Success] Fetch Items'
export const FETCH_ITEMS_FAILURE = '[Failure] Fetch Items'

export const fetchItemsRequest = () => action(FETCH_ITEMS_REQUEST, {})
export const fetchItemsSuccess = (items: Item[]) => action(FETCH_ITEMS_SUCCESS, { items })
export const fetchItemsFailure = (error: string) => action(FETCH_ITEMS_FAILURE, { error })

export type FetchItemsRequestAction = ReturnType<typeof fetchItemsRequest>
export type FetchItemsSuccessAction = ReturnType<typeof fetchItemsSuccess>
export type FetchItemsFailureAction = ReturnType<typeof fetchItemsFailure>

export const FETCH_ITEM_REQUEST = '[Request] Fetch Item'
export const FETCH_ITEM_SUCCESS = '[Success] Fetch Item'
export const FETCH_ITEM_FAILURE = '[Failure] Fetch Item'

export const fetchItemRequest = (itemId: string) => action(FETCH_ITEM_REQUEST, { itemId })
export const fetchItemSuccess = (item: Item) => action(FETCH_ITEM_SUCCESS, { item })
export const fetchItemFailure = (error: string) => action(FETCH_ITEM_FAILURE, { error })

export type FetchItemRequestAction = ReturnType<typeof fetchItemRequest>
export type FetchItemSuccessAction = ReturnType<typeof fetchItemSuccess>
export type FetchItemFailureAction = ReturnType<typeof fetchItemFailure>

export const BUY_ITEM_REQUEST = '[Request] Buy item'
export const BUY_ITEM_SUCCESS = '[Success] Buy item'
export const BUY_ITEM_FAILURE = '[Failure] Buy item'

export const buyItemRequest = (version: ItemVersion, item: Item, count: number, to: Address) =>
  action(BUY_ITEM_REQUEST, { version, item, count, to })
export const buyItemSuccess = (
  chainId: ChainId,
  txHash: string,
  item: Item,
  count: number,
  to: Address
) => action(BUY_ITEM_SUCCESS, {
  ...buildTransactionPayload(chainId, txHash, {
    chainId,
    txHash,
    item,
    count,
    to,
  })
})
export const buyItemFailure = (
  itemId: string,
  error: string
) => action(BUY_ITEM_FAILURE, {
  itemId,
  error
})

export type BuyItemRequestAction = ReturnType<typeof buyItemRequest>
export type BuyItemSuccessAction = ReturnType<typeof buyItemSuccess>
export type BuyItemFailureAction = ReturnType<typeof buyItemFailure>

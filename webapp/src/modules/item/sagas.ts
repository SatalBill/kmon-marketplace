import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getChainId } from '@kmon/dapps/dist/modules/wallet/selectors'
import { ChainId } from '@kmon/schemas'
import {
  BuyItemRequestAction,
  buyItemSuccess,
  buyItemFailure,
  BUY_ITEM_REQUEST,
  FETCH_ITEMS_REQUEST,
  fetchItemsSuccess,
  fetchItemsFailure,
  FETCH_ITEM_REQUEST,
  fetchItemSuccess,
  FetchItemRequestAction,
} from './actions'
import { locations } from '../routing/locations'
import { buyItem, fetchItem, fetchItems } from './utils'
import { getWallet } from '../wallet/selectors'
import { Item } from './types'

export function* itemSaga() {
  yield takeEvery(FETCH_ITEMS_REQUEST, handleFetchItemsRequest)
  yield takeEvery(FETCH_ITEM_REQUEST, handleFetchItemRequest)
  yield takeEvery(BUY_ITEM_REQUEST, handleBuyItemRequest)
}

function* handleFetchItemsRequest() {
  try {
    const items: Item[] = yield call(fetchItems)
    yield put(fetchItemsSuccess(items))
  } catch (error) {
    // @ts-ignore
    yield put(fetchItemsFailure(error.message))
  }
}

function* handleFetchItemRequest(action: FetchItemRequestAction) {
  try {
    const item: Item = yield call(fetchItem, action.payload.itemId)
    yield put(fetchItemSuccess(item))
  } catch (error) {
    // @ts-ignore
    yield put(fetchItemFailure(error.message))
  }
}

function* handleBuyItemRequest(action: BuyItemRequestAction) {
  const { item, count, to } = action.payload
  try {
    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(buyItem, wallet, item.itemId, count, to)
    yield put(buyItemSuccess(chainId, txHash, item, count, to))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(buyItemFailure(itemId, error.message))
  }
}

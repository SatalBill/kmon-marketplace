import { put, call, takeEvery } from 'redux-saga/effects'
import {
  fetchLootboxPriceFailure,
  fetchLootboxPriceSuccess,
  FetchLootboxPriceRequestAction,
  FETCH_LOOTBOX_PRICE_REQUEST,
} from './actions'
import { getLootboxPrice } from './utils'

export function* lootboxPriceSaga() {
  yield takeEvery(FETCH_LOOTBOX_PRICE_REQUEST, handleFetchLootboxPriceRequest)
}

function* handleFetchLootboxPriceRequest(action: FetchLootboxPriceRequestAction) {
  const { boxType } = action.payload
  try {
    const price: string = yield call(getLootboxPrice, boxType)
    yield put(fetchLootboxPriceSuccess(boxType, price))
  } catch (error) {
    // @ts-ignore
    yield put(fetchLootboxPriceFailure(boxType, error.message))
  }
}

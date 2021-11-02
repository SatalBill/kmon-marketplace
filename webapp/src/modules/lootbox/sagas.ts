import { put, call, takeEvery, select } from 'redux-saga/effects'
import {
  fetchLootboxPricesFailure,
  fetchLootboxPricesSuccess,
  FetchLootboxPricesRequestAction,
  FETCH_LOOTBOX_PRICES_REQUEST,
  BUY_LOOTBOX_REQUEST,
  BuyLootboxRequestAction,
  buyLootboxSuccess
} from './actions'
import { LootboxServices } from './services'
import { getWallet } from '../wallet/selectors'

export function* lootboxSaga() {
  yield takeEvery(FETCH_LOOTBOX_PRICES_REQUEST, handleFetchLootboxPricesRequest)
  yield takeEvery(BUY_LOOTBOX_REQUEST, handleBuyLootboxRequest)
}

function* handleFetchLootboxPricesRequest(action: FetchLootboxPricesRequestAction) {
  const { boxType } = action.payload
  try {
    const lootboxService = new LootboxServices()

    const price: string = yield call(lootboxService.getLootboxPrices, boxType)
    yield put(fetchLootboxPricesSuccess(boxType, Number(price)))
  } catch (error) {
    // @ts-ignore
    yield put(fetchLootboxPricesFailure(boxType, error.message))
  }
}

function* handleBuyLootboxRequest(action: BuyLootboxRequestAction) {
  const { params } = action.payload
  try {
    const lootboxService = new LootboxServices()

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)

    const txHash: string = yield call(lootboxService.buyLootbox, wallet, params)
    yield put(buyLootboxSuccess(params.boxType, txHash))
  } catch (error) {
    // @ts-ignore
    yield put(fetchLootboxPricesFailure(boxType, error.message))
  }
}

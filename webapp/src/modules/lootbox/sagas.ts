import { put, call, takeEvery, select } from 'redux-saga/effects'
import { getChainId } from '@kmon/dapps/dist/modules/wallet/selectors'
import {
  fetchLootboxPricesFailure,
  fetchLootboxPricesSuccess,
  FetchLootboxPricesRequestAction,
  FETCH_LOOTBOX_PRICES_REQUEST,
  BUY_LOOTBOX_REQUEST,
  BuyLootboxRequestAction,
  buyLootboxSuccess,
  buyLootboxFailure
} from './actions'
import { LootboxServices } from './services'
import { getWallet } from '../wallet/selectors'
import { ChainId } from '@kmon/schemas'
import { FetchTransactionSuccessAction, FETCH_TRANSACTION_SUCCESS } from '@kmon/dapps/dist/modules/transaction/actions'
import { showToast } from '@kmon/dapps/dist/modules/toast/actions'
import { getSendTransactionConfirmedToast } from '../toast/toasts'
import { LootboxType } from './types'

export function* lootboxSaga() {
  yield takeEvery(FETCH_LOOTBOX_PRICES_REQUEST, handleFetchLootboxPricesRequest)
  yield takeEvery(BUY_LOOTBOX_REQUEST, handleBuyLootboxRequest)
  yield takeEvery(FETCH_TRANSACTION_SUCCESS, handleFetchTransaction)
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
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(lootboxService.buyLootbox, wallet, params)
    yield put(buyLootboxSuccess(params.boxType, txHash, chainId))
  } catch (error) {
    // @ts-ignore
    yield put(buyLootboxFailure(params.boxType, error.message))
  }
}

function* handleFetchTransaction(action: FetchTransactionSuccessAction) {
  const { transaction } = action.payload
  const { boxType } = transaction.payload
  let boxTypeStr: string = ''
  switch (boxType) {
    case LootboxType.Basic:
      boxTypeStr = 'basic'
      break
    case LootboxType.Medium:
      boxTypeStr = 'medium'
      break
    case LootboxType.Premium:
      boxTypeStr = 'premium'
      break
    default:
      break
  }
  yield put(showToast(getSendTransactionConfirmedToast(transaction.chainId, transaction.hash, boxTypeStr)))
}
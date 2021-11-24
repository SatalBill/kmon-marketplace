import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getChainId } from '@kmon/dapps/dist/modules/wallet/selectors'
import { ChainId } from '@kmon/schemas'
import {
  BuyLootboxRequestAction,
  buyLootboxSuccess,
  buyLootboxFailure,
  BUY_LOOTBOX_REQUEST,
} from './actions'
import { locations } from '../routing/locations'
import { buyLootbox } from './utils'
import { getWallet } from '../wallet/selectors'
import { TransactionType } from './types'

export function* lootboxSaga() {
  yield takeEvery(BUY_LOOTBOX_REQUEST, handleBuyLootboxRequest)
}

function* handleBuyLootboxRequest(action: BuyLootboxRequestAction) {
  const { boxType, boxPrice, to } = action.payload
  try {
    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(buyLootbox, wallet, to, boxType)
    yield put(buyLootboxSuccess(chainId, txHash, boxType, boxPrice, to, TransactionType.Transfer))
    yield put(push(locations.activity()))
  } catch (error) {
    // @ts-ignore
    yield put(buyLootboxFailure(boxType, error.message))
  }
}

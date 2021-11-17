import { put, call, takeEvery, select } from 'redux-saga/effects'
import { getChainId } from '@kmon/dapps/dist/modules/wallet/selectors'
import {
  fetchLootboxPricesFailure,
  fetchLootboxPricesSuccess,
  FetchLootboxPricesRequestAction,
  FETCH_LOOTBOX_PRICES_REQUEST,
  BUY_LOOTBOX_SEND_APPROVE_REQUEST,
  BuyLootboxSendApproveRequestAction,
  buyLootboxSendApproveSuccess,
  buyLootboxSendApproveFailure,
  BuyLootboxSendTransferRequestAction,
  buyLootboxSendTransferSuccess,
  BUY_LOOTBOX_SEND_TRANSFER_REQUEST,
  buyLootboxSendTransferRequest
} from './actions'
import { LootboxServices } from './services'
import { getWallet } from '../wallet/selectors'
import { ChainId } from '@kmon/schemas'
import {
  FetchTransactionSuccessAction,
  FETCH_TRANSACTION_SUCCESS
} from '@kmon/dapps/dist/modules/transaction/actions'
import { showToast } from '@kmon/dapps/dist/modules/toast/actions'
import {
  getBuyLootboxApprovalToast,
  getBuyLootboxTransferToast
} from '../toast/toasts'
import { toStringLootboxType } from './utils'
import { TransactionType } from './types'

export function* lootboxSaga() {
  yield takeEvery(FETCH_LOOTBOX_PRICES_REQUEST, handleFetchLootboxPricesRequest)
  yield takeEvery(BUY_LOOTBOX_SEND_APPROVE_REQUEST, handleBuyLootboxSendApproveRequest)
  yield takeEvery(BUY_LOOTBOX_SEND_TRANSFER_REQUEST, handleBuyLootboxSendTransferRequest)
  yield takeEvery(FETCH_TRANSACTION_SUCCESS, handleFetchTransaction)
}

function* handleFetchLootboxPricesRequest(action: FetchLootboxPricesRequestAction) {
  const { boxType } = action.payload
  try {
    const lootboxService = new LootboxServices()

    const price: string = yield call(lootboxService.getLootboxPrices, boxType)
    yield put(fetchLootboxPricesSuccess(boxType, price))
  } catch (error) {
    // @ts-ignore
    yield put(fetchLootboxPricesFailure(boxType, error.message))
  }
}

function* handleBuyLootboxSendApproveRequest(action: BuyLootboxSendApproveRequestAction) {
  const { boxType, boxPrice, to } = action.payload
  try {
    const lootboxService = new LootboxServices()

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(lootboxService.buyLootboxApprove, wallet, boxPrice)
    yield put(buyLootboxSendApproveSuccess(chainId, txHash, boxType, boxPrice, to, TransactionType.Approve))
  } catch (error) {
    // @ts-ignore
    yield put(buyLootboxSendApproveFailure(boxType, error.message))
  }
}

function* handleBuyLootboxSendTransferRequest(action: BuyLootboxSendTransferRequestAction) {
  const { boxType, boxPrice, to } = action.payload
  try {
    const lootboxService = new LootboxServices()

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(lootboxService.buyLootboxTransfer, wallet, to, boxType)
    yield put(buyLootboxSendTransferSuccess(chainId, txHash, boxType, boxPrice, to, TransactionType.Transfer))
  } catch (error) {
    // @ts-ignore
    yield put(buyLootboxSendTransferFailure(boxType, error.message))
  }
}

function* handleFetchTransaction(action: FetchTransactionSuccessAction) {
  const { transaction } = action.payload
  const { boxType, txType, boxPrice, to } = transaction.payload
  if (txType === TransactionType.Approve) {
    yield put(showToast(getBuyLootboxApprovalToast(transaction.chainId, transaction.hash)))
    yield put(buyLootboxSendTransferRequest(boxType, boxPrice, to))
  }
  if (txType === TransactionType.Transfer) {
    yield put(showToast(getBuyLootboxTransferToast(transaction.chainId, transaction.hash, toStringLootboxType(boxType))))
  }
}
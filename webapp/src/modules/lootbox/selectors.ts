import { createSelector } from 'reselect'
import { LoadingState } from '@kmon/dapps/dist/modules/loading/reducer'
import { Transaction } from '@kmon/dapps/dist/modules/transaction/types'
import {
  getLoading as getTransactionLoading,
  getData as getTransactionData
} from '@kmon/dapps/dist/modules/transaction/selectors'
import { RootState } from '../reducer'
import { LootboxType } from './types'

export const getState = (state: RootState) => state.lootbox
export const getPrices = (state: RootState) => getState(state).prices
export const getPrice = (state: RootState, boxType: LootboxType) => getPrices(state)[boxType]
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getBasicPrice = (state: RootState) => getPrices(state)[LootboxType.Basic]
export const getMediumPrice = (state: RootState) => getPrices(state)[LootboxType.Medium]
export const getPremiumPrice = (state: RootState) => getPrices(state)[LootboxType.Premium]

export const getPendingTransaction = createSelector<
  RootState,
  LoadingState,
  Transaction[],
  Transaction | undefined
>(getTransactionLoading, getTransactionData, (loading, data) => {
  if (loading.length > 0) {
    const tx = loading[loading.length - 1]
    const hash = tx.payload.hash
    return data.find(tx => tx.hash === hash)
  }
  return undefined
})

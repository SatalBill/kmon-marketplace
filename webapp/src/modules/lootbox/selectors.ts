import { RootState } from '../reducer'
import { LootboxType } from './types'

export const getState = (state: RootState) => state.lootbox
export const getPrices = (state: RootState) => getState(state).prices
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getBasicPrice = (state: RootState) => getPrices(state)[LootboxType.Basic]
export const getMediumPrice = (state: RootState) => getPrices(state)[LootboxType.Medium]
export const getPremiumPrice = (state: RootState) => getPrices(state)[LootboxType.Premium]
export const getTransaction = (state: RootState) => getState(state).transaction
export const getTxHash = (state: RootState) => getTransaction(state).hash

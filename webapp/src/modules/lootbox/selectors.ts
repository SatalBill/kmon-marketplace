import { createSelector } from 'reselect'
import { RootState } from '../reducer'
import { LootboxType } from './types'

export const getState = (state: RootState) => state.lootbox
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getBasicPrice = (state: RootState) => getData(state)[LootboxType.Basic]
export const getMediumPrice = (state: RootState) => getData(state)[LootboxType.Medium]
export const getPremiumPrice = (state: RootState) => getData(state)[LootboxType.Premium]

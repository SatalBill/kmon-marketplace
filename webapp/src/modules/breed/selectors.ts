import { createMatchSelector } from 'connected-react-router'
import { createSelector } from 'reselect'

import { RootState } from '../reducer'
import { locations } from '../routing/locations'

export const getState = (state: RootState) => state.breed
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error

export const getMyNFT = (state: RootState) => getData(state).myNFT
export const getSelectedNFT = (state: RootState) => getData(state).selectedNFT

const nftDetailMatchSelector = createMatchSelector<
  RootState,
  {
    contractAddress: string
    tokenId: string
  }
>(locations.breed(':contractAddress', ':tokenId'))

export const getContractAddress = createSelector<
  RootState,
  ReturnType<typeof nftDetailMatchSelector>,
  string | null
>(nftDetailMatchSelector, match => match?.params.contractAddress || null)

export const getTokenId = createSelector<
  RootState,
  ReturnType<typeof nftDetailMatchSelector>,
  string | null
>(nftDetailMatchSelector, match => match?.params.tokenId || null)

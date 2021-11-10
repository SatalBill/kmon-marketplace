import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'
import {
  FetchLootboxPricesRequestAction,
  FetchLootboxPricesSuccessAction,
  FetchLootboxPricesFailureAction,
  FETCH_LOOTBOX_PRICES_REQUEST,
  FETCH_LOOTBOX_PRICES_SUCCESS,
  FETCH_LOOTBOX_PRICES_FAILURE
} from './actions'
import { LootboxPrices, LootboxType } from './types'

export type LootboxState = {
  loading: LoadingState
  prices: LootboxPrices
  error: string | null
}

const INITIAL_STATE = {
  loading: [],
  prices: {
    [LootboxType.Basic]: '',
    [LootboxType.Medium]: '',
    [LootboxType.Premium]: ''
  },
  error: null
}

type LootboxReducerAction =
  | FetchLootboxPricesRequestAction
  | FetchLootboxPricesSuccessAction
  | FetchLootboxPricesFailureAction

  export function lootboxReducer(
    state: LootboxState = INITIAL_STATE,
    action: LootboxReducerAction
  ): LootboxState {
    switch (action.type) {
      case FETCH_LOOTBOX_PRICES_REQUEST: {
        return {
          ...state,
          loading: loadingReducer(state.loading, action)
        }
      }
      case FETCH_LOOTBOX_PRICES_SUCCESS: {
        return {
          ...state,
          prices: {
            ...state.prices,
            [action.payload.boxType]: action.payload.price
          },
          loading: loadingReducer(state.loading, action),
          error: null
        }
      }
      case FETCH_LOOTBOX_PRICES_FAILURE: {
        return {
          ...state,
          loading: loadingReducer(state.loading, action),
          error: action.payload.error
        }
      }
      default:
        return state
    }
  }

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
import { LootboxType } from './types'

export type LootboxState = {
  data: {
    [x in LootboxType]: number
  }
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: {
    [LootboxType.Basic]: 0,
    [LootboxType.Medium]: 0,
    [LootboxType.Premium]: 0
  },
  loading: [],
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
          data: {
            ...state.data,
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

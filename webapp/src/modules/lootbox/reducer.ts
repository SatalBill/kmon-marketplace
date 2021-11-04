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
  FETCH_LOOTBOX_PRICES_FAILURE,
  BUY_LOOTBOX_REQUEST,
  BUY_LOOTBOX_SUCCESS,
  BUY_LOOTBOX_FAILURE,
  BuyLootboxRequestAction,
  BuyLootboxSuccessAction,
  BuyLootboxFailureAction
} from './actions'
import { LootboxType } from './types'

export type LootboxState = {
  loading: LoadingState
  prices: {
    [x in LootboxType]: string
  }
  transaction: {
    boxType: LootboxType
    hash: string | null
  }
  error: string | null
}

const INITIAL_STATE = {
  loading: [],
  prices: {
    [LootboxType.Basic]: '',
    [LootboxType.Medium]: '',
    [LootboxType.Premium]: ''
  },
  transaction: {
    boxType: 0,
    hash: null
  },
  error: null
}

type LootboxReducerAction =
  | FetchLootboxPricesRequestAction
  | FetchLootboxPricesSuccessAction
  | FetchLootboxPricesFailureAction
  | BuyLootboxRequestAction
  | BuyLootboxSuccessAction
  | BuyLootboxFailureAction

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
      case BUY_LOOTBOX_REQUEST: {
        return {
          ...state,
          transaction: INITIAL_STATE.transaction,
          loading: loadingReducer(state.loading, action)
        }
      }
      case BUY_LOOTBOX_SUCCESS: {
        return {
          ...state,
          transaction: {
            boxType: action.payload.boxType,
            hash: action.payload.txHash
          },
          loading: loadingReducer(state.loading, action),
          error: null
        }
      }
      case BUY_LOOTBOX_FAILURE: {
        return {
          ...state,
          transaction: INITIAL_STATE.transaction,
          loading: loadingReducer(state.loading, action),
          error: action.payload.error
        }
      }
      default:
        return state
    }
  }

import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'
import {
  FetchLootboxPriceRequestAction,
  FetchLootboxPriceSuccessAction,
  FetchLootboxPriceFailureAction,
  FETCH_LOOTBOX_PRICE_REQUEST,
  FETCH_LOOTBOX_PRICE_SUCCESS,
  FETCH_LOOTBOX_PRICE_FAILURE
} from './actions'
import { LootboxType } from '../lootbox/types'
import { LootboxPrices } from './types'

export type LootboxState = {
  data: LootboxPrices
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: {
    [LootboxType.Basic]: undefined,
    [LootboxType.Medium]: undefined,
    [LootboxType.Premium]: undefined
  },
  loading: [],
  error: null
}

type LootboxReducerAction =
  | FetchLootboxPriceRequestAction
  | FetchLootboxPriceSuccessAction
  | FetchLootboxPriceFailureAction

export function lootboxPriceReducer(
  state: LootboxState = INITIAL_STATE,
  action: LootboxReducerAction
): LootboxState {
  switch (action.type) {
    case FETCH_LOOTBOX_PRICE_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_LOOTBOX_PRICE_SUCCESS: {
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
    case FETCH_LOOTBOX_PRICE_FAILURE: {
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

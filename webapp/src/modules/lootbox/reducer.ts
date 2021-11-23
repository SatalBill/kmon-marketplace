import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'
import {
  BuyLootboxFailureAction,
  BuyLootboxRequestAction,
  BuyLootboxSuccessAction,
  BUY_LOOTBOX_FAILURE,
  BUY_LOOTBOX_REQUEST,
  BUY_LOOTBOX_SUCCESS
} from './actions'
import { Lootbox, LootboxType } from './types'

export type LootboxState = {
  loading: LoadingState
  data: Record<string, Lootbox>
  error: string | null
}

const INITIAL_STATE = {
  loading: [],
  data: {},
  error: null
}

type LootboxReducerAction =
  | BuyLootboxRequestAction
  | BuyLootboxSuccessAction
  | BuyLootboxFailureAction

export function lootboxReducer(
  state: LootboxState = INITIAL_STATE,
  action: LootboxReducerAction
): LootboxState {
  switch (action.type) {
    case BUY_LOOTBOX_REQUEST:
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    case BUY_LOOTBOX_SUCCESS:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    case BUY_LOOTBOX_FAILURE:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    default:
      return state
  }
}

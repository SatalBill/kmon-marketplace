import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'
import {
  BuyItemFailureAction,
  BuyItemRequestAction,
  BuyItemSuccessAction,
  BUY_ITEM_FAILURE,
  BUY_ITEM_REQUEST,
  BUY_ITEM_SUCCESS,
  FetchItemFailureAction,
  FetchItemRequestAction,
  FetchItemsFailureAction,
  FetchItemsRequestAction,
  FetchItemsSuccessAction,
  FetchItemSuccessAction,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEM_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS
} from './actions'
import { Item } from './types'
import { ethers } from 'ethers'

export type ItemState = {
  loading: LoadingState
  data: Item[]
  error: string | null
}

const INITIAL_STATE = {
  loading: [],
  data: [],
  error: null
}

type ItemReducerAction =
  | FetchItemsRequestAction
  | FetchItemsSuccessAction
  | FetchItemsFailureAction
  | FetchItemRequestAction
  | FetchItemSuccessAction
  | FetchItemFailureAction
  | BuyItemRequestAction
  | BuyItemSuccessAction
  | BuyItemFailureAction

export function itemReducer(
  state: ItemState = INITIAL_STATE,
  action: ItemReducerAction
): ItemState {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
    case FETCH_ITEM_REQUEST:
    case BUY_ITEM_REQUEST:
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        data: action.payload.items.map((item) => ({
          ...item,
          itemId: item.name,
          name: ethers.utils.parseBytes32String(item.name)
        }))
      }
    case FETCH_ITEM_SUCCESS:
    case BUY_ITEM_SUCCESS:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    case FETCH_ITEMS_FAILURE:
    case FETCH_ITEM_FAILURE:
    case BUY_ITEM_FAILURE:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    default:
      return state
  }
}

import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'
import {
  GetBlockNumberFailureAction,
  GetBlockNumberRequestAction,
  GetBlockNumberSuccessAction,
  GET_BLOCK_NUMBER_FAILURE,
  GET_BLOCK_NUMBER_REQUEST,
  GET_BLOCK_NUMBER_SUCCESS
} from './actions'

export type SubgraphState = {
  loading: LoadingState
  data: {
    blockNumber?: number
  }
  error: string | null
}

const INITIAL_STATE = {
  loading: [],
  data: {
    blockNumber: undefined
  },
  error: null
}

type SubgraphReducerAction =
  | GetBlockNumberRequestAction
  | GetBlockNumberSuccessAction
  | GetBlockNumberFailureAction

export function subgraphReducer(
  state: SubgraphState = INITIAL_STATE,
  action: SubgraphReducerAction
): SubgraphState {
  switch (action.type) {
    case GET_BLOCK_NUMBER_REQUEST:
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    case GET_BLOCK_NUMBER_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          blockNumber: action.payload.blockNumber
        },
        loading: loadingReducer(state.loading, action),
        error: null
      }
    case GET_BLOCK_NUMBER_FAILURE:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    default:
      return state
  }
}

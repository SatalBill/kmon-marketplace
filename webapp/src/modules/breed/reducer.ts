import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'

import { NFT } from '../nft/types'
import {
  FetchNFTForBreedingFailureAction,
  FetchNFTForBreedingRequestAction,
  FetchNFTForBreedingSuccessAction,
  FETCH_NFT_FOR_BREEDING_FAILURE,
  FETCH_NFT_FOR_BREEDING_REQUEST,
  FETCH_NFT_FOR_BREEDING_SUCCESS,
  ResetNFTForBreedingRequestAction,
  RESET_NFT_FOR_BREEDING_REQUEST,
  SelectNFTForBreedingRequestAction,
  SELECT_NFT_FOR_BREEDING_REQUEST
} from './actions'

export type BreedState = {
  data: {
    myNFT: NFT | null,
    selectedNFT: NFT | null
  }
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: {
    myNFT: null,
    selectedNFT: null
  },
  loading: [],
  error: null
}

type NFTReducerAction =
  | FetchNFTForBreedingRequestAction
  | FetchNFTForBreedingSuccessAction
  | FetchNFTForBreedingFailureAction
  | ResetNFTForBreedingRequestAction
  | SelectNFTForBreedingRequestAction

export function breedReducer(
  state: BreedState = INITIAL_STATE,
  action: NFTReducerAction
) {
  switch (action.type) {
    case FETCH_NFT_FOR_BREEDING_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_NFT_FOR_BREEDING_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    case FETCH_NFT_FOR_BREEDING_SUCCESS: {
      const { nft } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          myNFT: nft
        },
        error: null
      }
    }
    case RESET_NFT_FOR_BREEDING_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          myNFT: null
        }
      }
    }
    case SELECT_NFT_FOR_BREEDING_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          selectedNFT: action.payload.nft
        }
      }
    }
    default:
      return state
  }
}

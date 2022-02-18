import {
  LoadingState,
  loadingReducer
} from '@kmon/dapps/dist/modules/loading/reducer'

import { NFT } from '../nft/types'
import {
  AddToBreedingCentreFailureAction,
  AddToBreedingCentreRequestAction,
  AddToBreedingCentreSuccessAction,
  ADD_TO_BREEDING_CENTRE_FAILURE,
  ADD_TO_BREEDING_CENTRE_REQUEST,
  ADD_TO_BREEDING_CENTRE_SUCCESS,
  BreedFailureAction,
  BreedRequestAction,
  BreedSuccessAction,
  BREED_FAILURE,
  BREED_REQUEST,
  BREED_SUCCESS,
  FetchNFTForBreedingFailureAction,
  FetchNFTForBreedingRequestAction,
  FetchNFTForBreedingSuccessAction,
  FETCH_NFT_FOR_BREEDING_FAILURE,
  FETCH_NFT_FOR_BREEDING_REQUEST,
  FETCH_NFT_FOR_BREEDING_SUCCESS,
  ResetNFTForBreedingRequestAction,
  ResetSelectedNFTForBreedingRequestAction,
  RESET_NFT_FOR_BREEDING_REQUEST,
  RESET_SELECTED_NFT_FOR_BREEDING_REQUEST,
  SelectNFTForBreedingRequestAction,
  SELECT_NFT_FOR_BREEDING_REQUEST,
  SimulateBreedingFailureAction,
  SimulateBreedingRequestAction,
  SimulateBreedingSuccessAction,
  SIMULATE_BREEDING_FAILURE,
  SIMULATE_BREEDING_REQUEST,
  SIMULATE_BREEDING_SUCCESS
} from './actions'
import { GenesV2 } from './types'

export type BreedState = {
  data: {
    myNFT: NFT | null,
    selectedNFT: NFT | null,
    simulatedGenes: GenesV2 | null
  }
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: {
    myNFT: null,
    selectedNFT: null,
    simulatedGenes: null
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
  | ResetSelectedNFTForBreedingRequestAction
  | AddToBreedingCentreRequestAction
  | AddToBreedingCentreSuccessAction
  | AddToBreedingCentreFailureAction
  | SimulateBreedingRequestAction
  | SimulateBreedingSuccessAction
  | SimulateBreedingFailureAction
  | BreedRequestAction
  | BreedSuccessAction
  | BreedFailureAction

export function breedReducer(
  state: BreedState = INITIAL_STATE,
  action: NFTReducerAction
) {
  switch (action.type) {
    case FETCH_NFT_FOR_BREEDING_REQUEST:
    case ADD_TO_BREEDING_CENTRE_REQUEST:
    case SIMULATE_BREEDING_REQUEST:
    case BREED_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_NFT_FOR_BREEDING_FAILURE:
    case ADD_TO_BREEDING_CENTRE_FAILURE:
    case SIMULATE_BREEDING_FAILURE:
    case BREED_FAILURE: {
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
    case RESET_SELECTED_NFT_FOR_BREEDING_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          selectedNFT: null
        }
      }
    }
    case ADD_TO_BREEDING_CENTRE_SUCCESS:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    case SIMULATE_BREEDING_SUCCESS:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          simulatedGenes: action.payload.genes
        },
        error: null
      }
    case BREED_SUCCESS:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    default:
      return state
  }
}

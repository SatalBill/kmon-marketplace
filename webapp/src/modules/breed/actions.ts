import { action } from 'typesafe-actions'

import { NFT } from '../nft/types'
import { GenesV2 } from './types'

export const FETCH_NFT_FOR_BREEDING_REQUEST = '[Request] Fetch NFT FOR BREEDING'
export const FETCH_NFT_FOR_BREEDING_SUCCESS = '[Success] Fetch NFT FOR BREEDING'
export const FETCH_NFT_FOR_BREEDING_FAILURE = '[Failure] Fetch NFT FOR BREEDING'
export const RESET_NFT_FOR_BREEDING_REQUEST = '[Request] Reset NFT FOR BREEDING'
export const SELECT_NFT_FOR_BREEDING_REQUEST = '[Request] Select NFT FOR BREEDING'
export const RESET_SELECTED_NFT_FOR_BREEDING_REQUEST = '[Request] Reset selected NFT FOR BREEDING'

export const fetchNFTForBreedingRequest = (contractAddress: string, tokenId: string) =>
  action(FETCH_NFT_FOR_BREEDING_REQUEST, { contractAddress, tokenId })
export const fetchNFTForBreedingSuccess = (nft: NFT) =>
  action(FETCH_NFT_FOR_BREEDING_SUCCESS, { nft })
export const fetchNFTForBreedingFailure = (
  contractAddress: string,
  tokenId: string,
  error: string
) => action(FETCH_NFT_FOR_BREEDING_FAILURE, { contractAddress, tokenId, error })
export const resetNFTForBreedingRequest = () => action(RESET_NFT_FOR_BREEDING_REQUEST, {})
export const selectNFTForBreedingRequest = (nft: NFT) => action(SELECT_NFT_FOR_BREEDING_REQUEST, { nft })
export const resetSelectedNFTForBreedingRequest = () => action(RESET_SELECTED_NFT_FOR_BREEDING_REQUEST, {})

export type FetchNFTForBreedingRequestAction = ReturnType<typeof fetchNFTForBreedingRequest>
export type FetchNFTForBreedingSuccessAction = ReturnType<typeof fetchNFTForBreedingSuccess>
export type FetchNFTForBreedingFailureAction = ReturnType<typeof fetchNFTForBreedingFailure>
export type ResetNFTForBreedingRequestAction = ReturnType<typeof resetNFTForBreedingRequest>
export type SelectNFTForBreedingRequestAction = ReturnType<typeof selectNFTForBreedingRequest>
export type ResetSelectedNFTForBreedingRequestAction = ReturnType<typeof resetSelectedNFTForBreedingRequest>

export const ADD_TO_BREEDING_CENTRE_REQUEST = '[Request] Add To Breeding Centre'
export const ADD_TO_BREEDING_CENTRE_SUCCESS = '[Success] Add To Breeding Centre'
export const ADD_TO_BREEDING_CENTRE_FAILURE = '[Failure] Add To Breeding Centre'

export const addToBreedigCentreRequest = (contractAddress: string, tokenId: string, price: string) =>
  action(ADD_TO_BREEDING_CENTRE_REQUEST, { contractAddress, tokenId, price })
export const addToBreedigCentreSuccess = () => action(ADD_TO_BREEDING_CENTRE_SUCCESS, {})
export const addToBreedingCentreFailure = (
  tokenId: string,
  error: string
) => action(ADD_TO_BREEDING_CENTRE_FAILURE, {
  tokenId,
  error
})

export type AddToBreedingCentreRequestAction = ReturnType<typeof addToBreedigCentreRequest>
export type AddToBreedingCentreSuccessAction = ReturnType<typeof addToBreedigCentreSuccess>
export type AddToBreedingCentreFailureAction = ReturnType<typeof addToBreedingCentreFailure>

export const SIMULATE_BREEDING_REQUEST = '[Request] Simulate Breeding'
export const SIMULATE_BREEDING_SUCCESS = '[Success] Simulate Breeding'
export const SIMULATE_BREEDING_FAILURE = '[Failure] Simulate Breeding'

export const simulateBreedingRequest = (femaleTokenId: string, maleTokenId: string) =>
  action(SIMULATE_BREEDING_REQUEST, { femaleTokenId, maleTokenId })
export const simulateBreedingSuccess = (genes: GenesV2) =>
  action(SIMULATE_BREEDING_SUCCESS, { genes })
export const simulateBreedingFailure = (femaleTokenId: string, maleTokenId: string, error: string) =>
  action(SIMULATE_BREEDING_FAILURE, { femaleTokenId, maleTokenId, error })

export type SimulateBreedingRequestAction = ReturnType<typeof simulateBreedingRequest>
export type SimulateBreedingSuccessAction = ReturnType<typeof simulateBreedingSuccess>
export type SimulateBreedingFailureAction = ReturnType<typeof simulateBreedingFailure>

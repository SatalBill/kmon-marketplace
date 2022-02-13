import { action } from 'typesafe-actions'

import { NFT } from '../nft/types'

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

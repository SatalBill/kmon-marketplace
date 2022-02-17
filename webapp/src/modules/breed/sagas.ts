import { call, put, select, takeEvery } from "redux-saga/effects"
import { getChainId } from '@kmon/dapps/dist/modules/wallet/selectors'
import { ChainId } from '@kmon/schemas'

import {
  addToBreedigCentreSuccess,
  addToBreedingCentreFailure,
  AddToBreedingCentreRequestAction,
  ADD_TO_BREEDING_CENTRE_REQUEST,
  fetchNFTForBreedingFailure,
  FetchNFTForBreedingRequestAction,
  fetchNFTForBreedingSuccess,
  fetchSelectedNFTForBreedingFailure,
  FetchSelectedNFTForBreedingRequestAction,
  fetchSelectedNFTForBreedingSuccess,
  FETCH_NFT_FOR_BREEDING_REQUEST,
  FETCH_SELECTED_NFT_FOR_BREEDING_REQUEST,
  SELECT_NFT_FOR_BREEDING_REQUEST
} from "./actions"
import { getContract } from "../contract/utils"
import { NFT } from "../nft/types"
import { AwaitFn } from "../types"
import { VendorFactory } from "../vendor"
import { getWallet } from "../wallet/selectors"
import { addToBreedingCentre } from "./utils"
import { push } from "connected-react-router"
import { locations } from "../routing/locations"

export function* breedSaga() {
  yield takeEvery(FETCH_NFT_FOR_BREEDING_REQUEST, handleFetchNFTForBreedingRequest)
  yield takeEvery(FETCH_SELECTED_NFT_FOR_BREEDING_REQUEST, handleFetchSelectedNFTForBreedingRequest)
  yield takeEvery(ADD_TO_BREEDING_CENTRE_REQUEST, handleAddToBreedingCentre)
}

function* handleFetchNFTForBreedingRequest(action: FetchNFTForBreedingRequestAction) {
  const { contractAddress, tokenId } = action.payload

  try {
    const contract = getContract({ address: contractAddress })
    if (!contract.vendor) {
      throw new Error(
        `Couldn't find a valid vendor for contract ${contract.address}`
      )
    }

    const { nftService } = VendorFactory.build(contract.vendor)

    const [nft]: AwaitFn<typeof nftService.fetchOne> = yield call(() =>
      nftService.fetchOne(contractAddress, tokenId)
    )

    yield put(fetchNFTForBreedingSuccess(nft as NFT))
  } catch (error) {
    console.log(error)

    // @ts-ignore
    yield put(fetchNFTForBreedingFailure(contractAddress, tokenId, error.message))
  }
}

function* handleFetchSelectedNFTForBreedingRequest(action: FetchSelectedNFTForBreedingRequestAction) {
  const { contractAddress, tokenId } = action.payload

  try {
    const contract = getContract({ address: contractAddress })
    if (!contract.vendor) {
      throw new Error(
        `Couldn't find a valid vendor for contract ${contract.address}`
      )
    }

    const { nftService } = VendorFactory.build(contract.vendor)

    const [nft]: AwaitFn<typeof nftService.fetchOne> = yield call(() =>
      nftService.fetchOne(contractAddress, tokenId)
    )

    yield put(fetchSelectedNFTForBreedingSuccess(nft as NFT))
  } catch (error) {
    console.log(error)

    // @ts-ignore
    yield put(fetchSelectedNFTForBreedingFailure(contractAddress, tokenId, error.message))
  }
}

function* handleAddToBreedingCentre(action: AddToBreedingCentreRequestAction) {
  const { contractAddress, tokenId, price } = action.payload

  try {
    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(addToBreedingCentre, wallet, tokenId, price)
    yield put(addToBreedigCentreSuccess(chainId, txHash, tokenId, price))
    yield put(push(locations.breed(contractAddress, tokenId)))
  } catch (error) {
    // @ts-ignore
    yield put(addToBreedingCentreFailure(tokenId, error))
  }
}

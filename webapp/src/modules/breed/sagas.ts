import { call, put, select, takeEvery } from "redux-saga/effects"

import {
  addToBreedigCentreSuccess,
  addToBreedingCentreFailure,
  AddToBreedingCentreRequestAction,
  ADD_TO_BREEDING_CENTRE_REQUEST,
  fetchNFTForBreedingFailure,
  FetchNFTForBreedingRequestAction,
  fetchNFTForBreedingSuccess,
  FETCH_NFT_FOR_BREEDING_REQUEST,
  simulateBreedingFailure,
  SimulateBreedingRequestAction,
  simulateBreedingSuccess,
  SIMULATE_BREEDING_REQUEST,
} from "./actions"
import { getContract } from "../contract/utils"
import { NFT } from "../nft/types"
import { AwaitFn } from "../types"
import { VendorFactory } from "../vendor"
import { addToBreedingCentre, simulateBreeding } from "./utils"
import { push } from "connected-react-router"
import { locations } from "../routing/locations"
import { GenesV2 } from "./types"

export function* breedSaga() {
  yield takeEvery(FETCH_NFT_FOR_BREEDING_REQUEST, handleFetchNFTForBreedingRequest)
  yield takeEvery(ADD_TO_BREEDING_CENTRE_REQUEST, handleAddToBreedingCentre)
  yield takeEvery(SIMULATE_BREEDING_REQUEST, handleSimulateBreeding)
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
    // @ts-ignore
    yield put(fetchNFTForBreedingFailure(contractAddress, tokenId, error.message))
  }
}

function* handleAddToBreedingCentre(action: AddToBreedingCentreRequestAction) {
  const { contractAddress, tokenId, price } = action.payload

  try {
    yield call(addToBreedingCentre, tokenId, price)
    yield put(addToBreedigCentreSuccess())
    yield put(push(locations.breed(contractAddress, tokenId)))
  } catch (error) {
    // @ts-ignore
    yield put(addToBreedingCentreFailure(tokenId, error.message))
  }
}

function* handleSimulateBreeding(action: SimulateBreedingRequestAction) {
  const { femaleTokenId, maleTokenId } = action.payload

  try {
    const genes: GenesV2 = yield call(simulateBreeding, femaleTokenId, maleTokenId)
    yield put(simulateBreedingSuccess(genes))
  } catch (error) {
    // @ts-ignore
    yield put(simulateBreedingFailure(femaleTokenId, maleTokenId, error.message))
  }
}

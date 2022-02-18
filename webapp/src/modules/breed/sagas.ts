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
  FETCH_NFT_FOR_BREEDING_REQUEST,
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

function* handleAddToBreedingCentre(action: AddToBreedingCentreRequestAction) {
  const { contractAddress, tokenId, price } = action.payload

  try {
    yield call(addToBreedingCentre, tokenId, price)
    yield put(addToBreedigCentreSuccess())
    yield put(push(locations.breed(contractAddress, tokenId)))
  } catch (error) {
    // @ts-ignore
    yield put(addToBreedingCentreFailure(tokenId, error))
  }
}

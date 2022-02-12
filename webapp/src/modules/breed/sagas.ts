import { call, put, takeEvery } from "redux-saga/effects"

import {
  fetchNFTForBreedingFailure,
  FetchNFTForBreedingRequestAction,
  fetchNFTForBreedingSuccess,
  FETCH_NFT_FOR_BREEDING_REQUEST
} from "./actions"
import { getContract } from "../contract/utils"
import { NFT } from "../nft/types"
import { AwaitFn } from "../types"
import { VendorFactory } from "../vendor"

export function* breedSaga() {
  yield takeEvery(FETCH_NFT_FOR_BREEDING_REQUEST, handleFetchNFTRequest)
}

function* handleFetchNFTRequest(action: FetchNFTForBreedingRequestAction) {
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

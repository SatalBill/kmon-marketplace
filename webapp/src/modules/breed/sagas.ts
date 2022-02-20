import { call, put, takeEvery } from "redux-saga/effects"

import {
  breedFailure,
  BreedRequestAction,
  breedSuccess,
  BREED_REQUEST,
  simulateBreedingFailure,
  SimulateBreedingRequestAction,
  simulateBreedingSuccess,
  SIMULATE_BREEDING_REQUEST,
} from "./actions"
import { breed, simulateBreeding } from "./utils"
import { push } from "connected-react-router"
import { locations } from "../routing/locations"
import { GenesV2 } from "./types"

export function* breedSaga() {
  yield takeEvery(SIMULATE_BREEDING_REQUEST, handleSimulateBreeding)
  yield takeEvery(BREED_REQUEST, handleBreedRequest)
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

function* handleBreedRequest(action: BreedRequestAction) {
  const { femaleTokenId, maleTokenId } = action.payload

  try {
    yield call(breed, femaleTokenId, maleTokenId)
    yield put(breedSuccess())
    yield put(push(locations.currentAccount()))
  } catch (error) {
    // @ts-ignore
    yield put(breedFailure(femaleTokenId, maleTokenId, error.message))
  }
}

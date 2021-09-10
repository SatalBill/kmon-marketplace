import {
  FetchNFTsSuccessAction,
  FETCH_NFTS_SUCCESS
} from '../../../nft/actions'
import { View } from '../../types'

export type HomepageUIState = {
  [View.KRYPTOMONS]: string[]
}

const INITIAL_STATE: HomepageUIState = {
  [View.KRYPTOMONS]: []
}

type UIReducerAction = FetchNFTsSuccessAction

export function homepageReducer(
  state: HomepageUIState = INITIAL_STATE,
  action: UIReducerAction
) {
  switch (action.type) {
    case FETCH_NFTS_SUCCESS: {
      const nftIds = action.payload.nfts.map(nft => nft.id)

      return {
        ...state,
        [View.KRYPTOMONS]: nftIds
      }
    }
    default:
      return state
  }
}

import { connect } from 'react-redux'

import { MapStateProps, MapDispatchProps, OwnProps, MapDispatch } from './BreedingCenterPage.types'
import BreedingCenterPage from './BreedingCenterPage'
import { RootState } from '../../modules/reducer'
import { getContractAddress, getMyNFT, getSelectedNFT, getTokenId } from '../../modules/breed/selectors'
import {
  fetchNFTForBreedingRequest,
  fetchSelectedNFTForBreedingRequest,
  selectNFTForBreedingRequest
} from '../../modules/breed/actions'
import { NFT } from "../../modules/nft/types"

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const contractAddress = ownProps.contractAddress || getContractAddress(state)
  const tokenId = ownProps.tokenId || getTokenId(state)
  const myNFT = getMyNFT(state)
  const selectedNFT = getSelectedNFT(state)

  return {
    contractAddress,
    tokenId,
    myNFT,
    selectedNFT
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchNFTForBreeding: (contractAddress: string, tokenId: string) =>
    dispatch(fetchNFTForBreedingRequest(contractAddress, tokenId)),
  onSelectNFTForBreeding: (nft: NFT) =>
    dispatch(selectNFTForBreedingRequest(nft)),
  onFetchSelectedNFTForBreedig: (contractAddress: string, tokenId: string) =>
  dispatch(fetchSelectedNFTForBreedingRequest(contractAddress, tokenId))
})

export default connect(mapState, mapDispatch)(BreedingCenterPage)

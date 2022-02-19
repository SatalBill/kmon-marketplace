import { connect } from 'react-redux'

import { MapStateProps, MapDispatchProps, OwnProps, MapDispatch } from './BreedingCenterPage.types'
import BreedingCenterPage from './BreedingCenterPage'
import { RootState } from '../../modules/reducer'
import { getContractAddress, getMyNFT, getSelectedNFT, getTokenId } from '../../modules/breed/selectors'
import { selectNFTForBreedingRequest } from '../../modules/breed/actions'
import { NFT } from "../../modules/nft/types"
import { fetchNFTRequest } from '../../modules/nft/actions'
import { getMyBreedingOrder, getSelectedBreedingOrder } from '../../modules/breedingOrder/selectors'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const contractAddress = ownProps.contractAddress || getContractAddress(state)
  const tokenId = ownProps.tokenId || getTokenId(state)
  const myNFT = getMyNFT(state)
  const selectedNFT = getSelectedNFT(state)
  const myBreedingOrder = getMyBreedingOrder(state)
  const selectedBreedingOrder = getSelectedBreedingOrder(state)

  return {
    contractAddress,
    tokenId,
    myNFT,
    selectedNFT,
    myBreedingOrder,
    selectedBreedingOrder
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchRequest: (contractAddress: string, tokenId: string) =>
    dispatch(fetchNFTRequest(contractAddress, tokenId)),
  onSelectNFTForBreeding: (nft: NFT) =>
    dispatch(selectNFTForBreedingRequest(nft)),
})

export default connect(mapState, mapDispatch)(BreedingCenterPage)

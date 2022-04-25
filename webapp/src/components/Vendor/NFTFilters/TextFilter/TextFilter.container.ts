import { connect } from 'react-redux'
import { RootState } from '../../../../modules/reducer'
import { getNFTs } from '../../../../modules/ui/nft/browse/selectors'
import { MapStateProps } from './TextFilter.types'
import TextFilter from './TextFilter'


const mapState = (state: RootState): MapStateProps => ({
  nfts: getNFTs(state)
})



export default connect(mapState)(TextFilter)

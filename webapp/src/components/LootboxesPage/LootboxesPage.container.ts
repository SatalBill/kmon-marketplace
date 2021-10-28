import { connect } from 'react-redux'

import { RootState } from '../../modules/reducer'
import { getIsFullscreen, getVendor } from '../../modules/routing/selectors'
import { MapStateProps } from './LootboxesPage.types'
import LootboxesPage from './LootboxesPage'

const mapState = (state: RootState): MapStateProps => ({
  vendor: getVendor(state),
  isFullscreen: getIsFullscreen(state)
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(LootboxesPage)

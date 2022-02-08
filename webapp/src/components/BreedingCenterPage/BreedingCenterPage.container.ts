import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps } from './BreedingCenterPage.types'
import BreedingCenterPage from './BreedingCenterPage'

const mapState = (): MapStateProps => {}

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(BreedingCenterPage)

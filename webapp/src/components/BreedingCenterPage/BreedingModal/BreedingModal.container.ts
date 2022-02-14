import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps } from './BreedingModal.types'
import BreedingModal from './BreedingModal'

const mapState = (): MapStateProps => {}

const mapDispatch = (): MapDispatchProps => {}

export default connect(mapState, mapDispatch)(BreedingModal)

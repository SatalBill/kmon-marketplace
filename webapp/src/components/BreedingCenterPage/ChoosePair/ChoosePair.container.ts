import { connect } from 'react-redux'
import { MapStateProps, MapDispatchProps } from './ChoosePair.types'
import ChoosePair from './ChoosePair'

const mapState = (): MapStateProps => {}

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(ChoosePair)

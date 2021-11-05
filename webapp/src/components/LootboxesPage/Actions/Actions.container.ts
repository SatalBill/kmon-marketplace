import { connect } from 'react-redux'

import { MapStateProps } from './Actions.types'
import Actions from './Actions'

const mapState = (_: any): MapStateProps => ({})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Actions)

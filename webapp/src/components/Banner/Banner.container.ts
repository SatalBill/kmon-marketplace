import { connect } from 'react-redux'
import {
  isConnected
} from '@kmon/dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { MapStateProps, MapDispatchProps } from './Banner.types'
import Banner from './Banner'

const mapState = (state: RootState): MapStateProps => {
  return {
    isSignedIn: isConnected(state)
  }
}

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(Banner)

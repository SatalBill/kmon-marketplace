import { connect } from 'react-redux'

import { RootState } from '../../../modules/reducer'
import { browseNFTs } from '../../../modules/routing/actions'
import {
  getVendor,
  getSection,
  getPathname,
  getElemTypes,
  getAffection,
  getSpecialties,
  getSuper,
  getBraveness,
  getConstitution,
  getCraziness,
  getElementStartingTalent,
  getHunger,
  getInstinct,
  getLaziness,
  getSmart,
  getBodySize,
  getEgo,
  getHealthPoints,
  getSpeed,
  getSex,
  getSkinType
} from '../../../modules/routing/selectors'
import {
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './NFTSidebar.types'
import NFTSidebar from './NFTSidebar'

const mapState = (state: RootState): MapStateProps => ({
  vendor: getVendor(state),
  section: getSection(state),
  pathname: getPathname(state),
  elemTypes: getElemTypes(state),
  affection: getAffection(state),
  specialties: getSpecialties(state),
  supers: getSuper(state),
  braveness: getBraveness(state),
  constitution: getConstitution(state),
  craziness: getCraziness(state),
  hunger: getHunger(state),
  instinct: getInstinct(state),
  smart: getSmart(state),
  elementStartingTalent: getElementStartingTalent(state),
  laziness: getLaziness(state),
  bodySize: getBodySize(state),
  ego: getEgo(state),
  healthPoints: getHealthPoints(state),
  speed: getSpeed(state),
  sex: getSex(state),
  skinType: getSkinType(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onBrowse: options => {
    return dispatch(browseNFTs(options))
  }
})

export default connect(mapState, mapDispatch)(NFTSidebar)

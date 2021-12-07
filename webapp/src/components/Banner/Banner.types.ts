import { Dispatch } from 'redux'

export type Props = {
  isSignedIn: boolean
}

export type MapStateProps = Pick<
  Props,
  'isSignedIn'
>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch

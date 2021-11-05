import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'

import { LootboxPrices, LootboxType } from '../../../modules/lootbox/types'

export type Params = {
  address?: string
  boxType?: string
}

export type Props = {
  address?: string
  isConnecting: boolean
  boxPrice: string | undefined
  boxType: LootboxType
  onRedirect: (path: string) => void
}

export type MapStateProps = Pick<
  Props,
  'address' | 'isConnecting' | 'boxType' | 'boxPrice'
>
export type MapDispatchProps = Pick<
  Props,
  'onRedirect'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction
>

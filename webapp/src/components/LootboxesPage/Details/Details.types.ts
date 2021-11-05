import React from 'react'

import { LootboxType } from '../../../modules/lootbox/types'

export type Props = {
  boxType: LootboxType
}

export type ItemProps = {
  title: string
  children: React.ReactNode
}

export type MapStateProps = Pick<Props, 'boxType'>
export type MapDispatchProps = {}

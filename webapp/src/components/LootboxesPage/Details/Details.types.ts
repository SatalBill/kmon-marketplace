import React from 'react'
import { ItemVersion } from '../../../modules/item/constants'

export type Props = {
  name: string
  price: string
  isTxPending: boolean
  onBuyItem: (version: ItemVersion) => void
}

export type ItemProps = {
  title: string
  children: React.ReactNode
}

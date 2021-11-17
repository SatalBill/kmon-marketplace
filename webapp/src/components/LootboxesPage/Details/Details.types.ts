import React from 'react'
import { Address } from 'web3x-es/address'

import { LootboxType } from '../../../modules/lootbox/types'

export type Props = {
  boxType: LootboxType
  boxPrice: string
  isTxPending: boolean
  onBuy: () => void
}

export type ItemProps = {
  title: string
  children: React.ReactNode
}

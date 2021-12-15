import React from 'react'

export type Props = {
  name: string
  price: string
  isTxPending: boolean
  onBuy: () => void
}

export type ItemProps = {
  title: string
  children: React.ReactNode
}

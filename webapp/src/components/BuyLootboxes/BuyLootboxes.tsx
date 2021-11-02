import React from 'react'
import { Button } from '@kmon/ui'

import { Address } from 'web3x-es/address'
import { BuyLootboxParams, LootboxType } from '../../modules/lootbox/types'
import { Props } from './BuyLootboxes.types'

import './BuyLootboxes.css'

const BuyLootboxes = (props: Props) => {
  const { basicPrice, mediumPrice, premiumPrice, onBuyLootbox } = props

  const handleClickBasic = () => {
    const params: BuyLootboxParams = {
      to: Address.ZERO,
      boxType: LootboxType.Basic,
      boxPrice: basicPrice
    }
    onBuyLootbox(params)
  }

  const handleClickMedium = () => {
    const params: BuyLootboxParams = {
      to: Address.ZERO,
      boxType: LootboxType.Medium,
      boxPrice: mediumPrice
    }
    onBuyLootbox(params)
  }

  const handleClickPremium = () => {
    const params: BuyLootboxParams = {
      to: Address.ZERO,
      boxType: LootboxType.Premium,
      boxPrice: premiumPrice
    }
    onBuyLootbox(params)
  }

  return (
    <div className="BuyLootboxes">
      <Button primary onClick={handleClickBasic}>Basic</Button>
      <Button primary onClick={handleClickMedium}>Medium</Button>
      <Button primary onClick={handleClickPremium}>Premium</Button>
    </div>
  )
}

export default React.memo(BuyLootboxes)

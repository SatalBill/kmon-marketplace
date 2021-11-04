import React, { useState } from 'react'
import { Button, Loader } from '@kmon/ui'

import { Address } from 'web3x-es/address'
import { BuyLootboxParams, LootboxType } from '../../modules/lootbox/types'
import { Props } from './BuyLootboxes.types'

import './BuyLootboxes.css'

const BuyLootboxes = (props: Props) => {
  const {
    basicPrice,
    mediumPrice,
    premiumPrice,
    isTxPending,
    txStatus,
    onBuyLootbox
  } = props

  const [activeLootboxType, setActiveLootboxType] = useState(LootboxType.Basic)

  const isBasicPending = activeLootboxType === LootboxType.Basic && isTxPending
  const isMediumPending = activeLootboxType === LootboxType.Medium && isTxPending
  const isPremiumPending = activeLootboxType === LootboxType.Premium && isTxPending

  const handleClickBasic = () => {
    const params: BuyLootboxParams = {
      to: Address.ZERO,
      boxType: LootboxType.Basic,
      boxPrice: basicPrice
    }
    onBuyLootbox(params)
    setActiveLootboxType(LootboxType.Basic)
  }

  const handleClickMedium = () => {
    const params: BuyLootboxParams = {
      to: Address.ZERO,
      boxType: LootboxType.Medium,
      boxPrice: mediumPrice
    }
    onBuyLootbox(params)
    setActiveLootboxType(LootboxType.Medium)
  }

  const handleClickPremium = () => {
    const params: BuyLootboxParams = {
      to: Address.ZERO,
      boxType: LootboxType.Premium,
      boxPrice: premiumPrice
    }
    onBuyLootbox(params)
    setActiveLootboxType(LootboxType.Premium)
  }

  return (
    <div className="BuyLootboxes">
      <Button primary onClick={handleClickBasic} disabled={isBasicPending}>Basic</Button>
      <Button primary onClick={handleClickMedium} disabled={isMediumPending}>Medium</Button>
      <Button primary onClick={handleClickPremium} disabled={isPremiumPending}>Premium</Button>

      <Loader active={isTxPending} size="massive" />
    </div>
  )
}

export default React.memo(BuyLootboxes)

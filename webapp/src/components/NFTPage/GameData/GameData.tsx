import React from 'react'
import { Props } from './GameData.types'
import './GameData.css'
import { isMobile } from '@kmon/dapps/dist/lib/utils'

const GameData = (props: Props) => {
  const { nft } = props
  const data = nft.gameMetadata

  const arr = [
    { title: 'Main Family Talent', value: data?.mainFamilyTalentPropertyName },
    { title: 'Second Family Talent', value: data?.secondaryFamilyTalentPropertyName },
    { title: 'Constitution', value: data?.constitution },
    { title: 'Defense', value: data?.defense },
    { title: 'Feeding', value: data?.feedingGaugeAmount },
    { title: 'Happiness', value: data?.hapinessGaugeAmount },
    { title: 'Healing', value: data?.healingGaugeAmount },
    { title: 'Love', value: data?.loveGaugeAmount },
    { title: 'Freeze', value: data?.isFreezed },
    { title: 'Main Element', value: data?.mainElementType },
    { title: 'Secondary Element', value: data?.secondaryElementType },
  ]

  return (
    <div className="elems-container">
      {arr.map(({ title, value }) => {
        return (
          <div key={title} className="elem-row">
            <div className="game-row-text">{title}:</div>
            <div className="game-row-value">{value}</div>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(GameData)

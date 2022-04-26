import React from 'react'
import { Props } from './GameData.types'
import './GameData.css'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const GameData = (props: Props) => {
  const { nft } = props
  const data = nft.gameMetadata

  const arr = [
    { title: t('menu.main_family_talent'), value: data?.mainFamilyTalentPropertyName },
    { title: t('menu.second_family_talent'), value: data?.secondaryFamilyTalentPropertyName },
    { title: t('menu.constitution'), value: data?.constitution },
    { title: t('menu.defense'), value: data?.defense },
    { title: t('menu.feeding'), value: data?.feedingGaugeAmount },
    { title: t('menu.happiness'), value: data?.hapinessGaugeAmount },
    { title: t('menu.healing'), value: data?.healingGaugeAmount },
    { title: t('menu.love'), value: data?.loveGaugeAmount },
    { title: t('menu.freeze'), value: data?.isFreezed },
    { title: t('menu.main_element'), value: data?.mainElementType },
    { title: t('menu.secondary_element'), value: data?.secondaryElementType },
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

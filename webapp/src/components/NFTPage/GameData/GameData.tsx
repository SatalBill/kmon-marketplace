import React, { useEffect, useState } from 'react'
import { Props } from './GameData.types'
import './GameData.css'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const GameData = (props: Props) => {
  const { nft } = props
  //const data = nft?.gameMetadata ?? 0
  const [gameData, setGameData] = useState(nft.gameMetadata);

  useEffect(() => {
    nft.gameMetadata ? setGameData(nft.gameMetadata) : setGameData(gameData)
  }, [nft])

  const arr = [
    { title: t('menu.main_family_talent'), value: gameData?.mainFamilyTalentPropertyName },
    { title: t('menu.second_family_talent'), value: gameData?.secondaryFamilyTalentPropertyName },
    { title: t('menu.constitution'), value: gameData?.constitution },
    { title: t('menu.defense'), value: gameData?.defense },
    { title: t('menu.feeding'), value: gameData?.feedingGaugeAmount },
    { title: t('menu.happiness'), value: gameData?.hapinessGaugeAmount },
    { title: t('menu.healing'), value: gameData?.healingGaugeAmount },
    { title: t('menu.love'), value: gameData?.loveGaugeAmount },
    { title: t('menu.freeze'), value: gameData?.isFreezed },
    { title: t('menu.main_element'), value: gameData?.mainElementType },
    { title: t('menu.secondary_element'), value: gameData?.secondaryElementType },
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

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

  // const arr = [
  //   { title: t('menu.main_family_talent'), value: gameData?.mainFamilyTalentPropertyName },
  //   { title: t('menu.second_family_talent'), value: gameData?.secondaryFamilyTalentPropertyName },
  //   { title: t('menu.constitution'), value: gameData?.constitution },
  //   { title: t('menu.defense'), value: gameData?.defense },
  //   { title: t('menu.feeding'), value: gameData?.feedingGaugeAmount },
  //   { title: t('menu.happiness'), value: gameData?.hapinessGaugeAmount },
  //   { title: t('menu.healing'), value: gameData?.healingGaugeAmount },
  //   { title: t('menu.love'), value: gameData?.loveGaugeAmount },
  //   { title: t('menu.freeze'), value: gameData?.isFreezed },
  //   { title: t('menu.main_element'), value: gameData?.mainElementType },
  //   { title: t('menu.secondary_element'), value: gameData?.secondaryElementType },
  // ]

  const arr1 = [
    { title: t('menu.main_family_talent'), value: gameData?.mainFamilyTalentPropertyName },
    { title: t('menu.second_family_talent'), value: gameData?.secondaryFamilyTalentPropertyName },
    { title: t('menu.attack'), value: gameData?.attackLevel },
    { title: t('menu.defense'), value: gameData?.defense },
    { title: t('menu.stamina'), value: gameData?.hpLevel },
  ]

  const arr2 = [
    { title: t('menu.love'), value: `${gameData?.loveGaugeAmount}` },
    { title: t('menu.feeding'), value: `${gameData?.feedingGaugeAmount}` },
    { title: t('menu.healing'), value: `${gameData?.healingGaugeAmount}` },
    { title: t('menu.happiness'), value: `${gameData?.hapinessGaugeAmount}` },
    { title: t('menu.freeze'), value: gameData?.isFreezed == 1 ? t('menu.keys.Yes') : t('menu.keys.No') },
  ]

  return (
    <div className="gamedata-container">
      <div className="gamedata-subcontainer">
        <div className="gamedata-title">{t('menu.training')} ({t('global.max')} lvl 50)</div>
        {arr1.map(({ title, value }) => {
          return (
            <div key={title} className="elem-row">
              <div className="game-row-text">{title}:</div>
              <div className="game-row-value">{value}</div>
            </div>
          )
        })}
      </div>
      <div className="gamedata-subcontainer">
        <div className="gamedata-title">{t('menu.caring')}</div>
        {arr2.map(({ title, value }) => {
          return (
            <div key={title} className="elem-row">
              <div className="game-row-text">{title}:</div>
              <div className="game-row-value">{value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(GameData)

import React from 'react'
import { Props } from './ElemData.types'
import './ElemData.css'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const ElemData = (props: Props) => {
  const { nft, isV2 } = props
  const data = isV2 ? nft.genesV2 : nft.data.kryptomon?.genes
  const timeBorn = nft.data.kryptomon?.timeBorn
  const date = new Date(1970, 0, 1)
  date.setSeconds(timeBorn || 0)
  const [formatedDate] = date
    .toISOString()
    .split('-')
    .join('-')
    .split('T')
  const birthDateInFormat = formatedDate
    .split('-')
    .reverse()
    .join('-')

  const age = new Date(Date.now() - timeBorn! * 1000).getMonth()
  const lastEvolvedTime = nft.data.kryptomon?.lastEvolved != null ? nft.data.kryptomon?.lastEvolved : nft.data.kryptomon?.timeHatched;
  const lastEvolved = new Date(lastEvolvedTime! * 1000).toLocaleDateString();
  const lastEvolvedTitle = nft.data.kryptomon?.status == "1" ? t('menu.keys.hatched') : parseInt(nft.data.kryptomon!.status) > 1 ? t('menu.keys.last_evolved') : undefined

  const whatTheSex = (value?: string | number) => {
    if (value && +value > 5) return t('menu.keys.Male')
    else return t('menu.keys.Female')
  }
  const skinTypeToString: Record<string, string> = {
    '0': t('menu.keys.Feather'),
    '1': t('menu.keys.Skin'),
    '2': t('menu.keys.Scale'),
    '3': t('menu.keys.Short hairs'),
    '4': t('menu.keys.Long hairs')
  }
  const arr = [
    { title: t('menu.water_talent'), value: data?.waterTalent },
    { title: t('menu.fire_talent'), value: data?.fireTalent },
    { title: t('menu.ground_talent'), value: data?.groundTalent },
    { title: t('menu.ice_talent'), value: data?.iceTalent },
    { title: t('menu.grass_talent'), value: data?.grassTalent },
    { title: t('menu.electro_talent'), value: data?.electroTalent },
    { title: t('menu.ghost_talent'), value: data?.ghostTalent },
    { title: t('menu.air_talent'), value: data?.airTalent },
    { title: t('menu.body_size'), value: data?.bodySize },
    { title: t('menu.attack'), value: data?.attack },
    { title: t('menu.defense'), value: data?.defense },
    { title: t('menu.ego'), value: data?.ego },
    { title: t('menu.general_talent'), value: data?.generalTalent },
    { title: 'xFactor', value: data?.xFactor },
    { title: t('menu.growth_talent_factor'), value: data?.growthTalentFactor },
    { title: t('menu.health_points'), value: data?.healthPoints },
    { title: t('menu.sex'), value: whatTheSex(data?.sex) },
    { title: t('menu.skin_type'), value: skinTypeToString[data?.skinType || 0] },
    { title: t('menu.special'), value: data?.special },
    { title: t('menu.speed'), value: data?.speed },
    { title: t('menu.age_months'), value: age },
  ]

  if (lastEvolvedTitle) {
    arr.push({ title: lastEvolvedTitle, value: lastEvolved });
  }

  return (
    <div className="elems-container">
      {arr.map(({ title, value }) => {
        return (
          <div key={title} className="elem-row">
            <div className="elem-row-text">{title}:</div>
            <div className="elem-row-value">{value}</div>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(ElemData)

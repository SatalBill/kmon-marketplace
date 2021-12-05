import React, { useCallback } from 'react'

import { Section } from '../../../modules/vendor/routing/types'
import { Section as DecentralandSection } from '../../../modules/vendor/decentraland/routing/types'
import { VendorName } from '../../../modules/vendor/types'
import { NFTSidebar as DecentralandNFTSidebar } from '../decentraland/NFTSidebar'
import { PartnerSidebar } from '../PartnerSidebar'
import { Props } from './NFTSidebar.types'

export type MultipleFilters = {
  elemTypes?: string[]
  specialties?: string[]
  supers?: string[]
  generation?: string[]
  affection?: string[]
  braveness?: string[]
  constitution?: string[]
  craziness?: string[]
  hunger?: string[]
  instinct?: string[]
  smart?: string[]
  elementStartingTalent?: string[]
  laziness?: string[]
  bodySize?: string[]
  ego?: string[]
  healthPoints?: string[]
  speed?: string[]
  sex?: string[]
  skinType?: string[]
  water?: string[]
  waterTalent?: string[]
  fire?: string[]
  fireTalent?: string[]
  ground?: string[]
  groundTalent?: string[]
  ice?: string[]
  iceTalent?: string[]
  grass?: string[]
  grassTalent?: string[]
  electro?: string[]
  electroTalent?: string[]
  ghost?: string[]
  ghostTalent?: string[]
  air?: string[]
  airTalent?: string[]
  color?: string[]
  attack?: string[]
  defence?: string[]
  generalTalent?: string[]
  growthTalentFactor?: string[]
  elementPercentage?: string[]
  special?: string[]
}

const NFTSidebar = (props: Props) => {
  const {
    vendor,
    section,
    onBrowse,
    pathname,
    elemTypes,
    generation,
    affection,
    specialties,
    supers,
    braveness,
    constitution,
    craziness,
    hunger,
    instinct,
    smart,
    elementStartingTalent,
    laziness,
    bodySize,
    ego,
    speed,
    healthPoints,
    sex,
    skinType,
    water,
    waterTalent,
    fire,
    fireTalent,
    ground,
    groundTalent,
    ice,
    iceTalent,
    grass,
    grassTalent,
    electro,
    electroTalent,
    ghost,
    ghostTalent,
    air,
    airTalent,
    color,
    attack,
    defence,
    generalTalent,
    growthTalentFactor,
    elementPercentage,
    special
  } = props

  const kryptomonStatus = pathname === '/kryptomons' ? '1' : '0'

  const handleOnBrowse = useCallback(
    (section: Section) => {
      if (pathname === '/account') {
        onBrowse({
          section
        })
      } else {
        onBrowse({ section, kryptomonStatus })
      }
    },
    [onBrowse]
  )

  const handleOnBrowseMultiple = useCallback(
    (data: MultipleFilters) => {
      if (pathname === '/account') {
        onBrowse({
          ...data
        })
      } else {
        onBrowse({
          ...data,
          kryptomonStatus
        })
      }
    },
    [onBrowse]
  )

  switch (vendor) {
    case VendorName.SUPER_RARE:
    case VendorName.MAKERS_PLACE:
    case VendorName.KNOWN_ORIGIN:
      return (
        <PartnerSidebar
          section={section}
          vendor={vendor}
          onMenuItemClick={handleOnBrowse}
          onMultiItemClick={handleOnBrowseMultiple}
        />
      )
    case VendorName.DECENTRALAND:
    case VendorName.KRYPTOMON:
    default:
      return (
        <DecentralandNFTSidebar
          section={section as DecentralandSection}
          onMenuItemClick={handleOnBrowse}
          onMultiItemClick={handleOnBrowseMultiple}
          elemTypes={elemTypes}
          generation={generation}
          affection={affection}
          specialties={specialties}
          supers={supers}
          braveness={braveness}
          constitution={constitution}
          craziness={craziness}
          hunger={hunger}
          instinct={instinct}
          smart={smart}
          elementStartingTalent={elementStartingTalent}
          laziness={laziness}
          bodySize={bodySize}
          ego={ego}
          speed={speed}
          healthPoints={healthPoints}
          sex={sex}
          skinType={skinType}
          water={water}
          waterTalent={waterTalent}
          fire={fire}
          fireTalent={fireTalent}
          ground={ground}
          groundTalent={groundTalent}
          ice={ice}
          iceTalent={iceTalent}
          grass={grass}
          grassTalent={grassTalent}
          electro={electro}
          electroTalent={electroTalent}
          ghost={ghost}
          ghostTalent={ghostTalent}
          air={air}
          airTalent={airTalent}
          color={color}
          attack={attack}
          defence={defence}
          generalTalent={generalTalent}
          growthTalentFactor={growthTalentFactor}
          elementPercentage={elementPercentage}
          special={special}
        />
      )
  }
}

export default React.memo(NFTSidebar)

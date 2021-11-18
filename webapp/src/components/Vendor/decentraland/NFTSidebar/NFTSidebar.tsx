import React from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Header } from '@kmon/ui'

import { NFTSections } from '../NFTSections'
import { Props } from './NFTSidebar.types'
import './NFTSidebar.css'

const NFTSidebar = (props: Props) => {
  const {
    section,
    onMenuItemClick,
    onMultiItemClick,
    elemTypes,
    specialties,
    supers,
    affection,
    braveness,
    constitution,
    craziness,
    hunger,
    instinct,
    smart,
    elementStartingTalent,
    laziness
  } = props

  return (
    <div className="NFTSidebar">
      <Header sub>{t('nft_sidebar.categories')}</Header>
      <NFTSections
        section={section}
        onSectionClick={onMenuItemClick}
        onMultiItemClick={onMultiItemClick}
        elemTypes={elemTypes}
        specialties={specialties}
        supers={supers}
        affection={affection}
        braveness={braveness}
        constitution={constitution}
        craziness={craziness}
        hunger={hunger}
        instinct={instinct}
        smart={smart}
        elementStartingTalent={elementStartingTalent}
        laziness={laziness}
      />
    </div>
  )
}

export default React.memo(NFTSidebar)

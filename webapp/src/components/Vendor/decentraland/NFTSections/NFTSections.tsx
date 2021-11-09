import React from 'react'

import { Section } from '../../../../modules/vendor/decentraland/routing/types'
import { Menu } from '../../../Menu'
import { MenuItem } from '../../../Menu/MenuItem'
import { MultiRangeSlider } from '../../../Menu/MultiRangeSlider'
import { Props } from './NFTSections.types'

const NFTSections = (props: Props) => {
  const { section, onSectionClick } = props

  return (
    <Menu className="NFTSections">
      {[Section.ALL, Section.POPULAR, Section.NEWEST].map(menuSection => (
        <MenuItem
          key={menuSection}
          value={menuSection}
          currentValue={section}
          onClick={onSectionClick}
        />
      ))}

      {[Section.LAND, Section.PARCELS, Section.ESTATES].includes(section!)
        ? [Section.PARCELS, Section.ESTATES].map(menuSection => (
            <MenuItem
              key={menuSection}
              value={menuSection}
              currentValue={section}
              onClick={onSectionClick}
              nestedLevel={1}
            />
          ))
        : null}

      <MenuItem
        value={Section.GENERATIONS}
        currentValue={section}
        onClick={onSectionClick}
      />
      {[
        Section.GENERATIONS,
        Section.GENERATIONS_0,
        Section.GENERATIONS_1,
        Section.GENERATIONS_2,
        Section.GENERATIONS_3,
        Section.GENERATIONS_4,
        Section.GENERATIONS_5,
        Section.GENERATIONS_6,
        Section.GENERATIONS_7,
        Section.GENERATIONS_8,
        Section.GENERATIONS_9
      ].includes(section!) ? (
        <>
          {[
            Section.GENERATIONS_0,
            Section.GENERATIONS_1,
            Section.GENERATIONS_2,
            Section.GENERATIONS_3,
            Section.GENERATIONS_4,
            Section.GENERATIONS_5,
            Section.GENERATIONS_6,
            Section.GENERATIONS_7,
            Section.GENERATIONS_8,
            Section.GENERATIONS_9
          ].map(menuSection => (
            <MenuItem
              key={menuSection}
              value={menuSection}
              currentValue={section}
              onClick={onSectionClick}
              nestedLevel={1}
            />
          ))}
        </>
      ) : null}
      <MultiRangeSlider
        min={0}
        max={100}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      />
    </Menu>
  )
}

export default React.memo(NFTSections)

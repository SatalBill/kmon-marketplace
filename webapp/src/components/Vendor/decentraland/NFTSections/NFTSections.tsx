import React, { useState, useEffect } from 'react'

import { Section } from '../../../../modules/vendor/decentraland/routing/types'
import { Menu } from '../../../Menu'
import { MenuItem } from '../../../Menu/MenuItem'
import { MultiRangeSlider } from '../../../Menu/MultiRangeSlider'
import { Dropdown } from '../../../Menu/Dropdown'
import { Checkbox, CheckboxContainer } from '../../../Checkbox'
import {
  ELEM_TYPE,
  SPECIALTIES,
  SUPERS,
  SKIN_TYPES,
  SEXES
} from './NFTSection.data'
import { Props } from './NFTSections.types'

const NFTSections = (props: Props) => {
  const {
    section,
    onSectionClick,
    onMultiItemClick,
    elemTypes = [],
    specialties = [],
    supers = [],
    affection = [],
    braveness = [],
    constitution = [],
    craziness = [],
    hunger = [],
    instinct = [],
    smart = [],
    elementStartingTalent = [],
    laziness = [],
    bodySize = [],
    ego = [],
    healthPoints = [],
    speed = [],
    sex = [],
    skinType = []
  } = props
  const [state, setState] = useState({
    elemTypes,
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
    healthPoints,
    speed,
    sex,
    skinType
  })

  useEffect(() => {
    onMultiItemClick(state)
  }, [state])

  const handleStateChange = (
    min: number,
    max: number,
    field: string,
    maxAllow = 100
  ) => {
    if (min === 0 && max === maxAllow) {
      setState({
        ...state,
        [field]: []
      })
    } else {
      setState({
        ...state,
        [field]: [min.toString(), max.toString()]
      })
    }
  }

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
      <Dropdown value={Section.GENERATIONS}>
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
      </Dropdown>
      <Dropdown value={Section.ELEMENT_TYPE} open={state.elemTypes.length > 0}>
        <CheckboxContainer>
          {ELEM_TYPE.map(elem => (
            <Checkbox
              key={elem}
              checked={state.elemTypes.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.elemTypes.indexOf(elem) > -1) {
                  const newArr = [...state.elemTypes]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, elemTypes: newArr })
                } else {
                  const newArr = [...state.elemTypes, elem]
                  setState({ ...state, elemTypes: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown value={Section.SPECIALTY} open={state.specialties.length > 0}>
        <CheckboxContainer>
          {SPECIALTIES.map(elem => (
            <Checkbox
              key={elem}
              checked={state.specialties.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.specialties.indexOf(elem) > -1) {
                  const newArr = [...state.specialties]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, specialties: newArr })
                } else {
                  const newArr = [...state.specialties, elem]
                  setState({ ...state, specialties: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown value={Section.SKIN_TYPE} open={state.skinType.length > 0}>
        <CheckboxContainer>
          {SKIN_TYPES.map(elem => (
            <Checkbox
              key={elem}
              checked={state.skinType.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.skinType.indexOf(elem) > -1) {
                  const newArr = [...state.skinType]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, skinType: newArr })
                } else {
                  const newArr = [...state.skinType, elem]
                  setState({ ...state, skinType: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      <Dropdown value={Section.SEX} open={state.sex.length > 0}>
        <CheckboxContainer>
          {SEXES.map(elem => (
            <Checkbox
              key={elem}
              checked={state.sex.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.sex.indexOf(elem) > -1) {
                  const newArr = [...state.sex]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, sex: newArr })
                } else {
                  const newArr = [...state.sex, elem]
                  setState({ ...state, sex: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown>
      {/* <Dropdown value={Section.SUPER} open={state.supers.length > 0}>
        <CheckboxContainer>
          {SUPERS.map(elem => (
            <Checkbox
              key={elem}
              checked={state.supers.indexOf(elem) > -1}
              label={elem}
              onChange={() => {
                if (state.supers.indexOf(elem) > -1) {
                  const newArr = [...state.supers]
                  newArr.splice(newArr.indexOf(elem), 1)
                  setState({ ...state, supers: newArr })
                } else {
                  const newArr = [...state.supers, elem]
                  setState({ ...state, supers: newArr })
                }
              }}
            />
          ))}
        </CheckboxContainer>
      </Dropdown> */}
      <Dropdown value={Section.AFFECTION} open={state.affection.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.affection[0] || 0}
          maxValue={+state.affection[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'affection')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.BRAVENESS} open={state.braveness.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.braveness[0] || 0}
          maxValue={+state.braveness[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'braveness')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.CONSTITUTION}
        open={state.constitution.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.constitution[0] || 0}
          maxValue={+state.constitution[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'constitution')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.CRAZINESS} open={state.craziness.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.craziness[0] || 0}
          maxValue={+state.craziness[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'craziness')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.HUNGER} open={state.hunger.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.hunger[0] || 0}
          maxValue={+state.hunger[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'hunger')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.INSTINCT} open={state.instinct.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.instinct[0] || 0}
          maxValue={+state.instinct[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'instinct')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.SMART} open={state.smart.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.smart[0] || 0}
          maxValue={+state.smart[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'smart')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.ELEMENT_STARTING_TALENT}
        open={state.elementStartingTalent.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={1000}
          minValue={+state.elementStartingTalent[0] || 0}
          maxValue={+state.elementStartingTalent[1] || 1000}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'elementStartingTalent', 1000)
          }}
        />
      </Dropdown>
      <Dropdown value={Section.LAZINESS} open={state.laziness.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.laziness[0] || 0}
          maxValue={+state.laziness[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'laziness')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.BODY_SIZE} open={state.bodySize.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.bodySize[0] || 0}
          maxValue={+state.bodySize[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'bodySize')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.EGO} open={state.ego.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.ego[0] || 0}
          maxValue={+state.ego[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'ego')
          }}
        />
      </Dropdown>
      <Dropdown
        value={Section.HEALTH_POINTS}
        open={state.healthPoints.length > 0}
      >
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.healthPoints[0] || 0}
          maxValue={+state.healthPoints[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'healthPoints')
          }}
        />
      </Dropdown>
      <Dropdown value={Section.SPEED} open={state.speed.length > 0}>
        <MultiRangeSlider
          min={0}
          max={100}
          minValue={+state.speed[0] || 0}
          maxValue={+state.speed[1] || 100}
          onChange={({ min, max }) => {
            handleStateChange(min, max, 'speed')
          }}
        />
      </Dropdown>
    </Menu>
  )
}

export default React.memo(NFTSections)

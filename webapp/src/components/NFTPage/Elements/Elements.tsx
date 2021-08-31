import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import { Card } from 'decentraland-ui'

import { formatMANA } from '../../../lib/mana'
import { locations } from '../../../modules/routing/locations'
import { getNFTName } from '../../../modules/nft/utils'
import { NFTImage } from '../../NFTImage'
import { Props } from './Elements.types'
import './Elements.css'

import Ice from '../../../images/egg/elem-ice.svg'
import Air from '../../../images/egg/elem-air.svg'
import Electro from '../../../images/egg/elem-electro.svg'
import Ghost from '../../../images/egg/elem-ghost.svg'
import Grass from '../../../images/egg/elem-grass.svg'
import Ground from '../../../images/egg/elem-ground.svg'
import Water from '../../../images/egg/elem-water.svg'
import Fire from '../../../images/egg/elem-fire.svg'

const data = [
  {
    title: 'Water',
    value: Math.floor(Math.random() * 100),
    icon: Water
  },
  {
    title: 'Grass',
    value: Math.floor(Math.random() * 100),
    icon: Grass
  },
  {
    title: 'Fire',
    value: Math.floor(Math.random() * 100),
    icon: Fire
  },
  {
    title: 'Electro',
    value: Math.floor(Math.random() * 100),
    icon: Electro
  },
  {
    title: 'Ground',
    value: Math.floor(Math.random() * 100),
    icon: Ground
  },
  {
    title: 'Ghost',
    value: Math.floor(Math.random() * 100),
    icon: Ghost
  },
  {
    title: 'Ice',
    value: Math.floor(Math.random() * 100),
    icon: Ice
  },
  {
    title: 'Air',
    value: Math.floor(Math.random() * 100),
    icon: Air
  }
]
const max = data.reduce((prev, current) => {
  return prev.value > current.value ? prev : current
})
console.log({ max })

const Elements = (props: Props) => {
  const { nft, order } = props

  const title = getNFTName(nft)
  const { parcel, estate, wearable, ens } = nft.data
  console.log({ nft, order })

  return (
    <div className="container">
      <div className="top-element">
        <img className="top-element-icon" src={max.icon} alt="icon" />
        <p className="top-element-text">
          {max.title}
          <br />
          {max.value}%
        </p>
      </div>
      <div className="bottom-elements">
        {data.map((element, index) => {
          return (
            <div className="bottom-element" key={index}>
              <img
                className="bottom-element-icon"
                src={element.icon}
                alt="icon"
              />
              <p className="bottom-element-text">
                {element.title}
                <br />
                {element.value}%
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(Elements)

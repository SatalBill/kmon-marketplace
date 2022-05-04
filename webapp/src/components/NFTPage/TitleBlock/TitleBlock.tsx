import React from 'react'
import { Props } from './TitleBlock.types'
import './TitleBlock.css'

const TitleBlock = (props: Props) => {
  const { title, children, right, icon } = props

  return (
    <div className="block-container">
      <div className="title-container">
        <div className="title-area">
          {icon && <img src={icon} alt="elemental-power" className="title-icon" />}
          <h6 className="title">{title}</h6>
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}

export default TitleBlock

import React from 'react'
import { Props } from './TitleBlock.types'
import './TitleBlock.css'

const TitleBlock = (props: Props) => {
  const { title, children } = props

  return (
    <div className="title-container">
      <h6 className="title">{title}</h6>
      <div>{children}</div>
    </div>
  )
}

export default TitleBlock

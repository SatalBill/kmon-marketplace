import React, { useState } from 'react'
import { Props } from './DescriptionBlock.types'
import './DescriptionBlock.css'

const DescriptionBlock = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { text } = props

  const onOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className="container">
      <div className="hidden-text">
        {text} {!isOpen && <div className="hidden-text-blur" />}
      </div>
      {!isOpen && (
        <button onClick={onOpen} className="more-button">
          More
        </button>
      )}
    </div>
  )
}

export default DescriptionBlock

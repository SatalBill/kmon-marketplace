import React, { useState } from 'react'

import { MenuItem } from '../MenuItem'
import { Props } from './Dropdown.types'
import './Dropdown.css'

const Dropdown = ({ value, children, open, main }: Props) => {
  const [isOpen, setIsOpen] = useState(open || false)

  const classNames: string[] = ['dropdown']

  if (!main) {
    classNames.push('sub')
  }

  const onDropdownClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={classNames.join('-')}>
      <MenuItem value={value} onClick={onDropdownClick} withCaret={true} main={main} />
      {isOpen && children}
    </div>
  )
}

export default React.memo(Dropdown) as typeof Dropdown

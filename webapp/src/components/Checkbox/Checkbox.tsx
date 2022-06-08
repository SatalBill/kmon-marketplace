import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import classnames from 'classnames'
import { Props } from './Checkbox.types'
import Checkmark from './Checkmark.svg'
import './Checkbox.css'

const Checkbox: FC<Props> = ({ checked, label, onChange, icon }) => {
  const handleCheckboxClick = () => {
    onChange({ checked: !checked, label })
  }

  return (
    <div className="checkbox-container">
      <div
        className={classnames('checkbox-passive', checked && 'checkbox-active')}
        onClick={handleCheckboxClick}
      >
        <div className={classnames(checked ? 'icon' : 'hidden-icon')}>
          <img src={Checkmark} />
        </div>
      </div>
      {icon ? <div className="labelContainer">
        <p className="label">{label}</p>
        <img
          className="product-type-icon-details"
          src={icon}
          alt="icon"
        />
      </div> : <p className="label">{label}</p>}
    </div>
  )
}

export default Checkbox

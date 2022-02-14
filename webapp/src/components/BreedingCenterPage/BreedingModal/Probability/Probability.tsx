import React from 'react'

import { Props } from './Probability.types'
import './Probability.css'

const Probability = (props: Props) => {
  const {} = props

  const classes = ['kryptomon', 'breeding-modal-probability']
  return (
    <div className={classes.join(" ")}>
      <div className="value">
        Probabilty factor 56%
      </div>
    </div>
  )
}

export default React.memo(Probability)

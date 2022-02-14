import React from 'react'
import { Button } from '@kmon/ui'

import { Props } from './Fee.types'
import './Fee.css'

const Fee = (props: Props) => {
  const {} = props

  const classes = ['kryptomon', 'breeding-modal-fee']
  return (
    <div className={classes.join(" ")}>
      <div className="fee-detail">
        <div className="fee-detail-info">
          Breeding Fee: 1234 KMON<br />
          Total Cost: 2345 KMON
        </div>
        <Button primary className="breed-button">BREED</Button>
        <Button>CANCEL</Button>
      </div>
    </div>
  )
}

export default React.memo(Fee)

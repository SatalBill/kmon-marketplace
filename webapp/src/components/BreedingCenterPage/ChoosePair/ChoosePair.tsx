import React from 'react'

import { Props } from './ChoosePair.types'
import './ChoosePair.css'
import plus from './plus.svg'
import { EmptyCard } from '@kmon/ui'

const ChoosePair = (props: Props) => {
  const {} = props

  const classes = ['kryptomon', 'choose-pair']

  return (
    <div className={classes.join(' ')}>
      <div className='empty-card-box'>
        <EmptyCard title='MY KRYPTOMON' text='Select one of your kryptomon' isPlus />
      </div>
      <div className='empty-card-box border-left'>
        <EmptyCard title='SELECTED' text='Search a kryptomon in the marketplace' />
      </div>
    </div>
  )
}

export default React.memo(ChoosePair)

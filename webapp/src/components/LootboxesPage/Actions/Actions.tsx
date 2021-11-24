import React from 'react'
import { Button } from '@kmon/ui'

import { Props } from './Actions.types'

const Actions = (props: Props) => {
  const { isTxPending, onBuy } = props

  return (
    <>
      <Button disabled={isTxPending} loading={isTxPending} onClick={onBuy} primary>
        Buy
      </Button>
    </>
  )
}

export default React.memo(Actions)

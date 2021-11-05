import React from 'react'
import { Button } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const Actions = () => {
  return (
    <>
      <Button onClick={() => ({})} primary>
        Buy
      </Button>
    </>
  )
}

export default React.memo(Actions)

import React from 'react'
import { Button } from '@kmon/ui'

import { Props } from './Actions.types'
import { ItemVersion } from '../../../modules/item/types'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const Actions = (props: Props) => {
  const { isTxPending, onBuy } = props

  return (
    <>
      <Button
        disabled={isTxPending}
        loading={isTxPending}
        onClick={() => onBuy(ItemVersion.V2)} primary
      >
        {t('lootbox_page.buy')}
      </Button>
    </>
  )
}

export default React.memo(Actions)

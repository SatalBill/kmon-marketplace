import React from 'react'
import { Network } from '@kmon/schemas'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Kmon as BaseKmon, Popup } from '@kmon/ui'
import { Props } from './Kmon.types'

const Kmon = (props: Props) => {
  const { withTooltip, ...kmonProps } = props

  if (withTooltip && !kmonProps.network) {
    throw new Error(
      "You need to specify the kmon network if you're going to show a tooltip"
    )
  }

  return (
    <Popup
      content={t('kmon.running_on', {
        network: t(
          `networks.${(kmonProps.network || Network.ETHEREUM).toLowerCase()}`
        )
      })}
      disabled={!withTooltip}
      position="top center"
      trigger={<BaseKmon {...kmonProps} />}
    />
  )
}

export default React.memo(Kmon)

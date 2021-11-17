import React from 'react'
import { Stats } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

import { Kmon } from '../../Kmon'
import { formatKMON } from '../../../lib/kmon'
import { formatDistanceToNow } from '../../../lib/date'
import { isPartner } from '../../../modules/vendor/utils'
import { Props } from './OrderDetails.types'

const OrderDetails = (props: Props) => {
  const { nft, order } = props

  return (
    <>
      <Stats title={t('global.network')}>
        {t(`networks.${nft.network.toLowerCase()}`)}
      </Stats>
      {order ? (
        <Stats title={t('nft_page.price')}>
          <Kmon network={nft.network} withTooltip>
            {formatKMON(order.price)}
          </Kmon>
          {isPartner(nft.vendor) ? (
            <div className="secondary-text">
              {t('price_change_notice.message')}
            </div>
          ) : null}
        </Stats>
      ) : null}
      {order && order.expiresAt ? (
        <Stats title={t('nft_page.expires')}>
          {formatDistanceToNow(+order.expiresAt, {
            addSuffix: true
          })}
        </Stats>
      ) : null}
    </>
  )
}

export default React.memo(OrderDetails)

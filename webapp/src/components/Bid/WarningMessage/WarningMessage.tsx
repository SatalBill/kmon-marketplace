import React, { useEffect, useState } from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

import { useFingerprint } from '../../../modules/nft/hooks'
import {
  isInsufficientKMON,
  checkFingerprint
} from '../../../modules/bid/utils'
import { Props } from './WarningMessage.types'
import './WarningMessage.css'

const WarningMessage = (props: Props) => {
  const { nft, bid } = props

  const [fingerprint] = useFingerprint(nft)
  const [hasInsufficientKMON, setHasInsufficientKMON] = useState(false)

  useEffect(() => {
    isInsufficientKMON(bid)
      .then(setHasInsufficientKMON)
      .catch(error =>
        console.error(`Could not get the MANA from bidder ${bid.bidder}`, error)
      )
  }, [bid])

  const isValidFingerprint = checkFingerprint(bid, fingerprint)

  if (hasInsufficientKMON) {
    return (
      <div className="WarningMessage">
        {t('bid.not_enough_mana_on_bid_placed')}
      </div>
    )
  } else if (!isValidFingerprint) {
    return (
      <div className="WarningMessage">
        {t('bid.invalid_fingerprint_on_bid_placed')}
      </div>
    )
  }

  return null
}

export default React.memo(WarningMessage)

import React, { useEffect, useState } from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Coin } from '@kmon/schemas'

import { useFingerprint } from '../../../modules/nft/hooks'
import {
  isInsufficientCoin,
  checkFingerprint
} from '../../../modules/bid/utils'
import { Props } from './WarningMessage.types'
import './WarningMessage.css'
import { getContractNames } from '../../../modules/vendor'
import { getContract } from '../../../modules/contract/utils'

const WarningMessage = (props: Props) => {
  const { nft, bid } = props

  const [fingerprint] = useFingerprint(nft)
  const [hasInsufficientCoin, setHasInsufficientCoin] = useState(false)

  const contractNames = getContractNames()

  const { address: kmonAddress } = getContract({
    name: contractNames.KMONToken
  })
  const { address: wbnbAddress } = getContract({
    name: contractNames.WBNB
  })

  let coin = Coin.KMON
  if (bid.paymentToken === kmonAddress) {
    coin = Coin.KMON
  } else if (bid.paymentToken === wbnbAddress) {
    coin = Coin.WBNB
  } else {
    throw new Error(`Invalid payment token in a Bid ${bid}`)
  }

  useEffect(() => {
    isInsufficientCoin(bid, coin)
      .then(setHasInsufficientCoin)
      .catch(error =>
        console.error(`Could not get the ${coin} from bidder ${bid.bidder}`, error)
      )
  }, [bid])

  const isValidFingerprint = checkFingerprint(bid, fingerprint)

  if (hasInsufficientCoin) {
    return (
      <div className="WarningMessage">
        {t('bid.not_enough_coin_on_bid_placed', { coin })}
      </div>
    )
  }
  // else if (!isValidFingerprint) {
  //   return (
  //     <div className="WarningMessage">
  //       {t('bid.invalid_fingerprint_on_bid_placed')}
  //     </div>
  //   )
  // }

  return null
}

export default React.memo(WarningMessage)

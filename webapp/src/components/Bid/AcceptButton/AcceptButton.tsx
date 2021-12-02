import React, { useEffect, useState } from 'react'
import { Button, Popup } from '@kmon/ui'
import { Coin } from '@kmon/schemas'

import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { useFingerprint } from '../../../modules/nft/hooks'
import {
  isInsufficientCoin,
  checkFingerprint
} from '../../../modules/bid/utils'
import { Props } from './AcceptButton.types'
import { getContractNames } from '../../../modules/vendor'
import { getContract } from '../../../modules/contract/utils'

const AcceptButton = (props: Props) => {
  const { nft, bid, onClick } = props

  const [fingerprint, isLoadingFingerprint] = useFingerprint(nft)
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
        console.error(`Could not get ${coin} from bidder ${bid.bidder}`, error)
      )
  }, [bid])

  const isValidFingerprint = checkFingerprint(bid, fingerprint)
  const isValidSeller = !!nft && nft.owner === bid.seller

  const isDisabled =
    !nft ||
    // isLoadingFingerprint ||
    hasInsufficientCoin ||
    // !isValidFingerprint ||
    !isValidSeller

  let button = (
    <Button primary disabled={isDisabled} onClick={onClick}>
      {t('global.accept')}
    </Button>
  )

  if (hasInsufficientCoin) {
    button = (
      <Popup
        content={t('bid.not_enough_coin_on_bid_received', { coin })}
        position="top center"
        trigger={<div className="popup-button">{button}</div>}
      />
    )
  }
  // else if (!isValidFingerprint) {
  //   button = (
  //     <Popup
  //       content={t('bid.invalid_fingerprint_on_bid_received')}
  //       position="top center"
  //       trigger={<div className="popup-button">{button}</div>}
  //     />
  //   )
  // }
  else if (!isValidSeller) {
    button = (
      <Popup
        content={t('bid.invalid_seller')}
        position="top center"
        trigger={<div className="popup-button">{button}</div>}
      />
    )
  }

  return <div className="AcceptButton">{button}</div>
}

export default React.memo(AcceptButton)

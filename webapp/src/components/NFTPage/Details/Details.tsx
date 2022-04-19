import React from 'react'
import { Address } from 'web3x-es/address'
import { Coin } from '@kmon/schemas'
import { Profile } from '@kmon/dapps/dist/containers'
import { Props, ItemProps } from './Details.types'
import './Details.css'
import { Actions } from '../Actions'
import { formatCoin } from '../../../lib/kmon'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const Details = (props: Props) => {
  const { nft, order } = props
  const coin =
    order?.paymentToken === Address.ZERO.toString() ? Coin.BNB : Coin.KMON
  return (
    <div className="details-container">
      <div className="profile-container">
        <Profile
          size={'huge'}
          address={nft.owner}
          imageOnly
          hasPopup
          inline={false}
        />
        <DetailItem title="Owner">
          <p className="detail-medium-text">{nft.owner}</p>
        </DetailItem>
        {nft.activeOrderId !== null && (
          <DetailItem title={t('sell_page.price')}>
            <p className="detail-medium-text">
              {order?.price && formatCoin(order.price)} {coin}
              {order?.priceUSD && ` ($${order.priceUSD})`}
            </p>
          </DetailItem>
        )}
      </div>
      {/* <DetailItem title="Network">
        <p className="detail-medium-text">{nft.network}</p>
      </DetailItem> */}
      <Actions nft={nft} />
    </div>
  )
}

export default React.memo(Details)

const DetailItem = ({ title, children }: ItemProps) => {
  return (
    <div className="block-title">
      <p className="block-title-text">{title}</p>
      {children}
    </div>
  )
}

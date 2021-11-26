import React from 'react'
import { Props, ItemProps } from './Details.types'
import './Details.css'
import { Profile } from '@kmon/dapps/dist/containers'
import { Actions } from '../Actions'

const Details = (props: Props) => {
  const { nft } = props

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
        <DetailItem title="Network">
          <p className="detail-medium-text">{nft.network}</p>
        </DetailItem>
      </div>
      {/* <DetailItem title="Price">
        <p className="detail-big-text"> */}
      {/* {order?.price && formatMANA(order.price)} BNB */}
      {/* 0000 KMON
        </p>
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

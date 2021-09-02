import React from 'react'
import { getNFTName } from '../../../modules/nft/utils'
import { Props, ItemProps } from './Details.types'
import './Details.css'
import { Profile } from 'decentraland-dapps/dist/containers'
import { Actions } from '../Actions'
import { Row } from '../../Layout/Row'

const Details = (props: Props) => {
  const { nft, order } = props

  const title = getNFTName(nft)
  const { parcel, estate, wearable, ens } = nft.data
  console.log({ nft, order })

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
          <p className="detail-medium-text">{nft.name}</p>
        </DetailItem>
      </div>
      <DetailItem title="Network">
        <p className="detail-medium-text">{nft.network}</p>
      </DetailItem>
      <DetailItem title="Price">
        <p className="detail-big-text">
          {/* {order?.price && formatMANA(order.price)} BNB */}
          1400 KMON
        </p>
      </DetailItem>
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

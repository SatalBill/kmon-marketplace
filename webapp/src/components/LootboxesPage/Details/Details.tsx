import React from 'react'
import { Props, ItemProps } from './Details.types'
import './Details.css'
import { Actions } from '../Actions'

const Details = (props: Props) => {
  const { name, price, isTxPending, onBuy } = props

  return (
    <div className="details-container">
      <DetailItem title="Lootbox type">
        <p className="detail-big-text">{name}</p>
      </DetailItem>
      <DetailItem title="Price">
        <p className="detail-big-text">
          {price} KMON
        </p>
      </DetailItem>
      <Actions isTxPending={isTxPending} onBuy={onBuy} />
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

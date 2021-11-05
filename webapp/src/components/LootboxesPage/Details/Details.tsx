import React from 'react'
import { Props, ItemProps } from './Details.types'
import './Details.css'
import { Actions } from '../Actions'
import { toStringLootboxType } from '../../../modules/lootbox/utils'

const Details = (props: Props) => {
  const { boxType } = props
  const boxTypeStr = toStringLootboxType(boxType)

  return (
    <div className="details-container">
      <DetailItem title="Lootbox type">
        <p className="detail-big-text">{boxTypeStr}</p>
      </DetailItem>
      <DetailItem title="Network">
        <p className="detail-big-text">Ethereum</p>
      </DetailItem>
      <DetailItem title="Price">
        <p className="detail-big-text">
          10 KMON
        </p>
      </DetailItem>
      <Actions />
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

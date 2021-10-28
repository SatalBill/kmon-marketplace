import React from 'react'
import { Button } from '@kmon/ui'

import './BuyLootboxes.css'

const BuyLootboxes = () => {
  return (
    <div className="BuyLootboxes">
      <Button primary>Basic</Button>
      <Button primary>Medium</Button>
      <Button primary>Premium</Button>
    </div>
  )
}

export default React.memo(BuyLootboxes)

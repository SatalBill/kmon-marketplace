import React, { useState } from 'react'
import { Props } from './DescriptionBlock.types'
import classNames from 'classnames'
import './DescriptionBlock.css'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const DescriptionBlock = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { description } = props

  const onOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className="description-container">
      <div className={classNames('show-text', !isOpen && 'hidden-text')}>
        {description}{' '}
        {!isOpen && <div className="hidden-text-blur" />}
      </div>
      {!isOpen && (
        <button onClick={onOpen} className="more-button">
          {t('nft_page.more')}
        </button>
      )}
    </div>
  )
}

export default DescriptionBlock

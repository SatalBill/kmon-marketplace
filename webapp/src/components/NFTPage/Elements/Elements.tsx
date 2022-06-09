import React from 'react'
import { Props } from './Elements.types'
import './Elements.css'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const Elements = (props: Props) => {
  const { elementTypes, maxElementType } = props

  return (
    <div className="elements-container">
      <div className="top-element">
        <img
          className="top-element-icon"
          src={maxElementType.icon}
          alt="icon"
        />
        <p className="top-element-text">
          {t(`nft_page.elements.${maxElementType.title}`)}
          <br />
          {parseFloat(maxElementType.value).toFixed(2)}%
        </p>
      </div>
      <div className="bottom-elements">
        {elementTypes.map((element: any, index: any) => {
          return (
            <div className="bottom-element" key={index}>
              <img
                className="bottom-element-icon"
                src={element.icon}
                alt="icon"
              />
              <p className="bottom-element-text">
                {t(`nft_page.elements.${element.title}`)}
                <br />
                {parseFloat(element.value).toFixed(2)}%
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(Elements)

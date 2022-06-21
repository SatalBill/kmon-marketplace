import React from 'react'
import { Props } from './MetaDataBottom.types'
import './MetaDataBottom.css'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const MetaDataBottom = (props: Props) => {
    const { elementTypes } = props

    return (
        <div className="meta-container">
            <div style={{ width: '100%' }}>
                <div className="bottom-container">
                    <div>
                        {
                            elementTypes.slice(0, 4).map((item: any, index: number) => (
                                <div key={index} className="flex-direction-row stats-item" style={{ margin: '0 16px 10px 0' }}>
                                    <div className="bottom-meta-img-title">
                                        <div className="item-left">
                                            <img className="stats-icon" src={item.icon} />
                                            <div className="elementgens">
                                                <p className="meta-row-text">{t(`nft_page.elements.${item.title}`)}</p>
                                                <div className="flex-direction-row">
                                                    <h6 className="small-row-text">{t('nft_page.meta_data.affinity.gens')}</h6>
                                                    <h6 className="value-text">{item.value[1]}</h6>
                                                    <h6 className="small-row-text">{t('nft_page.meta_data.affinity.talent')}</h6>
                                                    <h6 className="value-text">{item.value[2]}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="meta-row-text">{item.value[1] * item.value[2]}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="bottom-data">
                        {
                            elementTypes.slice(4, 8).map((item: any, index: number) => (
                                <div key={index} className="flex-direction-row stats-item" style={{ margin: '0 16px 10px 0' }}>
                                    <div className="bottom-meta-img-title">
                                        <div className="item-left">
                                            <img className="stats-icon" src={item.icon} />
                                            <div className="elementgens">
                                                <p className="meta-row-text">{t(`nft_page.elements.${item.title}`)}</p>
                                                <div className="flex-direction-row">
                                                    <h6 className="small-row-text">{t('nft_page.meta_data.affinity.gens')}</h6>
                                                    <h6 className="value-text">{item.value[1]}</h6>
                                                    <h6 className="small-row-text">{t('nft_page.meta_data.affinity.talent')}</h6>
                                                    <h6 className="value-text">{item.value[2]}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="meta-row-text">{item.value[1] * item.value[2]}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MetaDataBottom)


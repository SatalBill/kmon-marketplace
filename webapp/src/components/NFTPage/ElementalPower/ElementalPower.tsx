import React from 'react'
import { Props } from './ElementalPower.types'
import './ElementalPower.css'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const ElementalPower = (props: Props) => {
    const { elements } = props

    return (
        <div className="elem-power-container">
            {
                elements.affinityType.slice(1).map((item: any, index: number) => (
                    <div key={index} className="flex-direction-row elem-power-item img-title">
                        <div className="flex-direction-row" style={{ width: '100%' }}>
                            <img className="stats-icon" src={item.icon} />
                            <div style={{ width: '100%' }}>
                                <div className="flex-direction-row">
                                    <p className="elem-title">{t(`nft_page.elements.${item.title}`)}</p>
                                    <p className="elem-power-row-text">{t(`nft_page.elemental_power.power`)}</p>
                                    <h6 className="elemental-power-value-text">{item.value[0] * item.value[1]}</h6>
                                </div>
                                <div className="flex-direction-row">
                                    <div className="elem-power-display-flex">
                                        <h6 className="elem-power-row-text">{t('nft_page.meta_data.affinity.gens')}</h6>
                                        <h6 className="value-text">{item.value[0]}</h6>
                                    </div>
                                    <div className="elem-power-display-flex">
                                        <h6 className="elem-power-row-text">{t('nft_page.meta_data.affinity.talent')}</h6>
                                        <h6 className="value-text">{item.value[1]}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <p className="elem-power-percent">{parseInt(item.value[2])}%</p> */}
                    </div>
                ))
            }
        </div>
    )
}

export default React.memo(ElementalPower)

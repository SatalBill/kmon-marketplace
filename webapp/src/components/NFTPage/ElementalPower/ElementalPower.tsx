import React from 'react'
import { Props } from './ElementalPower.types'
import './ElementalPower.css'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import statsIconImg from '../../../images/egg/elem-ice.svg'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const ElementalPower = (props: Props) => {
    const { nft, elements } = props
    const timeBorn = nft.data.kryptomon?.timeBorn
    const date = new Date(1970, 0, 1)
    date.setSeconds(timeBorn || 0)
    const [formatedDate] = date
        .toISOString()
        .split('-')
        .join('-')
        .split('T')
    const birthDateInFormat = formatedDate
        .split('-')
        .reverse()
        .join('-')

    const age = new Date(Date.now() - timeBorn! * 1000).getMonth()
    const lastEvolvedTime = nft.data.kryptomon?.lastEvolved != null ? nft.data.kryptomon?.lastEvolved : nft.data.kryptomon?.timeHatched;
    const lastEvolved = new Date(lastEvolvedTime! * 1000).toLocaleDateString();
    const lastEvolvedTitle = nft.data.kryptomon?.status == "1" ? 'Hatched' : parseInt(nft.data.kryptomon!.status) > 1 ? 'Last Evolved' : undefined

    const whatTheSex = (value?: string | number) => {
        if (value && +value > 5) return t('menu.keys.Male')
        else return t('menu.keys.Female')
    }

    return (
        <div className="meta-container">

            <div className="general-stats">
                <div className="general-stats">
                    {
                        elements.affinityType.slice(1).map((item: any, index: number) => (
                            <div key={index} className="flex-direction-row stats-item">
                                <div className="img-title">
                                    <img className="stats-icon" src={item.icon} />
                                    <p className="meta-row-text">{t(`nft_page.elements.${item.title}`)}</p>
                                </div>
                                {
                                    item.title !== "element main" ?
                                        // <p className="meta-row-text">GENES <p className="value-text">{item.value[0]}</p> TALENT <p className="value-text">{item.value[1]}</p> </p>
                                        <div className="flex-direction-row">
                                            <h6 className="small-row-text">{t('nft_page.meta_data.affinity.gens')}</h6>
                                            <h6 className="value-text">{item.value[0]}</h6>
                                            <h6 className="small-row-text">{t('nft_page.meta_data.affinity.talent')}</h6>
                                            <h6 className="value-text">{item.value[1]}</h6>
                                        </div>
                                        :
                                        <p className="meta-row-text">{item.value.value}%</p>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default React.memo(ElementalPower)


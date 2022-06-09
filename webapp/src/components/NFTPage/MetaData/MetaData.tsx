import React from 'react'
import { Props } from './MetaData.types'
import './MetaData.css'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const MetaData = (props: Props) => {
    const { nft, isV2, elements } = props
    const data = isV2 ? nft.genesV2 : nft.data.kryptomon?.genes
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
                <p className="top-element-text">{t('nft_page.meta_data.caretraining.title')}</p>
                <p className="stats-description-text">{t('nft_page.meta_data.caretraining.description')}</p>
                {
                    elements.carTrainingTypes.map((item: any, index: number) => (
                        <div key={index} className="flex-direction-row stats-item">
                            <div className="top-meta-img-title">
                                <img className="stats-icon" src={item.icon} />
                                <div className="top-meta-text-group">
                                    <p className="top-meta-row-text">{item.title}</p>
                                    <p className="top-meta-row-text">{item.value}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="general-stats">
                <p className="top-element-text">{t('nft_page.meta_data.general.title')}</p>
                <p className="stats-description-text">{t('nft_page.meta_data.general.description')}</p>
                {
                    elements.generalType.map((item: any, index: number) => (
                        <div key={index} className="flex-direction-row stats-item">
                            <div className="top-meta-img-title">
                                <img className="stats-icon" src={item.icon} />
                                <div className="top-meta-text-group">
                                    <p className="top-meta-row-text">{item.title}</p>
                                    <p className="top-meta-row-text">{item.value}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="general-stats">
                <p className="top-element-text">{t('nft_page.meta_data.appearance.title')}</p>
                <p className="stats-description-text">{t('nft_page.meta_data.appearance.description')}</p>
                {
                    elements.appearanceType.map((item: any, index: number) => (
                        <div key={index} className="flex-direction-row stats-item">
                            <div className="top-meta-img-title">
                                <img className="stats-icon" src={item.icon} />
                                <div className="top-meta-text-group">
                                    <p className="top-meta-row-text">{item.title}</p>
                                    <p className="top-meta-row-text">{item.value}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default React.memo(MetaData)


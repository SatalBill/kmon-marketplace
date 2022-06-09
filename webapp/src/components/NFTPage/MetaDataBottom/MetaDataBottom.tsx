import React, { useEffect } from 'react'
import { Props } from './MetaDataBottom.types'
import './MetaDataBottom.css'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import statsIconImg from '../../../images/egg/elem-ice.svg'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const MetaDataBottom = (props: Props) => {
    const { nft, isV2, elements, elementTypes } = props

    useEffect(() => {
        console.log("----------00000-000", props)
    }, [])

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
    const skinTypeToString: Record<string, string> = {
        '0': 'Feather',
        '1': 'Skin',
        '2': 'Scale',
        '3': 'Short hairs',
        '4': 'Long hairs'
    }
    // const arr = [
    //   { title: 'Water talent', value: data?.waterTalent },
    //   { title: 'Fire talent', value: data?.fireTalent },
    //   { title: 'Ground talent', value: data?.groundTalent },
    //   { title: 'Ice talent', value: data?.iceTalent },
    //   { title: 'Grass talent', value: data?.grassTalent },
    //   { title: 'Electro talent', value: data?.electroTalent },
    //   { title: 'Ghost talent', value: data?.ghostTalent },
    //   { title: 'Air talent', value: data?.airTalent },
    //   { title: 'Body size', value: data?.bodySize },
    //   { title: 'Attack', value: data?.attack },
    //   { title: 'Defence', value: data?.defense },
    //   { title: 'Ego', value: data?.ego },
    //   { title: 'General talent', value: data?.generalTalent },
    //   { title: 'xFactor', value: data?.xFactor },
    //   { title: 'Growth talent factor', value: data?.growthTalentFactor },
    //   { title: 'Health points', value: data?.healthPoints },
    //   { title: 'Sex', value: whatTheSex(data?.sex) },
    //   { title: 'Skin type', value: skinTypeToString[data?.skinType || 0] },
    //   { title: 'Special', value: data?.special },
    //   { title: 'Speed', value: data?.speed },
    //   { title: 'Age(months)', value: age },
    // ]

    // if (lastEvolvedTitle) {
    //   arr.push({ title: lastEvolvedTitle, value: lastEvolved });
    // }
    const generalStats = ['EGG ID', 'GENERATION', 'TYPE', 'SPECIALITY', 'LAID', 'UNFREEZABLE']
    const appearanceStats = ['GENDER', 'COLOR', 'BODY SIZE']
    const affinityStats = ['ELEMENT MAIN', 'WATER', 'GHOST']

    return (
        <div className="meta-container">
            <div style={{ width: '100%' }}>
                <p className="top-element-text">{t('nft_page.meta_data.affinity.title')}</p>
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
                                        <p className="meta-row-text">{item.value[0]}%
                                        </p>
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
                                        <p className="meta-row-text">{item.value[0]}%
                                        </p>
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


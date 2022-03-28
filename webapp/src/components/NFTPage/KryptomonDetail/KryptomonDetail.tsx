import React, { useState, SyntheticEvent, useEffect } from 'react'
import { Container } from '@kmon/ui'
import { Dropdown, Progress } from 'semantic-ui-react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Props } from './KryptomonDetail.types'
import './KryptomonDetail.css'
import { NFTDetailCard } from '../../NFTDetailCard'
import { Elements } from '../Elements'
import { BreedingInfo } from "../BreedingInfo";
import { TitleBlock } from '../TitleBlock'
import { DescriptionBlock } from '../DescriptionBlock'
import { Details } from '../Details'
import { DNAChart } from '../DNAChart'
import { ElemData } from '../ElemData'
import { PriceChart } from '../PriceChart'
import { TradeHistory } from '../TradeHistory'
import Ice from '../../../images/egg/elem-ice.svg'
import Air from '../../../images/egg/elem-air.svg'
import Electro from '../../../images/egg/elem-electro.svg'
import Ghost from '../../../images/egg/elem-ghost.svg'
import Grass from '../../../images/egg/elem-grass.svg'
import Ground from '../../../images/egg/elem-ground.svg'
import Water from '../../../images/egg/elem-water.svg'
import Fire from '../../../images/egg/elem-fire.svg'
import { DNARadarChart } from '../DNARadarChart'

const KryptomonDetail = (props: Props) => {
  const { nft, order, breedingOrder } = props
  const [isV2, setIsV2] = useState(false)
  const [cooldownTimePercent, setCooldownTimePercent] = useState(0)
  const [breedAmountStartValue, setBreedAmountStartValue] = useState(0)
  const [breedAmountEndValue, setBreedAmountEndValue] = useState(0)
  const [cooldownTimeDay, setCooldownTimeDay] = useState(0)
  const [breedPrice, setBreedPrice] = useState('')

  const PRICE_DROPDOWN_VALUES = {
    DAY: t('nft_page.price_chart.day'),
    WEEK: t('nft_page.price_chart.week'),
    MONTH: t('nft_page.price_chart.month')
  }
  const [currentPriceFilter, setCurrentPriceFilter] = useState(
    PRICE_DROPDOWN_VALUES.MONTH
  )
  const toogleV2Change = () => {
    setIsV2(!isV2)
  }
  const onChangeCurrentPriceFilter = (_event: SyntheticEvent, data: any) => {
    setCurrentPriceFilter(data.text)
  }

  const PRICE_CHART = {
    [PRICE_DROPDOWN_VALUES.DAY]: {
      labels: [
        '02.09.2021',
        '03.09.2021',
        '04.09.2021',
        '05.09.2021',
        '06.09.2021',
        'Today',
        '08.09.2021'
      ],
      values: [1125, 2000, 2102, 3212, 1020, 3709]
    },
    [PRICE_DROPDOWN_VALUES.WEEK]: {
      labels: ['1st', '2nd', '3rd', '4th'],
      values: [1332, 5682, 1239, 4682]
    },
    [PRICE_DROPDOWN_VALUES.MONTH]: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Today', 'July', 'Aug'],
      values: [1625, 1332, 2322, 1239, 2223, 2578]
    }
  }
  const genes = isV2 ? nft.genesV2 : nft.data.kryptomon?.genes
  const timeCanBreed = nft.data.kryptomon?.timeCanBreed || 0
  const lastTimeBred = nft.data.kryptomon?.lastTimeBred || 0
  const timeHatched = nft.data.kryptomon?.timeHatched || 0
  const isJunior = nft.data.kryptomon?.status === "2"
  const breedingCount = nft.data.kryptomon?.breedingCount || 0
  const breedingPrice = breedingOrder?.price || ''
  const maxBreedingsDuringLifePhase = nft.data.kryptomon?.maxBreedingsDuringLifePhase || 0
  const today = new Date().getTime() / 1000;

  const genesArray = Object.values(genes!)
  let totalGenes = 0
  for (let i = 0; i < 16; i++) {
    totalGenes += genesArray[i] * genesArray[i + 1]
    i++
  }
  const elementTypes = [
    {
      title: t('nft_page.elements.water'),
      value: (((genes!.water * genes!.waterTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Water
    },
    {
      title: t('nft_page.elements.grass'),
      value: (((genes!.grass * genes!.grassTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Grass
    },
    {
      title: t('nft_page.elements.fire'),
      value: (((genes!.fire * genes!.fireTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Fire
    },
    {
      title: t('nft_page.elements.electro'),
      value: (
        ((genes!.electro * genes!.electroTalent) / totalGenes) *
        100
      ).toFixed(2),
      icon: Electro
    },
    {
      title: t('nft_page.elements.ground'),
      value: (
        ((genes!.ground * genes!.groundTalent) / totalGenes) *
        100
      ).toFixed(2),
      icon: Ground
    },
    {
      title: t('nft_page.elements.ghost'),
      value: (((genes!.ghost * genes!.ghostTalent) / totalGenes) * 100).toFixed(
        2
      ),
      icon: Ghost
    },
    {
      title: t('nft_page.elements.ice'),
      value: (((genes!.ice * genes!.iceTalent) / totalGenes) * 100).toFixed(2),
      icon: Ice
    },
    {
      title: t('nft_page.elements.air'),
      value: (((genes!.air * genes!.airTalent) / totalGenes) * 100).toFixed(2),
      icon: Air
    }
  ]

  const elementType = elementTypes.find(
    element => element.title === nft.data.kryptomon?.elementType
  )

  const getPercentage = () => {
    if (timeCanBreed < today) {
      return 0;
    }

    const diffCanToLast = Math.abs(timeCanBreed - lastTimeBred);
    const diffTodayToLast = Math.abs(today - lastTimeBred);

    const total = Math.floor(diffCanToLast / 86400);
    const value = Math.floor(diffTodayToLast / 86400);

    const percentage = (value / total) * 100;

    return percentage;
  }

  const getIfCanBreed = () => {
    if (timeCanBreed > 0 && timeCanBreed < today) {
      return true;
    } else {
      return false;
    }
  }

  const formatedDate = (timeInSeconds: number) => {
    const laidTimestamp = timeInSeconds * 1000
    var options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const laid = new Date(laidTimestamp).toLocaleDateString(undefined, options)
    return laid;
  }

  const maxElementType = elementTypes.reduce((prev, current) => {
    return ((prev &&
      typeof prev.value === 'string' &&
      Number.parseInt(prev.value)) ||
      0) >
      ((current &&
        typeof current.value === 'string' &&
        Number.parseInt(current.value)) ||
        0)
      ? prev
      : current
  })

  useEffect(() => {
    setBreedAmountStartValue(breedingCount)
    setBreedAmountEndValue(maxBreedingsDuringLifePhase)
    setBreedPrice(breedingPrice)
    if (timeCanBreed && timeCanBreed > today) {
      const percentDiff: number | undefined = timeCanBreed - (lastTimeBred == 0 ? timeHatched : lastTimeBred)
      const currentPercent: number | undefined = Math.floor(today) - (lastTimeBred == 0 ? timeHatched : lastTimeBred)
      const percentTemp = currentPercent * 100 / percentDiff
      const leftDay = Math.ceil((timeCanBreed - today) / 3600 / 24)
      setCooldownTimeDay(leftDay)
      setCooldownTimePercent(percentTemp)
    }
  }, [])

  return (
    <Container className="product-container">
      <Row className="Row-space-between">
        <Column>
          <Row className="Row-space-between">
            <NFTDetailCard
              elementType={elementType}
              nft={nft}
              isV2={isV2}
              toogleV2={toogleV2Change}
              canBreed={getIfCanBreed()}
            />
          </Row>
          {isJunior &&
            <Row className="Row-space-between ">
              <TitleBlock title={t('nft_page.breeding_info.title')}>
                <BreedingInfo
                  nft={nft}
                  cooldownTimePercent={cooldownTimePercent}
                  cooldownTimeDay={cooldownTimeDay}
                  breedAmountStartValue={breedAmountStartValue}
                  breedAmountEndValue={breedAmountEndValue}
                  breedPrice={breedPrice}
                />
              </TitleBlock>
            </Row>
          }
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.elements.title')}>
              <Elements
                elementTypes={elementTypes}
                maxElementType={maxElementType}
                nft={nft}
              />
            </TitleBlock>
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.description')}>
              <DescriptionBlock nft={nft} />
            </TitleBlock>
            {/* <TitleBlock title={t('nft_page.trade_history.title')}>
              <TradeHistory nft={nft} />
            </TitleBlock> */}
          </Row>
        </Column>
        <Column>
          <Row className="Row-space-between">
            <Details nft={nft} order={order} />
          </Row>
          {/* <Row className="Row-space-between">
            <TitleBlock title="DNA Radar Chart">
              <DNARadarChart nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row> */}
          {(lastTimeBred && !getIfCanBreed()) ? <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.dna_chart.breeding')}>
              <div className="next-breeding">
                <Row className="Row-space-between">
                  <div className="progress-last-bred-box">{t('nft_page.dna_chart.last')}</div>
                  <div className="progress-can-breed-box">{t('nft_page.dna_chart.next')}</div>
                </Row>
                <Row className="Row-space-between">
                  <div className="progress-last-bred">{formatedDate(lastTimeBred)}</div>
                  <div className="progress-can-breed">{formatedDate(timeCanBreed)}</div>
                </Row>
                <div className="ui red active indicating inverted progress next-breeding-progress" data-percent={getPercentage()}>
                  <div className="bar" style={{ width: `${getPercentage()}%` }}>
                    <div className={getPercentage() > 15 ? "progress" : "progress-low"}>{formatedDate(today)}</div>
                  </div>
                </div>
              </div>
            </TitleBlock>
          </Row> : null}
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.dna_chart.title')}>
              <DNAChart nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row>
          <Row className="Row-space-between">
            <TitleBlock title={t('nft_page.metadata')}>
              <ElemData nft={nft} isV2={isV2} />
            </TitleBlock>
          </Row>
        </Column>
      </Row>
    </Container>
  )
}

export default React.memo(KryptomonDetail)

import React, { useState, SyntheticEvent } from 'react'
import { Container } from '@kmon/ui'
import { Dropdown } from 'semantic-ui-react'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Props } from './ProductDetail.types'
import './ProductDetail.css'
import { NFTDetailCard } from '../../NFTDetailCard'
import { Elements } from '../Elements'
import { TitleBlock } from '../TitleBlock'
import { DescriptionBlock } from '../DescriptionBlock'
import { Details } from '../Details'
import { DNAChart } from '../DNAChart'
import { PriceChart } from '../PriceChart'
import Ice from '../../../images/egg/elem-ice.svg'
import Air from '../../../images/egg/elem-air.svg'
import Electro from '../../../images/egg/elem-electro.svg'
import Ghost from '../../../images/egg/elem-ghost.svg'
import Grass from '../../../images/egg/elem-grass.svg'
import Ground from '../../../images/egg/elem-ground.svg'
import Water from '../../../images/egg/elem-water.svg'
import Fire from '../../../images/egg/elem-fire.svg'

const WearableDetail = (props: Props) => {
  const { nft, onNavigate } = props
  const PRICE_DROPDOWN_VALUES = {
    DAY: 'Day',
    WEEK: 'Week',
    MONTH: 'Month'
  }
  const [currentPriceFilter, setCurrentPriceFilter] = useState(
    PRICE_DROPDOWN_VALUES.MONTH
  )

  const onChangeCurrentPriceFilter = (event: SyntheticEvent, data: any) => {
    console.log(event)
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
  const genes = nft.data.kryptomon?.genes
  const elementTypes = [
    {
      title: 'Water',
      value: genes?.water,
      icon: Water
    },
    {
      title: 'Grass',
      value: genes?.grass,
      icon: Grass
    },
    {
      title: 'Fire',
      value: genes?.fireGenes,
      icon: Fire
    },
    {
      title: 'Electro',
      value: genes?.electro,
      icon: Electro
    },
    {
      title: 'Ground',
      value: genes?.ground,
      icon: Ground
    },
    {
      title: 'Ghost',
      value: genes?.ghost,
      icon: Ghost
    },
    {
      title: 'Ice',
      value: genes?.ice,
      icon: Ice
    },
    {
      title: 'Air',
      value: genes?.air,
      icon: Air
    }
  ]

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

  return (
    <Container className="product-container">
      <Row>
        <NFTDetailCard maxElementType={maxElementType} nft={nft} />
        <Column>
          <Details nft={nft} />
          <TitleBlock title="DNA chart">
            <DNAChart nft={nft} />
          </TitleBlock>
        </Column>
      </Row>
      <Row>
        <TitleBlock title="Elements">
          <Elements
            elementTypes={elementTypes}
            maxElementType={maxElementType}
            nft={nft}
          />
        </TitleBlock>
        <TitleBlock
          title="Price chart"
          right={
            <Dropdown
              text={currentPriceFilter}
              className="ui dropdown price-dropdown"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={onChangeCurrentPriceFilter}
                  text={PRICE_DROPDOWN_VALUES.MONTH}
                />
                <Dropdown.Item
                  onClick={onChangeCurrentPriceFilter}
                  text={PRICE_DROPDOWN_VALUES.WEEK}
                />
                <Dropdown.Item
                  onClick={onChangeCurrentPriceFilter}
                  text={PRICE_DROPDOWN_VALUES.DAY}
                />
              </Dropdown.Menu>
            </Dropdown>
          }
        >
          <PriceChart
            nft={nft}
            values={PRICE_CHART[currentPriceFilter].values}
            labels={PRICE_CHART[currentPriceFilter].labels}
          />
        </TitleBlock>
      </Row>
      <TitleBlock title="Description">
        <DescriptionBlock nft={nft} />
      </TitleBlock>
    </Container>
  )
}

export default React.memo(WearableDetail)

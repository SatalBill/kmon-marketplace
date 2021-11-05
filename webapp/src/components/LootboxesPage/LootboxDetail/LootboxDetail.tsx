import React, { useState, SyntheticEvent } from 'react'
import { Container, Page } from '@kmon/ui'
import { Dropdown, Loader } from 'semantic-ui-react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

import { Props } from './LootboxDetail.types'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { TitleBlock } from '../../NFTPage/TitleBlock'
import { LootboxCard } from '../LootboxCard'
import { LootboxType } from '../../../modules/lootbox/types'
import { Navbar } from '../../Navbar'
import { Navigation } from '../../Navigation'
import { Footer } from '../../Footer'
import { Details } from '../Details'

const LootboxDetail = (props: Props) => {
  const { isConnecting, boxPrice } = props

  const PRICE_DROPDOWN_VALUES = {
    DAY: t('nft_page.price_chart.day'),
    WEEK: t('nft_page.price_chart.week'),
    MONTH: t('nft_page.price_chart.month')
  }
  const [currentPriceFilter, setCurrentPriceFilter] = useState(
    PRICE_DROPDOWN_VALUES.MONTH
  )

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

  const LootboxDetail = () => {
    return (
      <Container className="product-container">
        <Row className="Row-space-between">
          <LootboxCard
            boxType={LootboxType.Basic}
            image={'https://kryptomon-images.ams3.digitaloceanspaces.com/images/kryptomons/gif/kmon_11_gif.gif'}
            price={'10'}
          />
          <Column>
            <Details boxType={LootboxType.Basic} />
            <TitleBlock
              title={t('nft_page.price_chart.title')}
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

            <div className="dna-container">
              <canvas height="210" width="678" data-testid="canvas" role="img"></canvas>
            </div>
            </TitleBlock>
          </Column>
        </Row>
      </Container>
    )
  }

  const Loading = () => (
    <div className="nft-center">
      <Loader active size="huge" />
    </div>
  )
  
  const NotFound = () => (
    <div className="nft-center">
      <p className="secondary-text">{t('global.not_found')}&hellip;</p>
    </div>
  )

  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation isFullscreen />
      </div>
      <Page className="NFTPage" isFullscreen>
        {isConnecting ? <Loading /> : null}
        {!isConnecting && boxPrice === undefined ? <NotFound /> : null}
        {!isConnecting && boxPrice !== undefined ? <LootboxDetail /> : null}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(LootboxDetail)

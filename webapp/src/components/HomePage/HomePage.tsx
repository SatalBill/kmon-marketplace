import React, { useCallback, useEffect } from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import { Page, Hero, Button } from '@kmon/ui'
import { locations } from '../../modules/routing/locations'
import { View } from '../../modules/ui/types'
import { HomepageView } from '../../modules/ui/nft/homepage/types'
import { Section } from '../../modules/vendor/decentraland/routing/types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Slideshow } from './Slideshow'
import { Props } from './HomePage.types'
import './HomePage.css'
import { SearchOptions } from '../../modules/routing/types'
import { OrderStatus } from '../../modules/order/types'

const HomePage = (props: Props) => {
  const { homepage, homepageLoading, onNavigate, onFetchNFTsFromRoute } = props

  const sections = {
    [View.KRYPTOMONS]: Section.KRYPTOMONS,
    // [View.LATEST_SOLD]: Section.LATEST_SOLD,
    [View.ALL_ASSETS]: Section.ALL
  }

  const handleGetStarted = useCallback(() => onNavigate(locations.browse()), [
    onNavigate
  ])

  const handleViewAll = useCallback(
    (section: Section) => {
      if (section === Section.ALL) {
        return onNavigate(locations.browse({ section, onlyOnSale: false }))
      }
      return onNavigate(locations.browse({ section }))
    },
    [onNavigate]
  )

  useEffect(() => {
    let view: HomepageView
    for (view in homepage) {
      const section = sections[view]
      const fetchObj: SearchOptions = {
        section,
        view,
        page: 1,
        onlyOnSale: false
      }
      if (view === 'kryptomons') {
        fetchObj.onlyOnSale = true
      }
      // if (view === 'latest_sold') {
      //   fetchObj.orderStatus = OrderStatus.SOLD
      // }
      onFetchNFTsFromRoute(fetchObj)
    }
    // eslint-disable-next-line
  }, [onFetchNFTsFromRoute])

  const views = Object.keys(homepage) as HomepageView[]

  return (
    <>
      <Navbar isFullscreen isOverlay />
      <Hero centered={isMobile()} className="HomePageHero">
        <Hero.Header>{t('home_page.title')}</Hero.Header>
        <Hero.Description>{t('home_page.subtitle')}</Hero.Description>
        <Hero.Content>
          <div className="hero-image" />{' '}
        </Hero.Content>
        <Hero.Actions>
          <Button primary onClick={handleGetStarted}>
            {t('home_page.get_started')}
          </Button>
        </Hero.Actions>
      </Hero>
      <Page className="HomePage">
        {views.map((view, index) => {
          return (
            <>
              <Slideshow
                key={`${view}-${index}`}
                title={t(`home_page.${view}`)}
                nfts={homepage[view]}
                isLoading={homepageLoading[view]}
                onViewAll={() => handleViewAll(sections[view])}
              />
            </>
          )
        })}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)

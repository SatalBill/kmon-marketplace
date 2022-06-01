import React, { useCallback, useEffect } from 'react'
import { t, getCurrentLocale } from '@kmon/dapps/dist/modules/translation/utils'
import { isMobile } from '@kmon/dapps/dist/lib/utils'
import { Page, Hero, Button, Grid } from '@kmon/ui'
import { locations } from '../../modules/routing/locations'
import { View } from '../../modules/ui/types'
import { HomepageView } from '../../modules/ui/nft/homepage/types'
import { Section } from '../../modules/vendor/decentraland/routing/types'
import { Navbar } from '../Navbar'
import { Navigation } from '../Navigation'
import { Footer } from '../Footer'
import { Slideshow } from './Slideshow'
import Community from './Components/Community'
import { Props } from './HomePage.types'
import './HomePage.css'
import { SearchOptions } from '../../modules/routing/types'
import { OrderStatus } from '../../modules/order/types'

const HomePage = (props: Props) => {
  const { homepage, homepageLoading, onNavigate, onFetchNFTsFromRoute } = props
  var options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit'
  }

  const sections = {
    [View.KRYPTOMONS]: Section.KRYPTOMONS,
    // [View.LATEST_SOLD]: Section.LATEST_SOLD,
    // [View.ALL_ASSETS]: Section.ALL
  }

  const flashTime = new Date('April 16, 2022 15:00:00')

  const formatAMPM = (date: any) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + (minutes > 0 && ':') + (minutes > 0 && minutes) + '' + ampm;
    return strTime;

  }

  const formatDate = (date: any) => {
    const newDate = date.toLocaleDateString(getCurrentLocale().locale, options)
    const enDate = `${date.getDay()} ${date.toLocaleString('default', { month: 'short' })} ${formatAMPM(flashTime)}`
    const value = getCurrentLocale().locale === 'zh-CN' ? newDate : enDate
    return t('home_page.starting_date',
      { date: value })
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
    <div className="HomePage">
      <Navbar isFullscreen />
      <Hero centered className="HomePageHero">
        <div className="hero-title-text">{t('home_page.title')}</div>
        <Hero.Content>
          <div className="hero-image" />
          <div className="hero-fade" />
          <a className="hero-logo" href="https://kryptomon.co" />
          <div className="hero-market" />
          <div className="grid-top" />
          <div className="dragons" />
        </Hero.Content>
        <Hero.Actions>
          <Button primary onClick={handleGetStarted} className="button-secondary">
            {t('home_page.get_started')}
          </Button>
        </Hero.Actions>
      </Hero>
      <div className="HomePageContent">
        <div className="flash-container">
          <div className="play-game">
            <div className="become-trainer">{t('home_page.become_trainer')}</div>
            <Button primary onClick={() => window.open('https://app.kryptomon.co/play')} className="button-play">
              {t('home_page.play')}
            </Button>
          </div>
          <div className="flash" onClick={() => window.open('https://www.kryptomon.co/treasure-hunt')}>
            <div className="starting-date">{formatDate(flashTime)}</div>
          </div>
        </div>
        <Navigation />
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
        <div className="flash-container">
          <Community />
        </div>
        <div className="bottom-bg">
          <div className="bottom-bg-image"></div>
        </div>
      </div>
      <Footer className="Footer" />
    </div>
  )
}


export default React.memo(HomePage)

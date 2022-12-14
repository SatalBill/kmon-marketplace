import React, { useCallback, useEffect } from 'react'
import { Container, Page, Responsive } from '@kmon/ui'

import { View } from '../../modules/ui/types'
import { Atlas } from '../Atlas'
import { AccountSidebar } from '../AccountSidebar'
import { NFTList } from '../NFTList'
import { VendorStrip } from '../VendorStrip'
import { Row } from '../Layout/Row'
import { Column } from '../Layout/Column'
import { NFTFilters } from '../Vendor/NFTFilters'
import { NFTSidebar } from '../Vendor/NFTSidebar'
import { Props } from './NFTBrowse.types'
import './NFTBrowse.css'

const NFTBrowse = (props: Props) => {
  const {
    vendor,
    view,
    isMap,
    isFullscreen,
    address,
    onSetView,
    onFetchNFTsFromRoute,
    onBrowse,
    onlyOnSale,
    viewInState,
    pathname
  } = props

  // Kick things off
  useEffect(() => {
    onSetView(view)
  }, [onSetView, view])

  useEffect(() => {
    if (viewInState === view) {
      if (pathname === '/account') {
        onFetchNFTsFromRoute({
          vendor,
          view,
          address,
          onlyOnSale
        })
      } else {
        onFetchNFTsFromRoute({
          vendor,
          view,
          address,
          onlyOnSale
        })
      }
    }
  }, [
    view,
    vendor,
    address,
    onlyOnSale,
    viewInState,
    onFetchNFTsFromRoute,
    pathname
  ])

  const handleSetFullscreen = useCallback(
    () => onBrowse({ isMap: true, isFullscreen: true }),
    [onBrowse]
  )

  // classes
  let classes = ['NFTBrowse']
  if (isMap) {
    classes.push('is-map')
  }

  return (
    <Page className={classes.join(' ')} isFullscreen={isFullscreen}>
      <Row className="browse-nft-list">
        {isFullscreen ? null : (
          <Column align="left" className="sidebar">
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              {view === View.ACCOUNT ? (
                <AccountSidebar address={address!} />
              ) : (
                <NFTSidebar />
              )}
            </Responsive>
          </Column>
        )}

        <Column align="right" grow={true}>
          {view === View.ACCOUNT && !isFullscreen ? (
            <VendorStrip address={address!} />
          ) : null}
          {isMap && isFullscreen ? (
            <div className="blur-background">
              <Container>
                <NFTFilters isNavBar={false} />
              </Container>
            </div>
          ) : (
            <NFTFilters isNavBar={false} />
          )}
          {isMap ? (
            <div className="Atlas">
              <Atlas withNavigation withPopup showOnSale={onlyOnSale} />
              <div
                className="fullscreen-button"
                onClick={handleSetFullscreen}
              />
            </div>
          ) : (
            <NFTList />
          )}
        </Column>
      </Row>
    </Page>
  )
}

export default React.memo(NFTBrowse)

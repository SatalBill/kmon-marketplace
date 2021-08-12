import React from 'react'
import { Page } from 'decentraland-ui'

import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { NFTProviderPage } from '../NFTProviderPage'
import { NFTDetail } from '../Vendor/NFTDetail'
import './NFTPage.css'

const NFTPage = () => {
  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation isFullscreen />
      </div>
      <Page className="NFTPage" isFullscreen>
        <NFTProviderPage>{nft => <NFTDetail nft={nft} />}</NFTProviderPage>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(NFTPage)

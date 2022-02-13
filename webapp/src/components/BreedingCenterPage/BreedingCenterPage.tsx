import React, { useEffect } from 'react'
import { Page, Responsive } from '@kmon/ui'

import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Props } from './BreedingCenterPage.types'
import { NavigationTab } from '../Navigation/Navigation.types'
import { Navigation } from '../Navigation'
import { ChoosePair } from './ChoosePair'
import { Row } from '../Layout/Row'
import { Column } from '../Layout/Column'
import { NFTSidebar } from '../Vendor/NFTSidebar'
import { NFTList } from '../NFTList'
import { NFTFilters } from '../Vendor/NFTFilters'
import { NFT } from "../../modules/nft/types"

const BreedingCenterPage = (props: Props) => {
  const { contractAddress, tokenId, onFetchNFTForBreeding, onSelectNFTForBreeding } = props

  useEffect(() => {
    if (contractAddress && tokenId && contractAddress !== 'undefined' && tokenId !== 'undefined') {
      onFetchNFTForBreeding(contractAddress, tokenId)
    }
  }, [contractAddress, tokenId, onFetchNFTForBreeding])

  const handleSelectCard = (nft: NFT) => {
    onSelectNFTForBreeding(nft)
  }

  return (
    <>
      <div className="PageCustomHeader">
        <Navbar isFullscreen />
        <Navigation activeTab={NavigationTab.BREEDING_CENTER} />
      </div>
      <Page className="NFTBrowse">
        <Row>
          <Column align="left" className="sidebar">
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <NFTSidebar />
            </Responsive>
          </Column>
          <Column align="right" grow={true}>
            <ChoosePair />
            <NFTFilters />
            <NFTList isPreventClick onClickCard={handleSelectCard} />
          </Column>
        </Row>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BreedingCenterPage)

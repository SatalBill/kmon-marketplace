import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import { toWei } from 'web3x-es/utils'
import { utils } from 'ethers'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Row } from '../../Layout/Row'
import { isOwnedBy } from '../../../modules/nft/utils'
import { Props } from './BreedingInfo.types'
import './BreedingInfo.css'
import { BreedPriceModal } from '../BreedPriceModal'

const BreedingInfo = (props: Props) => {
  const { nft,
    wallet,
    authorizations,
    order,
    bids,
    isAddingToBreedingCentre,
    currentNFTBreedingOrder,
    isCancelingBreed,
    showBreedPriceModal,
    onAddToBreedingCentre,
    onNavigate,
    onResetMyNFT,
    onCancelListing,
    showCooldownTime,
    cooldownTimePercent,
    cooldownTimeDay,
    breedAmountStartValue,
    breedAmountEndValue,
    breedPrice,
    account,
    onShowBreedPriceModal
  } = props
  // const showCooldownTime = nft.activeBreedingOrderId
  const isMyKryptomon = nft.owner.toLowerCase() == account?.toLowerCase() ? true : false
  const isOwner = isOwnedBy(nft, wallet)

  const handleSetPrice = () => {
    onShowBreedPriceModal(true)
  }
  const handleSubmitBreedPrice = (breedPrice: string) => {
    onAddToBreedingCentre(nft.contractAddress, nft.tokenId, toWei(breedPrice, 'ether'))
  }
  const handleCancelListing = () => {
    onCancelListing(nft.contractAddress, nft.tokenId)
  }
  return (
    <div className="breeding-container">
      <div className="breeding-box">
        {showCooldownTime &&
          <Row className="Row-space-between margin-vertical">
            <h5 className="cooldown-time">{t('nft_page.breeding_info.cooldown_time')} :</h5>
            <h5 className="cooldown-time">{`${cooldownTimeDay} ${cooldownTimeDay === 1 ? 'day' : 'days'}`}</h5>
            <ProgressBar
              completed={cooldownTimePercent}
              width="90px"
              height="10px"
              bgColor="rgb(0, 208, 103)"
              isLabelVisible={false} />
          </Row>
        }
        <Row className="Row-space-between margin-vertical">
          <h5 className="cooldown-time">{t('nft_page.breeding_info.breed_amount')} :</h5>
          <h5 className="cooldown-time">{`${breedAmountStartValue} / ${breedAmountEndValue}`}</h5>
          <ProgressBar
            completed={breedAmountEndValue ? breedAmountStartValue * 100 / breedAmountEndValue : 0}
            width="90px"
            height="10px"
            bgColor="rgb(0, 208, 103)"
            isLabelVisible={false} />
        </Row>

        <Row className="Row-space-between margin-vertical">
          {breedPrice !== "" && <h5 className="cooldown-time">{t('nft_page.breeding_info.breed_price')} :</h5>}
          {breedPrice !== "" && <h5 className="cooldown-time">{`${parseInt(utils.formatEther(breedPrice))} KMON`}</h5>}
          {isMyKryptomon && <p onClick={handleSetPrice}>Set price</p>}
        </Row>

      </div>

      <BreedPriceModal
        wallet={wallet}
        authorizations={authorizations}
        show={showBreedPriceModal}
        nft={nft}
        isOwner={isOwner}
        isAddingToBreedingCentre={isAddingToBreedingCentre}
        currentNFTBreedingOrder={currentNFTBreedingOrder}
        isCancelingBreed={isCancelingBreed}
        onSubmitBreedPrice={handleSubmitBreedPrice}
        onCancel={() => onShowBreedPriceModal(false)}
        onCancelListing={handleCancelListing}
      />
    </div>
  )
}

export default React.memo(BreedingInfo)

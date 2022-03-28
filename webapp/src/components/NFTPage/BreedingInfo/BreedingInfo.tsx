import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import { utils } from 'ethers'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Row } from '../../Layout/Row'
import { Props } from './BreedingInfo.types'
import './BreedingInfo.css'

const BreedingInfo = (props: Props) => {
  const { nft,
    cooldownTimePercent,
    cooldownTimeDay,
    breedAmountStartValue,
    breedAmountEndValue,
    breedPrice,
    account
  } = props
  const showCooldownTime = nft.activeBreedingOrderId
  const isMyKryptomon = nft.owner === account

  const handleSetPrice = () => {
    alert(`Set Price of ${nft.metadata.name}`)
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
        {
          breedPrice !== "" &&
          <Row className="Row-space-between margin-vertical">
            <h5 className="cooldown-time">{t('nft_page.breeding_info.breed_price')} :</h5>
            <h5 className="cooldown-time">{`${parseInt(utils.formatEther(breedPrice))} KMON`}</h5>
            {isMyKryptomon && <p onClick={handleSetPrice}>Set price</p>}
          </Row>
        }
      </div>
    </div>
  )
}

export default React.memo(BreedingInfo)

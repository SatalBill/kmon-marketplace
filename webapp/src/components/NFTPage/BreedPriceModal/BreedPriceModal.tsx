import { t, T } from "@kmon/dapps/dist/modules/translation/utils"
import { Coin } from "@kmon/schemas"
import { Button, Form, Modal } from "@kmon/ui"
import React, { useState } from "react"
import { fromCoin, toCoin } from "../../../lib/kmon"
import { getNFTName } from "../../../modules/nft/utils"
import { CoinField } from "../../CoinField"
import { Props } from "./BreedPriceModal.types"

const BreedPriceModal = (props: Props) => {
  const { show, nft, isLoading, onSubmitBreedPrice, onCancel } = props
  const [price, setPrice] = useState('')

  const handleSubmit = () => {
    onSubmitBreedPrice(price)
  }

  return (
    <Modal size="small" open={show} className="ConfirmPriceModal">
      <Modal.Header>{t('nft_page.breed_price_modal.title')}</Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Content>
          <T
            id="nft_page.breed_price_modal.line_one"
            values={{
              name: <b>{getNFTName(nft)}</b>,
              amount: 1000
            }}
          />
          <br />
          <T id="nft_page.breed_price_modal.line_two" />
          <CoinField
            className="mana-input"
            label={t('nft_page.breed_price_modal.price')}
            coin={Coin.KMON}
            placeholder={toCoin(1000)}
            value={price}
            onChange={(_event, props) => {
              const newPrice = fromCoin(props.value, Coin.KMON)
              setPrice(toCoin(newPrice))
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <div
            className="ui button"
            onClick={() => {
              setPrice('')
              onCancel()
            }}
          >
            {t('global.cancel')}
          </div>
          <Button
            type="submit"
            primary
            disabled={
              fromCoin(price, Coin.KMON) === 0
            }
            loading={isLoading}
          >
            {t('global.proceed')}
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default React.memo(BreedPriceModal)
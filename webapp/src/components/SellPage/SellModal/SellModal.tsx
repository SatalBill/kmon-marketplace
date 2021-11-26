import React, { useState, useEffect } from 'react'
import { Coin, Network, NFTCategory } from '@kmon/schemas'
import { fromWei } from 'web3x-es/utils'
import dateFnsFormat from 'date-fns/format'
import {
  Authorization,
  AuthorizationType
} from '@kmon/dapps/dist/modules/authorization/types'
import { hasAuthorization } from '@kmon/dapps/dist/modules/authorization/utils'
import { t, T } from '@kmon/dapps/dist/modules/translation/utils'
import { Header, Form, Field, Button, Modal } from '@kmon/ui'
import { ContractName } from '@kmon/transactions'
import { toKMON, fromKMON } from '../../../lib/kmon'
import {
  INPUT_FORMAT,
  getDefaultExpirationDate
} from '../../../modules/order/utils'
import { getNFTName, isOwnedBy } from '../../../modules/nft/utils'
import { locations } from '../../../modules/routing/locations'
import { VendorFactory } from '../../../modules/vendor/VendorFactory'
import { AuthorizationModal } from '../../AuthorizationModal'
import { NFTAction } from '../../NFTAction'
import { CoinPopup } from '../../CoinPopup'
import { CoinField } from '../../CoinField'
import { getContractNames } from '../../../modules/vendor'
import { getContract } from '../../../modules/contract/utils'
import { Props } from './SellModal.types'
import { CoinSelectField } from '../../CoinSelectField'
import { Address } from 'web3x-es/address'

const SellModal = (props: Props) => {
  const {
    nft,
    order,
    wallet,
    coin,
    authorizations,
    isLoading,
    isCreatingOrder,
    onNavigate,
    onCreateOrder
  } = props

  const isUpdate = order !== null
  const [price, setPrice] = useState(
    isUpdate ? toKMON(+fromWei(order!.price, 'ether')) : ''
  )
  const [expiresAt, setExpiresAt] = useState(
    isUpdate && order!.expiresAt
      ? dateFnsFormat(+order!.expiresAt, INPUT_FORMAT)
      : getDefaultExpirationDate()
  )
  const [confirmPrice, setConfirmPrice] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)
  const [paymentCoin, setPaymentCoin] = useState(Coin.KMON)

  // Clear confirm price when closing the confirm modal
  useEffect(() => {
    if (!showConfirm) {
      setConfirmPrice('')
    }
  }, [nft, showConfirm, setConfirmPrice])

  if (!wallet) {
    return null
  }

  const contractNames = getContractNames()

  const marketplace = getContract({
    name: contractNames.MARKETPLACE,
    network: nft.network
  })

  const kmon = getContract({
    name: contractNames.KMONToken,
    network: nft.network
  })


  const authorization: Authorization = {
    address: wallet.address,
    authorizedAddress: marketplace.address,
    contractAddress: nft.contractAddress,
    contractName: 'KMONFT' as ContractName,
    chainId: nft.chainId,
    type: AuthorizationType.APPROVAL
  }

  const handleCreateOrder = () => {
    if (paymentCoin === Coin.KMON) {
      onCreateOrder(nft, fromKMON(price), kmon.address, new Date(expiresAt).getTime())
    } else {
      onCreateOrder(nft, fromKMON(price), Address.ZERO.toString(), new Date(expiresAt).getTime())
    }
  }

  const handleSubmit = () => {
    if (hasAuthorization(authorizations, authorization)) {
      handleCreateOrder()
    } else {
      setShowAuthorizationModal(true)
      setShowConfirm(false)
    }
  }

  const handleClose = () => setShowAuthorizationModal(false)

  const { orderService } = VendorFactory.build(nft.vendor)

  const isInvalidDate = new Date(expiresAt).getTime() < Date.now()
  const isDisabled =
    !orderService.canSell() ||
    !isOwnedBy(nft, wallet) ||
    fromKMON(price) <= 0 ||
    isInvalidDate

  return (
    <NFTAction nft={nft}>
      <Header size="large">
        {t(isUpdate ? 'sell_page.update_title' : 'sell_page.title')}
      </Header>
      <p className="subtitle">
        <T
          id={isUpdate ? 'sell_page.update_subtitle' : 'sell_page.subtitle'}
          values={{
            name: <b className="primary-text">{getNFTName(nft)}</b>
          }}
        />
      </p>

      <Form onSubmit={() => setShowConfirm(true)}>
        <div className="form-fields">
          <CoinSelectField coin={coin} onChangeCoin={(c) => setPaymentCoin(c)} />
          <CoinField
            label={t('sell_page.price')}
            type="text"
            placeholder={toKMON(1000)}
            coin={paymentCoin}
            value={price}
            focus={true}
            onChange={(_event, props) => {
              const newPrice = fromKMON(props.value)
              setPrice(toKMON(newPrice))
            }}
          />
          <Field
            label={t('sell_page.expiration_date')}
            type="date"
            value={expiresAt}
            onChange={(_event, props) =>
              setExpiresAt(props.value || getDefaultExpirationDate())
            }
            error={isInvalidDate}
            message={isInvalidDate ? t('sell_page.invalid_date') : undefined}
          />
        </div>
        <div className="buttons">
          <Button
            as="div"
            onClick={() =>
              onNavigate(locations.nft(nft.contractAddress, nft.tokenId))
            }
          >
            {t('global.cancel')}
          </Button>
          <Button
            type="submit"
            primary
            disabled={isDisabled || isLoading}
            loading={isLoading}
          >
            {t(isUpdate ? 'sell_page.update_submit' : 'sell_page.submit')}
          </Button>
        </div>
      </Form>

      <Modal size="small" open={showConfirm} className="ConfirmPriceModal">
        <Modal.Header>{t('sell_page.confirm.title')}</Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Content>
            <T
              id="sell_page.confirm.line_one"
              values={{
                name: <b>{getNFTName(nft)}</b>,
                amount: (
                  <CoinPopup network={nft.network} inline coin={paymentCoin}>
                    {fromKMON(price).toLocaleString()}
                  </CoinPopup>
                )
              }}
            />
            <br />
            <T id="sell_page.confirm.line_two" />
            <CoinField
              className="mana-input"
              label={t('sell_page.price')}
              coin={paymentCoin}
              placeholder={price}
              value={confirmPrice}
              onChange={(_event, props) => {
                const newPrice = fromKMON(props.value)
                setConfirmPrice(toKMON(newPrice))
              }}
            />
          </Modal.Content>
          <Modal.Actions>
            <div
              className="ui button"
              onClick={() => {
                setConfirmPrice('')
                setShowConfirm(false)
              }}
            >
              {t('global.cancel')}
            </div>
            <Button
              type="submit"
              primary
              disabled={
                isCreatingOrder || fromKMON(price) !== fromKMON(confirmPrice)
              }
              loading={isCreatingOrder}
            >
              {t('global.proceed')}
            </Button>
          </Modal.Actions>
        </Form>
      </Modal>
      <AuthorizationModal
        open={showAuthorizationModal}
        authorization={authorization}
        isLoading={isCreatingOrder}
        onProceed={handleCreateOrder}
        onCancel={handleClose}
      />
    </NFTAction>
  )
}

export default React.memo(SellModal)

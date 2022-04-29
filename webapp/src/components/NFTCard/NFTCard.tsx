import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@kmon/ui'
import { Address } from 'web3x-es/address'
import { BigNumber, utils } from 'ethers'
import { formatCoin } from '../../lib/kmon'
import { locations } from '../../modules/routing/locations'
import { NFTImage } from '../NFTImage'
import { Props } from './NFTCard.types'
import './NFTCard.css'
import Ice from '../../images/egg/elem-ice.svg'
import Air from '../../images/egg/elem-air.svg'
import Electro from '../../images/egg/elem-electro.svg'
import Ghost from '../../images/egg/elem-ghost.svg'
import Grass from '../../images/egg/elem-grass.svg'
import Ground from '../../images/egg/elem-ground.svg'
import Water from '../../images/egg/elem-water.svg'
import Fire from '../../images/egg/elem-fire.svg'
import breedableHeart from '../../images/heart.png'
import { Row } from '../Layout/Row'
import { Coin } from '@kmon/schemas'
import { fromWei } from 'web3x-es/utils'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

const NFTCard = (props: Props) => {
  const { nft, order, status, breedingOrder, isPreventClick, onClickCard } = props

  const genes = nft.data.kryptomon?.genes
  // const priceInWei = breedingOrder?.price;
  const breedingCount = nft.data.kryptomon?.breedingCount ? nft.data.kryptomon?.breedingCount : 0;
  const timeCanBreed = nft.data.kryptomon?.timeCanBreed || 0;
  const maxBreedingsDuringLifePhase = nft.data.kryptomon?.maxBreedingsDuringLifePhase ? nft.data.kryptomon?.maxBreedingsDuringLifePhase : 0;
  const today = new Date().getTime() / 1000;
  const coin =
    order?.paymentToken === Address.ZERO.toString() ? Coin.BNB : Coin.KMON
  const whatTheSex = (value?: string | number) => {
    if (value && +value > 5) return 'Male'
    else return 'Female'
  }

  const elementTypes = [
    {
      title: 'Water',
      value: genes?.water,
      icon: Water
    },
    {
      title: 'Grass',
      value: genes?.grass,
      icon: Grass
    },
    {
      title: 'Fire',
      value: genes?.fire,
      icon: Fire
    },
    {
      title: 'Electro',
      value: genes?.electro,
      icon: Electro
    },
    {
      title: 'Ground',
      value: genes?.ground,
      icon: Ground
    },
    {
      title: 'Ghost',
      value: genes?.ghost,
      icon: Ghost
    },
    {
      title: 'Ice',
      value: genes?.ice,
      icon: Ice
    },
    {
      title: 'Air',
      value: genes?.air,
      icon: Air
    }
  ]

  const elementType = elementTypes.find(
    element => element.title === nft.data.kryptomon?.elementType
  )

  const handleClickCard = useCallback((e: any) => {
    if (isPreventClick) {
      e.preventDefault()
      if (onClickCard) {
        onClickCard(nft)
      }
    }
  }, [isPreventClick, onClickCard, nft])

  const getIfCanBreed = () => {
    if (timeCanBreed > 0 && timeCanBreed < today) {
      return true;
    } else {
      return false;
    }
  }
  const whatTheSex = (value?: string | number) => {
    if (value && +value > 5) return 'Male'
    else return 'Female'
}
  return (
    <Card
      className="NFTCard"
      link
      as={Link}
      to={locations.nft(nft.contractAddress, nft.tokenId)}
      onClick={handleClickCard}
    >
      <div className="card-image-container">
        <div className="card-image">
          <NFTImage nft={nft} showMonospace isSmall />
        </div>
        <div className="card-image-text">
          {status && status.showPrice ? (
            <div className="product-type-price-container">
              {order?.price ? (
                <div className="nft-price">
                  {order.price && formatCoin(order.price)} {coin}
                  {order.priceUSD && ` ($${order.priceUSD})`}
                </div>
              ) : null}
              <div className="product-type-breedable">
                <img
                  className="product-type-icon"
                  src={elementType?.icon}
                  alt="icon"
                />
                {getIfCanBreed() ?
                  <img src={breedableHeart} alt="breedableHeart" className="breedable-heart" />
                  : <i className="product-description-mid-heart-empty"></i>}
                {
                  nft.data.kryptomon?.maxBreedingsDuringLifePhase ? (
                    <p className="product-description-left-item-white">
                      {`${breedingCount}/${maxBreedingsDuringLifePhase}`}
                    </p>
                  ) : (
                    <p className="product-description-left-item-empty"></p>
                  )
                }
              </div>
            </div>
          ) : (
            <img
              className="product-type-icon"
              src={elementType?.icon}
              alt="icon"
            />
          )}
          {getIfCanBreed() ? <i className="product-description-mid-heart"></i>
                : <i className="product-description-mid-heart-empty"></i>}
        </div>
      </div>
      <div className="product-description-container">
        <div className="product-info">
          <div className="product-info-value">
            {status && status.showPriceBottom && (
              <div className="product-type-price-container">
                {status.showPriceBottom && order?.price ? (
                  <div className="product-type-price">
                    {order.price && formatCoin(order.price)} {coin}
                    {order.priceUSD && ` ($${order.priceUSD})`}
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div className="product-info-name-container">
            <Row>
              <p className="product-info-number-card">ID. {nft.name}</p>
              <div className="product-verified" />
            </Row>
            <div className="product-type-price-short">Gen: {nft.data.kryptomon?.genes.generation}</div>
          </div>
        </div>
        <div className="product-description">
          <div className="product-description-left">

            {/* {
              priceInWei ? (
                <p className="product-description-left-item">
                  Breed Price: {parseInt(utils.formatEther(priceInWei))} KMON
                </p>
              ) : (
                <p className="product-description-left-item-empty">
                  Breed Price: 0 KMON
                </p>
              )
            } */}
            <p className="product-description-left-item">
              GENDER:
            </p>
            <p className="product-description-left-item">
              SPECIALITY
            </p>
          </div>
          <div className="product-description-left">
            <p className="product-description-left-item">
              {whatTheSex(genes?.sex)}
            </p>
            <p className="product-description-left-item">
              {nft.data.kryptomon?.speciality}
            </p>
          </div>
        </div>
      </div>
    </Card >
  )
}

export default React.memo(NFTCard)

import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { Header } from '@kmon/ui'
import { NFT } from '../../../../modules/nft/types'
import { useInput } from '../../../../lib/input'
import { Props } from './TextFilter.types'
import { locations } from '../../../../modules/routing/locations'
import './TextFilter.css'
import Ice from '../../../../images/egg/elem-ice.svg'
import Air from '../../../../images/egg/elem-air.svg'
import Electro from '../../../../images/egg/elem-electro.svg'
import Ghost from '../../../../images/egg/elem-ghost.svg'
import Grass from '../../../../images/egg/elem-grass.svg'
import Ground from '../../../../images/egg/elem-ground.svg'
import Water from '../../../../images/egg/elem-water.svg'
import Fire from '../../../../images/egg/elem-fire.svg'
import breedableHeart from '../../../../images/heart.png'

const elementTypes = [
  {
    title: 'Water',
    icon: Water
  },
  {
    title: 'Grass',
    icon: Grass
  },
  {
    title: 'Fire',
    icon: Fire
  },
  {
    title: 'Electro',
    icon: Electro
  },
  {
    title: 'Ground',
    icon: Ground
  },
  {
    title: 'Ghost',
    icon: Ghost
  },
  {
    title: 'Ice',
    icon: Ice
  },
  {
    title: 'Air',
    icon: Air
  }
]

const TextFilter = (props: Props) => {
  let history = useHistory();
  const { pathname } = useLocation()
  const { nfts, name, value, placeholder, onChange, onFocus } = props

  const today = new Date().getTime() / 1000;

  const getIfCanBreed = (timeCanBreed: any) => {
    if (timeCanBreed > 0 && timeCanBreed < today) {
      return true;
    } else {
      return false;
    }
  }

  const [text, setText] = useInput(value, onChange)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [nftdata, setNftdata] = useState([] as NFT[]);
  const [nftTempData, setNftTempData] = useState([] as NFT[]);

  useEffect(() => {
    if (pathname === '/browse') {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [])

  const handleDetail = (item: NFT) => {
    history.push(locations.nft(item.contractAddress, item.tokenId));
  }

  const textChange = (event: any) => {
    var data: any = [];
    nfts?.map((item) => {
      if (item?.data?.kryptomon?.elementType.toLowerCase() == event.target.value.toLowerCase()) {
        data.push(item);
      }
    })
    setNftdata(data);
    setNftTempData(data.slice(0, 4));
    setText(event);
  }

  const handleShowMore = () => {
    setNftTempData(nftdata);
  }

  return (
    <div className="TextFilter Filter">
      {name ? (
        <Header sub className="name">
          {name}
        </Header>
      ) : null}
      <div className="text-input">
        <input
          ref={inputRef}
          value={text}
          onChange={textChange}
          placeholder={placeholder}
          onFocus={onFocus}
        />
        {
          nftTempData.length > 0 &&
          <div className="search-results-area">
            <div className="search-results-items-area">
              {
                nftTempData.map((item) => (
                  <div onClick={() => handleDetail(item)} className="dropdown-item">
                    <img className="dropdown-item-image" src={item.metadata.image} />
                    <p className="dropdown-item-text">ID.{item.name}</p>
                    <div className="dropdown-item-gen">GEN:{item.data.kryptomon?.genes.generation}</div>
                    {getIfCanBreed(item.data.kryptomon?.timeCanBreed) ? <img src={breedableHeart} alt="breedableHeart" className="dropdown-item-heart" />
                      : <i className="product-description-mid-heart-empty"></i>}
                    {
                      elementTypes.map((elementType) => (
                        elementType.title == item.data.kryptomon?.elementType ?
                          <img
                            src={elementType?.icon}
                            alt="icon"
                          />
                          : null
                      ))
                    }
                  </div>
                ))
              }
            </div>
            <button className="search-result-showmore-btn" onClick={() => handleShowMore()}>Show all</button>
          </div>
        }
      </div>
    </div >
  )
}

export default TextFilter

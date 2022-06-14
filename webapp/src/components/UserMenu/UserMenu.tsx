import React, { useEffect, useState } from 'react'
import { UserMenu as BaseUserMenu } from '@kmon/dapps/dist/containers'
import { Menu } from 'semantic-ui-react'
import Web3 from 'web3'
import { Props } from './UserMenu.types'
import './UserMenu.css'

declare var window: any

const UserMenu = (props: Props) => {
  const { onClickAccount, onClickActivity, onClickSettings } = props
  const [mynfts, setMynfts] = useState([]);

  useEffect(() => {
    const start = async () => {
      let web3 = new Web3(window?.ethereum)
      const accounts = await web3.eth.getAccounts()
      const response = await fetch(
        `${process.env.REACT_APP_NFT_SERVER_URL}/v1/nfts`
      ).then(resp => resp.json());
      const response1 = await fetch(
        `${process.env.REACT_APP_NFT_SERVER_URL}/v1/nfts?first=${response.total}&owner=${accounts[0]}`
      ).then(resp => resp.json());
      setMynfts(response1.data)
    }
    start();
  }, [])

  return (
    <>
      <BaseUserMenu
        onClickSettings={onClickSettings}
        onClickActivity={onClickActivity}
        onClickAccount={onClickAccount}
      />
      {
        mynfts && mynfts.length > 0 &&
        <Menu.Item className="nft-start-game-button" onClick={() => window.open('https://app.kryptomon.co/play')}>
          start game
        </Menu.Item>
      }
    </>
  )
}

export default UserMenu

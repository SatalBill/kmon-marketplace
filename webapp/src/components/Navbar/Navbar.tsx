import React, { useCallback } from 'react'
import { Navbar as BaseNavbar } from '@kmon/dapps/dist/containers'
import { locations } from '../../modules/routing/locations'
import UserMenu from '../UserMenu'
import { Props } from './Navbar.types'
import './Navbar.css'
import { NFTFilters } from '../../components//Vendor/NFTFilters'

const Navbar = (props: Props) => {
  const { pathname, onNavigate, isConnected } = props

  if (isConnected) {
    props = { ...props, rightMenu: <UserMenu /> }
  }

  const handleOnSignIn = useCallback(() => {
    onNavigate(locations.signIn())
  }, [onNavigate])

  const handleOnClickAccount = useCallback(() => {
    onNavigate(locations.settings())
  }, [onNavigate])

  return (
    <BaseNavbar
      {...props}
      hasTranslations
      activePage=""
      isFullscreen={props.isFullscreen}
      isSignIn={pathname === locations.signIn()}
      onSignIn={handleOnSignIn}
      onClickAccount={handleOnClickAccount}
      searchMenu={<NFTFilters isNavBar={true} />}
    />
  )
}

export default React.memo(Navbar)

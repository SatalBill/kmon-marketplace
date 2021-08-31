import React from 'react'
import { UserMenu as BaseUserMenu } from '@kmon/dapps/dist/containers'
import { IntroPopup } from '../IntroPopup'

export default class UserMenu extends React.PureComponent {
  render() {
    return (
      <>
        <BaseUserMenu />
        <IntroPopup />
      </>
    )
  }
}

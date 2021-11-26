import React from 'react'
import { SelectField, CoinIcon } from '@kmon/ui'
import { Coin } from '@kmon/schemas'
import { Props } from './CoinSelectField.types'
import './CoinSelectField.css'

export default class CoinSelectField extends React.PureComponent<Props> {
  render() {
    const { className, network, coin, onChangeCoin, ...rest } = this.props
    let classes = `${network}`
    if (className) {
      classes += ' ' + className
    }
    return (
      <SelectField
        {...rest}
        className={classes}
        options={[
        { key: 1, text: <span><CoinIcon /> KMON</span>, value: Coin.KMON },
        { key: 2, text: <span><CoinIcon network={network} /> {coin}</span>, value: coin },
        ]}
        onChange={(_, a) => onChangeCoin(String(a.value))}
      />
    )
  }
}

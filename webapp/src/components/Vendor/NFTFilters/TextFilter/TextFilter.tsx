import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '@kmon/ui'

import { useInput } from '../../../../lib/input'
import { Props } from './TextFilter.types'
import './TextFilter.css'

const TextFilter = (props: Props) => {
  const { pathname } = useLocation()
  const { name, value, placeholder, onChange, onFocus } = props

  const [text, setText] = useInput(value, onChange)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (pathname === '/browse') {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [])

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
          onChange={setText}
          placeholder={placeholder}
          onFocus={onFocus}
        />
      </div>
    </div>
  )
}

export default TextFilter

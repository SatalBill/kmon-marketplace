import React, { useState, useEffect } from 'react'
import { FooterProps } from '@kmon/ui'
import { Footer as BaseFooter } from '@kmon/dapps/dist/containers'
import * as tranlsations from '../../modules/translation/locales'
import { t, T } from '@kmon/dapps/dist/modules/translation/utils'

// const locales = Object.keys(tranlsations)
// English only at the moment
const locales = [Object.keys(tranlsations)[0], Object.keys(tranlsations)[2]]

const Footer = (props: FooterProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wait, setWait] = useState(false);

  function handleSubmitEmail(event: any) {
    event.preventDefault()
    setWait(true);
    setTimeout(() => {
      setIsSubmitted(true);
    }, 2000);
  }

  return (
    <BaseFooter
      {...props}
      locales={locales}
      subscription={< input type="text" placeholder={t('home_page.enterYourEmail')} className="newsletter-form" required />}
      isSubmitted={isSubmitted}
      wait={wait}
      handleSubmitEmail={handleSubmitEmail}
    />
  )
}

export default React.memo(Footer)

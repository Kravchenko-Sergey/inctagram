import React, { forwardRef } from 'react'

import GoogleRecaptcha from 'react-google-recaptcha'

export const Recaptcha = forwardRef<HTMLDivElement, any>((_, ref) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_LOCALHOST_KEY

  !siteKey && console.error('RECAPTCHA_SITE_KEY не задан')

  return siteKey ? <GoogleRecaptcha {...ref} sitekey={siteKey} theme="dark" /> : null
})

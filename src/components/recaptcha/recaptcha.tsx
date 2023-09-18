import React from 'react'

import GoogleRecaptcha from 'react-google-recaptcha'

export const Recaptcha = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_LOCALHOST_KEY
  const handleRecaptchaChange = (value: string | null) => {
    console.log('Captcha value:', value)
  }

  !siteKey && console.error('RECAPTCHA_SITE_KEY не задан')

  return siteKey ? (
    <GoogleRecaptcha sitekey={siteKey} onChange={handleRecaptchaChange} theme="dark" />
  ) : null
}

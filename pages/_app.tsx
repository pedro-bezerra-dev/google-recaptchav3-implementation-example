import type { AppProps } from 'next/app'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

function MyApp({ Component, pageProps }: AppProps) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY : ''

  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={recaptchaSiteKey}
        language='pt-br'
        scriptProps={{
          async: true,
        }}
        useRecaptchaNet
      >
        <Component
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0',
            boxSizing: 'border-box',
            padding: '0'
          }}
          {...pageProps}
        />
      </GoogleReCaptchaProvider> 
    </>
  )
}

export default MyApp

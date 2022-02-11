import { useState, useEffect, useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export default function Home() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [score, setScore] = useState<number>()

  const handleRecaptchaVerify = useCallback(async () => {
    if(!executeRecaptcha) return
    const token = await executeRecaptcha('test')
    const resultVerifying = await fetch('/api/recaptchaVerify', {
      method: 'POST',
      body: JSON.stringify({ token })
    }).then(res => res.json())

    setScore(resultVerifying.score)
  }, [executeRecaptcha])

  useEffect(() => {
    handleRecaptchaVerify()
  }, [handleRecaptchaVerify])

  return (
    <h1
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90vw',
        height: '90vh',
        textAlign: 'center',
        margin: '0',
        boxSizing: 'border-box',
        padding: '0'
      }}
    >
      Hello, your score in reCAPTCHA is
      {' '}
      {
        !score && (
          '...'
        )
      }
      {
        score && (
          score
        )
      }
    </h1>
  )
}
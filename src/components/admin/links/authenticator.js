import React, { useState, useEffect }  from 'react'
import styled from '@emotion/styled'
import Cookies from 'js-cookie'

import {
  Label,
  TextInput,
  HBox, 
  Button,
} from '../ui.js'

const AuthContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0.5rem auto;
`

export default ({
  onAuth,
}) => {
  const [cookieChecked, setCookieChecked] = useState(false);
  const [cookiePassCode, setCookiePassCode] = useState('');
  const [passCode, setPassCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cpc = Cookies.get('ms-links-passcode')
    if (cpc) {
      setCookiePassCode(cpc)
    } else {
      setCookieChecked(true)
    }
  }, [])

  useEffect(() => {
    if (cookiePassCode) {
      setPassCode(cookiePassCode)
      authenticate(cookiePassCode)
    }
  }, [cookiePassCode])

  const authenticate = (inputCode) => {
    let code = inputCode || passCode;

    let query = `/api/token?p=${code}`
    
    fetch(query)
    .then(r => r.json())
    .then(({ token }) => {
      if (token) {
        /** In case anyone is looking at this, this is absolutely
         *  not recommended. However, none of the data I share is
         *  private and neither the passcode or the token retrieved
         *  by the passcode are really important. Read up on authentication
         *  but don't follow this code :)
         */
        Cookies.set('ms-links-passcode', code)
        onAuth(token)
      } else {
        if (Cookies.get('ms-links-passcode')) {
          Cookies.remove('ms-links-passcode', { path: '' })
        } else {
          setMessage('Wrong passcode')
        }
      }
      // Notify that cookie is checked after authenticating
      setCookieChecked(true)
    })
    .catch(e => {
      console.warn(`Error during authentication: ${e.message}`)
    })
  }

  return (
    <AuthContainer>
      <Label>{cookieChecked ? 'Passcode' : 'Looking up for passcode...'}</Label>
      { 
        cookieChecked && 
          <HBox>
            <TextInput value={passCode} onChange={(e) => setPassCode(e.target.value)} type="password" placeholder="You need to know the secret word"/>
            <Button title="authenticate" color="#319177" onClick={() => authenticate()}>Auth</Button>
          </HBox>
      }
      <Label color="#e2062c">{message}</Label>
    </AuthContainer>
  )
}
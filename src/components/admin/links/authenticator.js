import React, { useState, useEffect }  from 'react'
import styled from '@emotion/styled'
import Cookies from 'js-cookie'

import {
  Button,
  InputGroup,
} from '@blueprintjs/core'

import '@blueprintjs/core/lib/css/blueprint.css'

const AuthContainer = styled.div`
  padding: 0.5rem;
`

const AuthMessage = styled.div`
  color: #e2062c;
  margin: 0;
  padding: 0;
  padding-top: 2pt;
`

export default ({
  onAuth,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [cookieChecked, setCookieChecked] = useState(false);
  const [passCode, setPassCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cpc = Cookies.get('ms-links-passcode')
    if (cpc) {
      setPassCode(cpc)
      authenticate(cpc)
    } else {
      setCookieChecked(true)
    }
  }, [])

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
      setAuthenticated(true)
      setCookieChecked(true)
    })
    .catch(e => {
      console.warn(`Error during authentication: ${e.message}`);
      setAuthenticated(false)
    })
  }

  return (
    <AuthContainer>
      { ! cookieChecked &&
        <div>Checking password</div>
      }

      { cookieChecked && ! authenticated &&
        <InputGroup
          onChange={(e) => setPassCode(e.target.value)}
          type="password"
          class="bp3-input"
          placeholder="Password" 
          rightElement={<Button icon="log-in" onClick={() => authenticate()} title="Log in" />}
        />
      }

      { authenticated &&
        <div>Successfully logged in</div>
      }
      <AuthMessage>{message}</AuthMessage>
    </AuthContainer>
  )
}
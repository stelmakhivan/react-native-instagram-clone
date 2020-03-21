import React, { useState } from 'react'
import AuthPresenter from './AuthPresenter'

import useInput from '../../hooks/useInput'

const Auth = () => {
  const [action, setAction] = useState('logIn')
  const userName = useInput('')
  const firstName = useInput('')
  const lastName = useInput('')
  const email = useInput('')

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
    />
  )
}

export default Auth

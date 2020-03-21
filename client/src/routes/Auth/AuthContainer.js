import React, { useState, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify'

import AuthPresenter from './AuthPresenter'

import useInput from '../../hooks/useInput'

import { LOG_IN } from './AuthQueries'

const Auth = () => {
  const [action, setAction] = useState('logIn')
  const userName = useInput('')
  const firstName = useInput('')
  const lastName = useInput('')
  const email = useInput('')

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  })

  const onLogin = useCallback(
    async e => {
      e.preventDefault()
      if (email.value) {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation()
          if (!requestSecret) {
            toast.error('You dont have an account yet, create one')
            setTimeout(() => setAction('signUp'), 3000)
          } else {
            toast.success('Check your inbox for your login secret')
            setAction('confirm')
          }
        } catch {
          toast.error("Can't request secret, try again")
        }
      } else {
        toast.error('Email is required')
      }
    },
    [email.value, requestSecretMutation]
  )

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onLogin={onLogin}
    />
  )
}

export default Auth

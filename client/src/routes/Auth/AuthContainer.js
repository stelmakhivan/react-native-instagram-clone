import React, { useState, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify'

import AuthPresenter from './AuthPresenter'

import useInput from '../../hooks/useInput'

import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from './AuthQueries'

const Auth = () => {
  const [action, setAction] = useState('logIn')
  const userName = useInput('')
  const firstName = useInput('')
  const lastName = useInput('')
  const email = useInput('')
  const secret = useInput('')

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  })

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      userName: userName.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  })

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  })

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN)

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (action === 'logIn') {
        if (email.value !== '') {
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
      } else if (action === 'signUp') {
        if (
          email.value !== '' &&
          userName.value !== '' &&
          firstName.value !== '' &&
          lastName.value !== ''
        ) {
          try {
            const {
              data: { createAccount },
            } = await createAccountMutation()
            if (!createAccount) {
              toast.error("Can't create account")
            } else {
              toast.success('Account created! Log In now')
              setTimeout(() => setAction('logIn'), 3000)
            }
          } catch (e) {
            toast.error(e.message)
          }
        } else {
          toast.error('All fields are required')
        }
      } else if (action === 'confirm') {
        if (secret.value !== '') {
          try {
            const {
              data: { confirmSecret: token },
            } = await confirmSecretMutation()
            if (token !== '' && token !== undefined) {
              localLogInMutation({ variables: { token } })
            } else {
              throw Error()
            }
          } catch {
            toast.error('Cant confirm secret, please check again')
          }
        }
      }
    },
    [
      action,
      confirmSecretMutation,
      createAccountMutation,
      email,
      firstName.value,
      lastName.value,
      localLogInMutation,
      requestSecretMutation,
      secret.value,
      userName.value,
    ]
  )

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  )
}

export default Auth

import React, { useCallback, useState } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_ACCOUNT } from './AuthQueries'

import styled from 'styled-components/native'

import AuthButton from '../../components/AuthButton'
import AuthInput from '../../components/AuthInput'
import useInput from '../../hooks/useInput'

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Signup = ({ navigation, route: { params: { email = '' } = {} } }) => {
  const fNameInput = useInput('')
  const lNameInput = useInput('')
  const emailInput = useInput(email)
  const userNameInput = useInput('')
  const [loading, setLoading] = useState(false)

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      userName: userNameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  })

  const handleSignup = useCallback(async () => {
    const { value: emailValue } = emailInput
    const { value: fName } = fNameInput
    const { value: userName } = userNameInput

    if (!EMAIL_REGEX.test(emailValue)) {
      return Alert.alert('That email is invalid')
    }
    if (fName === '') {
      return Alert.alert('I need your name')
    }
    if (userName === '') {
      return Alert.alert('Invalid user name')
    }

    try {
      setLoading(true)
      const {
        data: { createAccount },
      } = await createAccountMutation()
      if (createAccount) {
        Alert.alert('Account created', 'Log in now!')
        navigation.navigate('Login', { email: emailValue })
      }
    } catch (e) {
      console.log(e)
      Alert.alert('Username taken.', 'Log in instead')
      navigation.navigate('Login', { email: emailValue })
    } finally {
      setLoading(false)
    }
  }, [createAccountMutation, emailInput, fNameInput, navigation, userNameInput])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...userNameInput}
          placeholder="User name"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton onPress={handleSignup} text="Sign up" loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Signup

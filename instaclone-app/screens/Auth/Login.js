import React, { useCallback } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'

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

const Login = () => {
  const emailInput = useInput('')

  const handleLogin = useCallback(async () => {
    const { value } = emailInput
    if (value === '') {
      return Alert.alert("Email can't be empty")
    } else if (!value.includes('@') || !value.includes('.')) {
      return Alert.alert('Please write an email')
    } else if (!EMAIL_REGEX.test(value)) {
      return Alert.alert('That email is invalid')
    }
  }, [emailInput])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton onPress={handleLogin} text="Log In" />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Login

import React, { useCallback, useState } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { useMutation } from '@apollo/react-hooks'
import { LOG_IN } from './AuthQueries'

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

const Login = ({ navigation, route: { params: { email = '' } = {} } }) => {
  const emailInput = useInput(email)
  const [loading, setLoading] = useState(false)

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
    },
  })

  const handleLogin = useCallback(async () => {
    const { value } = emailInput
    if (value === '') {
      return Alert.alert("Email can't be empty")
    } else if (!value.includes('@') || !value.includes('.')) {
      return Alert.alert('Please write an email')
    } else if (!EMAIL_REGEX.test(value)) {
      return Alert.alert('That email is invalid')
    }

    try {
      setLoading(true)
      const {
        data: { requestSecret },
      } = await requestSecretMutation()
      if (requestSecret) {
        Alert.alert('Check your email')
        navigation.navigate('Confirm', { email: value })
        return
      } else {
        Alert.alert('Account not found')
        navigation.navigate('Signup', { email: value })
      }
    } catch (e) {
      console.log(e)
      Alert.alert("Can't log in now")
    } finally {
      setLoading(false)
    }
  }, [emailInput, navigation, requestSecretMutation])

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
        <AuthButton onPress={handleLogin} text="Log In" loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Login

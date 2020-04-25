import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { useMutation } from '@apollo/react-hooks'
import { CONFIRM_SECRET } from './AuthQueries'
import { useLogIn } from '../../AuthContext'

import AuthButton from '../../components/AuthButton'
import AuthInput from '../../components/AuthInput'
import useInput from '../../hooks/useInput'

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Confirm = ({ route: { params } }) => {
  const confirmInput = useInput('')
  const logIn = useLogIn()
  const [loading, setLoading] = useState(false)
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: params.email,
    },
  })
  const handleConfirm = useCallback(async () => {
    const { value } = confirmInput
    if (value === '' || !value.includes(' ')) {
      return Alert.alert('Invalid secret')
    }
    try {
      setLoading(true)
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation()
      if (confirmSecret !== '' || confirmSecret !== false) {
        logIn(confirmSecret)
      } else {
        Alert.alert('Wrong secret!')
      }
    } catch (e) {
      console.log(e)
      Alert.alert("Can't confirm secret")
    } finally {
      setLoading(false)
    }
  }, [confirmInput, confirmSecretMutation, logIn])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleConfirm} text="Confirm" />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Confirm

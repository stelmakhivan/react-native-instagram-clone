import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import AuthButton from '../../components/AuthButton'
import AuthInput from '../../components/AuthInput'
import useInput from '../../hooks/useInput'

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Login = () => {
  const emailInput = useInput('')
  const handleLogin = useCallback(() => {}, [])
  return (
    <View>
      <AuthInput
        {...emailInput}
        placeholder="Email"
        keyboardType="email-address"
      />
      <AuthButton onPress={handleLogin} text="Log In" />
    </View>
  )
}

export default Login

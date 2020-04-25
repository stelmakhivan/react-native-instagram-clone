import React from 'react'
import styled from 'styled-components/native'
import AuthButton from '../../components/AuthButton'
import AuthInput from '../../components/AuthInput'

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Signup = () => {
  return (
    <View>
      <AuthInput />
      <AuthButton onPress={() => null} text="Sign Up" />
    </View>
  )
}

export default Signup

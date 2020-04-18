import React from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Text = styled.Text``

const AuthHome = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>AuthHome</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AuthHome

import React, { useCallback } from 'react'
import styled from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import constants from '../../constants'

import AuthButton from '../../components/AuthButton'

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Image = styled.Image`
  width: ${constants.width / 2.5}px;
`

const Touchable = styled.TouchableOpacity``

const LoginLink = styled.View``
const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  margin-top: 20px;
  font-weight: 600;
`

const AuthHome = () => {
  const navigation = useNavigation()

  const navigateLoginAction = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  const navigateSignupAction = useCallback(() => {
    navigation.navigate('Signup')
  }, [navigation])

  return (
    <View>
      <Image resizeMode={'contain'} source={require('../../assets/logo.png')} />
      <AuthButton text={'Create New Account'} onPress={navigateSignupAction} />
      <Touchable onPress={navigateLoginAction}>
        <LoginLink>
          <LoginLinkText>Log In</LoginLinkText>
        </LoginLink>
      </Touchable>
    </View>
  )
}

export default AuthHome

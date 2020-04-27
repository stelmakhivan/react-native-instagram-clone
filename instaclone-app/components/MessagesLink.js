import React, { useCallback } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import NavIcon from './NavIcon'

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`

const MessagesLink = () => {
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    navigation.navigate('MessageNavigation')
  }, [navigation])

  return (
    <Container onPress={onPress}>
      <NavIcon
        name={Platform.OS === 'ios' ? 'ios-paper-plane' : 'md-paper-plane'}
      />
    </Container>
  )
}

export default MessagesLink

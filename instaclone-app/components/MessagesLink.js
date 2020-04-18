import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`

const Text = styled.Text``

const MessagesLink = () => {
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    navigation.navigate('MessageNavigation')
  }, [navigation])

  return (
    <Container onPress={onPress}>
      <Text>Messages</Text>
    </Container>
  )
}

export default MessagesLink

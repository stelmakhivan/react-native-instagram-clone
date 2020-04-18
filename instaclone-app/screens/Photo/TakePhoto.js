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

const TakePhoto = () => {
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('UploadPhoto')}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TakePhoto

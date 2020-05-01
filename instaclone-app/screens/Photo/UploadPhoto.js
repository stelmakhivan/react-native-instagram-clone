import React, { useState, useCallback } from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import axios from 'axios'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import useInput from '../../hooks/useInput'
import { FEED_QUERY } from '../Tabs/Home'

import styles from '../../styles'
import constants from '../../constants'

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`

const View = styled.View`
  flex: 1;
`

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`

const Form = styled.View`
  justify-content: flex-start;
`

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180}px;
`

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  color: white;
  font-weight: 600;
`

const Image = styled.Image`
  height: 80px;
  width: 80px;
  margin-right: 30px;
`

const UploadPhoto = ({ route: { params: { photo = {} } = {} } }) => {
  const navigation = useNavigation()

  const [loading, setIsLoading] = useState(false)
  const captionInput = useInput('caption')
  const locationInput = useInput('location')

  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  })

  const handleSubmit = useCallback(async () => {
    if (captionInput.value === '' || locationInput.value === '') {
      Alert.alert('All fields are required')
    }
    const formData = new FormData()
    const name = photo.filename
    const [, type] = name.split('.')
    formData.append('file', {
      name,
      type: type.toLowerCase(),
      uri: photo.uri,
    })
    try {
      setIsLoading(true)

      const {
        data: { location },
      } = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })

      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value,
        },
      })
      if (upload.id) {
        navigation.navigate('TabNavigation')
      }
    } catch (e) {
      Alert.alert('Cant upload', 'Try later')
    } finally {
      setIsLoading(false)
    }
  }, [
    captionInput.value,
    locationInput.value,
    navigation,
    photo,
    uploadMutation,
  ])

  return (
    <View>
      <Container>
        <Image source={{ uri: photo.uri }} />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  )
}

export default UploadPhoto

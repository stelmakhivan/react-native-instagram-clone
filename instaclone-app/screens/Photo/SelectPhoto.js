import React, { useState, useEffect, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'

import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'

import Loader from '../../components/Loader'
import constants from '../../constants'
import styles from '../../styles'

const View = styled.View`
  flex: 1;
`

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${styles.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`

const Text = styled.Text`
  color: white;
  font-weight: 600;
`

const Image = styled.Image`
  width: ${constants.width}px;
  height: ${constants.height / 2}px;
`

const AllPhotosImage = styled.Image`
  width: ${constants.width / 3}px;
  height: ${constants.height / 6}px;
  opacity: ${({ photo, selected }) => (photo.id === selected.id ? 0.35 : 1)};
`

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}))``

const SelectPhoto = () => {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true)
  const [hasPermission, setHasPermission] = useState(false)
  const [selected, setSelected] = useState()
  const [allPhotos, setAllPhotos] = useState()

  const changeSelected = useCallback((photo) => {
    setSelected(photo)
  }, [])

  const getPhotos = useCallback(async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync()
      const [firstPhoto] = assets
      setSelected(firstPhoto)
      setAllPhotos(assets)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const askPermission = useCallback(async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted') {
        setHasPermission(true)
        getPhotos()
      }
    } catch (e) {
      console.log(e)
      setHasPermission(false)
    }
  }, [getPhotos])

  const handleSelected = useCallback(() => {
    navigation.navigate('UploadPhoto', { photo: selected })
  }, [navigation, selected])

  useEffect(() => {
    askPermission()
  }, [askPermission])

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image source={{ uri: selected.uri }} />

              <Button onPress={handleSelected}>
                <Text>Select Photo</Text>
              </Button>

              <ScrollView>
                {allPhotos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}>
                    <AllPhotosImage
                      photo={photo}
                      selected={selected}
                      source={{ uri: photo.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  )
}

export default SelectPhoto

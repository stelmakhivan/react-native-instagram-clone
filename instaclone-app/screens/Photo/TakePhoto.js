import React, { useState, useEffect, useRef, useCallback } from 'react'
import { TouchableOpacity, Platform, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { Ionicons } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'

import constants from '../../constants'
import Loader from '../../components/Loader'
import styles from '../../styles'

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Icon = styled.View``

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 10px solid ${styles.lightGreyColor};
`

const TakePhoto = () => {
  const navigation = useNavigation()
  const cameraRef = useRef()
  const [canTakePhoto, setCanTakePhoto] = useState(true)
  const [loading, setLoading] = useState(true)
  const [hasPermission, setHasPermission] = useState(false)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)

  const takePhoto = useCallback(async () => {
    if (!canTakePhoto) {
      return
    }
    try {
      setCanTakePhoto(false)
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      })
      const asset = await MediaLibrary.createAssetAsync(uri)
      setCanTakePhoto(true)
      navigation.navigate('UploadPhoto', { photo: asset })
    } catch (e) {
      console.log(e)
      setCanTakePhoto(true)
    }
  }, [canTakePhoto, navigation])

  const askPermission = useCallback(async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)

      if (status === 'granted') {
        setHasPermission(true)
      }
    } catch (e) {
      console.log(e)
      setHasPermission(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleType = useCallback(() => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back)
    } else {
      setCameraType(Camera.Constants.Type.front)
    }
  }, [cameraType])

  useEffect(() => {
    askPermission()
  }, [askPermission])

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={cameraStyles.container}>
            <TouchableOpacity onPress={toggleType}>
              <Icon>
                <Ionicons
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-reverse-camera'
                      : 'md-reverse-camera'
                  }
                  size={32}
                  color={'white'}
                />
              </Icon>
            </TouchableOpacity>
          </Camera>
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  )
}

const cameraStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    padding: 15,
    width: constants.width,
    height: constants.height / 2,
  },
})

export default TakePhoto

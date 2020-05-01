import React, { useCallback } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import constants from '../constants'

const SquarePhoto = ({ files = [], id }) => {
  const navigation = useNavigation()
  const navigateTo = useCallback(() => navigation.navigate('Detail', { id }), [
    id,
    navigation,
  ])
  return (
    <TouchableOpacity onPress={navigateTo}>
      <Image source={{ uri: files[0].url }} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: constants.width / 3,
    height: constants.height / 6,
  },
})

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
}

export default SquarePhoto

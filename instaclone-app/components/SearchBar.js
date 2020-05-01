import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import constants from '../constants'
import themeColors from '../styles'

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    style={styles.input}
    returnKeyType="search"
    onChangeText={onChange}
    onEndEditing={onSubmit}
    value={value}
    placeholder={'Search'}
    placeholderTextColor={themeColors.darkGreyColor}
  />
)

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  input: {
    width: constants.width - 40,
    height: 35,
    backgroundColor: themeColors.lightGreyColor,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
})

export default SearchBar

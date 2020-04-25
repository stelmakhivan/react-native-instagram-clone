import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import constants from '../constants'
import { ActivityIndicator } from 'react-native'

const Touchable = styled.TouchableOpacity``

const Container = styled.View`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 1.7}px;
`

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`

const AuthButton = ({ text, onPress, loading = false, bgColor = null }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={'white'} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
)

AuthButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default AuthButton

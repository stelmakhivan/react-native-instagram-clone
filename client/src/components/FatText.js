import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Text = styled.span`
  font-weight: 600;
`

const FatText = ({ text, className }) => (
  <Text className={className}>{text}</Text>
)

FatText.propTypes = {
  text: PropTypes.string.isRequired
}

export default FatText

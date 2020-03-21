import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.input`
  border: 0;
  border: ${({ theme }) => theme.boxBorder};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`

const Input = ({ placeholder }) => <Container placeholder={placeholder} />

Input.propType = {
  placeholder: PropTypes.string.isRequired,
}

export default Input

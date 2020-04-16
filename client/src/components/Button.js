import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${({ theme }) => theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`
const Button = ({ text, onClick }) => (
  <Container onClick={onClick}>{text}</Container>
)

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Button

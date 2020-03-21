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

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = 'text',
  className,
}) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
)

Input.propType = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
}

export default Input

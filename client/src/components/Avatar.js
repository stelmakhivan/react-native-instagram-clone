import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const getSize = size => {
  let number
  if (size === 'sm') {
    number = 30
  } else if (size === 'md') {
    number = 50
  } else if (size === 'lg') {
    number = 150
  }
  return `
        width:${number}px;
        height:${number}px;
        `
}

const Container = styled.div`
  ${props => getSize(props.size)}
  background-image:url(${props => props.url});
  background-size:cover;
  border-radius:50%;
`

const Avatar = ({ size = 'sm', url, className }) => (
  <Container className={className} size={size} url={url} />
)

Avatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  url: PropTypes.string.isRequired
}

export default Avatar

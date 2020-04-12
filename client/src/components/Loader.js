import React from 'react'
import styled, { keyframes } from 'styled-components'

import { Logo } from './Icons'

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
`

export default () => (
  <Loader>
    <Logo size={36} />
  </Loader>
)

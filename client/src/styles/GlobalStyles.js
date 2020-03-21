import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export default createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box
  }
  body {
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.blackColor}
  }
  a {
    color: ${({ theme }) => theme.blueColor};
    text-decoration: none
  }
`

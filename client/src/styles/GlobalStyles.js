import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export default createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box
  }
  body {
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.blackColor};
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-top: 140px;
  }
  a {
    color: ${({ theme }) => theme.blueColor};
    text-decoration: none
  }
  input:focus{
    outline:none;
  }
`

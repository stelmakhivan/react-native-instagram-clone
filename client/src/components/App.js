import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled, { ThemeProvider } from 'styled-components'

import GlobalStyles from '../styles/GlobalStyles'
import Theme from '../styles/Theme'
import Router from './Router'
import Footer from './Footer'

const QUERY = gql`
  {
    isLoggedIn @client
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${({theme}) => theme.maxWidth};
  width: 100%;
`

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY)
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Wrapper>
          <Router isLoggedIn={isLoggedIn} />
          <Footer />
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

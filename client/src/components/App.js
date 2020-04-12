import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled, { ThemeProvider } from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import GlobalStyles from '../styles/GlobalStyles'
import Theme from '../styles/Theme'
import Routes from './Routes'
import Footer from './Footer'
import Header from './Header'

const QUERY = gql`
  {
    isLoggedIn @client
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
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
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  )
}

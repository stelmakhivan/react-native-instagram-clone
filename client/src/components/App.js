import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../styles/GlobalStyles'
import Theme from '../styles/Theme'
import Router from './Router'

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router isLoggedIn={true} />
      </>
    </ThemeProvider>
  )
}

export default App

import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../styles/GlobalStyles'
import Theme from '../styles/Theme'

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      text
    </ThemeProvider>
  )
}

export default App

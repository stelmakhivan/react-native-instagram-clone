import React from 'react'

import { useIsLoggedIn } from '../AuthContext'
import AuthNavigation from '../navigation/AuthNavigation'
import MainNavigation from '../navigation/MainNavigation'
// import MainNavigation from '../navigation/MainNavigation'

export default () => {
  const isLoggedIn = true
  // const isLoggedIn = useIsLoggedIn()
  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />
}

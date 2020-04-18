import React from 'react'

import { useIsLoggedIn } from '../AuthContext'
import AuthNavigation from '../navigation/AuthNavigation'
import TabNavigation from '../navigation/TabNavigation'
// import MainNavigation from '../navigation/MainNavigation'

export default () => {
  const isLoggedIn = true
  // const isLoggedIn = useIsLoggedIn()
  return isLoggedIn ? <TabNavigation /> : <AuthNavigation />
}

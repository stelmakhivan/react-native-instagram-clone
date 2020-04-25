import React from 'react'

import { useIsLoggedIn } from '../AuthContext'
import AuthNavigation from '../navigation/AuthNavigation'
import MainNavigation from '../navigation/MainNavigation'

// 25.04.2020 [20:50] expo web didn't support react-navigation v5 :(
export default () => {
  const isLoggedIn = useIsLoggedIn()
  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />
}

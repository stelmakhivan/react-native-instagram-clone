import React from 'react'
import { Text } from 'react-native'

import { useIsLoggedIn } from '../AuthContext'
// import AuthNavigation from '../navigation/AuthNavigation'
// import MainNavigation from '../navigation/MainNavigation'

export default () => {
  const isLoggedIn = useIsLoggedIn()
  return isLoggedIn ? <Text>Logged in</Text> : <Text>Logged Out</Text>
}

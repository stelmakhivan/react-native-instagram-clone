import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import AuthHome from '../screens/Auth/AuthHome'
import Confirm from '../screens/Auth/Confirm'
import Login from '../screens/Auth/Login'
import Signup from '../screens/Auth/Signup'

const AuthNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AuthHome" component={AuthHome} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default AuthNavigation

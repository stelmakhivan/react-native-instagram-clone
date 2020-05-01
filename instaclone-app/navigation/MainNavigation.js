import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import PhotoNavigation from './PhotoNavigation'
import TabNavigation from './TabNavigation'
import MessageNavigation from './MessageNavigation'
import { stackStyles } from './config'

const MainNavigation = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{ headerStyle: stackStyles }}>
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
      <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
    </Stack.Navigator>
  )
}

export default MainNavigation

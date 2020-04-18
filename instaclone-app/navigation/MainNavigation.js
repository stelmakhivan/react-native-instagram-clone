import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import PhotoNavigation from './PhotoNavigation'
import TabNavigation from './TabNavigation'
import MessageNavigation from './MessageNavigation'

const MainNavigation = () => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
      <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
    </Stack.Navigator>
  )
}

export default MainNavigation

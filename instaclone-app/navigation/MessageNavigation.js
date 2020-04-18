import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import Messages from '../screens/Messages/Messages'
import Message from '../screens/Messages/Message'

const MessageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Message" component={Message} />
    </Stack.Navigator>
  )
}

export default MessageNavigation

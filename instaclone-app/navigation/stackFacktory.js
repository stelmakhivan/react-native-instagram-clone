import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const stackFactory = ({ name = 'InitialRoute', component, options = {} }) => {
  const Stack = createStackNavigator()
  return () => (
    <Stack.Navigator>
      <Stack.Screen name={name} component={component} options={options} />
    </Stack.Navigator>
  )
}

export default stackFactory

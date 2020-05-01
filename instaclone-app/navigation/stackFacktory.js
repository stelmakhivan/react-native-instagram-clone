import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Detail from '../screens/Detail'
import styles from '../styles'

const stackFactory = ({ name = 'InitialRoute', component, options = {} }) => {
  const Stack = createStackNavigator()
  return () => (
    <Stack.Navigator>
      <Stack.Screen name={name} component={component} options={options} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          ...{
            headerBackTitleVisible: false,
            headerTintColor: styles.blackColor,
          },
          ...options,
        }}
      />
    </Stack.Navigator>
  )
}

export default stackFactory

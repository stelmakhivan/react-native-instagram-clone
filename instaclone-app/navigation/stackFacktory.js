import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Detail from '../screens/Detail'
import styles from '../styles'
import UserDetail from '../screens/UserDetail'

const Stack = createStackNavigator()

const stackFactory = ({ name = 'InitialRoute', component, options = {} }) => {
  return React.memo(() => {
    return (
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
        <Stack.Screen
          name="User"
          component={UserDetail}
          options={({ route: { params: { userName = '' } = {} } }) => ({
            headerBackTitleVisible: false,
            headerTintColor: styles.blackColor,
            title: userName,
          })}
        />
      </Stack.Navigator>
    )
  })
}

export default stackFactory

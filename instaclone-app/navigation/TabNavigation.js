import React from 'react'
import { View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

import Home from '../screens/Tabs/Home'
import Search from '../screens/Tabs/Search'
import Notifications from '../screens/Tabs/Notifications'
import Profile from '../screens/Tabs/Profile'

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Add"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault()

            navigation.navigate('PhotoNavigation')
          },
        })}
      />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNavigation

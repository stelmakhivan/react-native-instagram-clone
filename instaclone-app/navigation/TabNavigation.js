import React from 'react'
import { View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

import stackFactory from './stackFacktory'

import Home from '../screens/Tabs/Home'
import Search from '../screens/Tabs/Search'
import Notifications from '../screens/Tabs/Notifications'
import Profile from '../screens/Tabs/Profile'

import MessagesLink from '../components/MessagesLink'

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={stackFactory({
          name: 'Home',
          component: Home,
          options: {
            headerRight: () => <MessagesLink />,
          },
        })}
      />
      <Tab.Screen
        name="Search"
        component={stackFactory({
          name: 'Search',
          component: Search,
        })}
      />
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
      <Tab.Screen
        name="Notifications"
        component={stackFactory({
          name: 'Notifications',
          component: Notifications,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={stackFactory({
          name: 'Profile',
          component: Profile,
        })}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation

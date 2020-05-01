import React from 'react'
import { View, Platform } from 'react-native'
import styled from 'styled-components/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

import stackFactory from './stackFacktory'

import Home from '../screens/Tabs/Home'
import Search from '../screens/Tabs/Search'
import Notifications from '../screens/Tabs/Notifications'
import Profile from '../screens/Tabs/Profile'

import MessagesLink from '../components/MessagesLink'
import NavIcon from '../components/NavIcon'

import { stackStyles } from './config'
import constants from '../constants'

const HeaderLeftContainer = styled.View`
  padding-left: 20px;
`

const Image = styled.Image`
  width: ${constants.width / 2.5}px;
`

const HomeScreen = stackFactory({
  name: 'Home',
  component: Home,
  options: {
    headerLeft: () => (
      <HeaderLeftContainer>
        <NavIcon name="logo-instagram" size={36} />
      </HeaderLeftContainer>
    ),
    headerTitle: () => (
      <Image resizeMode={'contain'} source={require('../assets/logo.png')} />
    ),
    headerRight: () => <MessagesLink />,
    headerStyle: stackStyles,
  },
})

const ProfileScreen = stackFactory({
  name: 'Profile',
  component: Profile,
  options: ({ route: { params: { userName = '' } = {} } }) => {
    return {
      headerStyle: stackStyles,
      title: userName,
    }
  },
})

const NotificationsScreen = stackFactory({
  name: 'Notifications',
  component: Notifications,
  options: {
    headerStyle: stackStyles,
  },
})

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: stackStyles,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
            />
          ),
        }}
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              size={32}
              name={
                Platform.OS === 'ios'
                  ? 'ios-add-circle-outline'
                  : 'md-add-circle-outline'
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={
                Platform.OS === 'ios'
                  ? focused
                    ? 'ios-heart'
                    : 'ios-heart-empty'
                  : focused
                  ? 'md-heart'
                  : 'md-heart-empty'
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation

import React, { useState, useEffect, useCallback } from 'react'
import { AsyncStorage } from 'react-native'

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClientOptions from './apollo'

import { AppLoading } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import { Asset } from 'expo-asset'

import { NavigationContainer } from '@react-navigation/native'

import { ThemeProvider } from 'styled-components'
import styles from './styles'

import { AuthProvider } from './AuthContext'
import NavController from './components/NavController'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [client, setClient] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const preLoad = useCallback(async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      })
      await Asset.loadAsync([require('./assets/logo.png')])

      const cache = new InMemoryCache()
      await persistCache({
        cache,
        storage: AsyncStorage,
      })
      const apolloClient = new ApolloClient({
        cache,
        request: async (operation) => {
          const token = await AsyncStorage.getItem('jwt')
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          })
        },
        ...apolloClientOptions,
      })

      const isLoggedAS = await AsyncStorage.getItem('isLoggedIn')
      if (!isLoggedAS || isLoggedAS === 'false') {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
      }

      setLoaded(true)
      setClient(apolloClient)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  useEffect(() => {
    preLoad()
  }, [preLoad])

  return loaded && client && isLoggedIn !== null ? (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <ThemeProvider theme={styles}>
          <AuthProvider isLoggedIn={isLoggedIn}>
            <NavController />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </NavigationContainer>
  ) : (
    <AppLoading />
  )
}

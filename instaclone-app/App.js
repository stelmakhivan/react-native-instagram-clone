import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, AsyncStorage } from 'react-native'

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloProvider } from '@apollo/react-hooks'
import apolloClientOptions from './apollo'

import { AppLoading } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import { Asset } from 'expo-asset'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [client, setClient] = useState(null)

  const preLoad = useCallback(async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      })
      await Asset.loadAsync([require('./assets/logo.png')])

      const cache = new InMemoryCache()
      // await before instantiating ApolloClient, else queries might run before the cache is persisted
      await persistCache({
        cache,
        storage: AsyncStorage,
      })
      const apolloClient = new ApolloClient({
        cache,
        ...apolloClientOptions,
      })

      setLoaded(true)
      setClient(apolloClient)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  useEffect(() => {
    preLoad()
  }, [preLoad])

  return loaded && client ? (
    <ApolloProvider client={client}>
      <View>
        <Text>Loaded</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  )
}

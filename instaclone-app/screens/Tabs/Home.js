import React, { useState, useCallback } from 'react'
import { RefreshControl, FlatList } from 'react-native'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { POST_FRAGMENT } from '../../fragments'

import Loader from '../../components/Loader'
import Post from '../../components/Post'

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`

function renderPost({ item: post }) {
  return <Post {...post} />
}

function keyExtractor(item) {
  return item.id
}

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { loading, data, refetch } = useQuery(FEED_QUERY)

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true)
      await refetch()
    } catch (e) {
      console.log(e)
    } finally {
      setRefreshing(false)
    }
  }, [refetch])

  return loading ? (
    <Loader />
  ) : (
    data && data.seeFeed && (
      <FlatList
        data={data.seeFeed}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    )
  )
}

export default Home

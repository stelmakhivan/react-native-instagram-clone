import React from 'react'
import { ScrollView } from 'react-native'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { POST_FRAGMENT } from '../fragments'

import Loader from '../components/Loader'
import Post from '../components/Post'

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`

export default ({ route: { params: { id } = {} } = {} }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id },
  })
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  )
}

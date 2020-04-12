import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import Loader from '../components/Loader'
import Post from '../components/Post'

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        userName
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          userName
        }
      }
      createdAt
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`

export default () => {
  const { data, loading } = useQuery(FEED_QUERY)
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | INSTACLONE</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => <Post key={post.id} {...post} />)}
    </Wrapper>
  )
}

import React from 'react'
import { gql } from 'apollo-boost'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'

import ProfilePresenter from './ProfilePresenter'

const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      id
      avatar
      userName
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`

export default withRouter(({ match: { params: { userName } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { userName } })
  const [logOut] = useMutation(LOG_OUT)
  return <ProfilePresenter loading={loading} logOut={logOut} data={data} />
})

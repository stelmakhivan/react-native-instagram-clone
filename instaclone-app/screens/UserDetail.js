import React from 'react'
import { ScrollView } from 'react-native'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { USER_FRAGMENT } from '../fragments'

import Loader from '../components/Loader'
import UserProfile from '../components/UserProfile'

const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`

const UserDetail = ({ route: { params: { userName = '' } = {} } }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { userName },
  })
  React.useEffect(() => {
    return () => {
      console.log('unmounted')
    }
  }, [])
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  )
}

export default UserDetail

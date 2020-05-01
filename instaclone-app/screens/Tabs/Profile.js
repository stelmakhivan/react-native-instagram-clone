import React from 'react'
import { ScrollView } from 'react-native'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { USER_FRAGMENT } from '../../fragments'

import Loader from '../../components/Loader'
import UserProfile from '../../components/UserProfile'

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`

const Profile = () => {
  const { loading, data } = useQuery(ME)
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  )
}

export default Profile

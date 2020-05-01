import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

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
  const navigation = useNavigation()
  const { loading, data } = useQuery(ME)
  useEffect(() => {
    if (data && data.me) {
      navigation.setParams({ userName: data.me.fullName || data.me.userName })
    }
  }, [navigation, data])
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  )
}

export default Profile

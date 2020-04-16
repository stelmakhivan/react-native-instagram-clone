import { gql } from 'apollo-boost'

export const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`

export const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`

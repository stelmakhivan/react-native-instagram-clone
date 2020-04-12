import { gql } from 'apollo-boost'

export const ME = gql`
  {
    me {
      userName
    }
  }
`

import { ApolloClient } from 'apollo-boost'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import { defaults, resolvers } from './LocalState'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://localhost:4000',
})

export default new ApolloClient({
  cache,
  link,
  clientState: {
    defaults,
    resolvers,
  },
})

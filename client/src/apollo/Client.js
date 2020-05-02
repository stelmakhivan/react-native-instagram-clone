import ApolloClient from 'apollo-boost'
import { defaults, resolvers } from './LocalState'

export default new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'http://localhost:4000', // replace it with real URL
  clientState: {
    defaults,
    resolvers,
  },
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
})

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SearchContainer from './SearchContainer'
import SearchBar from '../../../components/SearchBar'

const Stack = createStackNavigator()

const Search = ({ name = 'Search' }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={name}
        component={SearchContainer}
        options={({
          route: {
            params: {
              term = '',
              onChange = () => null,
              onSubmit = () => null,
            } = {},
          } = {},
        }) => ({
          headerTitle: () => (
            <SearchBar value={term} onChange={onChange} onSubmit={onSubmit} />
          ),
        })}
      />
    </Stack.Navigator>
  )
}

export default Search

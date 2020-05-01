import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SearchContainer from './SearchContainer'
import SearchBar from '../../../components/SearchBar'
import Detail from '../../Detail'
import styles from '../../../styles'
import UserDetail from '../../UserDetail'

const Stack = createStackNavigator()

const options = {
  headerBackTitleVisible: false,
  headerTintColor: styles.blackColor,
}

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
      <Stack.Screen name="Detail" component={Detail} options={options} />
      <Stack.Screen name="User" component={UserDetail} options={options} />
    </Stack.Navigator>
  )
}

export default Search

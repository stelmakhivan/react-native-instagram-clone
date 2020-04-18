import React, { createContext, useContext, useState, useCallback } from 'react'
import { AsyncStorage } from 'react-native'

export const AuthContext = createContext()

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp)
  const logUserIn = useCallback(async (token) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true')
      await AsyncStorage.setItem('jwt', token)
      setIsLoggedIn(true)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const logUserOut = useCallback(async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false')
      setIsLoggedIn(false)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return isLoggedIn
}

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext)
  return logUserIn
}

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext)
  return logUserOut
}

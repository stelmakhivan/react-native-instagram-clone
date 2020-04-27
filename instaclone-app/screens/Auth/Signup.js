import React, { useCallback, useState } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'

import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_ACCOUNT } from './AuthQueries'

import styled from 'styled-components/native'

import AuthButton from '../../components/AuthButton'
import AuthInput from '../../components/AuthInput'
import useInput from '../../hooks/useInput'

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.lightGreyColor};
  border-style: solid;
`

const GoogleContainer = styled.View`
  margin-top: 20px;
`

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Signup = ({ navigation, route: { params: { email = '' } = {} } }) => {
  const fNameInput = useInput('')
  const lNameInput = useInput('')
  const emailInput = useInput(email)
  const userNameInput = useInput('')
  const [loading, setLoading] = useState(false)

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      userName: userNameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  })

  const updateFormData = useCallback(
    (emailValue, firstName, lastName) => {
      emailInput.setValue(emailValue)
      fNameInput.setValue(firstName)
      lNameInput.setValue(lastName)
      const [userName] = emailValue.split('@')
      userNameInput.setValue(userName)
    },
    [emailInput, fNameInput, lNameInput, userNameInput]
  )

  const handleSignup = useCallback(async () => {
    const { value: emailValue } = emailInput
    const { value: fName } = fNameInput
    const { value: userName } = userNameInput

    if (!EMAIL_REGEX.test(emailValue)) {
      return Alert.alert('That email is invalid')
    }
    if (fName === '') {
      return Alert.alert('I need your name')
    }
    if (userName === '') {
      return Alert.alert('Invalid user name')
    }

    try {
      setLoading(true)
      const {
        data: { createAccount },
      } = await createAccountMutation()
      if (createAccount) {
        Alert.alert('Account created', 'Log in now!')
        navigation.navigate('Login', { email: emailValue })
      }
    } catch (e) {
      console.log(e)
      Alert.alert('Username taken.', 'Log in instead')
      navigation.navigate('Login', { email: emailValue })
    } finally {
      setLoading(false)
    }
  }, [createAccountMutation, emailInput, fNameInput, navigation, userNameInput])

  const fbLogin = useCallback(async () => {
    try {
      await Facebook.initializeAsync('2623270961276420')
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        )
        const {
          email: emailValue,
          first_name,
          last_name,
        } = await response.json()
        updateFormData(emailValue, first_name, last_name)
        setLoading(false)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`)
    }
  }, [updateFormData])

  const googleLogin = useCallback(async () => {
    try {
      setLoading(true)
      const result = await Google.logInAsync({
        androidClientId:
          '7739539060-oafja6h6hslrnt7kfcfmrdporj7j4cg5.apps.googleusercontent.com',
        iosClientId:
          '7739539060-3338697p2p0d8mvld2fukk7pkaohcdrp.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      })
      if (result.type === 'success') {
        const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        })
        const { email: emailValue, family_name, given_name } = await user.json()
        updateFormData(emailValue, given_name, family_name)
      } else {
        return { canceled: true }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [updateFormData])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...userNameInput}
          placeholder="User name"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton onPress={handleSignup} text="Sign up" loading={loading} />
        <FBContainer>
          <AuthButton
            bgColor={'#2D4DA7'}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
        </FBContainer>
        <GoogleContainer>
          <AuthButton
            bgColor={'#EE1922'}
            loading={false}
            onPress={googleLogin}
            text="Connect Google"
          />
        </GoogleContainer>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Signup

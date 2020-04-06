import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import Input from '../../components/Input'
import Button from '../../components/Button'

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Box = styled.div`
  ${({ theme }) => theme.whiteBox};
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`

const Link = styled.span`
  color: ${({ theme }) => theme.blueColor};
  cursor: pointer;
`

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`

const Auth = ({
  action,
  userName,
  firstName,
  lastName,
  email,
  secret,
  setAction,
  onSubmit,
}) => (
  <Wrapper>
    <Form>
      {action === 'logIn' && (
        <>
          <Helmet>
            <title>Log In | InstaClone</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={'Email'} type="email" {...email} />
            <Button text={'Log in'} />
          </form>
        </>
      )}
      {action === 'signUp' && (
        <>
          <Helmet>
            <title>Sign Up | InstaClone</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={'First name'} {...firstName} />
            <Input placeholder={'Last name'} {...lastName} />
            <Input placeholder={'Email'} type="email" {...email} />
            <Input placeholder={'User name'} {...userName} />
            <Button text={'Sign up'} />
          </form>
        </>
      )}
      {action === 'confirm' && (
        <>
          <Helmet>
            <title>Confirm Secret | InstaClone</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder="Paste your secret" {...secret} required />
            <Button text={'Confirm'} />
          </form>
        </>
      )}
    </Form>
    <StateChanger>
      {action === 'logIn' ? (
        <>
          Don't have an account?{' '}
          <Link onClick={() => setAction('signUp')}>Sign up</Link>
        </>
      ) : (
        <>
          Have an account?{' '}
          <Link onClick={() => setAction('logIn')}>Log in</Link>
        </>
      )}
    </StateChanger>
  </Wrapper>
)

export default Auth

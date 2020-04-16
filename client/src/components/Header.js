import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { Compass, HeartEmpty, User, Logo } from './Icons'
import Input from './Input'
import useInput from '../hooks/useInput'

import { ME } from '../SharedQueries'

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${({ theme }) => theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  display: flex;
  justify-content: center;
`

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`

const SearchInput = styled(Input)`
  background-color: ${({ theme }) => theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`

export default withRouter(({ history }) => {
  const search = useInput('')
  const { data } = useQuery(ME)

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault()
      history.push(`/search?term=${search.value}`)
    },
    [search.value, history]
  )

  const userLinks = data ? (
    !data.me ? (
      <HeaderLink to="/#">
        <User />
      </HeaderLink>
    ) : (
      <HeaderLink to={data.me.userName}>
        <User />
      </HeaderLink>
    )
  ) : null

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            {/* TODO: clear value when navigate to another route */}
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {userLinks}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  )
})

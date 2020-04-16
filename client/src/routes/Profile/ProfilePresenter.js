import React from 'react'
import styled, { css } from 'styled-components'
import { Helmet } from 'react-helmet'

import Loader from '../../components/Loader'
import Avatar from '../../components/Avatar'
import FatText from '../../components/FatText'
import FollowButton from '../../components/FollowButton'
import SquarePost from '../../components/SquarePost'
import Button from '../../components/Button'

const Wrapper = styled.div`
  min-height: 100vh;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
`

const HeaderColumn = styled.div`
  justify-content: center;
  ${({ display = 'block', flex, maxWidth = 'auto' }) => css`
    flex: ${flex};
    max-width: ${maxWidth};
    display: ${display};
  `}
`

const UserNameRow = styled.div`
  display: flex;
  align-items: center;
`

const UserName = styled.span`
  font-size: 26px;
  display: block;
  margin-right: 30px;
`

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`

const FullName = styled(FatText)`
  font-size: 16px;
`

const Bio = styled.p`
  margin: 10px 0px;
`

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 295px;
  grid-gap: 30px;
`

export default ({ loading, data, logOut }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    )
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        userName,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data
    return (
      <Wrapper>
        <Helmet>
          <title>{userName} | INSTACLONE</title>
        </Helmet>
        <Header>
          <HeaderColumn flex={2} maxWidth={'300px'} display={'flex'}>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn flex={4} maxWidth={'300px'}>
            <UserNameRow>
              <UserName>{userName}</UserName>{' '}
              {isSelf ? (
                <Button onClick={logOut} text="Log Out" />
              ) : (
                <FollowButton isFollowing={isFollowing} id={id} />
              )}
            </UserNameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map((post) => (
              // TODO: navigate to post
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    )
  }
  return null
}

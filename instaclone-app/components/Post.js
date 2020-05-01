import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Platform, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Swiper from 'react-native-swiper'
import themeColors from '../styles'
import { useNavigation } from '@react-navigation/native'

import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`

import { Ionicons } from '@expo/vector-icons'
import constants from '../constants'

const Container = styled.View`
  margin-bottom: 40px;
`
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`
const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`
const Touchable = styled.TouchableOpacity``
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`
const Bold = styled.Text`
  font-weight: 500;
`
const Location = styled.Text`
  font-size: 12px;
`
const Image = styled.Image`
  width: ${constants.width}px;
  height: ${constants.height / 2.5}px;
`
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`
const IconContainer = styled.View`
  margin-right: 10px;
`
const InfoContainer = styled.View`
  padding: 20px 10px 10px;
`
const Caption = styled.Text`
  margin: 5px 0px;
`
const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
}) => {
  const navigation = useNavigation()
  const [isLiked, setIsLiked] = useState(isLikedProp)
  const [likeCount, setLikeCount] = useState(likeCountProp)
  const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  })
  const handleLike = useCallback(async () => {
    if (isLiked === true) {
      setLikeCount((l) => l > 0 && l - 1)
    } else {
      setLikeCount((l) => l + 1)
    }
    try {
      await toggleLikeMutaton()
      setIsLiked((p) => !p)
    } catch (e) {}
  }, [isLiked, toggleLikeMutaton])
  const navigateToProfile = useCallback(
    () => navigation.navigate('User', { userName: user.userName }),
    [navigation, user]
  )

  return (
    <Container>
      <Header>
        <Touchable onPress={navigateToProfile}>
          <Avatar source={{ uri: user.avatar }} />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.userName}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        paginationStyle={styles.paginationStyle}
        style={styles.swiperContainer}>
        {files.map((file) => (
          <Image key={file.id} source={{ uri: file.url }} />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={24}
                color={isLiked ? themeColors.redColor : themeColors.blackColor}
                name={
                  Platform.OS === 'ios'
                    ? isLiked
                      ? 'ios-heart'
                      : 'ios-heart-empty'
                    : isLiked
                    ? 'md-heart'
                    : 'md-heart-empty'
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                color={styles.blackColor}
                size={24}
                name={Platform.OS === 'ios' ? 'ios-text' : 'md-text'}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? '1 like' : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.userName}</Bold> {caption}
        </Caption>
        {comments.length ? (
          <Touchable>
            <CommentCount>See all {comments.length} comments</CommentCount>
          </Touchable>
        ) : null}
      </InfoContainer>
    </Container>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  swiperContainer: {
    height: constants.height / 2.5,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -20,
  },
})

export default Post

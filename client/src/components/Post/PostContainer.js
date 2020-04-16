import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import { useMutation } from '@apollo/react-hooks'
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries'

import PostPresenter from './PostPresenter'

import useInput from '../../hooks/useInput'

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location,
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked)
  const [likeCountS, setLikeCount] = useState(likeCount)
  const [currentItem, setCurrentItem] = useState(0)
  const [selfComments, setSelfComments] = useState([])
  const comment = useInput('')
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  })
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  })
  const slide = useCallback(() => {
    const totalFiles = files.length
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000)
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000)
    }
  }, [currentItem, files.length])

  useEffect(() => {
    slide() // TODO: fixed unmount warnings
  }, [currentItem, slide])

  const toggleLike = useCallback(() => {
    toggleLikeMutation()
    if (isLikedS === true) {
      setIsLiked(false)
      setLikeCount(likeCountS - 1)
    } else {
      setIsLiked(true)
      setLikeCount(likeCountS + 1)
    }
  }, [isLikedS, likeCountS, toggleLikeMutation])

  const onKeyPress = useCallback(
    async (event) => {
      const { which } = event
      if (which === 13) {
        event.preventDefault()
        try {
          const {
            data: { addComment },
          } = await addCommentMutation()
          setSelfComments([...selfComments, addComment])
          comment.setValue('')
        } catch {
          toast.error('Cant send comment')
        }
      }
    },
    [addCommentMutation, comment, selfComments]
  )

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  )
}

PostContainer.propTypes = {
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

export default PostContainer

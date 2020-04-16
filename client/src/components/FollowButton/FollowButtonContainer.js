import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import { FOLLOW, UNFOLLOW } from './FollowButtonQueries'
import FollowButtonPresenter from './FollowButtonPresenter'

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing)
  const [followMutation] = useMutation(FOLLOW, { variables: { id } })
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } })

  const onClick = useCallback(() => {
    if (isFollowingS === true) {
      setIsFollowing(false)
      unfollowMutation()
    } else {
      setIsFollowing(true)
      followMutation()
    }
  }, [followMutation, isFollowingS, unfollowMutation])
  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />
}

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
}

export default FollowButtonContainer

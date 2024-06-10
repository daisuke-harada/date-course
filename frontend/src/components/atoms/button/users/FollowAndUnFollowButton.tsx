import { memo, useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';

import { setCurrentUser } from 'actions/sessionActions';
import { UserResponseData } from 'types/users/response';
import { client } from 'lib/api/client';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

type Props = {
  userId: number,
  addClassName?: string,
  setUsers?: React.Dispatch<React.SetStateAction<UserResponseData[]>>,
  setUser?: React.Dispatch<React.SetStateAction<UserResponseData>>
};

const FollowButton = tw.button`btn btn-yellow-green`;
const UnfollowButton = tw.button`btn btn-unfollow`;

export const FollowAndUnFollowButton: FC<Props> = memo((props) => {
  const {userId, setUsers, setUser, addClassName} = props;

  const dispatch = useDispatch();
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser);
  const getLoginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus);

  useEffect(() => {
    getCurrentUser && setCurrentUserId(getCurrentUser.id);
  },[getCurrentUser, userId]);

  const onClickFollowAction = () => {
    client.post('relationships', {
      currentUserId: getCurrentUser.id,
      followedUserId: userId,
    }).then(response => {
      if (response.data.status === 'created') {
        setUsers && setUsers(response.data.users);
        dispatch(setCurrentUser(response.data.currentUser));
        setUser && setUser(response.data.followedUser);
      }
    });
  };

  const onClickUnfollowAction = () => {
    client.delete(`relationships/${currentUserId}/${userId}`).then(response => {
      if (response.data.status === 'deleted') {
        setUsers && setUsers(response.data.users);
        dispatch(setCurrentUser(response.data.currentUser));
        setUser && setUser(response.data.unfollowedUser);
      }
    });
  };

  return(
    <>
      {
        getLoginStatus &&
        currentUserId !== userId &&
        (getCurrentUser.followingIds && getCurrentUser.followingIds.includes(userId) ?
        <UnfollowButton data-e2e={`unfollow-button-${userId}`} className={addClassName} onClick={onClickUnfollowAction}>フォロー中</UnfollowButton>
        :
        <FollowButton data-e2e={`follow-button-${userId}`} className={addClassName} onClick={onClickFollowAction}>フォロー</FollowButton>
        )
      }
    </>
  );
});

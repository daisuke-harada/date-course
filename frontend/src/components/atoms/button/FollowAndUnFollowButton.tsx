import { client } from 'lib/api/client';
import { memo, useEffect, useState, VFC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session';
import tw from 'tailwind-styled-components';
import { UserResponseData } from 'types/users/response';

type Props = {
  dataE2e?: string,
  userId: number,
  addClassName?: string,
  setUsers?: React.Dispatch<React.SetStateAction<UserResponseData[]>>,
  setUser?: React.Dispatch<React.SetStateAction<UserResponseData>>
};

const FollowButton = tw.button`btn btn-yellow-green text-sm`
const UnfollowButton = tw.button`btn btn-unfollow`;

export const FollowAndUnFollowButton: VFC<Props> = memo((props) => {
  const {dataE2e, userId, setUsers, setUser, addClassName} = props;

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const getLoginStatus = useRecoilValue(loginStatusState);
  const [currentUserId, setCurrentUserId] = useState<number>(0);

  useEffect(() => {
    currentUser.user &&
    setCurrentUserId(currentUser.user.id);
  },[currentUser, userId]);

  const onClickFollowAction = () => {
    client.post('relationships', {
      currentUserId: currentUser.user.id,
      followedUserId: userId,
    }).then(response => {
      response.data.status === 'created' && setUsers && setUsers(response.data.users);
      response.data.status === 'created' && setCurrentUser({user: response.data.currentUser});
      response.data.status === 'created' && setUser && setUser(response.data.followedUser);
    });
  };

  const onClickUnfollowAction = () => {
    client.delete(`relationships/${currentUserId}/${userId}`).then(response => {
      response.data.status === 'deleted' && setUsers && setUsers(response.data.users);
      response.data.status === 'deleted' && setUser && setUser(response.data.unfollowedUser);
      response.data.status === 'deleted' && setCurrentUser({user: response.data.currentUser});
    });
  };


  return(
    <>
      {
        getLoginStatus.status === true &&
        currentUserId !== userId &&
        (currentUser.user.followingIds && currentUser.user.followingIds.includes(userId)?
        <UnfollowButton data-e2e={dataE2e} className={addClassName} onClick={onClickUnfollowAction}>フォロー中</UnfollowButton>
        :
        <FollowButton data-e2e={dataE2e} className={addClassName} onClick={onClickFollowAction}>フォロー</FollowButton>
        )
      }
    </>
  );
});
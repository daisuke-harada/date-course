import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "store/session";
import tw from "tailwind-styled-components";

type Props = {
  dataE2e?: string,
  userId: number,
};

const Button = tw.button`btn btn-yellow-green text-sm`

export const FollowAndUnFollowButton: VFC<Props> = memo((props) => {
  const {dataE2e, userId} = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [unFollowToggle, setUnFollowToggle] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser.user &&
    setCurrentUserId(getCurrentUser.user.id)
  },[getCurrentUser]);

  const onClickFollowAction = () => {
    client.post('relationships', {
      currentUserId: getCurrentUser.user.id,
      followedUserId: userId,
    }).then(response => {
      response.data.status === 'created' && setUnFollowToggle(!unFollowToggle);
    });
  };
  console.log(unFollowToggle);

  return(
    <>
      {
        currentUserId !== userId
        &&
        (<Button data-e2e={dataE2e} onClick={onClickFollowAction}>フォロー</Button>)
      }
    </>
  );
});
import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const Span = tw.span`m-2 font-bold`;

type Props = {
  userId: number,
  followingIdsCount: number,
  followerIdsCount: number,
};

export const FollowingsAndFollowersLinkArea: VFC<Props> = memo((props) => {
  const {userId, followingIdsCount, followerIdsCount} = props;

  return(
    <>
      <Span>
        {
          followingIdsCount !== 0?
          (
            <Link to={`/users/${userId}/followings`}>
              フォロー中 {followingIdsCount}
            </Link>
          )
          :
          (<>フォロー中{followingIdsCount}</>)
        }
      </Span>
      <Span>
        {
          followerIdsCount !== 0?
          (
            <Link to={`/users/${userId}/followers`}>
              フォロワー {followerIdsCount}
            </Link>
          )
          :
          (<>フォロワー{followerIdsCount}</>)
        }
      </Span>
    </>
  );
});
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
      <Span data-e2e="followings-count">
        {
          followingIdsCount !== 0?
          (
            <Link to={`/users/${userId}/followings`}>
              フォロー {followingIdsCount}
            </Link>
          )
          :
          (<>フォロー{followingIdsCount}</>)
        }
      </Span>
      <Span data-e2e="followers-count">
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
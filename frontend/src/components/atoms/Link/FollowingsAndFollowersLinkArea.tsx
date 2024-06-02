import { memo, FC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

type Props = {
  userId: number,
  followingIdsCount: number,
  followerIdsCount: number,
};

const Span = tw.span`m-2 font-bold`;

export const FollowingsAndFollowersLinkArea: FC<Props> = memo((props) => {
  const {userId, followingIdsCount, followerIdsCount} = props;

  return(
    <>
      <Span data-e2e='followings-count'>
        {
          followingIdsCount !== 0?
          (
            <Link to={`/users/${userId}/followings`}>
              フォロー {followingIdsCount}
            </Link>
          )
          :
          (<>フォロー {followingIdsCount}</>)
        }
      </Span>
      <Span data-e2e='followers-count'>
        {
          followerIdsCount !== 0?
          (
            <Link to={`/users/${userId}/followers`}>
              フォロワー {followerIdsCount}
            </Link>
          )
          :
          (<>フォロワー {followerIdsCount}</>)
        }
      </Span>
    </>
  );
});
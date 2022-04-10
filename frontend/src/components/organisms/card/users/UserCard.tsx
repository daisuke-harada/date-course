import { memo, useEffect, useState, VFC } from "react";
import tw from 'tailwind-styled-components';

import { UserResponseData } from "types/users/response";
import { Card } from "components/atoms/card/Card";
import { Link } from "react-router-dom";
import { UserImage } from "components/atoms/layouts/users/UserImage";
import { FollowAndUnFollowButton } from "components/atoms/button/FollowAndUnFollowButton";
import { FollowingsAndFollowersLinkArea } from "components/molecules/Link/users/FollowingsAndFollowersLinkArea";

type Props = {
  user: UserResponseData,
  setUsers?: React.Dispatch<React.SetStateAction<UserResponseData[]>>
};

const Span = tw.span`m-2 font-bold`;
const DD = tw.dd`m-5`;

export const UserCard: VFC<Props> = memo((props) => {
  const { user, setUsers } = props;
  const [genderTextColor, setGenderTextColor] = useState('');

  useEffect(() => {
    if(user.gender === '女性'){
      setGenderTextColor('text-red-400 hover:text-yellow-500');
    }else if(user.gender === '男性'){
      setGenderTextColor('text-blue-400 hover:text-yellow-500');
    };
  }, [user]);

  return(
    <Card>
      <DD>
        <UserImage addClassName="w-64 h-64" userId={user.id} image={user.image} gender={user.gender} />
      </DD>
      <DD>
        <Link to={`/users/${user.id}`}>
          <Span className={genderTextColor}>
            {user.name}
          </Span>
          <Span className={genderTextColor} >
            {user.gender}
          </Span>
        </Link>
        <FollowAndUnFollowButton userId={user.id} setUsers={setUsers} />
      </DD>
      <DD>
        <FollowingsAndFollowersLinkArea
          userId={user.id}
          followerIdsCount={user.followerIds.length}
          followingIdsCount={user.followingIds.length}
        />
      </DD>
    </Card>
  );
});
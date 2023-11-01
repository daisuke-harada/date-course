import { memo, useEffect, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

import { UserResponseData } from 'types/users/response';
import { Card } from 'components/atoms/card/Card';
import { Link } from 'react-router-dom';
import { UserImage } from 'components/atoms/imageLayouts/users/UserImage';
import { FollowAndUnFollowButton } from 'components/atoms/button/users/FollowAndUnFollowButton';
import { FollowingsAndFollowersLinkArea } from 'components/organisms/area/users/FollowingsAndFollowersLinkArea';

type Props = {
  user: UserResponseData,
  setUsers?: React.Dispatch<React.SetStateAction<UserResponseData[]>>
};

const Div = tw.div`m-2 font-bold mobile(L):text-sm sm:text-xl md:text-2xl`;
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
        <UserImage addClassName='w-64 h-64 m-auto' userId={user.id} image={user.image} gender={user.gender} />
      </DD>
      <DD className='flex'>
        <Link to={`/users/${user.id}`}>
          <Div className={`${genderTextColor} w-24 pb-2 overflow-x-scroll whitespace-nowrap`}>
            {user.name}
          </Div>
        </Link>
        <Link to={`/users/${user.id}`}>
          <Div className={`${genderTextColor}`}>
            {user.gender}
          </Div>
        </Link>
        <div className='pt-1'>
          <FollowAndUnFollowButton userId={user.id} setUsers={setUsers} />
        </div>
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
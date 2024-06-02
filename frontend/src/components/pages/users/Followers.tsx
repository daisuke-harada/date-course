import { memo, useEffect, useState, FC } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Users } from 'components/templates/users/Users';
import { defaultUserResponseData } from 'datas/defaultUserData';
import { client } from 'lib/api/client';
import { UserResponseData } from 'types/users/response';

export const Followers: FC = memo(() => {
  const { id } = useParams();
  const [users, setUsers] = useState<UserResponseData[]>([defaultUserResponseData]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    client.get(`users/${id}/followers`).then(response => {
      setUsers(response.data.users);
      setUserName(response.data.userName);
    });
  }, [id]);

  return(
    <>
      <h1 className='m-10 lg:text-2xl mobile(L):text-xl mobile(M):text-lg text-xs'>
        <span className='font-bold mr-1'>
          <Link to={`/users/${id}`}>
            {userName}
          </Link>
        </span>
        のフォロワー
      </h1>
      <Users users={users} />
    </>
  );

});
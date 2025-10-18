import { FC, memo, useEffect, useState } from 'react';

import { IndexLayout } from 'components/templates/layouts/IndexLayouts';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { UserResponseData } from 'types/users/response';
import { Users } from 'components/templates/users/Users';
import { client } from 'lib/api/client';
import { defaultUserResponseData } from 'datas/defaultUserData';
import { useSearchParams } from 'react-router-dom';

export const Index: FC = memo(() => {
  const [users, setUsers] = useState<UserResponseData[]>([defaultUserResponseData]);
  const [searchParams] = useSearchParams();
  const userSearchName = searchParams.get('name') || '';

  useEffect(() => {
    const params: Record<string, string> = {};
    if (userSearchName) params.name = userSearchName;
    client.get('users', { params }).then(response => {
      setUsers(response.data);
    });
  }, [userSearchName]);

  return(
    <IndexLayout
      sideArea={<UserNameSearchBar />}
      topArea={
        <MultiBar
          defaultDateSpotCondition='bg-gray-300'
          defaultCourseCondition='bg-gray-300'
          defaultUserCondition='bg-red-400'
          defaultSearchSwitch='User'
          userSearchName=''
        />
      }
      mainArea={<Users users={users} setUsers={setUsers} />}
    />
  );
});
import { memo, useEffect, useState, VFC } from 'react';

import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { IndexLayout } from 'components/templates/layouts/IndexLyouts';
import { Users } from 'components/templates/users/Users';
import { client } from 'lib/api/client';
import { UserResponseData } from 'types/users/response';
import { defaultUserResponseData } from 'datas/defaultUserData';

export const Index: VFC = memo(() => {
  const [users, setUsers] = useState<UserResponseData[]>([defaultUserResponseData]);

  useEffect(() => {
    client.get(`users`).then(response => {
      setUsers(response.data.users);
    });
  }, []);

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
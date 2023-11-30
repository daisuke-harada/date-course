import { memo, useEffect, useState, VFC } from 'react';
import { useLocation } from 'react-router-dom';

import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { UserNameSearchBar } from 'components/organisms/searchs/UserNameSearchBar';
import { IndexLayout } from 'components/templates/layouts/IndexLayouts';
import { Users } from 'components/templates/users/Users';
import { UserResponseData } from 'types/users/response';
import { defaultUserResponseData } from 'datas/defaultUserData';

export const Search: VFC = memo(() => {
  const [users, setUsers] = useState<UserResponseData[]>([defaultUserResponseData]);
  const location = useLocation();
  const state = location.state as { users: UserResponseData[], userSearchName: string };

  useEffect(() => {
    setUsers(state.users);
  }, [state.users]);

  return(
    <IndexLayout
      sideArea={<UserNameSearchBar />}

      topArea = {
        <MultiBar
          defaultDateSpotCondition='bg-gray-300'
          defaultCourseCondition='bg-gray-300'
          defaultUserCondition='bg-red-400'
          defaultSearchSwitch='User'
          userSearchName={state.userSearchName}
        />
      }

      mainArea={<Users users={users} setUsers={setUsers} userSearchName={state.userSearchName} />}
    />
  );
});
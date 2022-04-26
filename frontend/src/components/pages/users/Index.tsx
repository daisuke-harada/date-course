import { memo, useEffect, useState, VFC } from 'react';

import { CourseSortSearchBar } from 'components/organisms/searchs/CourseSortSearchBar';
import { MultiBar } from 'components/organisms/searchs/MultiBar';
import { DateSpotSortSearchBar } from 'components/organisms/searchs/DateSpotSortSearchBar';
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
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureValue=''
            defaultGenreValue=''
            defaultBusinessTimeValue=''
          />
          <CourseSortSearchBar defaultPrefectureValue='' />
          <UserNameSearchBar />
        </>
      }
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
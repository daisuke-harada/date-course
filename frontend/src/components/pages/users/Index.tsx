import { DateSpotNameSearchBar } from "components/organisms/searchs/DateSpotNameSearchBar";
import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
import { UserNameSearchBar } from "components/organisms/searchs/UserNameSearchBar";
import { Users } from "components/templates/users/Users";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { UserResponseData } from "types/users/response";

export const Index: VFC = memo(() => {
  const [users, setUsers] = useState<Array<UserResponseData>>([]);
  useEffect(() => {
    client.get(`users`).then(response => {
      setUsers(response.data.users);
    });
  }, []);

  return(
    <div className='w-full flex'>
      <div className='md:block hidden w-3/12 p-5'>
        <DateSpotSortSearchBar
          defaultPrefectureValue=''
          defaultGenreValue=''
          defaultBusinessTimeValue=''
        />
        <DateSpotNameSearchBar />
        <UserNameSearchBar />
      </div>
      <div className='md:w-9/12 w-full p-5'>
        <Users users={users} setUsers={setUsers} />
      </div>
    </div>
  );
});
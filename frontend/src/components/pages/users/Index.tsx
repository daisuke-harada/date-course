import { DateSpotNameSearchBar } from "components/organisms/searchs/DateSpotNameSearchBar";
import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
import { UserNameSearchBar } from "components/organisms/searchs/UserNameSearchBar";
import { IndexLayout } from "components/templates/IndexLyouts";
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
    <IndexLayout
      sideArea={
        <>
          <DateSpotSortSearchBar
            defaultPrefectureValue=''
            defaultGenreValue=''
            defaultBusinessTimeValue=''
          />
          <DateSpotNameSearchBar />
          <UserNameSearchBar />
        </>
      }
      centerArea={<Users users={users} setUsers={setUsers} />}
    />
  );
});
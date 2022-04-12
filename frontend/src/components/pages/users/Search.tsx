import { DateSpotNameSearchBar } from "components/organisms/searchs/DateSpotNameSearchBar";
import { DateSpotSortSearchBar } from "components/organisms/searchs/DateSpotSortSearchBar";
import { UserNameSearchBar } from "components/organisms/searchs/UserNameSearchBar";
import { IndexLayout } from "components/templates/IndexLyouts";
import { Users } from "components/templates/users/Users";
import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import { UserResponseData } from "types/users/response";

export const Search: VFC = memo(() => {
  const [users, setUsers] = useState<Array<UserResponseData>>([]);
  const location = useLocation();
  const state = location.state as { users: Array<UserResponseData>, userSearchName: string };

  useEffect(() => {
    setUsers(state.users);
  }, [state.users]);

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
      centerArea={<Users users={users} setUsers={setUsers} userSearchName={state.userSearchName} />}
    />
  );
});
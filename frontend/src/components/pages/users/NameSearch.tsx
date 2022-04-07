import { Users } from "components/templates/users/Users";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import { UserResponseData } from "types/users/response";

export const NameSearch: VFC = memo(() => {
  const [users, setUsers] = useState<Array<UserResponseData>>([]);
  const location = useLocation();
  const state = location.state as { users: Array<UserResponseData> };

  useEffect(() => {
    setUsers(state.users);
  }, [state.users]);
  console.log(state.users);
  return(
    <>
      <h1 className='m-4'>ユーザーを探すページ</h1>
      <Users users={users} setUsers={setUsers} />
    </>
  );
});
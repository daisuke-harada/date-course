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
    <>
      <h1 className='m-2'>ユーザーを探すページ</h1>
      <Users users={users} setUsers={setUsers} />
    </>
  );
});
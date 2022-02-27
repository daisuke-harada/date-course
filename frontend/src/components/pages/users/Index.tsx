import { UserCard } from "components/organisms/users/UserCard";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { UserResponseData } from "types/api/response";

export const Index: VFC = memo(() => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    client.get(`users`).then(response => {
      console.log(response.data.users);
      setUsers(response.data.users);
    });
  }, []);
  return(
    <>
      <h1 className='mt-6'>ユーザーを探すページ</h1>
      {users.map((user: UserResponseData) => (<UserCard key={user.id} user={user} />))}
    </>
  );
});
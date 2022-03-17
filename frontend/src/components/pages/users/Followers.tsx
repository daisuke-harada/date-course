import { Users } from "components/templates/users/Users";
import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import { UserResponseData } from "types/users/response";

export const Followers: VFC = memo(() => {
  const { id } = useParams();
  const [users, setUsers] = useState<Array<UserResponseData>>([]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    client.get(`users/${id}/followers`).then(response => {
      setUsers(response.data.users);
      setUserName(response.data.userName);
    });
  }, [id]);

  return(
    <>
      <h1 className='m-10 text-2xl'>{userName}のフォロワー</h1>
      <Users users={users} />
    </>
  );

});
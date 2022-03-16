import { memo, VFC } from "react";

import { UserCard } from "components/organisms/users/UserCard";
import { UserResponseData } from "types/users/response";

type Props = {
  users: Array<UserResponseData>,
  setUsers: React.Dispatch<React.SetStateAction<UserResponseData[]>>
};

export const Users: VFC<Props> = memo((props) => {
  const { users, setUsers } = props;
  return(
    <div className='flex flex-wrap justify-center'>
      {users.map((user: UserResponseData) => (<UserCard key={user.id} user={user} setUsers={setUsers} />))}
    </div>
  );
});
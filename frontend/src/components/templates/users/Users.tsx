import { UserCard } from "components/organisms/users/UserCard";
import { memo, VFC } from "react";
import { UserResponseData } from "types/api/response";

type Props = {
  users: Array<UserResponseData>
};

export const Users: VFC<Props> = memo((props) => {
  const { users } = props;
  return(
    <div className='flex flex-wrap justify-center'>
      {users.map((user: UserResponseData) => (<UserCard key={user.id} user={user} />))}
    </div>
  );
});
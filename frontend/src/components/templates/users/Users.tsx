import { memo, VFC } from "react";

import { UserCard } from "components/organisms/card/users/UserCard";
import { UserResponseData } from "types/users/response";
import { CustomeSearchBar } from "components/organisms/searchs/CustomeSearchBar";

type Props = {
  users: Array<UserResponseData>,
  setUsers?: React.Dispatch<React.SetStateAction<UserResponseData[]>>
};

export const Users: VFC<Props> = memo((props) => {
  const { users, setUsers } = props;
  return(
    <>
      {
        users.length !== 0?
        (
          <>
            <CustomeSearchBar
              defaultDateSpotCondition='bg-gray-300'
              defaultCourseCondition='bg-gray-300'
              defaultUserCondition='bg-red-400'
              defaultSearchSwitch='User'
            />
            <div className='flex flex-wrap'>
              {users.map((user: UserResponseData) => (<UserCard key={user.id} user={user} setUsers={setUsers} />))}
            </div>
          </>
        )
        :
        <div className='mt-2 text-center text-red-400 text-4xl'>
          ユーザーは存在しません
        </div>
      }
    </>
  );
});
import { memo, VFC } from 'react';

import { UserCard } from 'components/organisms/card/users/UserCard';
import { UserResponseData } from 'types/users/response';
import { Loading } from 'components/pages/Loading';

type Props = {
  users: Array<UserResponseData>,
  setUsers?: React.Dispatch<React.SetStateAction<UserResponseData[]>>,
  userSearchName?: string
};

export const Users: VFC<Props> = memo((props) => {
  const { users, setUsers, userSearchName } = props;
  return(
    <Loading loadingSwitch={users.length !== 0 && users[0].id === 0 && true} >
      {
        users.length !== 0?
        (
          <>
            {
              userSearchName &&
              <div className='text-xl px-2 mb-10 font-bold text-left'>
                検索結果: "{userSearchName}"を含むユーザー
              </div>
            }
            <div className='sm:justify-start justify-center flex flex-wrap'>
              {users.map((user: UserResponseData) => (<UserCard key={user.id} user={user} setUsers={setUsers} />))}
            </div>
          </>
        )
        :
        (
          <div className='mt-2 text-center text-red-400 text-4xl'>
            ユーザーは存在しません
          </div>
        )
      }
    </Loading>
  );
});
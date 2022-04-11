import { memo, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { client } from 'lib/api/client';

const Input = tw.input`py-1 px-3 w-full border-2 border-red-100 rounded-xl`;

type Props = {
  defaultUserName: string
}


export const UserNameSearchBar: VFC<Props> = memo((props) => {
  const { defaultUserName } = props;
  const [ userName, setUserName ] = useState(defaultUserName);
  const navigate = useNavigate();
  const onChangeSearchName: React.ChangeEventHandler<HTMLInputElement> = (e) => setUserName(e.target.value);

  const search = {
    userName: userName,
  }

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('user_name_search', search).then(response => {
      navigate('/users/search', {state: {users: response.data.users, userSearchName: userName}});
    });
  };

  return(
    <div className='m-auto mt-3 p-3 bg-white border-2 rounded-3xl border-gray-200 flex flex-col' >
      <div className='m-auto my-5 font-bold text-center'>
        ユーザー名前検索
      </div>
      <Input onChange={onChangeSearchName} type='text' value={userName} />
      <div className='m-auto my-5 w-1/2'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </div>
  );
});
import { memo, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { client } from 'lib/api/client';

const Input = tw.input`py-1 px-3 w-full border-2 border-red-100 rounded-xl`;

type Props = {
  userSearchName?: string
}


export const UserSearchArea: VFC<Props> = memo((props) => {
  const { userSearchName } = props;
  const [ userName, setUserName ] = useState(userSearchName || '');
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
    <>
      <div className='pt-5 mt-5 mb-2 px-2'>
        <Input onChange={onChangeSearchName} type='text' value={userName} placeholder='名前を検索' />
      </div>
      <div className='m-auto my-5 w-1/4'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </>
  );
});
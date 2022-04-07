import { BaseButton } from 'components/atoms/button/BaseButton';
import { client } from 'lib/api/client';
import { memo, useState, VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const Label = tw.label`font-bold mx-1 text-xs`;
const Input = tw.input`mt-0.5`;
const RadioButtonDiv = tw.div`w-32 mx-2 my-6 flex`;
const ButtonParentDiv = tw.div`text-center my-3 w-20`;

export const UserAndDateSpotSearchBar: VFC = memo(() => {

  const [ searchTarget, setSearchTarget] = useState('DateSpot');
  const [ name, setName ] = useState('');
  const onChangeSearchTarget: React.ChangeEventHandler<HTMLInputElement> = (e) => setSearchTarget(e.target.value);
  const onChangeSearchName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const navigate = useNavigate();

  const search = {
    searchTarget: searchTarget,
    name: name,
  }

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('name_search', search).then(response => {
      response.data.target === 'User' && navigate('/users/nameSearch', {state: {users: response.data.users}})
    })
  };


  return(
    <div className='px-3 flex justify-center m-auto w-full bg-red-100' >
      <input type='text' value={name} onChange={onChangeSearchName} className='my-3 w-1/3 p-2 rounded-xl' placeholder=' スポット名・ユーザー名を検索' />
      <div className='flex'>
        {/* デートスポット */}
        <RadioButtonDiv>
          <Label>
            デートスポット
          </Label>
          <Input type='radio' value='DateSpot' onChange={onChangeSearchTarget} checked={searchTarget === 'DateSpot'} />
        </RadioButtonDiv>
        {/* ユーザー */}
        <RadioButtonDiv>
          <Label>
            ユーザー
          </Label>
          <Input type='radio' value='User' onChange={onChangeSearchTarget} checked={searchTarget === 'User'} />
        </RadioButtonDiv>
        <ButtonParentDiv>
          <BaseButton onClickEvent={onClickSearch}>
            検索
          </BaseButton>
        </ButtonParentDiv>
      </div>
    </div>
  );
});
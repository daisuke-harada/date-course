import { BaseButton } from 'components/atoms/button/BaseButton';
import { memo, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

const Label = tw.label`font-bold mx-1 text-xs`;
const Input = tw.input`mt-0.5`;
const RadioButtonDiv = tw.div`w-32 mx-2 my-6 flex`;
const ButtonParentDiv = tw.div`text-center my-3 w-20`;

export const UserAndDateSpotSearchBar: VFC = memo(() => {

  const [ searchTarget, setSearchTarget] = useState('DateSpot');
  const onChangeSearchTarget: React.ChangeEventHandler<HTMLInputElement> = (e) => setSearchTarget(e.target.value);

  return(
    <div className='px-3 w-full shadow bg-gray-300 flex border-1 border-gray-300' >
      <input type='text' className='w-1/2 my-3 p-1 rounded-xl' placeholder='スポット名・ユーザー名を検索' />
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
          <BaseButton>
            検索
          </BaseButton>
        </ButtonParentDiv>
      </div>
    </div>
  );
});
import { memo, useState, useEffect, FC } from 'react';
import tw from 'tailwind-styled-components';
import { useSearchParams } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';

const Input = tw.input`py-1 px-3 w-full border-2 border-red-100 rounded-xl`;
const MainDiv = tw.div`m-auto mt-3 p-3 shadow-xl bg-white border-2 rounded-3xl border-gray-200 flex flex-col`;
const TitleDiv = tw.div`lg:text-lg text-xs m-auto my-5 font-bold text-center`;

export const DateSpotNameSearchBar: FC = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ dateSpotName, setDateSpotName ] = useState(() => searchParams.get('date_spot_name') || '');
  useEffect(() => {
    setDateSpotName(searchParams.get('date_spot_name') || '');
  }, [searchParams]);

  const onChangeSearchName: React.ChangeEventHandler<HTMLInputElement> = (e) => setDateSpotName(e.target.value);

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    const params = new URLSearchParams(searchParams);
    if (dateSpotName) params.set('date_spot_name', dateSpotName);
    else params.delete('date_spot_name');
    setSearchParams(params);
  };

  return(
    <MainDiv >
      <TitleDiv>
        デートスポット名検索
      </TitleDiv>
      <div className='px-3'>
        <Input onChange={onChangeSearchName} type='text' value={dateSpotName} placeholder='名前を入力' />
      </div>
      <div className='m-auto my-2 lg:w-1/3 w-1/2'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </MainDiv>
  );
});
import { FC, memo, useCallback, useEffect, useState } from 'react';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { PrefectureSelect } from 'components/molecules/select/dateSpots/PrefectureSelect';
import tw from 'tailwind-styled-components';
import { useSearchParams } from 'react-router-dom';

const SelectParentDiv = tw.div`w-full px-3`;
const MainDiv = tw.div`m-auto mt-3 p-3 bg-white border-2 shadow-xl rounded-3xl border-gray-200 flex-col`;
const TitleDiv = tw.div`lg:text-lg text-xs m-auto my-5 font-bold text-center`;

export const CourseSortSearchBar: FC = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prefectureId, setPrefectureId] = useState<string>(() => searchParams.get('prefecture_id') || '');

  useEffect(() => {
    setPrefectureId(searchParams.get('prefecture_id') || '');
  }, [searchParams]);

  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureId(e.target.value), []);

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    const params = new URLSearchParams(searchParams);
    if (prefectureId) params.set('prefecture_id', prefectureId);
    else params.delete('prefecture_id');
    setSearchParams(params);
  };

  return(
    <MainDiv>
      <TitleDiv>
        デートコースエリア検索
      </TitleDiv>
      <SelectParentDiv>
        <PrefectureSelect addClassName='w-full border-red-100' dataE2e='dateSpot-prefecture-select' value={prefectureId} onChangeValue={onChangePrefectureValue} />
      </SelectParentDiv>
      <div className='m-auto my-2 lg:w-1/3 w-1/2'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </MainDiv>
  );
});
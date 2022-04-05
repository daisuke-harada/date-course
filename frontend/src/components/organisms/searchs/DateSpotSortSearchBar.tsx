import { memo, useCallback, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { GenreSelect } from 'components/molecules/dateSpots/GenreSelect';
import { PrefectureSelect } from 'components/molecules/dateSpots/PrefectureSelect';
import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';

const SelectParentDiv = tw.div`mt-3 px-3`;


export const DateSpotSortSearchBar: VFC = memo(() => {
  const [prefectureValue, setPrefectureValue] = useState<string >('');
  const [genreValue, setGenreValue] = useState<string>('');
  const [businessTimeValue, setBusinessTimeValue] = useState('');

  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureValue(e.target.value), []);
  const onChangeGenreValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setGenreValue(e.target.value), []);
  const onChangeBusinessTimeValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setBusinessTimeValue(e.target.value), []);

  return(
    <div className='w-3/4 bg-white border-2 mt-4 rounded-3xl border-gray-200 justify-center flex p-1 m-auto' >
      <SelectParentDiv>
        <PrefectureSelect addClassName='border-red-100' dataE2e="dateSpot-prefecture-select" defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
      </SelectParentDiv>
      <SelectParentDiv>
        <GenreSelect addClassName='border-red-100' dataE2e="dateSpot-genre-select" defaultValue={genreValue} onChangeValue={onChangeGenreValue} />
      </SelectParentDiv>
      <div className='mt-3 ml-3'>
        来店希望時刻
      </div>
      <SelectParentDiv>
        <BusinessTimeSelect addClassName='border-2 rounded-md border-red-100' timeValue={businessTimeValue} onChangeTimeValue={onChangeBusinessTimeValue} />
      </SelectParentDiv>
      <div className='mt-2'>
        <BaseButton>検索</BaseButton>
      </div>
    </div>
  );
});
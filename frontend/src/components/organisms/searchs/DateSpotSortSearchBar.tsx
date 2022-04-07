import { memo, useCallback, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { GenreSelect } from 'components/molecules/dateSpots/GenreSelect';
import { PrefectureSelect } from 'components/molecules/dateSpots/PrefectureSelect';
import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';
import { client } from 'lib/api/client';
import { useNavigate } from 'react-router-dom';

const SelectParentDiv = tw.div`mt-3 mx-3 w-32`;


export const DateSpotSortSearchBar: VFC = memo(() => {
  const [prefectureValue, setPrefectureValue] = useState<string >('');
  const [genreValue, setGenreValue] = useState<string>('');
  const [businessTimeValue, setBusinessTimeValue] = useState('');

  const navigate = useNavigate();
  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureValue(e.target.value), []);
  const onChangeGenreValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setGenreValue(e.target.value), []);
  const onChangeBusinessTimeValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setBusinessTimeValue(e.target.value), []);
  const search = {
    prefectureId: prefectureValue,
    genreId: genreValue,
    comeTime: businessTimeValue,
  }
  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('date_spots/sort', search).then(response => {
      response.data.status === 'success' && navigate('/dateSpots/Search', {state: {addressAndDateSpots: response.data.addressAndDateSpots}})
    })
  };

  return(
    <div className='w-3/4 z-40 m-auto mt-6 bg-white border-2 rounded-3xl border-gray-200 justify-center flex py-1' >
      <SelectParentDiv>
        <PrefectureSelect addClassName='border-red-100' dataE2e="dateSpot-prefecture-select" defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
      </SelectParentDiv>
      <SelectParentDiv className='mr-6'>
        <GenreSelect addClassName='border-red-100' dataE2e="dateSpot-genre-select" defaultValue={genreValue} onChangeValue={onChangeGenreValue} />
      </SelectParentDiv>
      <label className='mt-3 ml-6 pl-6 mr-0'>
        来店希望時間
      </label>
      <SelectParentDiv className='mx-0.5'>
        <BusinessTimeSelect addClassName='border-2 rounded-md border-red-100' timeValue={businessTimeValue} onChangeTimeValue={onChangeBusinessTimeValue} />
      </SelectParentDiv>
      <div className='m-2 ml-0 w-36'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </div>
  );
});
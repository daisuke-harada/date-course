import { memo, useCallback, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { GenreSelect } from 'components/molecules/select/dateSpots/GenreSelect';
import { PrefectureSelect } from 'components/molecules/select/dateSpots/PrefectureSelect';
import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';
import { client } from 'lib/api/client';
import { useNavigate } from 'react-router-dom';

const SelectParentDiv = tw.div`w-full p-3`;

type Props = {
  defaultPrefectureValue: string,
  defaultGenreValue: string,
  defaultBusinessTimeValue: string
}


export const DateSpotSortSearchBar: VFC<Props> = memo((props) => {
  const {defaultPrefectureValue, defaultGenreValue, defaultBusinessTimeValue} = props;
  const [prefectureValue, setPrefectureValue] = useState<string >(defaultPrefectureValue);
  const [genreValue, setGenreValue] = useState<string>(defaultGenreValue);
  const [businessTimeValue, setBusinessTimeValue] = useState(defaultBusinessTimeValue);

  const navigate = useNavigate();
  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureValue(e.target.value), []);
  const onChangeGenreValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setGenreValue(e.target.value), []);
  const onChangeBusinessTimeValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setBusinessTimeValue(e.target.value), []);

  const search = {
    prefectureId: prefectureValue,
    genreId: genreValue,
    comeTime: businessTimeValue,
  };

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('date_spots/sort', search).then(response => {
      response.data.status === 'success' && navigate('/dateSpots/search',
        {
          state: {
            addressAndDateSpots: response.data.addressAndDateSpots,
            prefectureId: response.data.prefectureId,
            genreId: response.data.genreId,
            comeTime: response.data.comeTime
          }
        }
      )
    })
  };

  return(
    <div className='m-auto bg-white border-2 rounded-3xl border-gray-200 flex flex-col' >
      <div className='text-xs m-auto my-5 font-bold text-center'>
        デートスポット条件検索
      </div>
      <SelectParentDiv>
        <PrefectureSelect addClassName='w-full border-red-100' dataE2e="dateSpot-prefecture-select" defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
      </SelectParentDiv>
      <SelectParentDiv>
        <GenreSelect addClassName='w-full border-red-100' dataE2e="dateSpot-genre-select" defaultValue={genreValue} onChangeValue={onChangeGenreValue} />
      </SelectParentDiv>
      <SelectParentDiv className='flex'>
        <div className='font-bold text-xs m-1'>
          希望時間
        </div>
        <BusinessTimeSelect addClassName='border-2 rounded-md border-red-100' timeValue={businessTimeValue} onChangeTimeValue={onChangeBusinessTimeValue} />
      </SelectParentDiv>
      <div className='m-auto my-5 w-3/4'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </div>
  );
});
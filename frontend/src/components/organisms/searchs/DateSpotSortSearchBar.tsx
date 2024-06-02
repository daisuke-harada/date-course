import { memo, useCallback, useState, FC } from 'react';
import tw from 'tailwind-styled-components';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { GenreSelect } from 'components/molecules/select/dateSpots/GenreSelect';
import { PrefectureSelect } from 'components/molecules/select/dateSpots/PrefectureSelect';
import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';
import { client } from 'lib/api/client';
import { useNavigate } from 'react-router-dom';

type Props = {
  defaultPrefectureId: string,
  defaultGenreId: string,
  defaultBusinessTimeValue: string
}

const SelectParentDiv = tw.div`w-full px-3`;
const MainDiv = tw.div`m-auto p-3 bg-white border-2 shadow-xl rounded-3xl border-gray-200 flex flex-col`;
const TitleDiv = tw.div`lg:text-lg text-xs m-auto my-5 font-bold text-center`;

export const DateSpotSortSearchBar: FC<Props> = memo((props) => {
  const {defaultPrefectureId, defaultGenreId, defaultBusinessTimeValue} = props;
  const [prefectureValue, setPrefectureValue] = useState<string >(defaultPrefectureId);
  const [genreValue, setGenreValue] = useState<string>(defaultGenreId);
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
    <MainDiv >
      <TitleDiv>
        デートスポット条件検索
      </TitleDiv>
      <SelectParentDiv>
        <PrefectureSelect addClassName='w-full border-red-100' dataE2e='dateSpot-prefecture-select' defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
      </SelectParentDiv>
      <SelectParentDiv>
        <GenreSelect addClassName='w-full border-red-100' dataE2e='dateSpot-genre-select' defaultValue={genreValue} onChangeValue={onChangeGenreValue} />
      </SelectParentDiv>
      <SelectParentDiv className='w-full flex'>
        <div className='font-bold lg:text-lg text-xs m-1'>
          来店希望時間
        </div>
        <BusinessTimeSelect addClassName='border-2 rounded-md border-red-100' timeValue={businessTimeValue} onChangeTimeValue={onChangeBusinessTimeValue} />
      </SelectParentDiv>
      <div className='m-auto my-2 lg:w-1/3 w-1/2'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </MainDiv>
  );
});
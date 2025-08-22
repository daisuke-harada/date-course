import { memo, useCallback, useState, FC } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { client } from 'lib/api/client';
import { PrefectureSelect } from '../select/dateSpots/PrefectureSelect';
import { GenreSelect } from '../select/dateSpots/GenreSelect';
import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';
import { useSearchParams } from 'react-router-dom';

const Input = tw.input`py-1 px-3 w-full border-2 border-red-100 rounded-xl`;
const RadioInput = tw.input`mx-1 mt-0.5`
const RadioButtonDiv = tw.div`mx-2 mt-3 flex`;
const Label = tw.label`font-bold mx-1 text-xs`;
const SelectParentDiv = tw.div`mx-3 mt-3`;

type Props = {
  dateSpotSearchName?: string,
  defaultPrefectureId?: string,
  defaultGenreId?: string,
  defaultComeTime?: string
}

export const DateSpotSearchArea: FC<Props> = memo((props) => {
  const { dateSpotSearchName, defaultPrefectureId, defaultGenreId, defaultComeTime } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [ searchTarget, setSearchTarget] = useState(dateSpotSearchName? 'name' : 'condition');
  const [ dateSpotName, setDateSpotName ] = useState(() => searchParams.get('date_spot_name') || '');
  const [prefectureId, setPrefectureId] = useState<string>(() => searchParams.get('prefecture_id') || defaultPrefectureId || '');
  const [genreId, setGenreId] = useState<string>(() => searchParams.get('genre_id') || defaultGenreId || '');
  const [comeTime, setComeTime] = useState(() => searchParams.get('come_time') || defaultComeTime || '');

  const onChangeSearchName: React.ChangeEventHandler<HTMLInputElement> = (e) => setDateSpotName(e.target.value);
  const onChangeSearchTarget: React.ChangeEventHandler<HTMLInputElement> = (e) => setSearchTarget(e.target.value);
  const onChangePrefectureId: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureId(e.target.value), []);
  const onChangeGenreId: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setGenreId(e.target.value), []);
  const onChangeComeTime: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setComeTime(e.target.value), []);


  const onClickNameSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    const params = new URLSearchParams(searchParams);
    if (dateSpotName) params.set('date_spot_name', dateSpotName);
    else params.delete('date_spot_name');
    setSearchParams(params);

  };

  const onClickConditionSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
   const params = new URLSearchParams(searchParams);
    if (prefectureId) params.set('prefecture_id', prefectureId);
    else params.delete('prefecture_id');

    if (genreId) params.set('genre_id', genreId);
    else params.delete('genre_id');

    if (comeTime) params.set('come_time', comeTime);
    else params.delete('come_time');

    setSearchParams(params);
  };

  return(
    <>
      <div className='flex justify-center'>
        <RadioButtonDiv>
          <Label>条件検索</Label>
          <RadioInput type='radio' value='condition' onChange={onChangeSearchTarget} checked={searchTarget === 'condition'} />
        </RadioButtonDiv>
        <RadioButtonDiv>
          <Label>名前検索</Label>
          <RadioInput type='radio' value='name' onChange={onChangeSearchTarget} checked={searchTarget === 'name'} />
        </RadioButtonDiv>
      </div>
      {
        searchTarget === 'name'?
        (
          <>
            <div className='pt-3 px-2'>
              <Input onChange={onChangeSearchName} type='text' value={dateSpotName} placeholder='名前を検索' />
            </div>
            <div className='m-auto my-5 w-1/4'>
              <BaseButton onClickEvent={onClickNameSearch}>検索</BaseButton>
            </div>
          </>
        )
        :
        (
          <>
            <div className='mobile(L):justify-center justify-start flex overflow-x-scroll pb-2 whitespace-nowrap'>
              <SelectParentDiv>
                <PrefectureSelect addClassName='w-20 border-red-100' dataE2e='dateSpot-prefecture-select' value={prefectureId} onChangeValue={onChangePrefectureId} />
              </SelectParentDiv>
              <SelectParentDiv>
                <GenreSelect addClassName='w-20 border-red-100' dataE2e='dateSpot-genre-select' value={genreId} onChangeValue={onChangeGenreId} />
              </SelectParentDiv>
              <SelectParentDiv className='flex'>
                <div className='font-bold text-sm mx-1 mt-1'>
                  来店希望時間
                </div>
                <BusinessTimeSelect addClassName='border-2 mb-1 rounded-md border-red-100' value={comeTime} onChangeTimeValue={onChangeComeTime} />
              </SelectParentDiv>
            </div>
            <div className='m-auto my-5 w-1/4'>
              <BaseButton onClickEvent={onClickConditionSearch}>検索</BaseButton>
            </div>
          </>
        )
      }
    </>
  );
});
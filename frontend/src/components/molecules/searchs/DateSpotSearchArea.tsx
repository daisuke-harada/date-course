import { memo, useCallback, useState, FC } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { client } from 'lib/api/client';
import { PrefectureSelect } from '../select/dateSpots/PrefectureSelect';
import { GenreSelect } from '../select/dateSpots/GenreSelect';
import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';

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

  const [ dateSpotName, setDateSpotName ] = useState(dateSpotSearchName || '');
  const [ searchTarget, setSearchTarget] = useState(dateSpotSearchName? 'name' : 'condition');
  const [prefectureId, setPrefectureId] = useState<string >(defaultPrefectureId || '');
  const [genreId, setGenreId] = useState<string>(defaultGenreId || '');
  const [comeTime, setComeTime] = useState(defaultComeTime || '');
  const navigate = useNavigate();
  const onChangeSearchName: React.ChangeEventHandler<HTMLInputElement> = (e) => setDateSpotName(e.target.value);
  const onChangeSearchTarget: React.ChangeEventHandler<HTMLInputElement> = (e) => setSearchTarget(e.target.value);
  const onChangePrefectureId: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureId(e.target.value), []);
  const onChangeGenreId: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setGenreId(e.target.value), []);
  const onChangeComeTime: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setComeTime(e.target.value), []);

  const conditionSearch = {
    prefectureId: prefectureId,
    genreId: genreId,
    comeTime: comeTime,
  };

  const onClickNameSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('date_spot_name_search', {dateSpotName}).then(response => {
      navigate('/dateSpots/search', {state: {addressAndDateSpots: response.data.addressAndDateSpots, dateSpotSearchName: dateSpotName}})
    });
  };

  const onClickConditionSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('date_spots/sort', conditionSearch).then(response => {
      navigate('/dateSpots/search',
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
                <PrefectureSelect addClassName='w-20 border-red-100' dataE2e='dateSpot-prefecture-select' defaultValue={prefectureId} onChangeValue={onChangePrefectureId} />
              </SelectParentDiv>
              <SelectParentDiv>
                <GenreSelect addClassName='w-20 border-red-100' dataE2e='dateSpot-genre-select' defaultValue={genreId} onChangeValue={onChangeGenreId} />
              </SelectParentDiv>
              <SelectParentDiv className='flex'>
                <div className='font-bold text-sm mx-1 mt-1'>
                  来店希望時間
                </div>
                <BusinessTimeSelect addClassName='border-2 mb-1 rounded-md border-red-100' timeValue={comeTime} onChangeTimeValue={onChangeComeTime} />
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
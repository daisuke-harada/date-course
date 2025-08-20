import { memo, useCallback, useState, useEffect, FC } from 'react';
import tw from 'tailwind-styled-components';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { GenreSelect } from 'components/molecules/select/dateSpots/GenreSelect';
import { PrefectureSelect } from 'components/molecules/select/dateSpots/PrefectureSelect';
import { BusinessTimeSelect } from 'components/atoms/select/BusinessTimeSelect';
import { useNavigate } from 'react-router-dom';

type Props = {
  defaultPrefectureId: string,
  defaultGenreId: string,
  defaultComeTime: string
}

const SelectParentDiv = tw.div`w-full px-3`;
const MainDiv = tw.div`m-auto p-3 bg-white border-2 shadow-xl rounded-3xl border-gray-200 flex flex-col`;
const TitleDiv = tw.div`lg:text-lg text-xs m-auto my-5 font-bold text-center`;

export const DateSpotSortSearchBar: FC<Props> = memo((props) => {
  const {defaultPrefectureId, defaultGenreId, defaultComeTime} = props;
  const [prefectureId, setprefectureId] = useState<string >(defaultPrefectureId);
  const [genreId, setgenreId] = useState<string>(defaultGenreId);
  const [comeTime, setComeTime] = useState(defaultComeTime);

  useEffect(() => {
    setprefectureId(defaultPrefectureId || '');
  }, [defaultPrefectureId]);

  useEffect(() => {
    setgenreId(defaultGenreId || '');
  }, [defaultGenreId]);

  useEffect(() => {
    setComeTime(defaultComeTime || '');
  }, [defaultComeTime]);

  const navigate = useNavigate();
  const onChangeprefectureId: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setprefectureId(e.target.value), []);
  const onChangegenreId: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setgenreId(e.target.value), []);
  const onChangeComeTime: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setComeTime(e.target.value), []);

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    // クエリ名はバックエンドに合わせて snake_case にする
    const query: Record<string, string> = {};
    if (prefectureId) query.prefecture_id = prefectureId;
    if (genreId) query.genre_id = genreId;
    if (comeTime) query.come_time = comeTime;

    const qs = new URLSearchParams(query).toString();
    // Index がクエリを読み取って API を叩くため、ここでは navigate のみ行う
    navigate(`/dateSpots/index${qs ? `?${qs}` : ''}`);
  };

  return(
    <MainDiv >
      <TitleDiv>
        デートスポット条件検索
      </TitleDiv>
      <SelectParentDiv>
        <PrefectureSelect addClassName='w-full border-red-100' dataE2e='dateSpot-prefecture-select' value={prefectureId} onChangeValue={onChangeprefectureId} />
      </SelectParentDiv>
      <SelectParentDiv>
        <GenreSelect addClassName='w-full border-red-100' dataE2e='dateSpot-genre-select' value={genreId} onChangeValue={onChangegenreId} />
      </SelectParentDiv>
      <SelectParentDiv className='w-full flex'>
        <div className='font-bold lg:text-lg text-xs m-1'>
          来店希望時間
        </div>
        <BusinessTimeSelect addClassName='border-2 rounded-md border-red-100' value={comeTime} onChangeTimeValue={onChangeComeTime} />
      </SelectParentDiv>
      <div className='m-auto my-2 lg:w-1/3 w-1/2'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </MainDiv>
  );
});
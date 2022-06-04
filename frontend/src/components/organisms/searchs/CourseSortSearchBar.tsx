import { memo, useCallback, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { PrefectureSelect } from 'components/molecules/select/dateSpots/PrefectureSelect';
import { client } from 'lib/api/client';
import { useNavigate } from 'react-router-dom';

type Props = {
  defaultPrefectureId: string
}

const SelectParentDiv = tw.div`w-full px-3`;
const MainDiv = tw.div`m-auto mt-3 p-3 bg-white border-2 shadow-xl rounded-3xl border-gray-200 flex flex-col`;
const TitleDiv = tw.div`lg:text-lg text-xs m-auto my-5 font-bold text-center`;

export const CourseSortSearchBar: VFC<Props> = memo((props) => {

  // 都道府県のIDを文字列で受け取る
  const {defaultPrefectureId} = props;

  const [prefectureId, setPrefectureId] = useState<string >(defaultPrefectureId);
  const navigate = useNavigate();
  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureId(e.target.value), []);

  const search = {
    prefectureId: prefectureId
  };

  const onClickSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    client.post('courses/sort', search).then(response => {
      response.data.status === 'success' && navigate('/courses/search',
        {
          state: {
            courses: response.data.courses,
            prefectureId: response.data.prefectureId,
          }
        }
      )
    })
  };

  return(
    <MainDiv>
      <TitleDiv>
        デートコースエリア検索
      </TitleDiv>
      <SelectParentDiv>
        <PrefectureSelect addClassName='w-full border-red-100' dataE2e='dateSpot-prefecture-select' defaultValue={prefectureId} onChangeValue={onChangePrefectureValue} />
      </SelectParentDiv>
      <div className='m-auto my-2 lg:w-1/3 w-1/2'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </MainDiv>
  );
});
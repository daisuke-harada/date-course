import { memo, useCallback, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { PrefectureSelect } from 'components/molecules/select/dateSpots/PrefectureSelect';
import { client } from 'lib/api/client';
import { useNavigate } from 'react-router-dom';

const SelectParentDiv = tw.div`w-full p-3`;

type Props = {
  defaultPrefectureValue: string
}

export const CourseSortSearchBar: VFC<Props> = memo((props) => {
  const {defaultPrefectureValue} = props;

  const [prefectureValue, setPrefectureValue] = useState<string >(defaultPrefectureValue);
  const navigate = useNavigate();
  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureValue(e.target.value), []);

  const search = {
    prefectureId: prefectureValue
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
    <div className='m-auto mt-3 bg-white border-2 shadow-xl rounded-3xl border-gray-200 flex flex-col' >
      <div className='lg:text-lg text-xs m-auto my-5 font-bold text-center'>
        デートコース条件検索
      </div>
      <SelectParentDiv>
        <PrefectureSelect addClassName='w-full border-red-100' dataE2e='dateSpot-prefecture-select' defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
      </SelectParentDiv>
      <div className='m-auto my-5 w-3/4'>
        <BaseButton onClickEvent={onClickSearch}>検索</BaseButton>
      </div>
    </div>
  );
});